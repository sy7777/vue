<template lang="html">
  <div class="login-footer py-10 flex-column-auto">
    <div
      class="container d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-between"
    >
      <div
        class="font-size-h6 font-weight-bolder order-2 order-md-1 py-2 py-md-0"
      >
        <span class="text-muted font-weight-bold mr-2">{{ year }} ©</span>
        <a
          href="https://www.axisstream.co"
          target="_blank"
          class="text-dark-50 text-hover-primary mr-2"
          >AxisTech</a
        >
      </div>
      <div
        class="font-size-h5 font-weight-bolder order-1 order-md-2 py-2 py-md-0"
      >
        <a :href="termsUrl" class="text-primary" target="_blank">Terms</a>
        <a :href="plansUrl" class="text-primary ml-10" target="_blank">Plans</a>
        <a :href="contactUrl" class="text-primary ml-10" target="_blank"
          >Contact Us</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import constants from "@/constants/constants";

import {
  AxisStreamTermsPage,
  AxisStreamPlansPage,
  AxisStreamContactPage,
} from "@/constants";

export default defineComponent({
  data: function () {
    return {
      year: new Date().getFullYear(),
      appTitle: constants.APP_TITLE,
      termsUrl: AxisStreamTermsPage,
      plansUrl: AxisStreamPlansPage,
      contactUrl: AxisStreamContactPage,
    };
  },
});
</script>
