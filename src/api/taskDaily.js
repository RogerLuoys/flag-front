import api from './axios'

export function newTaskDailyAPI(data) {
  return api({
    url: 'api/taskDaily/newTaskDaily',
    method: 'post',
    data: data
  })
}

export function queryTaskDailyListAPI(data) {
  return api({
    url: 'api/taskDaily/queryTaskDailyList',
    method: 'post',
    data: data
  })
}

//
// export function modifyTaskStatusAPI(params) {
//   return api({
//     url: 'api/task/modifyTaskStatus',
//     method: 'put',
//     params: params
//   })
// }
//
// export function modifyTaskAPI(data) {
//   return api({
//     url: `api/task/modifyTask`,
//     method: 'put',
//     data: data
//   })
// }
//
// export function queryTaskAPI(params) {
//   return api({
//     url: `api/task/queryTaskByTaskId`,
//     method: 'get',
//     params: params
//   })
// }
