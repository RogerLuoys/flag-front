import axios from 'axios'
// import cookie from 'js-cookie'

const api = axios.create({
  baseURL: 'http://192.168.10.106:9001/',
  // baseURL: 'api/',
  timeout: 10000,
  // withCredentials: false
  // headers: {'X-Custom-Header': 'foobar'}
})

// 添加请求拦截器
api.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
api.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default api
