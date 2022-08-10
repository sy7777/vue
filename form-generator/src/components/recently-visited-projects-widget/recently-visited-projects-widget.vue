<template lang="html">
  <div class="card card-custom gutter-b">
    <div class="card-header border-0 pt-6" style="min-height: 0">
      <h3 class="card-title align-items-start flex-column m-0">
        <span class="card-label font-weight-bolder font-size-h4 text-dark-75"
          >Recently Visited</span
        >
      </h3>
    </div>
    <div v-if="!projects.length" class="card-body">
      <div class="alert alert-light">
        <h6 class="alert-title m-0">Projects not found</h6>
      </div>
    </div>
    <div v-if="projects.length" class="card-body d-flex flex-column">
      <div class="flex-grow-1 pb-5">
        <div
          v-for="project in projects"
          class="d-flex align-items-center"
          :key="project.id"
        >
          <img
            v-if="project.logo"
            style="width: 35px; height: 35px"
            :src="project.logo"
            class="rounded"
          />
          <div class="symbol symbol-35 symbol-light-success flex-shrink-0 mr-3">
            <span
              v-if="!project.logo"
              class="symbol-label font-weight-bolder font-size-lg"
            >
              {{ getProjectInitials(project) }}
            </span>
          </div>
          <div class="d-flex flex-wrap flex-row-fluid">
            <div class="d-flex flex-column pr-5 flex-grow-1">
              <router-link
                :to="{ name: 'project-dashboard', params: { id: project.id } }"
                class="text-dark-75 text-hover-primary mb-1 font-weight-bolder font-size-lg"
              >
                {{ project.name }}
              </router-link>
              <span class="text-muted font-weight-bold">{{
                project.org.name
              }}</span>
            </div>
            <div class="d-flex align-items-center py-2">
              <router-link
                :to="{ name: 'project-dashboard', params: { id: project.id } }"
                class="btn btn-icon btn-light btn-sm"
              >
                <span class="svg-icon svg-icon-md svg-icon-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    version="1.1"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <polygon points="0 0 24 0 24 24 0 24"></polygon>
                      <path
                        d="M6.70710678,15.7071068 C6.31658249,16.0976311 5.68341751,16.0976311 5.29289322,15.7071068 C4.90236893,15.3165825 4.90236893,14.6834175 5.29289322,14.2928932 L11.2928932,8.29289322 C11.6714722,7.91431428 12.2810586,7.90106866 12.6757246,8.26284586 L18.6757246,13.7628459 C19.0828436,14.1360383 19.1103465,14.7686056 18.7371541,15.1757246 C18.3639617,15.5828436 17.7313944,15.6103465 17.3242754,15.2371541 L12.0300757,10.3841378 L6.70710678,15.7071068 Z"
                        fill="#000000"
                        fill-rule="nonzero"
                        transform="translate(12.000003, 11.999999) rotate(-270.000000) translate(-12.000003, -11.999999)"
                      ></path>
                    </g>
                  </svg>
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IProject } from "@/models";
import { getRecentlyVisitedProjects } from "@/services";

interface IRecentlyVisitedProjectsWidgetData {
  projects: IProject[];
}

export default defineComponent({
  created: function (): void {
    const allProjects: IProject[] =
      this.$store.getters["projects/getProjects"]();
    this.projects = getRecentlyVisitedProjects(allProjects);
  },
  data: function (): IRecentlyVisitedProjectsWidgetData {
    return {
      projects: [],
    };
  },
  methods: {
    getProjectInitials: function (project: IProject): string {
      return project.name
        .split(" ")
        .map((word: string) => word[0])
        .join("");
    },
  },
});
</script>
