<template>
  <div class="modal">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MessageOptionsModal"
};
</script>

<style scoped lang="scss">
.modal {
  color: #a6b0cf;
  text-align: left;
  background-color: #313a43;
  background-clip: padding-box;
  border: 1px solid #3e4851;
  border-radius: 0.25rem;
  padding: rem(15px) 0;
  z-index: 999;
  position: absolute;
  top: 30%;
  box-shadow: 0 2px 4px rgba(15, 34, 58, 0.4);
}

.modal-item {
  min-width: rem(120px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: rem(5px) rem(20px);
}

.modal-item:hover {
  cursor: pointer;
  background-color: $dark-gray;
}

.fa-trash {
  font-size: rem(16px) !important;
}

.move-enter-active,
.move-leave-active {
  transition: all 0.3s ease;
}
.move-enter, .move-leave-to /* .fade-leave-active below version 2.1.8 */ {
  top: 40%;
}
</style>
