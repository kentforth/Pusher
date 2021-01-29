import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const rooms = {
  namespaced: true,
  state: {
    currentRoom: {
      id: "",
      name: "",
      status: "",
      image: ""
    }
  },
  mutations: {
    SET_CURRENT_ROOM: (state, user) => {
      state.currentRoom = {
        id: user.id,
        name: user.name,
        status: user.status,
        image: user.image
      };
    },
    CLEAR_CURRENT_ROOM: state => {
      state.currentRoom = {};
    }
  },

  actions: {
    CLEAR_CURRENT_ROOM({ commit }) {
      commit("CLEAR_CURRENT_ROOM");
    },
    GET_CURRENT_ROOM({ commit }, userId) {
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get()
        .then(doc => {
          commit("SET_CURRENT_ROOM", doc.data());
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

export default rooms;
