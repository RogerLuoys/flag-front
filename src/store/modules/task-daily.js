// initial state
const state = () => ({
  isTaskDailyVisible: false
})

// actions
const actions = {
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit('setProducts', products)
    })
  }
}

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
