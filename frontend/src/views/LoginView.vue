<script>
import { RouterLink } from "vue-router";
import axios from "axios";

export default {
  name: "login_view",
  components: {
    RouterLink,
  },
  data() {
    return {
      email: "",
      password: "",
      baseUrl: "http://localhost:3001/",
      error: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        let response = await axios({
          method: "POST",
          url: this.baseUrl + "login",
          data: {
            email: this.email,
            password: this.password,
          },
        });

        if (response.status === 200) {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("name", response.data.name);
          this.$swal({
            icon: "success",
            text: "your wellcome",
          });

          this.$router.push({ name: "product_view" });
        }
      } catch (error) {
        if (error.response.status === 400) {
          if (error.response.data.message === "Email is required")
            this.error.email = error.response.data.message;
          else this.error.email = "";

          if (error.response.data.message === "Password is required")
            this.error.password = error.response.data.message;
          else this.error.password = "";
        } else {
          this.$swal({
            icon: "error",
            text: error.response.data.message,
          });
        }
      }
    },
  },
};
</script>

<template>
  <main
    class="min-h-screen w-full flex justify-center items-center bg-gray-500 bg-opacity-10"
  >
    <div
      class="w-1/2 min-w-[20rem] md:w-3/4 lg:w-3/5 bg-white rounded-md overflow-hidden h-fit shadow-md grid grid-cols-1 md:grid-cols-2"
    >
      <div
        class="col-span-1 bg-login bg-cover bg-center flex justify-center h-60 md:h-full items-center"
      >
        <h1 class="text-3xl capitalize font-bold text-white">welcome back</h1>
      </div>

      <div class="col-span-1 p-10">
        <h3
          class="text uppercase text-center font-semibold text-lg mb-5 text-base"
        >
          login
        </h3>

        <form action="" @submit.prevent="login">
          <div class="flex flex-col gap-1">
            <input
              type="email"
              name="email"
              id="email"
              class=""
              placeholder="type your email"
              v-model="email"
            />
            <p class="text-red-500 text-xs">{{ error.email }}</p>
          </div>

          <div class="flex flex-col gap-1 mt-4">
            <input
              type="password"
              name="password"
              id="password"
              class=""
              placeholder="type your password"
              v-model="password"
            />
            <p class="text-red-500 text-xs">{{ error.password }}</p>
          </div>

          <div class="mt-5">
            <button class="btn-confirm">submit</button>
          </div>
        </form>

        <div class="flex flex-wrap mt-3 text-sm gap-1">
          <p>Don't have an account yet ?</p>
          <RouterLink to="/register">
            <a href="" class="underline text-base">Register Here</a>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
