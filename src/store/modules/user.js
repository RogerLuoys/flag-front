
// initial state
// shape: [{ id, quantity }]
const state = () => ({
  isLoginVisible: true,
  userName: '未知啊啊啊啊啊'
})

// mutations
const mutations = {
  setLoginVisible (state, visible) {
    state.isLoginVisible = visible
  },
  setUserName (state, userName) {
    state.userName = userName
  }
}

export default {
  // namespaced: true,
  state,
  mutations
}
