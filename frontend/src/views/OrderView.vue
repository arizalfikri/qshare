<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";

export default {
  name: "order_view",
  components: {
    Navbar,
  },
  data() {
    return {
      data: [],
      baseUrl: "http://localhost:3001/",
    };
  },
  methods: {
    async orders() {
      try {
        const response = await axios.get(this.baseUrl + "product/order", {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.data = response.data.Products;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    this.orders();
  },
};
</script>

<template>
  <main class="min-h-screen relative bg-gray-500 bg-opacity-10">
    <Navbar />
    <div class="container py-20">
      <div
        v-if="data.length > 0"
        class="bg-white grid rounded overflow-hidden shadow-md grid-cols-2 md:grid-cols-2 items-center mb-5"
        v-for="(order, i) in data"
        :key="i"
      >
        <div
          class="bg-slate-200 col-span-2 md:col-span-1 flex justify-center text-4xl font-bold items-center h-28"
        >
          <h3>{{ order.name }}</h3>
        </div>

        <div class="col-span-2 md:col-span-1 py-5 text-end px-10">
          <p>{{ order.Order.quantity }} pcs</p>
          <p>
            Rp.
            {{
              order.Order.price_total
                .toString()
                .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.")
            }}
          </p>
        </div>
      </div>

      <div
        v-else
        class="bg-empty-data h-[30rem] w-full md:w-4/5 lg:w-1/2 m-auto bg-no-repeat bg-cover rounded bg-center"
      ></div>
    </div>
  </main>
</template>

<style></style>
