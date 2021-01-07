import api from './axios'

export function queryTaskDailyListAPI(data) {
  return api({
    url: 'api/taskDaily/queryTaskDailyList',
    method: 'post',
    data: data
  })
}
