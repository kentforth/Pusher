<template>
  <div id="app">
    <component :is="layout"> </component>
  </div>
</template>
<script>
import EmptyLayout from "./layouts/Empty";
import DefaultLayout from "./layouts/Default";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  components: { EmptyLayout, DefaultLayout },
  computed: {
    layout() {
      return (this.$route.meta.layout || "default") + "-layout";
    }
  },
  methods: {
    setStatusInactive() {
      let userId = firebase.auth().currentUser.uid;
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .update({
          status: "inactive"
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  beforeDestroy() {}
};
</script>
<style lang="scss"></style>
