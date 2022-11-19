import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api/index.js'

// 组件之间的传值有父子通讯，兄弟组件通讯......但是传参对于多层嵌套就显得非常繁琐，代码维护也会非常麻烦。
// 因此vuex就是把组件共享状态抽取出来以一个全局单例模式管理，把共享的数据函数放进vuex中，任何组件都可以进行使用

Vue.use(Vuex)

export default new Vuex.Store({
  // 相当于data，存放数据
  state: {
    token: '',
    userInfo: {}
  },
  getters: {
    // nickname: (state) => {
    //   return state.userInfo.nickname
    // },
    // 简写方式
    nickname: state => state.userInfo.nickname,
    username: state => state.userInfo.username,
    user_pic: state => state.userInfo.user_pic
  },
  // 定义方法，操作state方法
  mutations: {
    updateToken (state, value) {
      state.token = value
    },
    // 将数据存到缓存中，赋值到state中的userInfo
    updateUserinfo (state, val) {
      state.userInfo = val
    }
  },
  // 操作异步操作mutation
  actions: {
    // 请求用户信息的函数
    async getUserinfoActions (store) {
      // 调用api接口方法请求数据
      const { data: res } = await getUserInfoAPI()
      // 调用mutation中的方法，传入用户信息数据
      store.commit('updateUserinfo', res.data)
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState() // 注入持久化插件
  ]
})
