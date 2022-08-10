<template lang="html">
  <AppLayout>
    <div class="container my-10">
      <div class="row">
        <div class="col-md-3">
          <h4 class="text-center mb-4">Reports</h4>
          <div v-for="report in reports" class="my-2" :key="report.name">
            <a
              :href="report.url"
              :class="report.buttonClass"
              type="button"
              target="_blank"
            >
              {{ report.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { AppLayout } from '@/components';

interface IReport {
  name: string;
  url: string;
  buttonClass: string;
}

interface IData {
  reports: IReport[];
}

export default defineComponent({
  components: {
    AppLayout,
  },
  data: function (): IData {
    return {
      reports: [
        {
          name: "Accounts",
          url: `${process.env.VUE_APP_API_URL}/internal/reports/accounts?format=csv`,
          buttonClass: "btn btn-info btn-lg w-100",
        },
        {
          name: "HSDCP Applications",
          url: `${process.env.VUE_APP_API_URL}/internal/reports/hsdcp?format=csv`,
          buttonClass: "btn btn-info btn-lg w-100",
        },
        {
          name: "HSDCP Qualitative Survey",
          url: `${process.env.VUE_APP_API_URL}/internal/reports/hsdcp-qs-form?format=csv`,
          buttonClass: "btn btn-info btn-lg w-100",
        },
      ],
    };
  },
});
</script>
