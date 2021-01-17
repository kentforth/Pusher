<template>
  <div class="home">
    <div class="container">
      <h1>Chats</h1>
      <SearchBar />
    </div>

    <div class="chat-list">
      <RecentUser v-for="user in users" :key="user.id">
        <div class="image">
          <img :src="user.image" alt="image" />
          <div
            class="status"
            :class="[
              user.status === 'active' ? 'status-active' : 'status-inactive'
            ]"
          ></div>
        </div>

        <div class="info">
          <h3>{{ user.name }}</h3>
          <p>{{ user.lastMessage }}</p>
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
export default {
  name: "Home",
  components: { RecentUser, SearchBar },
  data: () => ({
    users: [
      {
        id: 1,
        name: "Patrick Harris",
        lastMessage: "Hey! I am there",
        status: "active",
        time: "12:25",
        image: require("../assets/images/test/image1.jpg")
      },
      {
        id: 2,
        name: "Elizabeth Weilsh",
        lastMessage: "Mystic main",
        status: "inactive",
        time: "14:21",
        image: require("../assets/images/test/image2.jpg")
      },
      {
        id: 3,
        name: "Lori Plamer",
        lastMessage: "Fizics ocure",
        status: "active",
        time: "10:47",
        image: require("../assets/images/test/image3.jpg")
      },
      {
        id: 4,
        name: "John Beleck",
        lastMessage: "Should I return back to office?",
        status: "inactive",
        time: "16:32",
        image: require("../assets/images/test/image4.jpg")
      },
      {
        id: 5,
        name: "Sonya Blade",
        lastMessage: "change stuff for tomorrow",
        status: "active",
        time: "16:32",
        image: require("../assets/images/test/image5.jpg")
      }
    ]
  })
};
</script>
<style scoped lang="scss">
.chat-list {
  margin-top: 2em;
}
</style>
