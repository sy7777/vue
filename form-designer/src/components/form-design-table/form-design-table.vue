<template>
  <span>{{ schema?.title }}</span>

  <div class="table-responsive">
    <table class="table table-bordered">
      <tbody>
        <tr v-for="(tr, trindex) in schema?.trs">
          <td
            v-for="(td, tdindex) in tr.tds"
            :colspan="td.colspan"
            :rowspan="td.rowspan"
            :id="trindex.toString() + '-' + tdindex.toString()"
            @click.prevent.stop="configureTableSpan($event, trindex, tdindex)"
          ></td>
        </tr>
      </tbody>
    </table>
    <Teleport to="body">
      <RightClickMenu
        element-id="tableCellMenu"
        :options="options"
        ref="tableCellMenu"
        @option-clicked="optionClicked"
    /></Teleport>
  </div>
</template>

<script lang="ts">
import { FormControlJsonSchema, TableCell, TableColumn } from "@/models";
import { defineComponent, PropType } from "vue";

import { RightClickMenu } from "../right-click-menu";

export default defineComponent({
  name: "Table",
  components: { RightClickMenu },
  data() {
    return {
      options: [
        { name: "merge right" },
        { name: "merge bottom" },
        { type: "divider" },
        { name: "add row" },
      ],
    };
  },
  props: {
    schema: { type: Object as PropType<FormControlJsonSchema | undefined> },
  },
  methods: {
    configureTableSpan(e: any, trIndex: number, tdIndex: number) {
      const selectedCell: TableCell = {
        tableId: this.schema?.id as string,
        trIndex,
        tdIndex,
      };
      console.log(this.$refs);
      
      (this.$refs.tableCellMenu as any).showMenu(e, selectedCell);
    },
    optionClicked({ item, option }: any) {     
      console.log(item, option);
    },
  },
});
</script>

<style scoped>
table {
  table-layout: fixed;
}
tr {
  border: 1px solid #25623f;
  /* height: 100px; */
  width: 200px;
}
td {
  /* min-height: 100px; */
  width: 100px;
  word-break: break-all;
}
.table-cell {
  display: table-cell;
}
</style>
