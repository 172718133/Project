import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式
import '@/assets/global.less'
// 引入 element-ui 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor /* { default global options } */)

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
