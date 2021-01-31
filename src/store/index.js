import Vue from 'vue'
import Vuex from 'vuex'
import flag from './modules/flag'
import taskDaily from './modules/task-daily'

Vue.use(Vuex)

const store =  new Vuex.Store({
  modules: {
    flag,
    taskDaily
  }
})

export default store

// import Vue from 'vue'
// import Vuex from 'vuex'
//
// Vue.use(Vuex)
//
// const store = new Vuex.Store({
//   state: {
//     count: 2,
//     dialogDisable: true
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })
//
// export default store
