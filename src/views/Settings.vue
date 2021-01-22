<template>
  <div class="settings">
    <h1>Settings</h1>

    <div class="profile-image">
      <img :src="profileImage" alt="profile-image" />

      <h2>Patricia Smith</h2>
      <div class="file-choser">
        <image-uploader
          :maxWidth="600"
          :maxHeight="600"
          accept=".jpg, .jpeg"
          outputFormat="string"
          :quality="0.6"
          :scaleRatio="1"
          :preview="false"
          @input="setImage"
          id="file"
          class="image-input"
        ></image-uploader>
        <label for="file" class="choose">
          <font-awesome-icon icon="pen" class="icon fa-pen" />
        </label>
      </div>

      <pulse-loader
        :loading="hasSpinner"
        :color="spinnerColor"
        :size="spinnerWidth"
        class="spinner"
      ></pulse-loader>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import ImageUploader from "vue-image-upload-resize";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "Settings",
  components: { ImageUploader, PulseLoader },
  data: () => ({
    image: require("../assets/images/profile-default.png"),
    spinnerColor: "#a6b0cf",
    spinnerWidth: "18px",
    file: "",
    scale: 100,
    quality: 100,
    originalSize: true,
    original: {}
  }),
  computed: {
    profileImage() {
      if (!this.userImage) {
        return this.image;
      }
      return this.userImage;
    },
    ...mapState("userProfile", ["userImage"]),
    ...mapState(["hasSpinner"])
  },
  methods: {
    ...mapActions("userProfile", ["GET_USER_IMAGE_FROM_FIREBASE"]),
    ...mapActions(["SHOW_SPINNER", "SHOW_SPINNER", "HIDE_SPINNER"]),
    /*upload image to firebase*/
    setImage(file) {
      this.SHOW_SPINNER();
      let userId = firebase.auth().currentUser.uid;
      firebase
        .storage()
        .ref("users/" + userId + "/profile.jpg")
        .putString(file, "data_url")
        .then(() => {
          this.GET_USER_IMAGE_FROM_FIREBASE();
          this.HIDE_SPINNER();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.profile-image {
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  img {
    object-fit: cover;
    border-radius: 50%;
    height: 120px;
    object-position: center;
    width: 120px;
  }
}

.image-input {
  display: none;
}

.file-choser {
  position: absolute;
  top: 40%;
  left: 55%;
  label {
    border-radius: 50%;
    color: white;
    display: flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: $dark;
    box-shadow: 4px 2px 11px -1px rgba(0, 0, 0, 0.74);
  }
}

.fa-pen {
  color: $white;
  font-size: rem(14px);
}

.spinner {
  top: 30%;
  left: 75%;
}
</style>
