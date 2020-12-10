import api from './axios'

// export default {
//   // 查看flag列表
//   apiGetFlagList: params => api.get('/flag/list', { params }),
//   apiNewFlag: data => api.post('', {data})
// }

export function queryFlagListAPI(data) {
  return api({
    url: 'api/flag/queryFlagList',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      // 'Cookie': 'userId=101'
    },
    data: data
  })
}

export function newFlagAPI(data) {
  return api({
    url: 'api/flag/newFlag',
    method: 'post',
    data: data
  })
}

export function modifyFlagStatusAPI(params) {
  return api({
    url: 'api/flag/modifyFlagStatus',
    method: 'put',
    params: params
  })
}

export function queryFlagDetailAPI(params) {
  return api({
    url: `api/flag/queryFlagDetail/${params}`,
    method: 'get'
  })
}

export function modifyFlagBasicAPI(data) {
  return api({
    url: `api/flag/modifyFlagBasic`,
    method: 'put',
    data: data
  })
}
