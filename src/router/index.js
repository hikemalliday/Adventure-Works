import { createRouter, createWebHistory } from "vue-router";
import Main from "../components/Main.vue";
import Card from "../components/Product-Page/Card.vue";
import About from "../components/About.vue";
import ShoppingCart from "../components/ShoppingCart.vue";
import Login from "../components/Login.vue";
import App from "../App.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "App",
    component: App,
  },

  {
    path: "/main",
    name: "Main",
    component: Main,
  },
  {
    path: "/Product-Page/card",
    name: "activeCard",
    component: Card,
  },
  {
    path: "/shoppingCart",
    name: "shoppingCart",
    component: ShoppingCart,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
