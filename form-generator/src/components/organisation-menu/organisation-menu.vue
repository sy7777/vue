<template lang="html">
  <div>
    <div class="d-flex align-items-center flex-wrap mr-1">
      <!--begin::Aside Toggle-->
      <button
        class="btn btn-icon mr-4"
        id="kt_aside_toggle"
        @click="toggleAsideMenu"
      >
        <span class="svg-icon svg-icon-xl">
          <!--begin::Svg Icon | path:assets/media/svg/icons/Text/Toggle-Left.svg-->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <rect x="0" y="0" width="24" height="24"></rect>
              <path
                d="M2 11.5C2 12.3284 2.67157 13 3.5 13H20.5C21.3284 13 22 12.3284 22 11.5V11.5C22 10.6716 21.3284 10 20.5 10H3.5C2.67157 10 2 10.6716 2 11.5V11.5Z"
                fill="black"
              ></path>
              <path
                opacity="0.5"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17H20.5C21.3284 17 22 17.6716 22 18.5C22 19.3284 21.3284 20 20.5 20H9.5ZM15.5 6C14.6716 6 14 5.32843 14 4.5C14 3.67157 14.6716 3 15.5 3H20.5C21.3284 3 22 3.67157 22 4.5C22 5.32843 21.3284 6 20.5 6H15.5Z"
                fill="black"
              ></path>
            </g>
          </svg>
          <!--end::Svg Icon-->
        </span>
      </button>
      <!--end::Aside Toggle-->

      <div v-if="!logoUrl" class="d-flex align-items-baseline flex-wrap mr-5">
        <h5
          v-if="currentOrganisation"
          class="text-dark font-weight-bold my-1 mr-5"
        >
          {{ currentOrganisation.name }}
        </h5>
        <h5
          v-if="!currentOrganisation"
          class="text-dark-50 font-weight-bold my-1 mr-5"
        >
          Organisations
        </h5>
      </div>
    </div>

    <div
      class="aside aside-left d-flex"
      v-bind:class="{
        'aside-on': asideMenuVisible,
        'aside-fixed': !asideMenuVisible,
      }"
      id="kt_aside"
      v-clickout="handleAsideMenuClickout"
    >
      <div
        class="aside-menu-wrapper flex-column-fluid overflow-auto"
        id="kt_aside_menu_wrapper"
      >
        <div
          id="kt_aside_menu"
          class="aside-menu my-4"
          data-menu-vertical="1"
          data-menu-scroll="1"
          data-menu-dropdown-timeout="500"
        >
          <ul class="menu-nav">
            <li v-if="currentOrganisation" class="menu-item menu-item-submenu">
              <div
                class="menu-link menu-toggle"
                v-on:click="toggleOrganisationMenu()"
              >
                <span class="menu-icon">
                  <i class="flaticon2-rocket"></i>
                </span>
                <span class="menu-text font-weight-bold">{{
                  currentOrganisation.name
                }}</span>
                <i class="menu-arrow"></i>
              </div>
              <div class="menu-submenu" v-bind:style="organisationSubmenuStyle">
                <i class="menu-arrow"></i>
                <ul class="menu-subnav">
                  <li class="menu-item" aria-haspopup="true"></li>
                </ul>
              </div>
            </li>
            <li class="menu-section">
              <h4 class="menu-text">Organisations</h4>
              <i class="menu-icon ki ki-bold-more-hor icon-md"></i>
            </li>
            <li v-for="org in organisations" class="menu-item" :key="org.id">
              <div
                class="menu-link text-primary"
                v-on:click="openOrganisation(org)"
              >
                {{ org.name }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

import { IOrg } from "@/models";

export default defineComponent({
  props: ["currentOrganisation"],
  data: function (): any {
    return {
      asideMenuVisible: false,
      organisationSubmenuVisible: false,
      organisationSubmenuStyle: {
        display: "none",
        overflow: "hidden",
      },
      organisationsList: [],
    };
  },
  created: async function () {
    this.organisationsList = await this.$store.dispatch(
      "organisations/getOrganisations"
    );
  },
  computed: {
    organisations: function (): IOrg[] {
      return this.organisationsList
        .concat()
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((item: any) => !item.is_demo);
    },
  },
  methods: {
    toggleAsideMenu: function () {
      this.asideMenuVisible = !this.asideMenuVisible;
    },
    handleAsideMenuClickout: function (event: any) {
      if (
        !(document as any)
          .getElementById("kt_aside_toggle")
          .contains(event.target)
      ) {
        this.asideMenuVisible = false;
      }
    },
    toggleOrganisationMenu: function () {
      this.organisationSubmenuVisible = !this.organisationSubmenuVisible;

      if (this.organisationSubmenuVisible) {
        this.organisationSubmenuStyle = {
          display: "initial",
        };
      } else {
        this.organisationSubmenuStyle = {
          display: "none",
          overflow: "hidden",
        };
      }
    },
    openOrganisation: function (organisation: any) {
      if (this.$route.params.organisationId) {
        this.$router.push({
          params: {
            organisationId: organisation.id,
          },
        });
      } else {
        this.$router.push({
          name: "organisation-home",
          params: {
            organisationId: organisation.id,
          },
        });
      }
    },
  },
});
</script>
