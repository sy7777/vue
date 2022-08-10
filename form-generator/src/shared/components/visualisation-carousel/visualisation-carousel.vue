<template lang="html">
  <div v-if="visible" class="visualisation-carousel">
    <div class="visualisation-carousel-inner">
      <carousel
        :perPage="1"
        :autoplay="true"
        :autoplayTimeout="10000"
        :loop="true"
      >
        <slot></slot>
      </carousel>
    </div>
  </div>
</template>

<style lang="scss">
.visualisation-carousel {
  position: absolute;
  background: white;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  top: 0;
  left: 0;
  z-index: 1000;

  .VueCarousel {
    width: 100vw;

    .VueCarousel-slide {
      padding: 10px;
    }
  }

  .visualisation-carousel-inner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Carousel } from "vue-carousel";

export default defineComponent({
  beforeUnmount: function () {
    document.body.style.overflow = "auto";
  },
  components: {
    Carousel,
  },
  props: {
    visible: Boolean,
    columnCount: Number,
  },
  watch: {
    visible: {
      handler: function () {
        if (this.visible) {
          document.body.style.overflow = "hidden";
          window.scrollTo(0, 0);
        } else {
          document.body.style.overflow = "auto";
        }
      },
      immediate: true,
      deep: true,
    },
  },
});
</script>
