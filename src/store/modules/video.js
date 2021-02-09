const video = {
  namespaced: true,
  state: {
    hasVideoCall: false
  },
  mutations: {
    SET_VIDEO_MODAL_TRUE: state => {
      state.hasVideoCall = true;
    },
    SET_VIDEO_MODAL_FALSE: state => {
      state.hasVideoCall = false;
    }
  },
  actions: {
    SHOW_VIDEO_WINDOW({ commit }) {
      commit("SET_VIDEO_MODAL_TRUE");
    },
    CLOSE_VIDEO_WINDOW({ commit }) {
      commit("SET_VIDEO_MODAL_FALSE");
    }
  }
};

export default video;
