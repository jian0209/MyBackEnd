import { GetAllTask, Add } from '../model/TaskModel'

export const GetTaskList = async () => {
  return await GetAllTask()
}

export const CreateTask = async (taskParam) => {
  return await Add(taskParam)
}
