import Vue from "vue";
import VueRouter from "vue-router";

// 导入组件
import Login from '@/components/MyLogin.vue'
import Home from '@/components/MyHome.vue'
import Goods from '@/components/menus/MyGoods.vue'
import Orders from '@/components/menus/MyOrders.vue'
import Rights from '@/components/menus/MyRights.vue'
import Settings from '@/components/menus/MySettings.vue'
import Users from '@/components/menus/MyUsers.vue'
import Detail from '@/components/user/MyUserDetail.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  // 路由规则
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/home/users',
      children: [
        // { path: '', component: Users },
        { path: 'users', component: Users },
        { path: 'goods', component: Goods },
        { path: 'settings', component: Settings },
        { path: 'rights', component: Rights },
        { path: 'orders', component: Orders },
        { path: 'users/detail/:uid', component: Detail, props: true }
      ]
    }
  ]
}
);

// 路由守卫hhhhh
router.beforeEach(function (to, from, next) {
  const pathArr = ['/home']
  if (pathArr.indexOf(to.path) !== -1) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
});

export default router;
