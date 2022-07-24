import moment from 'moment'
import {
  CheckLogin,
  GetUserInfo,
  CreateUser,
  Login,
  Logout
} from '../controller/UserController'
import { GetTaskList, CreateTask } from '../controller/TaskController'
import { GetUserInfoByName } from '../model/UserModel'
import { utils } from '../utils/constant'

var express = require('express')
var router = express.Router()

router.post('/user/info', async function (req, res, next) {
  if (!req.headers.token) {
    // has no token
    res.send({
      success: false,
      message: 'Login Required'
    })
  } else if (req.body.userId) {
    // has token and all required param
    if ((await GetUserInfo(req.body.userId)) === utils.RECORD_NOT_FOUND) {
      // record not found
      res.send({
        success: false,
        message: 'Record Not Found'
      })
    } else if (
      (await CheckLogin(req.headers.token, req.body.userId)) ===
      utils.TOKEN_VALID
    ) {
      // token is correct and record found
      res.send({
        success: true,
        message: 'User Info',
        messageJson: await GetUserInfo(req.body.userId)
      })
    } else {
      // token is not correct
      res.send({
        success: false,
        message: 'Token Invalid'
      })
    }
  } else {
    // required param failed
    res.send({
      success: false,
      message: 'Invalid Param'
      // messageJson: await GetUserList(),
    })
  }
})

router.post('/user/create', async function (req, res, next) {
  console.log(req.body)
  const reqBody = req.body
  if (
    reqBody.userName &&
    reqBody.password &&
    reqBody.firstName &&
    reqBody.lastName &&
    reqBody.email
  ) {
    await CreateUser(reqBody).then((msg) => {
      res.send({
        success: true,
        message: msg
      })
    })
  } else {
    // required param failed
    res.send({
      success: false,
      message: 'Invalid Param'
    })
  }
})

router.post('/user/checkUsername', async function (req, res, next) {
  const reqBody = req.body
  console.log(reqBody)
  await GetUserInfoByName(reqBody.userName).then((msg) => {
    if (msg.length > 0) {
      res.send({
        success: false,
        message: 'Username existed'
      })
    } else {
      res.send({
        success: true
      })
    }
  })
})

router.post('/user/login', async function (req, res, next) {
  const reqBody = req.body
  if (reqBody.userName && reqBody.password) {
    await Login(reqBody).then((msg) => {
      console.log(msg)
      if (typeof msg == 'string') {
        res.send({
          success: false,
          message: msg
        })
      } else {
        res.send({
          success: true,
          message: msg
        })
      }
    })
  } else {
    // required param failed
    res.send({
      success: false,
      message: 'Invalid Param'
    })
  }
})

router.post('/user/logout', async function (req, res, next) {
  await Logout(req.body).then((msg) => {
    res.send({
      success: true,
      message: msg
    })
  })
})

router.post('/task/list', async function (req, res, next) {
  res.send({
    success: 'true',
    message: 'Task List',
    messageJson: await GetTaskList(),
    requestParam: Object.keys(req.body)
  })
})

router.post('/task/create', async function (req, res, next) {
  res.send({
    success: 'true',
    message: 'Task List',
    messageJson: await CreateTask({
      id: 1,
      taskName: 'testing1',
      createdTime: moment().unix(),
      completedTime: null,
      updatedTime: moment().unix(),
      isCompleted: false,
      content: 'testing3',
      remark: 'testing2',
      isDeleted: false,
      deletedTime: null
    }),
    requestParam: req.body
  })
})

module.exports = router
