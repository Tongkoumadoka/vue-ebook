import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入字体图标 字体和fonts文件夹平级
import './assets/styles/icon.css'

// 引入全局样式
import './assets/styles/global.scss'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
