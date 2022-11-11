import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入需要的组件
import Home from '@/views/Home/TTHome.vue'
import User from '@/views/User/TTUser.vue'

// 将 VueRouter 安装为 vue 的插件
Vue.use(VueRouter)

// 解决跳转重复路由导致的报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

// 路由规则的数组
const routes = [
  { path: '/', component: Home },
  { path: '/user', component: User }
]

// 创建路由实例对象
const router = new VueRouter({
  routes
})

export default router
