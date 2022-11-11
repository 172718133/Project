import axios from 'axios'
// 封装项目请求基地址
const request = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

export default request
