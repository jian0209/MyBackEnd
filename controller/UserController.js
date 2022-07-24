import { utils } from '../utils/constant'
import {
  GetTokenList,
  GetUserInfoById,
  AddUser,
  AddToken,
  RemoveToken,
  GetUserInfoList,
  GetUserInfoByName,
  GetUserInfoByEmail
} from '../model/UserModel'
import { v4 } from 'uuid'
import moment from 'moment'
import CryptoJS from 'crypto-js'

export const CheckLogin = async (token, id) => {
  let result = await GetTokenList(token, id)

  if (result[0] && result[0].TokenId !== token) {
    return utils.TOKEN_INVALID
  } else {
    return utils.TOKEN_VALID
  }
}

export const CreateToken = async (tokenParam) => {
  const token =
    v4().split('-')[0] + v4().split('-')[0] + CryptoJS.MD5(tokenParam)
  let param = {
    UserId: tokenParam,
    TokenId: token,
    CreatedAt: moment().unix()
  }
  AddToken(param)
  return token
}

export const DeleteToken = async (id) => {
  RemoveToken(id)
}

export const Login = async (userParam) => {
  let param = {
    username: userParam.userName,
    password: CryptoJS.MD5(userParam.password).toString()
  }
  let resMsg
  let tempToken
  await GetUserInfoList(param).then(async (res) => {
    if (res.length < 1) {
      // record not found
      resMsg = 'Username or Password is invalid'
    } else {
      // record found and generate token
      await CreateToken(res[0].UserId).then((res) => {
        tempToken = res
      })
      resMsg = res[0]
      resMsg.token = tempToken
    }
  })
  return resMsg
}

/**
 * example
 * @param {string} s
 * @return {boolean}
 */
export const Logout = async (userParam) => {
  console.log(userParam)
  DeleteToken(userParam.userId)
}

export const GetUserInfo = async (id) => {
  let result = await GetUserInfoById(id)

  if (result.length < 1) {
    // record not found
    return utils.RECORD_NOT_FOUND
  } else {
    // record found
    return result
  }
}

export const GetUsername = async (name) => {
  let result = await GetUserInfoByName(name)

  if (result.length < 1) {
    // record not found
    return true
  } else {
    // record found
    return false
  }
}

export const GetEmail = async (email) => {
  let result = await GetUserInfoByEmail(email)
  if (result.length < 1) {
    // record not found
    return true
  } else {
    // record found
    return false
  }
}

export const CreateUser = async (userParam) => {
  let param = {
    UserId: v4(),
    UserName: userParam.userName,
    Password: CryptoJS.MD5(userParam.password).toString(),
    UserRemark: [],
    FirstName: userParam.firstName,
    LastName: userParam.lastName,
    CreatedAt: moment().unix(),
    Email: userParam.email,
    DeletedAt: null
  }
  if (await GetUsername(param.UserName)) {
    if (await GetEmail(param.Email)) {
      await AddUser(param)
      return 'User created successfully'
    } else {
      // email is not unique
      return 'Email exist'
    }
  } else {
    // username is not unique
    return 'Username exist'
  }
}
