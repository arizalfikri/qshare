<script>
import Navbar from "../components/Navbar.vue";
import axios from "axios";

export default {
  name: "product_view",
  components: {
    Navbar,
  },
  data() {
    return {
      data: [],
      baseUrl: "http://localhost:3001/",
      one_data: {},
      create_new_product: false,
      product: {
        name: "",
        price: "",
      },
    };
  },
  methods: {
    async products() {
      try {
        const response = await axios.get(this.baseUrl + "product", {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        this.data = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createProduct() {
      try {
        const response = await axios.post(
          this.baseUrl + "product",
          {
            name: this.product.name,
            price: this.product.price,
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );

        this.products();
        this.create_new_product = !this.create_new_product;

        this.$swal({
          icon: "success",
          text: "Create product successfully",
        });
      } catch (error) {
        this.$swal({
          icon: "error",
          text: "Create product error",
        });
      }
    },
    async order(id) {
      try {
        await axios.post(
          this.baseUrl + "product/order",
          {
            productId: id,
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );

        this.$swal({
          icon: "success",
          text: "Success order",
        });
      } catch (error) {
        if (error.response?.status === 400) {
          this.$swal({
            icon: "error",
            text: error.response.data.message,
          });
        } else {
          this.$swal({
            icon: "error",
            text: "order error",
          });
        }
      }
    },
    modalCreateProduct() {
      this.create_new_product = !this.create_new_product;
    },
  },
  async created() {
    this.products();
  },
};
</script>

<template>
  <main class="min-h-screen relative bg-gray-500 bg-opacity-10">
    <Navbar />

    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-20">
        <div
          v-for="(e, i) in data"
          :key="i"
          class="bg-white rounded-md shadow-md col-span-1"
        >
          <div
            class="h-40 flex justify-center items-center text-4xl bg-slate-200 font-bold"
          >
            {{ e.name }}
          </div>
          <div class="p-5 flex justify-between items-end">
            <div>
              <p>
                Rp.
                {{
                  e.price
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.")
                }}
              </p>
            </div>

            <div
              class="hover:text-gray-500 cursor-pointer flex"
              @click="() => order(e.id)"
            >
              <v-icon name="bi-cart3" scale="1" />
            </div>
          </div>
        </div>

        <div
          class="col-span-1 rounded-md shadow-md cursor-pointer bg-white"
          @click="modalCreateProduct"
        >
          <div class="bg-slate-200 h-40"></div>
          <div class="flex items-center justify-center p-5 gap-2">
            <v-icon name="bi-plus-circle" scale="2" animation="pulse" />
            <h3>create new product</h3>
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute flex justify-center items-center inset-0"
      v-if="create_new_product"
    >
      <div
        class="absolute inset-0 bg-slate-400 bg-opacity-25"
        @click="modalCreateProduct"
      ></div>

      <div class="bg-white rounded z-50 w-1/4 p-5">
        <h4 class="text-center font-bold text-lg uppercase">create product</h4>
        <form action="" class="w-full mt-5" @submit.prevent="createProduct">
          <div>
            <label for="">name product</label>
            <input
              type="text"
              name="name"
              placeholder="type name youre product"
              class="w-full"
              v-model="product.name"
            />
          </div>

          <div class="mt-3">
            <label for="">price</label>
            <input
              type="text"
              name="name"
              placeholder="ext: 200000"
              class="w-full"
              v-model="product.price"
            />
          </div>

          <div class="mt-5">
            <button class="btn-confirm" type="submit">create</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<style></style>
