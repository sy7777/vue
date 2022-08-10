<template lang="html">
  <div class="subheader py-6" id="kt_subheader">
    <div
      class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
    >
      <ProjectMenu />
      <div class="d-flex align-items-center flex-wrap">
        <router-link
          class="btn btn-clean btn-sm font-weight-bold font-size-base mr-1"
          :to="{ name: 'projects-dashboard' }"
        >
          Dashboard
        </router-link>
        <router-link
          class="btn btn-clean btn-sm font-weight-bold font-size-base mr-1"
          :to="{ name: 'projects-grid' }"
        >
          Grid View
        </router-link>
        <router-link
          class="btn btn-clean btn-sm font-weight-bold font-size-base mr-1"
          :to="{ name: 'projects-table' }"
        >
          Table View
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { ProjectMenu } from "@/components";

export default defineComponent({
  components: {
    ProjectMenu,
  },
  computed: {
    projects: function () {
      return this.$store.getters["projects/getProjects"]();
    },
  },
});
</script>
