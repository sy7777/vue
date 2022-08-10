<template lang="html">
  <li role="presentation">
    <button type="button" class="dropdown-item" role="menuitem">
      <slot></slot>
    </button>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
