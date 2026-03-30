import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import ProductDetail from "./pages/ProductDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/product/:id", component: ProductDetail },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

const app = createApp(App);
app.use(router);
app.mount("#app");
