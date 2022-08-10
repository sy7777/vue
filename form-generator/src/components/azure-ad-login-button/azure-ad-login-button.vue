<template lang="html">
  <button
    type="button"
    class="btn btn-block btn-light-primary font-weight-bolder btn-microsoft"
    @click="login"
    v-bind:disabled="isLoading"
  >
    <template v-if="!isLoading">
      <!--<MicrosoftIcon style="margin-right: 8px" />-->
      Sign in with Microsoft
    </template>
    <template v-if="isLoading">
      <span class="btn-icon__label">
        <div
          class="spinner-border text-primary"
          style="width: 1rem; height: 1rem"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </span>
    </template>
  </button>
</template>

<style lang="scss" scoped>
.btn-microsoft {
  font-family: "Segoe UI Regular", sans-serif;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

// eslint-disable-next-line
// @ts-ignore
//import MicrosoftIcon from "@/assets/microsoft.svg";

interface IData {
  isLoading: boolean;
}

export default defineComponent({
  components: {
    //MicrosoftIcon,
  },
  data: function (): IData {
    return {
      isLoading: false,
    };
  },
  methods: {
    login: async function () {
      this.isLoading = true;
      const res: any = await axios.get("login-url/azure");
      const redirectUrl = res.redirect_url;

      window.location.replace(redirectUrl);
    },
  },
});
</script>
