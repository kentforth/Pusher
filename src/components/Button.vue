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
}

.btn:hover {
  background-color: #be794f;
}
</style>
