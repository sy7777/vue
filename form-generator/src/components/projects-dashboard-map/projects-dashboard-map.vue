<template lang="html">
  <div class="card card-custom overflow-hidden">
    <div class="card-body p-0">
      <Map v-bind:markers="mapMarkers" v-bind:height="'300px'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Map } from "@/components";
import { MapMarker, IProject } from "@/models";

interface IData {
  mapMarkers: MapMarker[];
}

export default defineComponent({
  components: {
    Map,
  },
  data: function (): IData {
    return {
      mapMarkers: [],
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
        this.mapMarkers = this.projects
          .filter((item: IProject) => {
            return !!item.latitude && !!item.longitude;
          })
          .map((item: IProject) => {
            return {
              coordinates: [Number(item.latitude), Number(item.longitude)],
              popup: `
                <div>
                  <a href="/projects/${item.id}/dashboard">${item.name}</a>
                </div>
              `,
            };
          });
      },
      deep: true,
      immediate: true,
    },
  },
});
</script>
