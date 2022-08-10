<template lang="html">
  <div>
    <div id="kt_header_mobile" class="header-mobile header-mobile-fixed">
      <router-link :to="{ name: 'home' }">
        <img
          src="@/assets/logos/Transparent-2.png"
          alt="logo"
          class="max-h-30px"
        />
      </router-link>
      <div class="d-flex align-items-center">
        <button
          class="btn btn-icon rounded-0 ml-4"
          id="kt_aside_mobile_top_header_toggle"
          @click="toggleAsideMenu"
        >
          <span class="svg-icon svg-icon-xxl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              version="1.1"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
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
          </span>
        </button>
        <TopHeaderUser />
      </div>
    </div>
    <div
      class="aside aside-left d-flex"
      v-bind:class="{
        'aside-on': asideMenuVisible,
        'aside-fixed': !asideMenuVisible,
      }"
      id="kt_aside_mobile_top_header"
      v-clickout="handleAsideMenuClickout"
    >
      <div
        class="aside-menu-wrapper flex-column-fluid overflow-auto"
        id="kt_aside_mobile_top_header_menu_wrapper"
      >
        <div
          id="kt_aside_mobile_top_header_menu"
          class="aside-menu my-4"
          data-menu-vertical="1"
          data-menu-scroll="1"
          data-menu-dropdown-timeout="500"
        >
          <ul class="menu-nav">
            <li
              v-for="menuItem in menuItems"
              class="menu-item"
              v-bind:class="{
                'menu-item-active': activeRoute(menuItem.route),
              }"
              v-bind:key="menuItem.name"
            >
              <router-link :to="{ name: menuItem.route }" class="menu-link">
                <span class="menu-text">{{ menuItem.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="kt_header" class="header header-fixed">
      <div class="container-fluid">
        <div
          class="header-menu-wrapper header-menu-wrapper-left"
          id="kt_header_menu_wrapper"
        >
          <div class="header-logo mr-10 d-none d-lg-flex">
            <router-link :to="{ name: 'home' }">
              <img
                src="@/assets/logos/Transparent-2.png"
                alt="logo"
                class="h-40px"
              />
            </router-link>
          </div>
          <div
            id="kt_header_menu"
            class="header-menu header-menu-left header-menu-mobile header-menu-layout-default"
          >
            <ul class="menu-nav">
              <li
                v-for="menuItem in menuItems"
                class="menu-item"
                v-bind:class="{
                  'menu-item-active': activeRoute(menuItem.module),
                }"
                v-bind:key="menuItem.name"
              >
                <router-link :to="{ name: menuItem.route }" class="menu-link">
                  <span class="menu-text">{{ menuItem.name }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="topbar">
          <div class="topbar-item">
            <TopHeaderUser />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { TopHeaderUser } from "@/components/top-header-user";

interface IMenuItem {
  name: string;
  route: string;
  module: string;
}

const menuItems: IMenuItem[] = [
  {
    name: "Home",
    route: "home",
    module: "home",
  },
  {
    name: "Reports",
    route: "reports",
    module: "reports",
  },
  {
    name: "HSDCP",
    route: "hsdcp",
    module: "hsdcp",
  },
];

export default defineComponent({
  components: {
    TopHeaderUser,
  },
  data: function (): any {
    return {
      asideMenuVisible: false,
      menuItems,
    };
  },
  methods: {
    toggleAsideMenu: function () {
      this.asideMenuVisible = !this.asideMenuVisible;
    },
    activeRoute: function (testModule: string): boolean {
      const currentModule: string | undefined = (
        (this.$route.matched.find((route: any) => !!route.meta.module) || {})
          .meta || {}
      ).module;

      return testModule === currentModule;
    },
    handleAsideMenuClickout: function (event: any) {
      if (
        !(document as any)
          .getElementById("kt_aside_mobile_top_header_toggle")
          .contains(event.target)
      ) {
        this.asideMenuVisible = false;
      }
    },
  },
});
</script>
