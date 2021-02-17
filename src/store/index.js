import Vue from 'vue'
import Vuex from 'vuex'
import flag from './modules/flag'
import point from "./modules/point";
import report from './modules/report'
import taskDaily from './modules/task-daily'
import user from './modules/user'

Vue.use(Vuex)

const store =  new Vuex.Store({
  modules: {
    flag,
    point,
    report,
    taskDaily,
    user
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
