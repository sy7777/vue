<template lang="html">
  <div
    class="footer bg-white py-4 d-flex flex-lg-column shadow-sm"
    id="kt_footer"
  >
    <div
      class="container d-flex flex-column flex-md-row align-items-center justify-content-between"
    >
      <div
        class="text-dark order-2 order-md-1 d-flex flex-wrap justify-content-center align-items-center"
      >
        <span class="mt-2 mt-md-0">
          <span class="text-muted font-weight-bold mr-2"> {{ year }} © </span>
          <a
            href="https://www.axistech.co"
            target="_blank"
            class="text-dark-75 text-hover-primary"
            >AxisTech Pty Ltd</a
          >
        </span>
        <span class="ml-3 mt-2 mt-md-0">
          <i class="flaticon2-time mr-2 text-success"></i>
          <span class="text-success">{{ timeZone }}</span>
        </span>
      </div>
      <div class="nav nav-dark order-1 order-md-2">
        <a class="nav-link px-3" target="blank" :href="supportUrl">Support</a>
        <a class="nav-link px-3" target="blank" :href="contactUrl">Contact</a>
        <a class="nav-link pl-3 pr-0" v-bind:href="getFeedbackLink">Feedback</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import constants from "@/constants/constants";
import {
  AxisStreamTermsPage,
  AxisStreamPrivacyPage,
  AxisStreamSupportSite,
  AxisStreamContactPage,
} from "@/constants";

export default defineComponent({
  computed: {
    getFeedbackLink: function (): string {
      return `mailto:support@axistech.co?subject=${this.routeName} feedback`;
    },
  },
  created: function () {
    this.routeName = this.$route.name.toString();
  },
  data: function (): any {
    return {
      termsUrl: AxisStreamTermsPage,
      privacyUrl: AxisStreamPrivacyPage,
      supportUrl: AxisStreamSupportSite,
      contactUrl: AxisStreamContactPage,
      appTitle: constants.APP_TITLE,
      year: new Date().getFullYear(),
      routerName: "",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  },
});
</script>
