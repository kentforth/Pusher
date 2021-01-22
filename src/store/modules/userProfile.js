import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const userProfile = {
  namespaced: true,
  state: {
    userImage: ""
  },
  mutations: {
    SET_USER_IMAGE: (state, image) => {
      state.userImage = image;
    }
  },

  actions: {
    GET_USER_IMAGE_FROM_FIREBASE({ commit }) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          let userId = firebase.auth().currentUser.uid;
          firebase
            .storage()
            .ref("users/" + userId + "/profile.jpg")
            .getDownloadURL()
            .then(url => {
              commit("SET_USER_IMAGE", url);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    }
  }
};

export default userProfile;
