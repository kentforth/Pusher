import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hasSpinner: false
  },
  mutations: {
    SET_SPINNER_SHOW: state => (state.hasSpinner = true),
    SET_SPINNER_HIDE: state => (state.hasSpinner = false)
  },
  actions: {
    SHOW_SPINNER: ({ commit }) => commit("SET_SPINNER_SHOW"),
    HIDE_SPINNER: ({ commit }) => commit("SET_SPINNER_HIDE")
  },
  modules: {},
  getters: {}
});
