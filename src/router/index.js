import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "home",
      layout: "default"
    }
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/Settings.vue"),
    meta: {
      title: "settings",
      layout: "default"
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
  document.title = to.meta.title;
  next();
});

export default router;
