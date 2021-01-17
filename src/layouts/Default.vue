<template>
  <div class="default">
    <Sidebar />
    <div class="view">
      <router-view />
    </div>

    <Chat />
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
export default {
  name: "Default",
  components: { Chat, Sidebar }
};
</script>

<style scoped lang="scss">
.default {
  display: flex;
}

.view {
  height: 100vh;
  background-color: $secondary;
  padding: 1em 0.8em;
}
</style>
