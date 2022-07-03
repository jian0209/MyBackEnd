import client from '../config/mongodb'

export async function GetAllTask() {
  let result
  await client
    .connect()
    .then((client) => client.db('todo').collection('Task').find().toArray())
    .then((cols) => (result = cols))
    .catch((e) => console.log(e))
    .finally(() => client.close())
  return result
}

export async function GetTaskById(id) {
  let result
  await client
    .connect()
    .then(
      (client) =>
        client.db('todo').collection('Task').findOne({ id: id }).toArray() // Returns a promise that will resolve to the list of the collections
    )
    .then((cols) => (result = cols))
    .catch((e) => console.log(e))
    .finally(() => client.close())
  return result
}

export async function Add(taskParam) {
  await client
    .connect()
    .then((client) => client.db('todo').collection('Task').insertOne(taskParam))
    .catch((e) => console.log(e))
    .finally(() => client.close())
  return 'Task Created Successfully'
}

export async function Delete(taskParam) {
  await client
    .connect()
    .then((client) => client.db('todo').collection('Task').insertOne(taskParam))
    .catch((e) => console.log(e))
    .finally(() => client.close())
  return 'Task Deleted Successfully'
}

export async function Modify(taskParam) {
  await client
    .connect()
    .then((client) => client.db('todo').collection('Task').insertOne(taskParam))
    .catch((e) => console.log(e))
    .finally(() => client.close())
  return 'Task Modified Successfully'
}
