<template>
  <div class="Login">
    <div class="container">
      <div class="logo">
        <img src="../assets/images/logo.svg" alt="logo" />
      </div>
      <h1>Sign in</h1>
      <Form>
        <form action="" class="form" @submit.prevent="submit">
          <div class="input">
            <font-awesome-icon icon="envelope" class="icon fa-user" />
            <span></span>
            <input
              type="email"
              placeholder="Email"
              v-model="form.email"
              v-model.trim="form.email"
              :class="$v.form.email.$error ? 'input-error' : ''"
            />
            <p
              class="error"
              :class="$v.form.email.$error ? 'showError' : 'hideError'"
            >
              Name is required
            </p>
          </div>

          <div class="input">
            <font-awesome-icon icon="lock" class="icon fa-user" />
            <span></span>
            <input
              type="password"
              placeholder="Password"
              autocomplete="on"
              v-model.trim="form.password"
              :class="$v.form.password.$error ? 'input-error' : ''"
            />
            <p
              class="error"
              :class="$v.form.password.$error ? 'showError' : 'hideError'"
            >
              Password is required
            </p>
          </div>

          <div class="error" v-if="error">
            {{ error }}
          </div>

          <div class="button">
            <Button type="submit">
              Sign in
            </Button>
          </div>

          <div class="error" v-if="error">
            {{ error.message }}
          </div>

          <div class="sign-up">
            <p>Don't have an account?</p>
            <router-link to="/signup">Signup now</router-link>
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
import Button from "../components/Button";
import Form from "../components/Form";

import { mapState, mapActions } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";

import PulseLoader from "vue-spinner/src/PulseLoader.vue";

import { required, email } from "vuelidate/lib/validators";

export default {
  name: "signin",
  components: { Form, Button, PulseLoader },
  data: () => ({
    error: "",
    spinnerColor: "#a6b0cf",
    spinnerWidth: "24px",
    form: {
      email: "",
      password: ""
    }
  }),
  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },
  computed: {
    ...mapState(["hasSpinner"])
  },
  methods: {
    ...mapActions(["SHOW_SPINNER", "HIDE_SPINNER"]),
    async submit() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        return;
      }
      this.error = "";
      this.SHOW_SPINNER();
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.form.email, this.form.password);
        this.HIDE_SPINNER();
        await this.$router.replace({ name: "home" });
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          this.HIDE_SPINNER();
          this.error = "Password is invalid";
        } else if (error.code === "auth/user-not-found") {
          this.HIDE_SPINNER();
          this.error = "User not found";
        } else if (error.code === "auth/too-many-requests") {
          this.HIDE_SPINNER();
          this.error = error.message;
        }
      }
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

    @include responsive(phone) {
      width: 40%;
    }
  }
}

.error {
  margin-top: 0.7em;
}

.spinner {
  left: 40%;
}

.btn {
  @include responsive(phone) {
    margin-top: 1em;
  }
}

.icon {
  margin-top: 5px;
}
</style>
