// initial state
// shape: [{ id, quantity }]
const state = () => ({
  isTaskVisible: false,
  flagDetail: {}
})

// // actions
// const actions = {
//   queryFlagDetail ({ commit }) {
//     queryFlagDetailAPI(
//       this.$route.params.id
//     ).then(response => {
//       commit('setFlagDetail', response.data.data)
//       this.pageData = response.data.data
//     })
//   }
// }

// mutations
const mutations = {
  setTaskVisible (state, visible) {
    state.isTaskVisible = visible
  },
  setFlagDetail (state, {flagDetail}) {
    state.flagDetail = flagDetail
  }
}

export default {
  // namespaced: true,
  state,
  mutations
}
