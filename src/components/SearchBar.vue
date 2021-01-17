<template>
  <div class="search-bar">
    <font-awesome-icon icon="search" class="icon fa-search" />
    <input type="text" placeholder="search users" class="input" />
  </div>
</template>

<script>
export default {
  name: "SearchBar"
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
