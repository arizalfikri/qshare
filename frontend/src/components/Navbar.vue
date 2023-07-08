<script>
import { RouterLink } from "vue-router";
export default {
  name: "navbar_component",
  components: {
    RouterLink,
  },
  data() {
    return {
      name: localStorage.getItem("name"),
      menu_logout: false,
    };
  },
  methods: {
    changeMenuLogout() {
      this.menu_logout = !this.menu_logout;
    },
    handleLogout() {
      localStorage.clear();

      this.$router.push({ name: "login_view" });
    },
  },
};
</script>

<template>
  <div class="sticky top-0 bg-base">
    <div class="container text-white py-3 flex justify-between">
      <div class="flex items-center gap-3">
        <h3 class="font-bold text-2xl">QShare</h3>
      </div>

      <div class="flex gap-3 items-center">
        <RouterLink to="/">
          <a
            href=""
            :class="
              $route.path == '/'
                ? 'border-b-2 pb-1 border-white hover:text-gray-300 hover:border-gray-300'
                : 'pb-1'
            "
            >product</a
          >
        </RouterLink>

        <RouterLink to="/order">
          <a
            href=""
            :class="
              $route.path == '/order'
                ? 'border-b-2 pb-1 border-white hover:text-gray-300 hover:border-gray-500'
                : 'pb-1 hover:text-gray-300'
            "
            >order</a
          >
        </RouterLink>
      </div>

      <div class="flex gap-3 items-center relative">
        <div
          class="flex gap-1 items-center cursor-pointer"
          @click="changeMenuLogout"
        >
          <v-icon name="hi-solid-user-circle" scale="2" />
          <p>{{ name }}</p>
        </div>

        <div class="absolute top-12 w-full" v-if="menu_logout">
          <div
            class="bg-white shadow-md rounded relative w-full text-black pb-3 pt-4"
          >
            <div
              class="absolute -top-1 right-0 text-red-500 hover:text-red-600 cursor-pointer w-fit"
              @click="changeMenuLogout"
            >
              <v-icon name="la-window-close" scale="1" />
            </div>
            <div
              class="hover:bg-slate-200 w-full px-2 cursor-pointer"
              @click="handleLogout"
            >
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
