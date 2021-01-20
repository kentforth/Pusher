<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button"
};
</script>

<style scoped lang="scss">
.btn {
  position: relative;
  background-color: $accent;
  font-family: "Public Sans", sans-serif;
  font-size: $font-size * 2;
  width: 100%;
  font-weight: 800;
  padding: 0.5em 0;
  border-radius: 4px;
  border: none;
  margin-top: 2em;
  cursor: pointer;
  color: $dark-gray;
  transition: all 0.2s ease;
  outline: none;
  box-shadow: 0px 3px 21px -1px rgba(0, 0, 0, 0.41);
}

.btn:hover {
  background-color: #be794f;
}

.btn:active {
  box-shadow: none;
  background-color: #b2895f;
}
</style>
