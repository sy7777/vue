<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    Home
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { HelloWorld } from "@/components/hello-world";
import { defineComponent } from "vue";


export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
  },
});
</script>
