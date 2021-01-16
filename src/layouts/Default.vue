<template>
  <div class="default">
    <Sidebar />
    <TabPanel />
    <router-view />
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import TabPanel from "../components/TabPanel";
export default {
  name: "Default",
  components: { TabPanel, Sidebar }
};
</script>

<style scoped lang="scss">
.default {
  display: flex;
}
</style>
