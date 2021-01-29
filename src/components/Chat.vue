<template>
  <div class="chat">
    <div class="messages"></div>
    <ChatFooter />
  </div>
</template>

<script>
import ChatFooter from "./ChatFooter";
export default {
  name: "Chat",
  components: { ChatFooter }
};
</script>

<style scoped lang="scss">
.chat {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr rem(100px);
  overflow: hidden;
}

.messages {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
</style>
