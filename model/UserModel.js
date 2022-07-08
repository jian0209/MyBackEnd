import client from '../config/mongodb'

export const GetTokenList = async (id) => {
  let result
  await client
    .connect()
    .then((client) =>
      client.db('User').collection('TokenInfo').find({ UserId: id }).toArray()
    )
    .then((cols) => (result = cols))
    .catch((e) => console.error(e))
    .finally(() => client.close())

  return result
}

export const AddToken = async (tokenParam) => {
  await client
    .connect()
    .then((client) =>
      client.db('User').collection('TokenInfo').insertOne(tokenParam)
    )
    .catch((e) => console.log(e))
    .finally(() => client.close())
}

export const RemoveToken = async (id) => {
  await client
    .connect()
    .then((client) =>
      client.db('User').collection('TokenInfo').deleteOne({ UserId: id })
    )
    .catch((e) => console.log(e))
    .finally(() => client.close())
}

export const GetUserInfoById = async (id) => {
  let result
  await client
    .connect()
    .then((client) =>
      client.db('User').collection('UserInfo').find({ UserId: id }).toArray()
    )
    .then((cols) => (result = cols))
    .catch((e) => console.error(e))
    .finally(() => client.close())

  return result
}

export const GetUserInfoByName = async (name) => {
  let result
  await client
    .connect()
    .then((client) =>
      client
        .db('User')
        .collection('UserInfo')
        .find({ UserName: name })
        .toArray()
    )
    .then((cols) => (result = cols))
    .catch((e) => console.error(e))
    .finally(() => client.close())

  return result
}

export const GetUserInfoByEmail = async (email) => {
  let result
  await client
    .connect()
    .then((client) =>
      client.db('User').collection('UserInfo').find({ Email: email }).toArray()
    )
    .then((cols) => (result = cols))
    .catch((e) => console.error(e))
    .finally(() => client.close())

  return result
}

export const GetUserInfoList = async (userParam) => {
  let result
  await client
    .connect()
    .then((client) =>
      client
        .db('User')
        .collection('UserInfo')
        .find({ UserName: userParam.username, Password: userParam.password })
        .toArray()
    )
    .then((cols) => (result = cols))
    .catch((e) => console.error(e))
    .finally(() => client.close())

  return result
}

export async function AddUser(userParam) {
  await client
    .connect()
    .then((client) =>
      client.db('User').collection('UserInfo').insertOne(userParam)
    )
    .catch((e) => console.log(e))
    .finally(() => client.close())
}
