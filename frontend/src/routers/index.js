import { createRouter, createWebHistory } from "vue-router";

import ProductView from "../views/ProductView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "product_view",
      component: ProductView,
    },
    {
      path: "/login",
      name: "login_view",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register_view",
      component: LoginView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  let isLogin = localStorage.getItem("access_token");
  if (!isLogin) {
    if (to.name !== "login_view" && to.name !== "register_view") {
      next({ name: "login_view" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
