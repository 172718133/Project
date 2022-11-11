import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入 vant 插件
import Vant from 'vant'
import 'vant/lib/index.less'

Vue.config.productionTip = false

// 将 Vant 安装为插件
Vue.use(Vant)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
