const path = require('path')
// function resolve(dir) {
//   return path.join(__dirname, dir)
// }

module.exports = {
  // 配置生产环境下的打包路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    resolve: {
      //配置路径别名
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  }
}
