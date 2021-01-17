<template>
  <div class="recent-user">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "RecentUser"
};
</script>

<style scoped lang="scss">
.recent-user {
  padding: rem(15px) rem(20px);
  display: grid;
  align-items: start;
  justify-content: center;
  grid-template-columns: 50px 1fr 0.4fr;
  grid-column-gap: rem(30px);
  border-radius: rem(4px);
  cursor: pointer;
  transition: all 0.2s linear;
}

.recent-user:hover {
  background-color: $link-background;
}

.image {
  position: relative;
  justify-items: center;
  overflow: hidden;
  display: flex;
  width: 60px;
  height: 60px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
}

.info {
  p {
    white-space: nowrap;
    overflow: hidden;
    width: 150px;
    text-overflow: ellipsis;
  }
}

.time {
  display: flex;
  justify-content: flex-end;
}

.status {
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  top: rem(40px);
  right: 0;
  box-shadow: 0px 0px 3px 1px #000000;
  background-color: $green;
  z-index: 999;
}
</style>
