<template lang="html">
  <div :class="classnames">
    <TopHeader />
    <main class="main">
      <slot></slot>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
.main-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .main {
    flex-grow: 1;
  }
}
</style>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { AppFooter } from "@/components";
import { TopHeader } from "@/components/top-header";

export default defineComponent({
  components: {
    TopHeader,
    AppFooter,
  },
  computed: {
    classnames: function (): string {
      if (this.className) {
        return `main-app ${this.className}`;
      } else {
        return "main-app";
      }
    },
  },
  props: {
    className: String,
  },
});
</script>
