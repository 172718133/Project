// 封装的是具体的接口请求方法
// 每个方法只负责请求一个url地址
import request from '@/utils/request'

// 导出接口方法，为了在逻辑页面引入后调用

/**
 * 注册接口方法
 * @param {*} param0 用户名、密码及确认密码
 * @returns void
 */
export const registerAPI = ({ username, password, repassword }) => {
  // 原地是一个Promise对象（内部包含原生的ajax请求）
  // return 这个Promise对象,在逻辑页面对其进行提取
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}
/**
 * 登录接口方法
 * @param {*} param0 用户名和密码
 * @returns void
 */
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

// 获取用户信息的API
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo'
    // 不写method默认为GET
  })
}

// 获取侧边栏数据的API
export const getAsideListAPI = () => {
  return request({
    url: '/my/menus'
  })
}

// 更新用户信息的API
export const updateUserInfoAPI = ({ id, username, nickname, email, user_pic }) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      username,
      nickname,
      email,
      user_pic
    }
  })
}
