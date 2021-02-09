<template>
  <div class="video">
    <div class="modal container" v-if="!isUsersConnected">
      <!--IMAGE-->
      <div class="image">
        <img :src="this.currentRoom.image" alt="" />
      </div>

      <!--USERNAME-->
      <h1>{{ currentRoom.name }}</h1>

      <!--SPINNER-->
      <sync-loader
        :loading="isCalling"
        class="spinner"
        :color="spinner.color"
        :size="spinner.size"
      ></sync-loader>

      <!--BUTTONS-->
      <div class="buttons">
        <button class=" btn btn-cancel" @click="closeVideoWindow">
          <font-awesome-icon icon="times" class="icon" />
        </button>
        <button class=" btn btn-call" :disabled="isCalling">
          <font-awesome-icon icon="video" class="icon" @click="callToUser" />
        </button>
      </div>
    </div>

    <div class="screens" v-if="isUsersConnected">
      <div class="room-screen"></div>
      <div class="current-user-screen"></div>
      <div class="buttons">
        <button class="btn btn-share" @click="showUserCam">
          <font-awesome-icon
            icon="desktop"
            class="icon fa-desktop"
            v-if="!isDesktopShared"
          />
          <img
            src="../assets/images/icons/webcam.svg"
            alt="webcam"
            v-else
            class="fa-webcam"
          />
        </button>
        <button class="btn btn-stop" @click="closeVideoWindow">
          <font-awesome-icon icon="phone-slash" class="icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { SyncLoader } from "vue-spinner/dist/vue-spinner.min.js";
export default {
  name: "VideoCall",
  components: { SyncLoader },
  data() {
    return {
      isCalling: false,
      isUsersConnected: false,
      isDesktopShared: false,
      spinner: {
        color: "#7269EF",
        size: "20px"
      }
    };
  },
  computed: {
    ...mapState("rooms", ["currentRoom"])
  },
  methods: {
    ...mapActions("video", ["CLOSE_VIDEO_WINDOW"]),
    closeVideoWindow() {
      this.isUsersConnected = false;
      this.CLOSE_VIDEO_WINDOW();
      this.isCalling = false;
    },
    callToUser() {
      if (!this.isCalling) {
        this.isCalling = true;
        setTimeout(() => {
          this.isUsersConnected = true;
        }, 3000);
      }
    },
    showUserCam() {
      this.isDesktopShared = !this.isDesktopShared;
    }
  }
};
</script>

<style scoped lang="scss">
.video {
  z-index: 888;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.modal {
  width: 30%;
  height: 40%;
  padding: 2em 0;
  position: relative;
  top: 30%;
  left: 5%;
  border: 1px solid $gray;
  border-radius: 10px;
  background-color: $deep-blue;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  overflow: hidden;
}

.image {
  background-color: $deep-blue;
  width: rem(100px);
  height: rem(100px);
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);

  img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    object-position: center;
    border: 4px solid $secondary;
  }
}

h1 {
  align-self: start;
}

.buttons {
  width: 23%;
  display: flex;
  justify-content: space-between;
}

.btn {
  width: rem(50px);
  height: rem(50px);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  outline: none;
}

.btn-cancel {
  background-color: $error;
  font-size: 2rem;
  font-weight: 500;
  color: $white;
}

.btn-call {
  transition: background-color 0.3s ease;
  background-color: $green;
}

.btn-call:disabled {
  background-color: gray;
  cursor: auto;
}

.icon {
  color: $white;
  font-size: 1.4rem;
}

.spinner {
  position: absolute;
  top: 40%;
  left: 70%;
}

.screens {
  z-index: 999;
  padding: 2em 0;
  margin: 0 auto;
  width: 35%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2em;
  align-items: center;
  justify-items: center;
  position: absolute;
  top: 0;
  left: 35%;
}

.room-screen,
.current-user-screen {
  width: 100%;
  height: rem(350px);
  border-radius: 4px;
  background-color: $dark-gray;
}

.room-screen {
  border: 3px solid $green;
}

.current-user-screen {
  border: 3px solid $white;
}

.btn-stop {
  background-color: $error;
}

.fa-desktop {
  color: $dark-gray;
}

.fa-webcam {
  width: rem(30px);
}
</style>
