<template>
  <div class="home">
    <div class="container">
      <h1>Chats</h1>
      <SearchBar />
    </div>

    <div class="chat-list">
      <RecentUser
        v-for="user in users"
        :key="user.id"
        :class="{ 'active-user': user.id === selectedRoom }"
        @click.native="getCurrentUser(user.id)"
      >
        <div class="image">
          <img :src="user.image" :alt="`image ${user.name}`" />
          <div
            class="status"
            :class="[
              user.status === 'active' ? 'status-active' : 'status-inactive'
            ]"
          ></div>
        </div>

        <div class="info">
          <h3>{{ user.name }}</h3>
          <div
            class="div"
            v-for="lastMessage in usersLastMessages"
            :key="lastMessage.id"
          >
            <p v-if="!user.is_messaging && lastMessage.senderId === user.id">
              {{ lastMessage.message }}
            </p>
          </div>

          <div
            class="typing"
            v-if="user.is_messaging"
            :class="{ 'active-messaging': user.id === selectedRoom }"
          >
            <span>typing</span>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
        <div
          class="time"
          v-for="lastMessage in usersLastMessages"
          :key="lastMessage.id"
        >
          <span v-if="lastMessage.senderId === user.id">{{
            lastMessage.createdAt | date
          }}</span>
        </div>
      </RecentUser>
    </div>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar";
import RecentUser from "../components/RecentUser";

import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  components: { RecentUser, SearchBar },
  data: () => ({
    selectedRoom: undefined
  }),
  beforeUpdate() {
    this.GET_USERS_LAST_MESSAGES();
  },
  created() {
    const roomId = localStorage.getItem("roomId");

    if (roomId) {
      this.selectedRoom = roomId;
    }
  },
  computed: {
    ...mapState("userProfile", ["users"]),
    ...mapState("rooms", ["currentRoom", "usersLastMessages"])
  },
  methods: {
    ...mapActions("rooms", [
      "GET_CURRENT_ROOM",
      "GET_ROOM_MESSAGES",
      "CLEAR_MESSAGES",
      "GET_USERS_LAST_MESSAGES"
    ]),
    ...mapActions("userProfile", ["GET_USERS"]),

    getCurrentUser(userId) {
      localStorage.setItem("roomId", userId);
      this.selectedRoom = userId;
      this.CLEAR_MESSAGES();
      this.GET_CURRENT_ROOM(userId);
      this.GET_ROOM_MESSAGES(userId);
    }
  }
};
</script>
<style scoped lang="scss">
.chat-list {
  margin-top: 2em;
  padding-bottom: 2em;
  overflow-y: scroll;
  max-height: 600px;
}
</style>
