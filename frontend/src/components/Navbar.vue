<script>
export default {
  name: "navbar_component",
  data() {
    return {
      name: localStorage.getItem("name"),
    };
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
        <a
          href=""
          :class="
            $route.path == '/'
              ? 'border-b-2 pb-1 border-white hover:text-gray-300 hover:border-gray-300'
              : 'pb-1'
          "
          >product</a
        >
        <a
          href=""
          :class="
            $route.path == '/order'
              ? 'border-b-2 pb-1 border-white hover:text-gray-300 hover:border-gray-500'
              : 'pb-1 hover:text-gray-300'
          "
          >order</a
        >
      </div>

      <div class="flex gap-3 items-center">
        <div class="flex gap-1 items-center ml-10">
          <v-icon name="hi-solid-user-circle" scale="2" />
          <p>{{ name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
