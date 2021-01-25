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
}

.view {
  background-color: $secondary;
  padding: 1em 0.8em;
  width: 450px;
  height: 100vh;
}
</style>
