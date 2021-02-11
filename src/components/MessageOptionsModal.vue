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
  z-index: 0;
  position: absolute;
  top: rem(45px);
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(15, 34, 58, 0.4);
}

.modal-item {
  min-width: rem(120px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: rem(5px) rem(20px);

  p {
    @include responsive(tab-port) {
      font-size: rem(20px);
    }

    @include responsive(phone) {
      font-size: rem(14px);
    }
  }
}

.modal-item:hover {
  cursor: pointer;
  background-color: $dark-gray;
}

.fa-trash {
  font-size: rem(16px) !important;
}

.fa-ellipsis {
  z-index: 999;
}

.modal-active {
  top: rem(35px);
  opacity: 1;
  z-index: 999;
  pointer-events: auto;
}

.modal-active-current-user {
  right: 0;
}

.icon {
  @include responsive(tab-port) {
    margin-left: rem(20px);
  }
}
</style>
