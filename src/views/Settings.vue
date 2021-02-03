<template>
  <div class="settings">
    <h1>Settings</h1>

    <div class="profile-image">
      <img :src="profileImage" alt="profile-image" />

      <h2>{{ form.name }}</h2>
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

    <div class="info">
      <div class="info__title">
        <h3>Personal Info</h3>
      </div>

      <form
        class="form"
        @submit.prevent="saveInfo"
        :class="[isEdit ? 'form-full-height' : '']"
      >
        <div class="input">
          <label for="name">Name</label>
          <p v-if="!isEdit">{{ form.name }}</p>
          <transition name="fade">
            <input
              type="text"
              id="name"
              v-if="isEdit"
              v-model.trim="name"
              :class="$v.name.$error ? 'input-error' : ''"
            />
          </transition>
          <p class="error" :class="$v.name.$error ? 'showError' : 'hideError'">
            Name is required
          </p>
        </div>

        <div class="input">
          <label for="email">Email</label>
          <p v-if="!isEdit">{{ form.email }}</p>
          <transition name="fade">
            <input
              type="text"
              id="email"
              v-if="isEdit"
              v-model.trim="email"
              :class="$v.email.$error ? 'input-error' : ''"
            />
          </transition>
          <p class="error" :class="$v.email.$error ? 'showError' : 'hideError'">
            Email is required
          </p>
        </div>

        <div class="input">
          <label for="email">Location</label>
          <p v-if="!isEdit">{{ location }}</p>
          <transition name="fade">
            <input
              type="text"
              id="location"
              v-if="isEdit"
              v-model.trim="location"
              :class="$v.location.$error ? 'input-error' : ''"
            />
          </transition>

          <p
            class="error"
            :class="$v.location.$error ? 'showError' : 'hideError'"
          >
            Location should not be empty
          </p>
        </div>

        <ButtonEdit
          @click.native="editProfile"
          ref="editButton"
          :class="{ 'edit-active': isEdit }"
        >
          <font-awesome-icon icon="pencil-alt" class="icon fa-pencil" />
          <span>Edit</span>
        </ButtonEdit>

        <transition name="fade">
          <Button class="btn-save" type="submit" v-if="isEdit">
            <clip-loader
              :loading="isLoading"
              :color="'#262E35'"
              :size="'27px'"
              class="spinner-clip"
            ></clip-loader>
            Save
          </Button>
        </transition>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";

import { required, email } from "vuelidate/lib/validators";

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

import ImageUploader from "vue-image-upload-resize";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import Button from "../components/Button";
import ButtonEdit from "../components/ButtonEdit";
export default {
  name: "Settings",
  components: { ButtonEdit, Button, ImageUploader, PulseLoader, ClipLoader },
  data: () => ({
    formHeight: "300px",
    isEdit: false,
    isLoading: false,
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
    ...mapFields("userProfile", {
      name: "form.name",
      email: "form.email",
      location: "form.location"
    }),
    profileImage() {
      if (this.userImage) {
        return this.userImage;
      }
      return this.image;
    },
    ...mapState("userProfile", ["userImage", "form"]),
    ...mapState(["hasSpinner"])
  },
  validations: {
    name: { required },
    email: { required, email },
    location: { required }
  },
  methods: {
    ...mapActions(["SHOW_SPINNER", "HIDE_SPINNER"]),
    ...mapActions("userProfile", ["GET_USER_INFO_FROM_FIREBASE"]),

    /*upload image to firebase*/
    setImage(file) {
      this.SHOW_SPINNER();
      let userId = firebase.auth().currentUser.uid;
      firebase
        .storage()
        .ref("users/" + userId + "/profile.jpg")
        .putString(file, "data_url")
        .then(() => {
          this.getImageFromFirebaseStorage();
        })
        .catch(error => {
          this.$toast.error(error, {
            duration: 4000,
            position: "bottom"
          });
        });
    },

    getImageFromFirebaseStorage() {
      let userId = firebase.auth().currentUser.uid;

      /*get image*/
      firebase
        .storage()
        .ref("users/" + userId + "/profile.jpg")
        .getDownloadURL()
        .then(url => {
          /*update image url in user profile in firebase*/
          firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .update({
              image: url
            })
            .then(() => {
              this.GET_USER_INFO_FROM_FIREBASE();
              this.HIDE_SPINNER();
            })
            .catch(error => {
              this.$toast.error(error, {
                duration: 4000,
                position: "bottom"
              });
            });
        })
        .catch(error => {
          this.$toast.error(error, {
            duration: 4000,
            position: "bottom"
          });
        });
    },

    editProfile() {
      this.isEdit = !this.isEdit;
      if (this.isEdit) {
        this.formHeight = "800px";
      } else {
        this.formHeight = "300px";
      }

      this.GET_USER_INFO_FROM_FIREBASE();
    },

    /*UPDATE USER INFO IN FIREBASE*/
    saveInfo() {
      this.$v.name.$touch();
      this.$v.email.$touch();
      this.$v.location.$touch();
      if (
        this.$v.name.$error ||
        this.$v.email.$error ||
        this.$v.location.$error
      ) {
        return;
      }
      this.isLoading = true;
      let userId = firebase.auth().currentUser.uid;
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .update({
          name: this.name,
          email: this.email,
          location: this.location
        })
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(this.email)
            .then(() => {
              this.isLoading = false;
              this.isEdit = false;
            });
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
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
  border-bottom: 1px solid #36404a;

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

.info {
  margin-top: 2em;
  width: 100%;
  background-color: $dark-gray;
  border: 1px solid $dark-gray;
  border-radius: 4px;

  &__title {
    background-color: $dark-gray;
    padding: rem(15px);
  }
}

.form {
  background-color: $dark;
  padding: 1em;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: grid;
  grid-template-columns: 1fr rem(90px);
  grid-column-gap: rem(30px);
  overflow: hidden;
  transition: all 0.5s ease-out;
  height: 300px;
}

.form-full-height {
  height: 500px;
}

.input {
  margin-top: 0.6em;
  label {
    color: $link;
  }

  p {
    color: $white;
    font-size: $font-size * 1.2;
  }

  input {
    padding: rem(10px);
    background-color: transparent;
    border: 3px solid $dark-gray;
    margin-top: rem(10px);
    transition: all 0.2s ease;
  }

  input:focus {
    border: 3px solid $accent;
  }
}

.input:nth-child(3) {
  grid-column: 1;
}

.btn-save {
  grid-column: 1;
  padding: 0.2em 0;
  margin-top: 0;
  display: flex;
  justify-content: center;
}

.spinner-clip {
  margin-right: 20px;
}

.btn-edit {
  grid-row: 1;
  grid-column: 2;
}

.input-error {
  border: 3px solid $error !important;
}

.error {
  margin-bottom: 1em;
}

/*ANIMATION*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
  transition-delay: 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>
