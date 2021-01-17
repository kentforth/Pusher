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
            <input type="text" placeholder="Username" />
          </div>

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
              Sign up
            </Button>
          </div>

          <div class="sign-up">
            <p>Already have an account ?</p>
            <router-link to="/signin">Sign in</router-link>
          </div>
        </form>
      </Form>
    </div>
  </div>
</template>

<script>
import Form from "../components/Form";
import Button from "../components/Button";
export default {
  name: "SignUp",
  components: { Button, Form }
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
