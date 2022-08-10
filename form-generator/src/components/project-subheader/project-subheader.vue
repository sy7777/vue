<template lang="html">
  <div class="d-flex flex-column">
    <div class="subheader py-6" id="kt_subheader">
      <div
        class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
      >
        <ProjectMenu
          v-bind:projects="projects"
          v-bind:currentProject="project"
          v-bind:logoUrl="logoUrl"
        />
        <div class="d-flex d-md-none">
          <button
            class="btn btn-icon rounded-0 ml-4"
            @click="toggleMenu"
            id="projectMenuDropdownButton"
          >
            <span class="svg-icon svg-icon-xxl">
              <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
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
                  <rect x="0" y="0" width="24" height="24" />
                  <rect
                    fill="#000000"
                    x="4"
                    y="4"
                    width="7"
                    height="7"
                    rx="1.5"
                  />
                  <path
                    d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z"
                    fill="#000000"
                    opacity="0.3"
                  />
                </g>
              </svg>
              <!--end::Svg Icon-->
            </span>
          </button>
        </div>
        <ul
          class="nav nav-pills nav-light-primary nav-boldest d-none d-md-flex"
        >
          <li class="nav-item">
            <router-link :to="{ name: 'project-dashboard' }" class="nav-link">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'project-settings' }" class="nav-link">
              Settings
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <b-collapse v-model="menuVisible">
      <div class="d-flex flex-column d-md-none bg-light">
        <router-link
          :to="{ name: 'project-dashboard' }"
          class="btn btn-block btn-link"
        >
          <span class="font-weight-bolder">Home</span>
        </router-link>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { ProjectMenu } from "@/components/project-menu";
import { IProject } from "@/models";

export default defineComponent({
  components: {
    ProjectMenu,
  },
  data: function (): any {
    return {
      menuVisible: false,
    };
  },
  computed: {
    projectId: function () {
      const isProjectRoute = this.$route.matched.some(
        (route: any) => route.name === "project"
      );
      if (isProjectRoute) {
        return parseInt(this.$route.params.id, 10);
      }
      return null;
    },
    organisationId: function () {
      const isOrganisationRoute = this.$route.matched.some(
        (route: any) => route.name === "organisation"
      );
      if (isOrganisationRoute) {
        return parseInt(this.$route.params.id, 10);
      }
      return null;
    },
    projects: function () {
      return this.$store.getters["projects/getProjects"]();
    },
    project: function () {
      return this.projects.find(
        (project: IProject) => project.id === this.projectId
      );
    },
    organisation: function () {
      return this.$store.getters["organisation/organisation"](
        this.organisationId
      );
    },
  },
  methods: {
    toggleMenu: function () {
      this.menuVisible = !this.menuVisible;
    },
    handleMenuClickout: function (event: any) {
      if (
        !(document as any)
          .getElementById("projectMenuDropdownButton")
          .contains(event.target)
      ) {
        //this.visible = false;
      }
    },
  },
  props: {
    logoUrl: String,
  },
});
</script>
