/*import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";*/

const rooms = {
  namespaced: true,
  state: {
    currentRoom: ""
  },
  mutations: {
    SET_CURRENT_ROOM: (state, userId) => {
      state.currentRoom = userId;
    }
  },

  actions: {
    SET_CURRENT_ROOM({ commit }, userId) {
      commit("SET_CURRENT_ROOM", userId);
      console.log(userId);
    }
  }
};

export default rooms;
