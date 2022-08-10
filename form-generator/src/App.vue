<template lang="html">
  <div id="app">
    <template v-if="isReady">
      <router-view v-if="isAuthorised"></router-view>
      <div v-else class="container my-20">
        <div class="row">
          <div class="col-12">
            <div class="alert alert-danger">
              <h4 class="alert-title">
                Not authorised to view this page
              </h4>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="!isReady">
      <div class="vh-100 d-flex align-items-center justify-content-center">
        <Spinner />
      </div>
    </template>
  </div>
  <notifications />
</template>

<style lang="scss">
@import "./scss/style.scss";
@import "./scss/plugins.scss";
</style>

<script lang="ts">
import { defineComponent } from "vue";

import { Spinner } from "@/components";
import { LOGIN_URL } from "@/shared/constants";
import { IUser, ICustomer } from "@/models";

interface IData {
  isReady: boolean;
  isAuthorised: boolean;
}

export default defineComponent({
  created: async function () {
    try {
      const user: IUser = await this.$store.dispatch("user/getUser");

      if (user.staff || user.staffAdmin) {
        this.isAuthorised = true;
      } else {
        this.isAuthorised = false;
      }

      this.isReady = true;

    } catch (error) {
      console.error(error);
      const href = `${LOGIN_URL}?redirect=${window.location.href}`;
      console.log('href', href);
      window.location.href = href;
    }
  },
  data: function (): IData {
    return {
      isReady: false,
      isAuthorised: false,
    };
  },
  methods: {
    checkReadyState: function (): void {
      this.isReady = this.$store.getters["auth/isReady"]();
    },
  },
});
</script>
