<template>
  <div class="default">
    <Sidebar />
    <router-view />
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
</style>
