<template>
  <div class="sidebar">
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
  height: 100vh;
  padding: rem(20px) rem(15px);
  background-color: $dark;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
}

.links {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1em;
}

.link-item a {
  padding: rem(17px);
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.router-link-exact-active {
  background-color: $dark-gray !important;
}

.router-link-exact-active > .icon {
  color: $primary;
}
</style>
