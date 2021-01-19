import api from './axios'

export function newPointLogAPI (data) {
  return api({
    url: 'api/point/newPointLog',
    method: 'post',
    data: data
  })
}

export function queryPointSummaryAPI (params) {
  return api({
    url: 'api/point/queryPointSummary',
    method: 'get',
    params: params
  })
}

export function queryPointLogListAPI (params) {
  return api({
    url: 'api/point/queryPointLogList',
    method: 'get',
    params: params
  })
}

export function modifyTaskDailyStatusAPI (params) {
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
