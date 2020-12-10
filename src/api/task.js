import api from './axios'

export function newTaskAPI(data) {
  return api({
    url: 'api/task/newTask',
    method: 'post',
    data: data
  })
}

export function modifyTaskStatusAPI(params) {
  return api({
    url: 'api/task/modifyTaskStatus',
    method: 'put',
    params: params
  })
}

export function modifyTaskAPI(data) {
  return api({
    url: `api/task/modifyTask`,
    method: 'put',
    data: data
  })
}
