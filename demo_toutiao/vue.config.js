// 这是 vue-cli 创建出来的项目的配置文件
// const { default: request } = require('@/utils/request')
const { defineConfig } = require('@vue/cli-service')
// 导入node.js的path模块
const path = require('path')
const themePath = path.join(__dirname, './src/theme.less')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'nav-bar-background-color': '#0077ff'
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${themePath}";`
          }
        }
      }
    }
  },
  // 可以双击打开项目
  publicPath: './'
})
