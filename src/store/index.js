import Vue from "vue";
import Vuex from "vuex";

import userProfile from "./modules/userProfile";
import rooms from "./modules/rooms";
import video from "./modules/video";

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
  modules: {
    userProfile: userProfile,
    rooms: rooms,
    video: video
  },
  getters: {}
});
