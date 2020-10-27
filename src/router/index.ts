import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Catalog from "../views/Catalog.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import BookItem from "../views/BookItem.vue";
import BookItemEdit from "../views/BookItemEdit.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "catalog",
    component: Catalog
  },

  {
    path: "/book/:id",
    name: "book",
    component: BookItem
  },

  {
    path: "/book/:id/edit",
    name: "bookEdit",
    component: BookItemEdit
  },

  {
    path: "/new-book",
    name: "bookNew",
    component: BookItemEdit
  },

  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: () => import("../views/Profile.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
