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
import {
  ClickMenuOptions,
  FormControlJsonSchema,
  TableCell,
  TableColumn,
  TableRow,
} from "@/models";
import { defineComponent, PropType } from "vue";

import { RightClickMenu } from "../right-click-menu";
interface SelectedOption {
  name?: string;
  type?: string;
}
interface IData {
  options: SelectedOption[];
  selectedOption: SelectedOption | undefined;
  selectedCell: TableCell | undefined;
  tableJson: TableRow[] | undefined;
}
export default defineComponent({
  name: "Table",
  components: { RightClickMenu },
  data(): IData {
    return {
      options: [
        { name: ClickMenuOptions.RIGHT },
        { name: ClickMenuOptions.BOTTOM },
        { type: ClickMenuOptions.TYPE },
        { name: ClickMenuOptions.ADD_ROW },
        { name: ClickMenuOptions.ADD_COLUMN },
      ],
      selectedOption: undefined,
      selectedCell: undefined,
      tableJson: undefined || this.schema?.trs,
    };
  },
  props: {
    schema: { type: Object as PropType<FormControlJsonSchema | undefined> },
  },
  // computed:{
  //   tableJson(){
  //     return this.tableJson = this.schema?.trs
  //   }  ,
  // },
  methods: {
    configureTableSpan(e: any, trIndex: number, tdIndex: number) {
      const selectedCell: TableCell = {
        tableId: this.schema?.id as string,
        trIndex,
        tdIndex,
      };
      (this.$refs.tableCellMenu as any).showMenu(e, selectedCell);
    },
    optionClicked({ item, option }: any) {
      this.selectedOption = option;
      this.selectedCell = item;
      // this.$emit("optionClicked", option.name);
      this.mergeRight();
      // console.log(this.selectedOption, this.selectedCell);
      // console.log(this.tableJson);
    },
    mergeRight() {
      // console.log(this.selectedOption);
      switch (this.selectedOption?.name) {
        case ClickMenuOptions.RIGHT:
          if (this.tableJson && this.selectedCell) {
            // get sum of all colspan
            const tds = this.tableJson[this.selectedCell?.trIndex].tds;
            const sumCols = tds.map(td=>td.rowspan).reduce((partial,value)=>{return partial + value});
            console.log("sumCols",sumCols);         
            // console.log(tds[this.selectedCell?.tdIndex].colspan);
            if (
              tds[this.selectedCell?.tdIndex + 1].colspan > 0
            ) {
              console.log(this.selectedCell, tds);
              tds[this.selectedCell?.tdIndex].colspan += 1;
              tds[this.selectedCell?.tdIndex + 1].colspan -= 1;
              console.log(this.selectedCell, tds);
            }
            // console.log(this.selectedCell, tds);
          }
      }
      // if (this.selectedOption?.name == ) {
      //   console.log("mergeRight has been clicked: ", this.selectedOption.name);
      //   if()
      //   this.tableJson?.
      // }
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
