import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { getField, updateField } from "vuex-map-fields";

const userProfile = {
  namespaced: true,
  state: {
    form: {
      name: "",
      email: "",
      location: ""
    },
    userImage: ""
  },
  mutations: {
    updateField,
    SET_USER_IMAGE: (state, image) => {
      state.userImage = image;
    },
    SET_USER_INFO: (state, data) => {
      state.form.name = data.name;
      state.form.email = data.email;
      state.form.location = data.location;
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
              if (error.code === "storage/object-not-found") {
                let imageUrl = "";
                commit("SET_USER_IMAGE", imageUrl);
                console.log("Image not found");
              }
            });
        }
      });
    },
    GET_USER_INFO_FROM_FIREBASE({ commit }) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          const userId = firebase.auth().currentUser.uid;
          firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .get()
            .then(doc => {
              commit("SET_USER_INFO", doc.data());
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    }
  },
  getters: {
    getField
  }
};

export default userProfile;
