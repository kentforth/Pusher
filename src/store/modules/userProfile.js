import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const userProfile = {
  namespaced: true,
  state: {
    userImage: "",
    userName: ""
  },
  mutations: {
    SET_USER_IMAGE: (state, image) => {
      state.userImage = image;
    },
    SET_USERNAME: (state, username) => {
      state.userName = username;
    }
  },

  actions: {
    GET_USER_IMAGE_FROM_FIREBASE({ commit }) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          const userId = firebase.auth().currentUser.uid;

          firebase
            .storage()
            .ref("users/" + userId + "/profile.jpg")
            .getDownloadURL()
            .then(url => {
              if (url) {
                commit("SET_USER_IMAGE", url);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    GET_USERNAME_FROM_FIREBASE({ commit }) {
      const userId = firebase.auth().currentUser.uid;
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get()
        .then(doc => {
          commit("SET_USERNAME", doc.data().name);
        });
    }
  },
  getter: {}
};

export default userProfile;
