// 注释
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 影响打包时的路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
})
