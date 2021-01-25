<template>
  <div class="sign-up">
    <div class="container">
      <div class="logo">
        <img src="../assets/images/logo.svg" alt="logo" />
      </div>
      <h1>Sign up</h1>

      <Form>
        <form action="" class="form" @submit.prevent="submit">
          <div class="input">
            <font-awesome-icon icon="user" class="icon fa-user" />
            <span></span>
            <input
              type="text"
              placeholder="Username"
              v-model.trim="form.name"
              :class="$v.form.name.$error ? 'input-error' : ''"
            />
          </div>
          <p
            class="error"
            :class="$v.form.name.$error ? 'showError' : 'hideError'"
          >
            Name is required
          </p>

          <div class="input">
            <font-awesome-icon icon="envelope" class="icon fa-user" />
            <span></span>
            <input
              type="email"
              placeholder="Email"
              v-model.trim="form.email"
              :class="$v.form.email.$error ? 'input-error' : ''"
            />
            <p
              class="error"
              :class="$v.form.email.$error ? 'showError' : 'hideError'"
            >
              Email is required
            </p>
          </div>

          <div class="input">
            <font-awesome-icon icon="lock" class="icon fa-user" />
            <span></span>
            <input
              autocomplete="on"
              type="password"
              placeholder="Password"
              v-model.trim="form.password"
              :class="$v.form.password.$error ? 'input-error' : ''"
            />
          </div>
          <p
            class="error"
            :class="$v.form.password.$error ? 'showError' : 'hideError'"
          >
            Password is required
          </p>

          <div class="error" v-if="error">
            {{ error.message }}
          </div>

          <div class="button">
            <Button type="submit">
              Sign up
            </Button>
          </div>

          <div class="sign-up">
            <p>Already have an account ?</p>
            <router-link to="/signin">Sign in</router-link>
          </div>
        </form>
      </Form>

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
import Form from "../components/Form";
import Button from "../components/Button";

import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { required, email } from "vuelidate/lib/validators";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { mapState, mapActions } from "vuex";

export default {
  name: "SignUp",
  components: { Button, Form, PulseLoader },
  data: () => ({
    spinnerColor: "#a6b0cf",
    spinnerWidth: "24px",
    error: "",
    form: {
      name: "",
      email: "",
      password: ""
    }
  }),
  validations: {
    form: {
      name: { required },
      email: { required, email },
      password: { required }
    }
  },
  computed: {
    ...mapState(["hasSpinner"])
  },
  methods: {
    ...mapActions(["SHOW_SPINNER", "HIDE_SPINNER"]),
    submit() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        return;
      }
      this.error = "";
      this.SHOW_SPINNER();
      this.createUserInAuth();
    },
    createUserInAuth() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.createUserInfo();
          this.HIDE_SPINNER();
          this.$router.push("/");
          this.$toast.success("Congratulations! You have been registered", {
            duration: 2500,
            position: "bottom"
          });
        })
        .catch(error => {
          this.error = error;
          this.HIDE_SPINNER();
        });
    },
    createUserInfo() {
      let userId = firebase.auth().currentUser.uid;
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .set({
          name: this.form.name,
          email: this.form.email,
          location: "",
          status: "active",
          is_messaging: false
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
}

.logo {
  margin: 4em auto 2em auto;
  text-align: center;

  img {
    width: 15%;
  }
}
</style>
