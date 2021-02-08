<template>
  <div class="search-bar">
    <font-awesome-icon icon="search" class="icon fa-search" />
    <input
      type="text"
      placeholder="search users"
      class="input"
      @keyup="searchUser"
      v-model="search"
    />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

import { mapActions } from "vuex";

export default {
  name: "SearchBar",
  data() {
    return {
      search: "",
      timeout: null
    };
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  methods: {
    ...mapActions("userProfile", [
      "GET_SEARCHED_USERS",
      "CLEAR_USERS",
      "GET_USERS"
    ]),
    searchUser() {
      clearTimeout(this.timeout);
      if (this.search !== "") {
        firebase
          .firestore()
          .collection("users")
          .where("name", "==", this.search)
          .get()
          .then(snapshot => {
            if (!snapshot.empty) {
              let users = [];
              snapshot.forEach(doc => {
                users.push(doc.data());
              });
              this.GET_SEARCHED_USERS(users);
            } else {
              this.CLEAR_USERS();
            }
          })
          .catch(error => {
            console.log(error);
          });
        this.timeout = setTimeout(() => {}, 300);
      } else {
        this.timeout = setTimeout(() => {
          this.GET_USERS();
        }, 300);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.fa-search {
  position: absolute;
  top: rem(12px);
  left: rem(17px);
  color: rgba(166, 176, 207, 0.5);
}
.search-bar {
  position: relative;
}

.input {
  padding-left: 3em;
}
</style>
