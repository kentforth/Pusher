<template>
  <div class="sidebar">
    <div class="logo">
      <img src="../assets/images/icons/logo-icon.svg" alt="logo" />
    </div>

    <div class="links">
      <div class="link-item">
        <router-link to="/">
          <font-awesome-icon icon="comments" class="icon" />
        </router-link>
      </div>
      <div class="link-item">
        <router-link to="/settings">
          <font-awesome-icon icon="cog" class="icon" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar"
};
</script>

<style scoped lang="scss">
.sidebar {
  width: rem(100px);
  height: 100vh;
  padding: rem(20px) rem(15px);
  background-color: $dark-gray;
  display: grid;
  align-items: start;
  grid-template-columns: 1fr;
  grid-template-rows: 200px 1fr;
  justify-content: center;
  justify-items: center;
}

.links {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1em;
  justify-content: center;
}

.logo {
  display: flex;
  justify-content: center;
  align-self: start;
}

.link-item a {
  padding: rem(17px);
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.router-link-exact-active {
  background-color: $link-background !important;
}

.router-link-exact-active > .icon {
  color: $primary;
}

.sidebar img {
  width: 40%;
}
</style>
