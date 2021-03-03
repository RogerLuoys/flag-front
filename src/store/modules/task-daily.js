// initial state
const state = () => ({
  isTaskDailyVisible: false
})

// mutations
const mutations = {
  setTaskDailyVisible (state, visible) {
    state.isTaskDailyVisible = visible
  }
}

export default {
  state,
  mutations
}
