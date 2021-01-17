import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/scss/styles.scss";

/*FONT AWESOME*/
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faComments,
  faCog,
  faSearch,
  faUser,
  faLock,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./plugins/firebase.js";

library.add(faComments, faCog, faSearch, faUser, faLock, faEnvelope);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
