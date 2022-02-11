import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'

// 引入getters
import getters from './getters'
// 引入actions
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: { book },
  getters,
  actions
})
