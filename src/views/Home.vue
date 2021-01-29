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
          <p v-if="!user.is_messaging">Last Message</p>
          <div
            class="typing"
            v-else
            :class="{ 'active-messaging': user.id === selectedRoom }"
          >
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

import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: { RecentUser, SearchBar },
  data: () => ({
    selectedRoom: undefined
  }),
  computed: {
    ...mapState("userProfile", ["users"])
  },
  methods: {
    ...mapActions("rooms", ["GET_CURRENT_ROOM"]),
    getCurrentUser(userId) {
      this.selectedRoom = userId;
      this.GET_CURRENT_ROOM(userId);
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
