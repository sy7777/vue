<template lang="html">
  <div>
    <div
      v-for="sdsTypeId in sdsTypes"
      class="card card-custom gutter-b"
      :key="sdsTypeId"
    >
      <div class="card-header flex-wrap py-3">
        <div class="card-title">
          <h3 class="card-label">
            {{ sdsTypeId }}
            <span class="d-block text-muted pt-2 font-size-sm"> </span>
          </h3>
        </div>
        <div class="card-toolbar"></div>
      </div>
      <div class="card-body">
        <div
          id="kt_datatable_wrapper"
          class="dataTables_wrapper dt-bootstrap4 no-footer"
        >
          <div class="row">
            <div class="col-sm-12">
              <table
                class="table table-bordered table-checkable dataTable no-footer table-responsive custom-table"
                id="kt_datatable"
              >
                <thead>
                  <tr>
                    <th
                      v-on:click="sortColumn('sdsStreamId')"
                      class="column-title"
                    >
                      Stream
                    </th>
                    <th
                      v-for="property in sdsTypeProperties(sdsTypeId)"
                      :key="property.Id"
                      v-on:click="sortColumn(property.Id)"
                      class="column-title"
                    >
                      {{ property.Name }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(dataset, i) in sdsTypeData(sdsTypeId)" :key="i">
                    <td>{{ dataset.sdsStream }}</td>
                    <td
                      v-for="(property, j) in sdsTypeProperties(sdsTypeId)"
                      :key="j"
                    >
                      {{ dataset[property.Id] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.column-title {
  cursor: pointer;
  user-select: none;
  background: white !important;

  &:hover {
    text-decoration: underline;
  }
}

.custom-table {
  height: 80vh;
  overflow: auto;

  thead th {
    position: sticky;
    top: 0;
    z-index: 1;
  }
}
</style>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import dayjs from "dayjs";

import { IAssetStream } from "@/shared/models";

interface IData {
  assetStreamsGroupedByType: any;
  columnSort: string;
  direction: string;
}

export default defineComponent({
  computed: {
    sdsTypes: function (): string[] {
      return Object.keys(this.assetStreamsGroupedByType);
    },
  },
  data: function (): IData {
    return {
      assetStreamsGroupedByType: {},
      columnSort: "Timestamp",
      direction: "asc",
    };
  },
  methods: {
    processData: function (data: any[]): void {
      this.assetStreamsGroupedByType = data.reduce((acc, dataset) => {
        const assetStream = dataset.assetStream;

        return {
          ...acc,
          [assetStream.sdsStream.TypeId]: (
            acc[assetStream.sdsStream.TypeId] || []
          ).concat(dataset),
        };
      }, {});
    },
    sdsTypeProperties: function (sdsTypeId: string): any[] {
      return this.data.find((item) => {
        return item.assetStream.sdsStream.TypeId === sdsTypeId;
      }).assetStream.properties;
    },
    sortColumn: function (column: string) {
      this.columnSort = column;

      if (this.direction === "asc") {
        this.direction = "desc";
      } else {
        this.direction = "asc";
      }
    },
    sdsTypeData: function (sdsTypeId: string): any[] {
      return this.data
        .filter((item) => item.assetStream.sdsStream.TypeId === sdsTypeId)
        .flatMap((item) =>
          item.data.map((data) => ({
            ...data,
            sdsStream: item.assetStream.sdsStream.Name,
          }))
        )
        .sort((a, b) => {
          const first =
            this.direction === "asc" ? a[this.columnSort] : b[this.columnSort];
          const second =
            this.direction === "asc" ? b[this.columnSort] : a[this.columnSort];

          if (first && second) {
            const isDate: boolean =
              typeof first === "string" && !isNaN(new Date(first).getTime());
            const isNumber: boolean = typeof first === "number";

            if (isDate) {
              return new Date(second).getTime() - new Date(first).getTime();
            } else if (isNumber) {
              return second - first;
            } else {
              return second.localeCompare(first);
            }
          } else {
            return b.sdsStreamId - a.sdsStreamId;
          }
        })
        .map((item) => {
          if (item.Timestamp) {
            return {
              ...item,
              Timestamp: dayjs(item.Timestamp).format("DD/MM/YYYY hh:mm a"),
            };
          } else {
            return item;
          }
        });
    },
  },
  props: {
    data: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },
  watch: {
    data: {
      handler: function () {
        this.processData(this.data);
      },
      immediate: true,
      deep: true,
    },
  },
});
</script>
