
// initial state
// shape: [{ id, quantity }]
const state = () => ({
  isLogin: false,
  userName: '未知啊啊啊啊啊'
})

// mutations
const mutations = {
  setIsLogin (state, visible) {
    state.isLogin = visible
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
