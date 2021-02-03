import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const rooms = {
  namespaced: true,
  state: {
    roomMessages: [],
    isMessagesLoading: true,
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
    },
    SET_ROOM_MESSAGES: (state, messages) => {
      state.isMessagesLoading = true;
      state.roomMessages = messages;
      state.isMessagesLoading = false;
    },
    CLEAR_MESSAGES: state => {
      state.roomMessages = [];
    }
  },

  actions: {
    CLEAR_MESSAGES({ commit }) {
      commit("CLEAR_MESSAGES");
    },
    CLEAR_CURRENT_ROOM({ commit }) {
      commit("CLEAR_CURRENT_ROOM");
    },
    GET_CURRENT_ROOM({ commit }, userId) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          let currentRoom = {
            id: userId
          };
          commit("SET_CURRENT_ROOM", currentRoom);
          firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .get()
            .then(doc => {
              currentRoom = {
                id: userId,
                ...doc.data()
              };
              commit("SET_CURRENT_ROOM", currentRoom);
            })
            .catch(() => {
              const room = "";
              commit("SET_CURRENT_ROOM", room);
            });
        }
      });
    },
    async GET_ROOM_MESSAGES({ commit, state }, roomId) {
      let message = {};
      let messages = [];
      let userId = firebase.auth().currentUser.uid;
      let chatId;
      if (roomId < userId) {
        chatId = roomId + userId;
      } else {
        chatId = userId + roomId;
      }
      await firebase
        .firestore()
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("createdAt")
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            let doc = change.doc;
            if (change.type === "added") {
              if (roomId === state.currentRoom.id) {
                message = {
                  id: doc.id,
                  ...doc.data()
                };
                messages.push(message);
                commit("SET_ROOM_MESSAGES", messages);
              }
            }

            if (change.type === "removed") {
              commit("REMOVE_USER", doc.data());
            }
            if (change.type === "modified") {
              commit("UPDATE_USER", doc.data());
            }
          });
        });
    }
  }
};

export default rooms;
