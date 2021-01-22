import Vue from "vue";
import VueRouter from "vue-router";

import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: { name: "home" }
  },
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "Home",
      layout: "default",
      requiresAuth: true
    }
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/Settings.vue"),
    meta: {
      title: "Settings",
      layout: "default",
      requiresAuth: true
    }
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("../views/SignIn"),
    meta: {
      title: "Sign In",
      layout: "empty"
    }
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignUp"),
    meta: {
      title: "Sign Up",
      layout: "empty"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;

  if (requiresAuth && !isAuthenticated) {
    next("/signin");
  } else {
    document.title = to.meta.title;
    next();
  }
});

export default router;
