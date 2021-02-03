import api from './axios'

export function queryReportListAPI () {
  return api({
    url: 'api/report/queryReportList',
    method: 'get'
  })
}

export function queryReportDetailAPI (params) {
  return api({
    url: 'api/report/queryReportDetail',
    method: 'get',
    params: params
  })
}
