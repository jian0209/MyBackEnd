import { utils } from '../utils/constant'
import {
  GetTokenList,
  GetUserInfoById,
  AddUser,
  AddToken,
  RemoveToken,
  GetUserInfoList
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
    v4().split('-')[0] + v4().split('-')[0] + CryptoJS.MD5(tokenParam.userId)
  let param = {
    UserId: tokenParam.userId,
    TokenId: token,
    CreatedAt: moment().unix()
  }
  AddToken(param)
}

export const DeleteToken = async (id) => {
  RemoveToken(id)
}

export const Login = async (userParam) => {
  let param = {
    username: userParam.userName,
    password: CryptoJS.MD5(userParam.password).toString()
  }
  await GetUserInfoList(param).then((res) => {
    if (res.length < 1) {
      // record not found
      return utils.RECORD_NOT_FOUND
    } else {
      CreateToken(res.UserId)
      return res
    }
  })
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
  await AddUser(param)
  // console.log(param)
}
