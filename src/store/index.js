import Vue from 'vue'
import Vuex from 'vuex'
import flag from './flag'
import taskDaily from './task-daily'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    flag,
    taskDaily
  }
})
