<template lang="html">
  <AppLayout>
    <div class="container my-10">
      <div class="row">
        <div class="col-md-3">
          <h4 class="text-center mb-4">Web Applications</h4>
          <div v-for="app in webApplications" class="my-2" :key="app.name">
            <a
              :href="app.url"
              :class="app.buttonClass"
              type="button"
              target="_blank"
            >
              {{ app.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { AppLayout } from '@/components';

interface IWebApplication {
  name: string;
  url: string;
  buttonClass: string;
}

interface IReport {
  name: string;
  url: string;
  buttonClass: string;
}

interface IData {
  webApplications: IWebApplication[];
}

export default defineComponent({
  components: {
    AppLayout,
  },
  data: function (): IData {
    return {
      webApplications: [
        {
          name: "AxisStream APP / staging",
          url: "https://staging-app.axisstream.co",
          buttonClass: "btn btn-lg btn-secondary w-100",
        },
        {
          name: "AxisStream APP / production",
          url: "https://app.axisstream.co",
          buttonClass: "btn btn-lg btn-primary w-100",
        },
        {
          name: "My AxisStream / staging",
          url: "https://staging.my.axisstream.co",
          buttonClass: "btn btn-lg btn-secondary w-100",
        },
        {
          name: "My AxisStream / production",
          url: "https://my.axisstream.co",
          buttonClass: "btn btn-lg btn-primary w-100",
        },
      ],
    };
  },
});
</script>
