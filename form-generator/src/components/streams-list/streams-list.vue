<template lang="html">
  <div>
    <div v-if="loading" class="w-100 d-flex justify-content-center">
      <div class="d-block spinner-border text-primary">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-if="!loading && !tableLayoutVisible" class="row">
      <div class="col-md-3" v-for="sdsStream in streams" :key="sdsStream.Id">
        <div
          class="card card-custom gutter-b border border-light"
          v-on:click="handleClickStream(sdsStream)"
          style="cursor: pointer"
        >
          <div class="card-header overflow-auto">
            <h5 class="card-title">
              {{ sdsStream.Description }}
            </h5>
          </div>
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">{{ sdsStream.Id }}</h6>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!loading && tableLayoutVisible" class="table-responsive mb-5">
      <table class="table table-sm table-hover table-striped">
        <thead>
          <th class="border-top-0" scope="col">ID</th>
          <th class="border-top-0" scope="col">Description</th>
        </thead>
        <tbody>
          <tr v-for="sdsStream in streams" :key="sdsStream.Id">
            <td>
              <button
                type="button"
                class="btn btn-link"
                v-on:click="handleClickStream(sdsStream)"
              >
                {{ sdsStream.Id }}
              </button>
            </td>
            <td>
              {{ sdsStream.Description }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { ISdsStream } from "@/models";

export default defineComponent({
  props: {
    streams: {
      type: Array as PropType<ISdsStream[]>,
      required: true,
    },
    loading: Boolean,
    onSelectStream: {
      type: Function as PropType<(sdsStream: ISdsStream) => void>,
      required: true,
    },
  },
  data: function (): any {
    return {
      boxLayoutVisible: true,
      tableLayoutVisible: false,
    };
  },
  watch: {
    "$route.query.layout": {
      handler: function () {
        const layout: string | undefined = this.$route.query.layout;

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
    handleClickStream: function (sdsStream: ISdsStream) {
      this.onSelectStream(sdsStream);
    },
  },
});
</script>
