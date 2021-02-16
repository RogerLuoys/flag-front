
// initial state
// shape: [{ id, quantity }]
const state = () => ({
  selectedFlagId: '0'
})

// mutations
const mutations = {
  setSelectedFlagId (state, flagId) {
    state.selectedFlagId = flagId
  }
}

export default {
  // namespaced: true,
  state,
  mutations
}
