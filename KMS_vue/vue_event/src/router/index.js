import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/login'
    // component: () => import('@/views/main/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
    // webpack 提供 import 函数来路由懒加载导入组件
    // 路由路径切换到/reg，才会去加载对应组件的代码，让首页打开更快
  },
  {
    path: '/reg',
    component: () => import('@/views/reg/index.vue')
  },
  {
    path: '/home',
    // redirect: '/login'
    component: () => import('@/views/main/index.vue')
  }

]

const router = new VueRouter({
  routes
})

const whiteList = ['/login', '/reg'] // 定义白名单
// 全局前置路由守卫
// 1.浏览器第一次打开项目页面，默认会进行路由跳转/ => /，所以会触发全局前置路由守卫
// 2.判断是否登录，有token就是已登录-正常放行，没有token就是未登录-强制跳转到登录页面
// 3.next()强制切换路由地址，也会导致路由跳转，会走路由守卫，就会进入死循环一直跳转到登录页
router.beforeEach((to, from, next) => {
  const token = store.state.token
  // 判断：有token的时候进行跳转且当前缓存中没有保存用户名才去获取
  if (token) {
    if (!store.state.userInfo.username) {
      // 本地没有用户信息才去获取用户信息，否则直接放行
      store.dispatch('getUserinfoActions')
    }
    next()
  } else {
    // 未登录。
    // 数组.includes(值)，作用：判断值是否在数组里面，若存在则范围true
    if (whiteList.includes(to.path)) {
      // 判断要前往的路由地址是否在白名单内，如果在的话就直接放行
      next()
    } else {
      // 若不在白名单内，则强制跳转
      next('/login')
    }
  }
})

export default router
