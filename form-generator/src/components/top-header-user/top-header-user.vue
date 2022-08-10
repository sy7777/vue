<template lang="html">
  <div v-if="user" class="dropleft">
    <div v-on:click="toggle" class="dropdown pull-right dropdown-inline">
      <a
        href="#"
        class="d-flex align-items-center"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <div class="flex-column text-right d-none d-md-flex">
          <span class="text-muted font-weight-bold">Welcome</span>
          <span class="text-success font-weight-bold">
            {{ name }}
           <span v-if="isStaff" class="text-warning">(Staff)</span>
          </span>
        </div>
        <div class="symbol symbol-circle symbol-success ml-2">
          <span class="symbol-label">{{ initials }}</span>
        </div>
      </a>
      <div class="dropdown-menu" v-bind:class="{ show: visible }">
        <p class="px-5 pt-2 font-weight-bolder m-0">
          {{ user.name }}
        </p>
        <p class="px-5 pt-2 font-weight-bolder m-0">
          {{ user.email }}
        </p>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" :href="axisstreamAccountsUrl">Account</a>
        <div class="dropdown-divider"></div>
        <button class="dropdown-item" v-on:click="logout">Log Out</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

import { IUser } from "@/models";

interface IData {
  visible: boolean;
  axisstreamAccountsUrl: string;
}

export default defineComponent({
  data: function (): IData {
    return {
      visible: false,
      axisstreamAccountsUrl: process.env.VUE_APP_MY_AXISSTREAM_URL,
    };
  },
  created: function () {
    this.$store.dispatch("user/getUserWithCache");
  },
  computed: {
    ...mapState({
      user: (state: any) => state.user.user,
    }),
    name: function (): string {
      if (this.user) {
        return this.user.name.split(" ")[0];
      } else {
        return "";
      }
    },
    initials: function (): string {
      if (this.user) {
        return this.user.name
          .split(" ")
          .map((x) => x[0])
          .join(" ");
      } else {
        return "";
      }
    },
    isStaff: function(): boolean {
      return this.user.staff || this.user.staffAdmin;
    },
  },
  methods: {
    toggle: function (): void {
      this.visible = !this.visible;
    },
    logout: async function (): Promise<void> {
      await this.$store.dispatch("auth/logout");
      window.location.href = process.env.VUE_APP_MY_AXISSTREAM_URL;
    },
  },
});
</script>
