<template lang="html">
  <div>
    <div v-if="loading" class="w-100 d-flex justify-content-center">
      <div class="d-block spinner-border text-primary">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-if="!loading">
      <div v-if="tableLayoutVisible" class="card card-body p-0 overflow-hidden">
        <div class="table-responsive mb-0">
          <table class="table table-sm table-hover table-striped my-0">
            <thead>
              <th class="border-top-0" scope="col">ID</th>
              <th class="border-top-0" scope="col">Description</th>
              <th class="border-top-0" scope="col">Attributes</th>
              <th class="border-top-0" scole="col">Streams</th>
            </thead>
            <tbody>
              <tr v-for="sdsType in sdsTypes" :key="sdsType.Id">
                <td>
                  <button
                    type="button"
                    class="btn btn-link bg-none shadow-none btn-sm"
                    v-on:click="handleClickType(sdsType)"
                  >
                    {{ sdsType.Id }}
                  </button>
                </td>
                <td>
                  {{ sdsType.Description }}
                </td>
                <td>
                  {{ sdsType.Properties.length }}
                </td>
                <td>
                  {{ getStreamCount(sdsType) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="boxLayoutVisible" class="row">
        <div class="col-md-4" v-for="sdsType in sdsTypes" :key="sdsType.Id">
          <div class="card mb-3">
            <div class="card-body">
              <h5
                class="card-title cursor-pointer"
                @click="handleClickType(sdsType)"
              >
                {{ sdsType.Description }}
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ sdsType.Name }}</h6>
              <p class="card-text">
                {{ sdsType.Id }}
              </p>
              <span class="badge badge-secondary">
                {{ sdsType.Properties.length }} attributes
              </span>
              <span class="badge badge-warning ml-2">
                {{ getStreamCountText(sdsType) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { ISdsStream, ISdsType } from "@/models";

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
  methods: {
    handleClickType: function (sdsType: ISdsType) {
      this.onSelectType(sdsType);
    },
    getStreamCount: function (sdsType: ISdsType) {
      return this.sdsStreams.filter((sdsStream: ISdsStream) => {
        return sdsStream.TypeId === sdsType.Id;
      }).length;
    },
    getStreamCountText: function (sdsType: ISdsType) {
      const count: number = this.getStreamCount(sdsType);

      return count === 1 ? `${count} stream` : `${count} streams`;
    },
  },
  props: {
    sdsStreams: {
      type: Array as PropType<ISdsStream[]>,
      required: true,
    },
    sdsTypes: {
      type: Array as PropType<ISdsType[]>,
      required: true,
    },
    loading: Boolean,
    onSelectType: {
      type: Function as PropType<(sdsType: ISdsType) => void>,
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
});
</script>
