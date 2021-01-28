// import Vue from 'vue'
// import Vuex from 'vuex'
// import flag from './flag'
// import taskDaily from './task-daily'
//
// Vue.use(Vuex)
//
// export default new Vuex.Store({
//   modules: {
//     flag,
//     taskDaily
//   }
// })

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 2,
    dialogDisable: true
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

export default store
