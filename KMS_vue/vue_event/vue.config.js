const { defineConfig } = require('@vue/cli-service')
// 需要排除的包对象
let externals = {}
// 需要配置的CDN链接
let CDN = { css: [], js: [] }
// 判断是否是生产环境
const isProduction = process.env.NODE_ENV === 'production'
// 如果是生产环境，需要执行以下逻辑
if (isProduction) {
  externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    dayjs: 'dayjs',
    'element-ui': 'ELEMENT',
    'vue-quill-editor': 'VueQuillEditor',
    'vuex-persistedstate': 'createPersistedState'
  }
  CDN = {
    css: [
      'https://unpkg.com/element-ui@2.15.10/lib/theme-chalk/index.css',
      'https://unpkg.com/quill@1.3.7/dist/quill.core.css',
      'https://unpkg.com/quill@1.3.7/dist/quill.snow.css',
      'https://unpkg.com/quill@1.3.7/dist/quill.bubble.css'
    ],
    js: [
      'https://unpkg.com/vue@2.6.14/dist/vue.js',
      'https://unpkg.com/vue-router@3.5.1/dist/vue-router.js',
      'https://unpkg.com/vuex@3.6.2/dist/vuex.js',
      'https://unpkg.com/axios@1.1.3/dist/axios.min.js',
      'https://unpkg.com/dayjs@1.11.6/dayjs.min.js',
      'https://unpkg.com/element-ui@2.15.10/lib/index.js',
      'https://unpkg.com/quill@1.3.7/dist/quill.js',
      'https://unpkg.com/vue-quill-editor@3.0.6/dist/vue-quill-editor.js',
      'https://unpkg.com/vuex-persistedstate@3.2.1/dist/vuex-persistedstate.umd.js'
    ]
  }
}
module.exports = defineConfig({
  transpileDependencies: true,
  // 影响打包时的路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // 排除以下文件夹，打包时不打包这些文件夹
  configureWebpack: {
    externals: externals
  },
  chainWebpack (config) {
    // 注入cdn变量（打包时执行）
    config.plugin('html').tap(args => {
      args[0].cdn = CDN // 配置 CDN 给插件
      return args
    })
  }
})
