<template lang="html">
  <div class="collapse" :class="{ show: visible }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    visible: Boolean,
  },
});
</script>
