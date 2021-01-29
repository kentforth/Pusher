<template>
  <div class="chat">
    <ChatHeader />
    <div class="messages">
      <RoomMessage>
        <div class="room-message__image">
          <img src="../assets/images/test/image4.jpg" alt="room image" />
        </div>
        <div class="room-message__text">
          <div class="text">
            <p>Any message</p>
            <div class="text__time">
              <font-awesome-icon icon="clock" class="icon fa-clock" />
              <span>10:00</span>
            </div>
          </div>
          <div class="rectangle"></div>
          <p>Doris Brown</p>
        </div>
        <div class="options">
          <font-awesome-icon
            icon="ellipsis-v"
            class="icon fa-ellipsis"
            @click="openOptions"
          />
          <transition name="move">
            <MessageOptionsModal v-if="isOptions">
              <div class="modal-item">
                <p>Delete</p>
                <font-awesome-icon icon="trash-alt" class="icon fa-trash" />
              </div>
            </MessageOptionsModal>
          </transition>
        </div>
      </RoomMessage>
    </div>
    <ChatFooter />
    <h1 v-if="!currentRoom.id">No chat selected</h1>
  </div>
</template>

<script>
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";

import { mapState } from "vuex";
import RoomMessage from "./RoomMessage";
import MessageOptionsModal from "./MessageOptionsModal";

export default {
  name: "Chat",
  components: { MessageOptionsModal, RoomMessage, ChatHeader, ChatFooter },
  data: () => ({
    isOptions: false,
    messages: [{ id: 1, message: "", image: "", dateTime: "" }]
  }),
  computed: {
    ...mapState("rooms", ["currentRoom"])
  },
  methods: {
    openOptions() {
      this.isOptions = !this.isOptions;
    }
  }
};
</script>

<style scoped lang="scss">
.chat {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr rem(100px);
  overflow: hidden;
}

.messages {
  width: 100%;
  height: 100%;
  padding: rem(30px);
  overflow-y: scroll;
}

h1 {
  font-size: $font-size * 3;
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
