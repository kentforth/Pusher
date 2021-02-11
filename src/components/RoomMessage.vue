<template>
  <div class="room-message" :class="{ hide: !currentRoom.id }">
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "RoomMessage",
  computed: {
    ...mapState("rooms", ["currentRoom"])
  }
};
</script>

<style scoped lang="scss">
.room-message {
  transition: all 0.6s ease;
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-column-gap: rem(15px);
  margin-top: 1em;
  max-width: 50%;
  width: max-content;

  &__image {
    align-self: end;
    img {
      width: rem(60px);
      height: rem(60px);
      border-radius: 50%;
      object-fit: cover;

      @include responsive(phone) {
        width: rem(45px);
        height: rem(45px);
      }
    }
  }

  @include responsive(phone) {
    grid-column-gap: rem(5px);
  }
}

.text {
  background-color: $primary;
  padding: rem(15px);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  &__time {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
      margin-left: rem(6px);
      font-weight: 600;
      font-size: rem(13px);

      @include responsive(phone) {
        font-size: rem(10px);
      }
    }
  }

  p {
    color: $white;

    @include responsive(tab-port) {
      font-size: rem(20px);

      @include responsive(phone) {
        font-size: rem(16px);
      }
    }
  }
}

.rectangle {
  width: 0;
  height: 0;
  border-top: 12px solid $primary;
  border-right: 12px solid transparent;
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
