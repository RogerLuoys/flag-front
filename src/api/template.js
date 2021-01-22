import api from './axios'

export function queryFlagTemplateDetailAPI (params) {
  return api({
    url: 'api/template/queryFlagTemplateDetail',
    method: 'get',
    params: params
  })
}

export function queryFlagTemplateListAPI (params) {
  return api({
    url: 'api/template/queryFlagTemplateList',
    method: 'get',
    params: params
  })
}
