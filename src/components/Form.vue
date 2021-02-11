<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Form"
};
</script>

<style scoped lang="scss">
.form {
  width: 40%;
  margin: 0 auto;

  @include responsive(tab-port) {
    width: 80%;
  }
}

.input {
  margin-top: 2em;
  position: relative;

  input {
    font-size: $font-size * 2;
    padding-left: 2.4em;
  }

  span {
    width: 2px;
    height: 45px;
    left: rem(60px);
    top: rem(12px);
    background-color: $dark-gray;
    position: absolute;
  }
}

.fa-user {
  position: absolute;
  top: rem(15px);
  left: rem(15px);
  font-size: 2rem;
}

.sign-up {
  margin-top: 2em;
  width: 100%;
  text-align: center;

  p {
    display: inline-block;
    font-size: $font-size * 1.3;
  }

  a {
    font-size: $font-size * 1.3;
    font-weight: 800;
    color: $primary;
    margin-left: 10px;
  }
}
</style>
