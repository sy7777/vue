<template lang="html">
  <button
    type="button"
    class="btn btn-block btn-light-primary font-weight-bolder btn-google-oauth"
    @click="login"
    v-bind:disabled="isLoading"
  >
    <template v-if="!isLoading">
      <!--<GoogleIcon style="margin-right: 8px" />-->
      Sign in with Google
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
.btn-google-oauth {
  font-family: "Roboto", sans-serif;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

// eslint-disable-next-line
// @ts-ignore
//import GoogleIcon from "@/assets/btn-google-light-normal-ios.svg";
import { IAuthLoginUrlData } from "@/models/Auth";

export default defineComponent({
  components: {
    //GoogleIcon,
  },
  data: function () {
    return {
      isLoading: false,
    };
  },
  methods: {
    login: async function () {
      this.isLoading = true;
      const res: IAuthLoginUrlData = await axios.get("/login-url/google");
      const redirectUrl = res.redirect_url;
      window.location.replace(redirectUrl);
    },
  },
});
</script>
