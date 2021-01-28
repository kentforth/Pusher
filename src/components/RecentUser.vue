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
  padding: rem(10px) rem(20px);
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

.typing {
  display: flex;
  align-items: flex-end;
  span {
    font-size: $font-size / 1.1;
    color: $primary;
    margin: 5px 5px 5px 0;
  }

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin-right: 5px;
    background-color: $primary;
    margin-bottom: 5px;
  }

  .dot:nth-child(2) {
    animation: movingTop duration(0.5) ease-in-out infinite;
    animation-direction: alternate;
  }

  .dot:nth-child(3) {
    animation: movingTop duration(0.6) ease-in-out infinite;
    animation-direction: alternate;
  }

  .dot:nth-child(4) {
    animation: movingTop duration(0.7) ease-in-out infinite;
    animation-direction: alternate;
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

.active-user {
  background-color: $blue !important;
}

/*ANIMATION*/
@keyframes movingTop {
  0%,
  30% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-10px);
  }
}
</style>
