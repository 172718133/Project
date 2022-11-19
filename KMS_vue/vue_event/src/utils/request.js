import axios from 'axios'
import store from '@/store'
// 封装项目请求基地址
const request = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

// 定义请求拦截器
request.interceptors.request.use(function (config) {
  // 在发起前，统一携带请求头Authorization和token值
  // 判断，登录和注册页面不需要token
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  //
  return Promise.reject(error)
})

export default request
