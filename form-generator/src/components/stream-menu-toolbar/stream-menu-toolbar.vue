<template lang="html">
  <div class="d-flex justify-content-between my-4">
    <div class="d-flex align-items-center">
      <h4 class="display-4">Streams</h4>
      <span class="label label-pill label-inline ml-2">
        {{ streamCount }}
      </span>
    </div>
    <div class="d-flex">
      <div class="d-flex align-items-center">
        <div class="input-group input-group-lg">
          <input
            type="text"
            class="form-control"
            placeholder="Filter results..."
            v-bind:value="filterText"
            v-on:input="handleChangeFilterText"
          />
          <div class="input-group-append">
            <button
              type="button"
              class="btn btn-lg btn-icon"
              v-bind:class="{
                'btn-outline-dark': !boxLayoutVisible,
                'btn-dark': boxLayoutVisible,
              }"
              v-on:click="setBoxLayout()"
            >
              <i class="flaticon2-grids"></i>
            </button>
            <button
              type="button"
              class="btn btn-lg btn-icon"
              v-bind:class="{
                'btn-outline-dark': !tableLayoutVisible,
                'btn-dark': tableLayoutVisible,
              }"
              v-on:click="setTableLayout()"
            >
              <i class="flaticon2-list-1"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div class="btn-group ml-3">
          <button
            type="button"
            class="btn btn-lg btn-outline-secondary"
            v-on:click="onExport()"
            v-if="onExport"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { ISdsStream } from "@/models";

interface IData {
  boxLayoutVisible: boolean;
  tableLayoutVisible: boolean;
}

export default defineComponent({
  data: function (): IData {
    return {
      boxLayoutVisible: true,
      tableLayoutVisible: false,
    };
  },
  computed: {
    streamCount: function (): number {
      return this.streams.length;
    },
  },
  props: {
    filterText: String,
    onChangeFilterText: {
      type: Function as PropType<(text: string) => void>,
      required: true,
    },
    onExport: {
      type: Function as PropType<() => void>,
      required: false,
    },
    streams: {
      type: Array as PropType<ISdsStream[]>,
      required: true,
    },
  },
  watch: {
    "$route.query.layout": {
      handler: function () {
        const layout: string | undefined = this.$route.query.layout
          ? this.$route.query.layout.toString()
          : undefined;

        if (layout === "table") {
          this.boxLayoutVisible = false;
          this.tableLayoutVisible = true;
        } else if (layout === "box") {
          this.boxLayoutVisible = true;
          this.tableLayoutVisible = false;
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleChangeFilterText: function (e: any) {
      this.onChangeFilterText(e.target.value);
    },
    setTableLayout() {
      this.$router.push({
        query: {
          ...this.$route.query,
          layout: "table",
        },
      });
    },
    setBoxLayout() {
      this.$router.push({
        query: {
          ...this.$route.query,
          layout: "box",
        },
      });
    },
  },
});
</script>
