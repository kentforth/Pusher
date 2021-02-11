<template>
  <div class="current-user-message" :class="{ hide: !currentRoom.id }">
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CurrentUserMessage",
  computed: {
    ...mapState("rooms", ["currentRoom"])
  }
};
</script>

<style scoped lang="scss">
.current-user-message {
  transition: all 0.6s ease;
  display: grid;
  grid-template-columns: 10px 1fr;
  grid-column-gap: rem(15px);
  justify-content: end;
  margin-top: 1em;
  margin-left: auto;
  max-width: 45%;
  width: max-content;
}

.text {
  background-color: $dark-gray;
  padding: rem(15px);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;

  &__time {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
      margin-left: rem(6px);
      font-weight: 600;
      font-size: rem(13px);
    }
  }

  p {
    color: $white;
    font-size: rem(20px);
  }
}

.rectangle {
  width: 0;
  height: 0;
  margin-left: auto;
  border-top: 12px solid $dark-gray;
  border-left: 12px solid transparent;
}

.fa-clock {
  color: rgba(255, 255, 255, 0.5) !important;
  font-size: rem(16px) !important;
}

.fa-ellipsis {
  font-size: rem(20px) !important;
  cursor: pointer;
}

.options {
  display: grid;
  position: relative;
  grid-template-columns: 1fr;
}

.hide {
  opacity: 0;
  pointer-events: none;
  cursor: default;
  transform: translateX(-10px);
}
</style>
