<template lang="html">
  <AppLayout>
    <div class="container my-10">
      <div class="row">
        <div class="col-12">

          <div class="card card-custom">
            <div class="card-header">
              <div class="card-title">
                <h3 class="card-label">
                  Saved Applications
                </h3>
              </div> </div>
            <div class="card-body">
              <table class="table table-responsive m-0">
                <thead>
                  <tr>
                    <th scope="col">DPIRD Reference</th>
                    <th scope="col">Reference Code</th>
                    <th scope="col">Status</th>
                    <th scope="col">Applicant</th>
                    <th scope="col">Applicant Phone</th>
                    <th scope="col">Applicant Email</th>
                    <th scope="col">Applicant Address</th>
                    <th scope="col">Organisation</th>
                    <th scope="col">ABN</th>
                    <th scope="col">ACN</th>
                    <th scope="col">Project</th>
                    <th scope="col">Project Address</th>
                    <th scope="col">Primary Purpose</th>
                    <th scope="col">Created</th>
                    <th scope="col">Files</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="application in applications" :key="application.id">
                    <td>{{ application.dpirdReference }}</td>
                    <td>{{ application.referenceCode }}</td>
                    <td>
                      {{ application.status }}
                    </td>
                    <td>{{ application.user.name }}</td>
                    <td>{{ application.user.phone }}</td>
                    <td>{{ application.user.email }}</td>
                    <td>{{ application.user.address }}</td>
                    <td>{{ application.organisation.name }}</td>
                    <td>{{ application.organisation.abn }}</td>
                    <td>{{ application.organisation.acn }}</td>
                    <td>{{ application.project.name }}</td>
                    <td>{{ application.project.address }}</td>
                    <td>{{ application.project.primaryPurpose }}</td>
                    <td>{{ application.createdAt }}</td>
                    <td>
                      <a
                        v-for="(file, i) in application.files"
                        :key="i"
                        :href="file"
                        class="btn btn-icon btn-primary"
                        target="_blank"
                      >
                        {{ i }}
                      </a>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-warning"
                        @click="toggleEditApplicationModal(application)"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
  <EditHsdcpApplicationModal
    v-if="activeApplication"
    :visible="isVisibleEditApplicationModal"
    :toggle="toggleEditApplicationModal"
    :application="activeApplication"
    :onSubmit="handleSubmitUpdateApplication"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

import { 
  AppLayout,
  EditHsdcpApplicationModal,
} from '@/components';
import { IAPIResponse, APIResponseStatus } from "@/models";

interface IData {
  applications: any[];
  activeApplication: any;
  isVisibleEditApplicationModal: boolean;
}

export default defineComponent({
  components: {
    AppLayout,
    EditHsdcpApplicationModal,
  },
  created: async function(): Promise<void> {
    try {
      const response: IAPIResponse = await axios.get('internal/hsdcp/applications');

      if (response.status === APIResponseStatus.SUCCESS) {
        const applications: any[] = response.data.applications;

        this.applications = applications;
      }
    } catch(error) {
      console.error(error);
    }
  },
  data: function(): IData {
    return {
      applications: [],
      activeApplication: undefined,
      isVisibleEditApplicationModal: false,
    };
  },
  methods: {
    toggleEditApplicationModal: function(application: any): void {
      this.activeApplication = application;
      this.isVisibleEditApplicationModal = true;
    },
    handleSubmitUpdateApplication: async function(application: any): Promise<void> {
      this.isVisibleEditApplicationModal = false;

      try {
        const response: IAPIResponse = await axios.put(`internal/hsdcp/applications/${application.id}`, application);

        if (response.status === APIResponseStatus.SUCCESS) {
          this.applications = this.applications.map(item => {
            if (item.id === application.id) {
              return application;
            } else {
              return item;
            }
          });
        }
      } catch(error) {
        console.error(error);
      }
    },
  },
});
</script>
