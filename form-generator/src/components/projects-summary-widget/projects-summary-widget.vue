<template lang="html">
  <div class="card card-custom card-stretch gutter-b">
    <div class="card-header border-0 pt-6">
      <h3 class="card-title">
        <span class="font-weight-bolder font-size-h4 text-dark-75">
          Projects
        </span>
      </h3>
    </div>
    <div
      class="card-body d-flex align-items-center justify-content-between flex-wrap"
    >
      <span class="font-weight-bolder display5 text-dark-75 py-4 pl-5 pr-5">
        {{ projectsCount }}
        <span class="font-weight-normal font-size-h6 text-muted pr-1"
          >projects</span
        >
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IProject } from "@/models";

export default defineComponent({
  components: {},
  data: function () {
    return {
      projectsCount: 0,
    };
  },
  props: {
    projects: {
      type: Array as PropType<IProject[]>,
      required: true,
    },
  },
  watch: {
    projects: {
      handler: function () {
        this.projectsCount = this.projects.length;
      },
      immediate: true,
      deep: true,
    },
  },
});
</script>
