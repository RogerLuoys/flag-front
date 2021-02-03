import api from './axios'

export function loginAPI (params) {
  return api({
    url: 'api/user/login',
    method: 'get',
    headers: {
      'loginName': params.loginName,
      'password': params.password
    }
  })
}

export function registerAPI (data) {
  return api({
    url: 'api/user/register',
    method: 'post',
    data: data
  })
}

export function modifyUserAPI (data) {
  return api({
    url: 'api/user/modifyUser',
    method: 'put',
    data: data
  })
}
