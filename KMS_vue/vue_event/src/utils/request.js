import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

export const baseURL = 'http://big-event-vue-api-t.itheima.net'
// 封装项目请求基地址
const request = axios.create({
  baseURL
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

// 定义响应拦截器
request.interceptors.response.use(function (response) {
  // 状态码为成功状态时，触发这里面的内容
  return response
}, function (error) {
  if (error.response.status === 401) {
    // 证明token已过期=>清空vuex中的内容,并跳转到登录页
    store.commit('updateToken', '')
    store.commit('updateUserinfo', {})
    router.push('/login')
    Message.error('用户身份已过期！请重新登录')
  }
  // 状态码为失败状态时，触发这里面的内容
  return Promise.reject(error)
})

export default request
