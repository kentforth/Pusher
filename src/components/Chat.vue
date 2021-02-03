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
            <div class="options">
              <font-awesome-icon
                icon="ellipsis-v"
                class="icon fa-ellipsis"
                @click.stop="openOptions(message.id)"
              />

              <MessageOptionsModal
                :class="{
                  'modal-active': isOptions && activeMessage === message.id
                }"
              >
                <div class="modal-item" @click="deleteMessage">
                  <p>Delete</p>
                  <font-awesome-icon icon="trash-alt" class="icon fa-trash" />
                </div>
              </MessageOptionsModal>
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
                <div class="modal-item" @click="deleteMessage">
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
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";

import { mapState, mapActions } from "vuex";
import RoomMessage from "./RoomMessage";
import MessageOptionsModal from "./MessageOptionsModal";
import CurrentUserMessage from "./CurrentUserMessage";

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
    if (roomId) {
      this.CLEAR_MESSAGES();
      this.GET_CURRENT_ROOM(this.currentRoom.id);
      this.GET_ROOM_MESSAGES(this.currentRoom.id);
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
      "currentUserMessages",
      "currentRoom",
      "isMessagesLoading"
    ])
  },
  methods: {
    ...mapActions("rooms", [
      "GET_CURRENT_ROOM",
      "CLEAR_CURRENT_ROOM",
      "CLEAR_MESSAGES",
      "GET_ROOM_MESSAGES"
    ]),
    scrollToBottom() {
      let container = this.$refs.messages;
      container.scrollTop = container.scrollHeight;
    },
    deleteMessage() {
      console.log("delete");
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
