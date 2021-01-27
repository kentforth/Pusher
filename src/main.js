import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/scss/styles.scss";

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import firebase from "firebase/app";
import "firebase/auth";

import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

/*FONT AWESOME*/
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faComments,
  faCog,
  faSearch,
  faUser,
  faLock,
  faEnvelope,
  faSignOutAlt,
  faPen,
  faPencilAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/*FIREBASE CONFIG*/
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);

library.add(
  faComments,
  faCog,
  faSearch,
  faUser,
  faLock,
  faEnvelope,
  faSignOutAlt,
  faPen,
  faPencilAlt
);

Vue.use(VueToast, {
  duration: 2500,
  type: "default"
});

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
