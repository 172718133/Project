import axios from 'axios'

// 创建一个新的axios请求，在请求时简化路径，有利于维护
const request = axios.create({
  baseURL: 'https://www.escook.cn'
})

export default request
