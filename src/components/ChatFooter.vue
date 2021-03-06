<template>
  <div class="footer" :class="{ hide: !currentRoom.id }">
    <transition name="fade">
      <div class="emoji-window" v-if="emojiStatus">
        <picker
          :data="emojiIndex"
          set="twitter"
          @select="selectEmoji"
          title="Pick Emoji"
        />
      </div>
    </transition>

    <form action="" class="form" @submit.prevent="sendMessage">
      <input
        type="text"
        class="input"
        placeholder="Enter Message..."
        v-model="message"
        @keyup="setUserMessagingStatus"
        ref="message"
      />
      <font-awesome-icon
        icon="laugh"
        class="icon fa-laugh"
        @click.prevent="showEmoji"
      />
      <button class="btn-send" type="submit">
        <font-awesome-icon icon="paper-plane" class="icon fa-plane" />
      </button>
    </form>
  </div>
</template>

<script>
import { bus } from "../main";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import data from "emoji-mart-vue-fast/data/all.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast";

import { mapState, mapActions } from "vuex";

let emojiIndex = new EmojiIndex(data);
export default {
  name: "ChatFooter",
  components: { Picker },
  data: () => ({
    timeout: null,
    message: "",
    emojiStatus: false,
    emojiIndex: emojiIndex
  }),

  computed: {
    ...mapState("rooms", ["currentRoom", "editableMessage", "isMessageEdit"]),
    ...mapState("userProfile", ["form"])
  },

  mounted() {
    document.addEventListener("click", this.hideEmoji);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideEmoji);
    clearTimeout(this.timeout);
  },
  created() {
    bus.$on("editMessage", data => {
      this.$refs.message.focus();
      this.message = data.message;
    });
  },
  methods: {
    ...mapActions("rooms", ["SET_MESSAGE_EDIT_FALSE"]),
    selectEmoji(e) {
      if (!e) {
        return false;
      }
      this.message = this.message + e.native;
      this.$refs.message.focus();
    },
    showEmoji(e) {
      e.stopPropagation();
      this.emojiStatus = true;
    },
    hideEmoji() {
      this.emojiStatus = false;
    },
    setUserMessagingStatus() {
      clearTimeout(this.timeout);
      let userId = firebase.auth().currentUser.uid;
      if (this.message !== "") {
        this.timeout = setTimeout(function() {
          firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .update({
              is_messaging: true
            });
        }, 300);
      } else {
        firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .update({
            is_messaging: false
          });
      }
    },
    async sendMessage() {
      /*save message of user in firebase*/
      if (this.message !== "" && this.currentRoom) {
        const userId = firebase.auth().currentUser.uid;
        let newMessage = this.message;
        let chatId;
        if (this.currentRoom.id < userId) {
          chatId = this.currentRoom.id + userId;
        } else {
          chatId = userId + this.currentRoom.id;
        }
        this.message = "";

        if (!this.isMessageEdit) {
          await firebase
            .firestore()
            .collection("chats")
            .doc(chatId)
            .collection("messages")
            .add({
              receiverId: this.currentRoom.id,
              senderId: userId,
              author: this.form.name,
              message: newMessage,
              createdAt: new Date()
            })
            .then(() => {
              this.message = "";
              chatId = userId + this.currentRoom.id;
              firebase
                .firestore()
                .collection("userLastMessages")
                .doc(chatId)
                .set({
                  receiverId: this.currentRoom.id,
                  senderId: userId,
                  author: this.form.name,
                  message: newMessage,
                  createdAt: new Date()
                });
            })
            .then(() => {
              this.SET_MESSAGE_EDIT_FALSE();
            })
            .catch(error => {
              this.$toast.error(error, {
                duration: 4000,
                position: "bottom"
              });
            });
        }
        if (this.isMessageEdit) {
          await firebase
            .firestore()
            .collection("chats")
            .doc(chatId)
            .collection("messages")
            .doc(this.editableMessage.id)
            .update({
              author: this.editableMessage.author,
              createdAt: new Date(),
              message: newMessage,
              receiverId: userId,
              senderId: this.currentRoom.id
            });
          this.SET_MESSAGE_EDIT_FALSE();
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.footer {
  border-top: 1px solid $dark-gray;
  width: 100%;
  height: 100%;
  margin-top: auto;
  padding: rem(25px);
  transition: all 0.6s ease;
}

.input {
  padding: rem(10px);
  height: 100%;
}

.form {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 50px 50px;
  grid-column-gap: rem(20px);
  justify-items: center;
  align-items: center;
}

.fa-laugh,
.fa-paperclip {
  color: $primary;
  cursor: pointer;
  transition: all 0.3s ease;
  transform-origin: center;
}

.fa-laugh:hover,
.fa-paperclip:hover {
  color: #5a51ce;
}

.fa-laugh:hover {
  transform: rotate(180deg);
}

.fa-plane {
  color: $white;
  transform-origin: center;
  transform: rotate(50deg);
  margin: 0 5px 5px 0;
}

.btn-send {
  height: 100%;
  cursor: pointer;
  background-color: $primary;
  outline: none;
  border-radius: 4px;
  width: 100%;
  border: 3px solid $primary;
  padding: 0;
  transition: all 0.5s linear;
}

.btn-send:active {
  border: 3px solid $white;
  background-color: $secondary;
}

.hide {
  opacity: 0;
  pointer-events: none;
  cursor: default;
  transform: translateY(10px);
}

.emoji-window {
  position: fixed;
  top: rem(400px);
  right: rem(200px);

  @include responsive(tab-port) {
    top: rem(480px);
    right: rem(130px);
  }
}

.row {
  display: flex;
}
.row > * {
  margin: auto;
}
</style>
