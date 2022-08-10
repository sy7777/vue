<template lang="html">
  <div class="subheader py-6" id="kt_subheader">
    <div
      class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
    >
      <div class="d-flex align-items-baseline flex-wrap mr-5">
        <h5 class="text-dark-50 font-weight-bold my-1 mr-5">SDS</h5>
      </div>
      <div class="d-flex">
        <div class="d-flex align-items-center flex-wrap mr-3">
          <router-link
            class="btn btn-clean btn-sm font-weight-bold font-size-base mr-1"
            :to="{ name: 'sds-home' }"
          >
            Home
          </router-link>
          <router-link
            class="btn btn-clean btn-sm font-weight-bold font-size-base mr-1"
            :to="{ name: 'sds-tokens' }"
          >
            Tokens
          </router-link>
          <router-link
            class="btn btn-clean btn-sm font-weight-bold font-size-base mr-1"
            :to="{ name: 'sds-types' }"
          >
            Types
          </router-link>
          <router-link
            class="btn btn-clean btn-sm font-weight-bold font-size-base mr-1"
            :to="{ name: 'sds-streams' }"
          >
            Streams
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type MaybeString = undefined | string;

interface IData {
  menuVisible: boolean;
}

export default defineComponent({
  data: function (): IData {
    return {
      menuVisible: false,
    };
  },
  methods: {
    toggleMenu: function (): void {
      this.menuVisible = !this.menuVisible;
    },
    handleMenuClickout: function (event: any): void {
      if (
        !(document as any)
          .getElementById("sdsMenuDropdownButton")
          .contains(event.target)
      ) {
        this.menuVisible = false;
      }
    },
  },
});
</script>
