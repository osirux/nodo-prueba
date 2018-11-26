import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * @description Se fefine el state del store.
 */
export default new Vuex.Store({
  state: {
    detail: false
  },

  mutations: {
    setDetail(state, detail) {
      state.detail = detail
  }
},
  actions: {
    detail: ({ commit }, value) => {
      commit('setDetail', value);
    },
  }
})
