<template lang="html">
  <div
    class="subheader py-2 py-lg-4 subheader-solid border-top"
    id="kt_subheader"
  >
    <div
      class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
    >
      <div class="d-flex align-items-center flex-wrap mr-2"></div>
      <div class="d-flex align-items-center">
        <router-link
          class="btn btn-clean btn-sm font-weight-bold font-size-base mr-1"
          :to="{ name: 'tools-data-mapping-home' }"
        >
          Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
