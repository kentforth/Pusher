<template>
  <div class="home">
    <div class="container">
      <h1>Chats</h1>
      <SearchBar />
    </div>

    <div class="chat-list">
      <RecentUser v-for="room in allRooms" :key="room.id">
        <div class="image">
          <img :src="userImage" :alt="`image ${room.name}`" />
          <div
            class="status"
            :class="[
              room.status === 'active' ? 'status-active' : 'status-inactive'
            ]"
          ></div>
        </div>

        <div class="info">
          <h3>{{ room.name }}</h3>
          <p v-if="!room.typing">{{ room.lastMessage }}</p>
          <div class="typing" v-else>
            <span>typing</span>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
        <div class="time">
          <span>12:12: AM</span>
        </div>
      </RecentUser>
    </div>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar";
import RecentUser from "../components/RecentUser";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

export default {
  name: "Home",
  components: { RecentUser, SearchBar },
  data: () => ({
    rooms: [],
    image: ""
  }),
  computed: {
    allRooms() {
      return this.rooms;
    },
    userImage() {
      return this.image;
    }
  },
  created() {
    this.displayRooms();
  },
  methods: {
    async displayRooms() {
      const snapshot = await firebase
        .firestore()
        .collection("rooms")
        .get();
      const rooms = [];
      snapshot.forEach(doc => {
        firebase
          .storage()
          .ref("users/" + doc.id + "/profile.jpg")
          .getDownloadURL()
          .then(url => {
            this.image = url;
          })
          .catch(error => {
            console.log(error);
          });
        rooms.push({ id: doc.id, image: this.image, ...doc.data() });
      });
      this.rooms = rooms;
    }
  }
};
</script>
<style scoped lang="scss">
.chat-list {
  margin-top: 2em;
  padding-bottom: 2em;
  overflow-y: scroll;
  height: 750px;
}
</style>
