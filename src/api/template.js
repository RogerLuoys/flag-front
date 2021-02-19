import api from './axios'

export function queryFlagTemplateDetailAPI (params) {
  return api({
    url: `api/template/queryFlagTemplateDetail/${params}`,
    method: 'get'
  })
}

export function queryFlagTemplateListAPI (params) {
  return api({
    url: 'api/template/queryFlagTemplateList',
    method: 'get',
    params: params
  })
}

export function useFlagTemplateAPI (data) {
  return api({
    url: 'api/template/useFlagTemplate',
    method: 'post',
    data: data
  })
}
