import api from './axios'

export function newPointLogAPI (data) {
  return api({
    url: 'api/taskDaily/newTaskDaily',
    method: 'post',
    data: data
  })
}

export function queryTotalPointAPI (params) {
  return api({
    url: 'api/taskDaily/queryTaskDailyList',
    method: 'get',
    params: params
  })
}

export function queryPointListAPI(params) {
  return api({
    url: 'api/taskDaily/queryTaskDailyList',
    method: 'get',
    params: params
  })
}

export function modifyTaskDailyStatusAPI(params) {
  return api({
    url: 'api/taskDaily/modifyTaskDailyStatus',
    method: 'put',
    params: params
  })
}
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
