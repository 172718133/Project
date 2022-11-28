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

/**
 * 获取用户信息的API
 * @returns Promise对象
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo'
    // 不写method默认为GET
  })
}

/**
 * 获取侧边栏数据的API
 * @returns Promise对象
 */
export const getAsideListAPI = () => {
  return request({
    url: '/my/menus'
  })
}

/**
 * 更新用户信息的API
 * @param {*} param0 { id, username, nickname, email, user_pic }
 * @returns Promise对象
 */
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

/**
 * 更新用户头像的API
 * @param {*} avatar avatar => 用户上传的图片（base64）
 * @returns Promise对象
 */
export const updateUserAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}

/**
 * 修改密码的API
 * @param {*} param0 { old_pwd, new_pwd, re_pwd } => 旧密码、新密码、确认密码
 * @returns Promise对象
 */
export const updatePasswordAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}

/**
 * 获取文章分类列表的API
 * @returns Promise对象
 */
export const getArticleCateAPI = () => {
  return request({
    url: '/my/cate/list'
  })
}

/**
 * 增加文章分类的API
 * @param {*} param0 { cate_name, cate_alias } => 文章分类名称、文章分类别名
 * @returns Promise对象
 */
export const addArtCateAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name,
      cate_alias
    }
  })
}

/**
 * 更新文章分类的API
 * @param {*} param0 { id, cate_name, cate_alias }
 * @returns Promise对象
 */
export const updateArtCateAPI = ({ id, cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}

/**
 * 删除文章分类
 * @param {*} id 文章id
 * @returns Promise对象
 */
export const daleteArtCateAPI = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params: {
      id
    }
  })
}

/**
 * 发表文章
 * @param {*} param0 { title, cate_id, content, cover_img, state }
 * @returns Promise对象
 */
export const addArtAPI = (addFrom) => {
  return request({
    url: '/my/article/add',
    method: 'POST',
    data: addFrom
  })
}
/**
 * 获取文章列表--query(params)
 * @param {*} param0 { pagenum, pagesize, cate_id, state }
 * @returns Promise对象
 */
export const getArtListAPI = ({ pagenum, pagesize, cate_id, state }) => {
  return request({
    url: '/my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}
