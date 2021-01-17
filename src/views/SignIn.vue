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
            <input type="email" placeholder="Email" />
          </div>

          <div class="input">
            <font-awesome-icon icon="lock" class="icon fa-user" />
            <span></span>
            <input type="password" placeholder="Password" />
          </div>

          <div class="button">
            <Button type="submit">
              Sign in
            </Button>
          </div>

          <div class="sign-up">
            <p>Don't have an account?</p>
            <router-link to="/signup">Signup now</router-link>
          </div>
        </form>
      </Form>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button";
import Form from "../components/Form";
export default {
  name: "SignIn",
  components: { Form, Button },
  data: () => ({}),
  methods: {
    submit() {
      console.log("submit");
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
