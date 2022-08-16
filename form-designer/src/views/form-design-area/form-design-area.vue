<template>
  <div class="col-6 design-container">Design your form</div>
</template>

<style scoped>
.col {
  border: 1px solid #000;
}
.design-container{
  background-color: #f3f5f9;
  min-width: 722px;
  height: 100%;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "FormDesignArea",
});
</script>
