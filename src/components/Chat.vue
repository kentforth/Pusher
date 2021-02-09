<template>
  <div class="chat">
    <ChatHeader />
    <div class="messages" ref="messages">
      <h1 v-if="!currentRoom.id">No chat selected</h1>
      <div class="messages-list" v-if="!isMessagesLoading">
        <div
          class="message"
          v-for="message in roomMessages"
          :key="message.messageId"
        >
          <RoomMessage v-if="message.receiverId !== currentRoom.id">
            <div class="room-message__image">
              <img
                :src="currentRoom.image"
                alt="room image"
                v-if="currentRoom.image"
              />
            </div>
            <div class="room-message__text">
              <div class="text">
                <p>{{ message.message }}</p>
                <div class="text__time">
                  <font-awesome-icon icon="clock" class="icon fa-clock" />
                  <span>{{ message.createdAt | date }}</span>
                </div>
              </div>
              <div class="rectangle"></div>
              <p>{{ message.name }}</p>
            </div>
          </RoomMessage>

          <CurrentUserMessage v-if="message.receiverId === currentRoom.id">
            <div class="options">
              <font-awesome-icon
                icon="ellipsis-v"
                class="icon fa-ellipsis"
                @click.stop="openOptions(message.id)"
              />

              <MessageOptionsModal
                :class="[
                  isOptions && activeMessage === message.id
                    ? 'modal-active'
                    : '',
                  message.receiverId === currentRoom.id
                    ? 'modal-active-current-user'
                    : ''
                ]"
              >
                <div class="modal-item" @click="editMessage(message)">
                  <p>Edit</p>
                  <font-awesome-icon icon="pen" class="icon fa-trash" />
                </div>

                <div class="modal-item" @click="deleteMessage(message)">
                  <p>Delete</p>
                  <font-awesome-icon icon="trash-alt" class="icon fa-trash" />
                </div>
              </MessageOptionsModal>
            </div>

            <div class="room-message__text">
              <div class="text">
                <p>{{ message.message }}</p>
                <div class="text__time">
                  <font-awesome-icon icon="clock" class="icon fa-clock" />
                  <span>{{ message.createdAt | date }}</span>
                </div>
              </div>
              <div class="rectangle"></div>
              <p>{{ message.name }}</p>
            </div>
          </CurrentUserMessage>
        </div>
      </div>
    </div>

    <ChatFooter />
  </div>
</template>

<script>
import { bus } from "../main";

import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";

import { mapState, mapActions } from "vuex";
import RoomMessage from "./RoomMessage";
import MessageOptionsModal from "./MessageOptionsModal";
import CurrentUserMessage from "./CurrentUserMessage";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  name: "Chat",
  components: {
    CurrentUserMessage,
    MessageOptionsModal,
    RoomMessage,
    ChatHeader,
    ChatFooter
  },
  data: () => ({
    isOptions: false,
    activeMessage: undefined
  }),

  mounted() {
    const roomId = localStorage.getItem("roomId");
    if (roomId !== null) {
      this.CLEAR_MESSAGES();
      this.GET_CURRENT_ROOM(roomId);
      this.GET_ROOM_MESSAGES(roomId);
      this.scrollToBottom();
    } else {
      this.CLEAR_CURRENT_ROOM();
    }
  },
  updated() {
    this.scrollToBottom();
  },
  created() {
    document.addEventListener("click", this.hideOptions);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideOptions);
  },
  computed: {
    ...mapState("rooms", [
      "currentRoom",
      "roomMessages",
      "currentRoom",
      "isMessagesLoading"
    ])
  },
  methods: {
    ...mapActions("rooms", [
      "GET_CURRENT_ROOM",
      "CLEAR_CURRENT_ROOM",
      "CLEAR_MESSAGES",
      "GET_ROOM_MESSAGES",
      "SET_MESSAGE_EDIT_TRUE",
      "SET_EDITABLE_MESSAGE"
    ]),
    scrollToBottom() {
      let container = this.$refs.messages;
      container.scrollTop = container.scrollHeight;
    },
    editMessage(message) {
      this.SET_MESSAGE_EDIT_TRUE();
      this.SET_EDITABLE_MESSAGE(message);
      bus.$emit("editMessage", message);
    },
    getChatId() {
      let userId = firebase.auth().currentUser.uid;
      let chatId = "";

      if (this.currentRoom.id < userId) {
        chatId = this.currentRoom.id + userId;
      } else {
        chatId = userId + this.currentRoom.id;
      }
      return chatId;
    },
    async deleteMessage(message) {
      const chatId = this.getChatId();

      await firebase
        .firestore()
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .doc(message.id)
        .delete()
        .catch(error => {
          this.$toast.error(error, {
            duration: 4000,
            position: "bottom"
          });
        });
    },
    openOptions(messageId) {
      this.isOptions = true;
      this.activeMessage = messageId;
    },
    hideOptions() {
      this.isOptions = false;
    }
  }
};
</script>

<style scoped lang="scss">
.chat {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
}

.messages {
  width: 100%;
  padding: rem(30px);
  overflow-y: scroll;
}

h1 {
  font-size: $font-size * 3;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
