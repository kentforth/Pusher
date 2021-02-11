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

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export default {
  name: "Default",
  components: { Chat, Sidebar },
  created() {
    window.addEventListener("beforeunload", this.beforeUserLeaveApp);
  },
  methods: {
    beforeUserLeaveApp() {
      const userId = firebase.auth().currentUser.uid;
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .update({
          status: "inactive"
        });
    }
  }
};
</script>

<style scoped lang="scss">
.default {
  display: flex;

  @include responsive(tab-port) {
    display: grid;
    height: 100vh;
    position: fixed;
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 100px;
  }

  @include responsive(phone) {
    grid-template-rows: 1fr 70px;
  }
}

.view {
  background-color: $secondary;
  padding: 1em 0.8em;
  width: rem(500px);
  height: 100vh;

  @include responsive(tab-port) {
    height: 100%;
    width: 100%;
    z-index: -1;
    padding: 1em 1.5em;
  }
}
</style>
