import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const rooms = {
  namespaced: true,
  state: {
    selectedRoom: "default",
    editableMessage: {},
    isMessageEdit: false,
    roomMessages: [],
    isMessagesLoading: true,
    usersLastMessages: [],
    currentRoom: {
      id: "",
      name: "",
      status: "",
      image: ""
    }
  },
  mutations: {
    SET_ROOM_CHOSEN_TRUE: state => {
      state.selectedRoom = "selected";
    },
    SET_ROOM_CHOSEN_FALSE: state => {
      state.selectedRoom = "none";
    },
    SET_CURRENT_ROOM: (state, user) => {
      state.currentRoom = {
        id: user.id,
        name: user.name,
        status: user.status,
        image: user.image
      };
    },
    CLEAR_CURRENT_ROOM: state => {
      state.currentRoom.id = "";
    },
    SET_USERS_LAST_MESSAGES: (state, messages) => {
      state.usersLastMessages = messages;
    },
    SET_ROOM_MESSAGES: (state, messages) => {
      state.isMessagesLoading = true;
      state.roomMessages = messages;
      state.isMessagesLoading = false;
    },
    CLEAR_MESSAGES: state => {
      state.roomMessages = [];
    },
    DELETE_MESSAGE: (state, message) => {
      let index = state.roomMessages.findIndex(function(m) {
        return m.id === message.id;
      });
      if (index !== -1) state.roomMessages.splice(index, 1);
    },
    UPDATE_MESSAGE: (state, message) => {
      console.log(message.id);
      const messageIndex = state.roomMessages.findIndex(
        obj => obj.id === message.id
      );
      state.roomMessages[messageIndex].createdAt = message.createdAt;
      state.roomMessages[messageIndex].message = message.message;
    },
    SET_MESSAGE_EDIT_TRUE: state => {
      state.isMessageEdit = true;
    },
    SET_MESSAGE_EDIT_FALSE: state => {
      state.isMessageEdit = false;
    },
    SET_EDITABLE_MESSAGE: (state, message) => {
      state.editableMessage = message;
    }
  },

  actions: {
    SET_ROOM_CHOSEN_TRUE({ commit }) {
      commit("SET_ROOM_CHOSEN_TRUE");
    },
    SET_ROOM_CHOSEN_FALSE({ commit }) {
      commit("SET_ROOM_CHOSEN_FALSE");
    },
    SET_MESSAGE_EDIT_TRUE({ commit }) {
      commit("SET_MESSAGE_EDIT_TRUE");
    },
    SET_MESSAGE_EDIT_FALSE({ commit }) {
      commit("SET_MESSAGE_EDIT_FALSE");
    },
    SET_EDITABLE_MESSAGE({ commit }, message) {
      commit("SET_EDITABLE_MESSAGE", message);
    },
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
    async GET_USERS_LAST_MESSAGES({ commit }) {
      let userId = firebase.auth().currentUser.uid;

      let message = {};

      await firebase
        .firestore()
        .collection("userLastMessages")
        .where("receiverId", "==", userId)
        .onSnapshot(snapshot => {
          let messages = [];
          snapshot.forEach(doc => {
            let document = doc.data();

            message = {
              id: doc.id,
              ...document
            };
            messages.push(message);
          });

          commit("SET_USERS_LAST_MESSAGES", messages);
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

            if (change.type === "modified") {
              message = {
                id: doc.id,
                ...doc.data()
              };
              commit("UPDATE_MESSAGE", message);
            }

            if (change.type === "removed") {
              message = {
                id: doc.id,
                ...doc.data()
              };
              commit("DELETE_MESSAGE", message);
            }
          });
        });
    }
  }
};

export default rooms;
