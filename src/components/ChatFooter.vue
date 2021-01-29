<template>
  <div class="footer" :class="{ hide: !currentRoom.id }">
    <form action="" class="form" @submit.prevent="sendMessage">
      <input
        type="text"
        class="input"
        placeholder="Enter Message..."
        v-model="message"
      />
      <font-awesome-icon icon="laugh" class="icon fa-laugh" />
      <font-awesome-icon icon="paperclip" class="icon fa-paperclip" />
      <button class="btn-send" type="submit">
        <font-awesome-icon icon="paper-plane" class="icon fa-plane" />
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ChatFooter",
  data: () => ({
    message: ""
  }),
  computed: {
    ...mapState("rooms", ["currentRoom"])
  },
  methods: {
    sendMessage() {
      console.log(this.message);
    }
  }
};
</script>

<style scoped lang="scss">
.footer {
  border-top: 1px solid $dark-gray;
  width: 100%;
  height: 100%;
  padding: rem(25px);
  transition: all 0.6s ease;
}

.input {
  padding: rem(10px);
  height: 100%;
}

.form {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 50px 50px 50px;
  grid-column-gap: rem(20px);
  justify-items: center;
  align-items: center;
}
.fa-laugh,
.fa-paperclip {
  color: $primary;
  cursor: pointer;
  transition: all 0.3s ease;
  transform-origin: center;
}

.fa-laugh:hover,
.fa-paperclip:hover {
  color: #5a51ce;
}

.fa-laugh:hover {
  transform: rotate(180deg);
}

.fa-plane {
  color: $white;
  transform-origin: center;
  transform: rotate(50deg);
  margin: 0 5px 5px 0;
}

.btn-send {
  height: 100%;
  cursor: pointer;
  background-color: $primary;
  outline: none;
  border-radius: 4px;
  width: 100%;
  border: 3px solid $primary;
  padding: 0;
  transition: all 0.5s linear;
}

.btn-send:active {
  border: 3px solid $white;
  background-color: $secondary;
}

.hide {
  opacity: 0;
  pointer-events: none;
  cursor: default;
  transform: translateY(10px);
}
</style>
