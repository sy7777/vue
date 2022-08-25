<template>
  <div>
    <p>Table rows</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props:{
    emptyMsg:{type: String as PropType<string>}
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>