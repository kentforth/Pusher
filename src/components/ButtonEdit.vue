<template>
  <button class="btn-edit" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ButtonEdit",
  components: {}
};
</script>

<style scoped lang="scss">
.btn-edit {
  color: transparent;
  background-color: $dark-gray;
  outline: none !important;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: rem(40px);
  padding: 0 0.3em;

  span {
    font-size: rem(17px);
    color: $white;
    font-weight: 600;
    margin-left: rem(10px);
  }
}

.btn-edit:hover {
  background-color: $secondary;
  transition: 0.2s linear;
}

.fa-pencil {
  color: $white !important;
  font-size: rem(17px) !important;
}

.edit-active {
  border: 3px solid $dark-gray;
  background-color: $dark;
}
</style>
