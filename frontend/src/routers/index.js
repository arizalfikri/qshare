import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomeView,
    },
  ],
});

router.beforeEach((to, from) => {
  let isLogin = localStorage.getItem("access_token");
  if (isLogin && (to.name == "login" || to.name == "register")) {
    return { name: "home" };
  }
});

export default router;
