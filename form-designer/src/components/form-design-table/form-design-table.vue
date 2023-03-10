<template>
  <div>
    <span  v-if="schema?.title">{{ schema?.title }}</span>
    <div class="table-responsive">
      <table class="table table-bordered">
        <tbody>
          <tr v-for="(tr, trindex) in schema?.trs" id="myRow">
            <td
              v-for="(td, tdindex) in tr.tds"    
              :colspan="td.colspan"
              :rowspan="td.rowspan"
              v-show="td.colspan && td.rowspan"
              :id="trindex.toString() + '-' + tdindex.toString()"
              @click="configureTableSpan($event, trindex, tdindex)"
            >
          <div v-if="td.content" class="d-flex justify-content-center align-items-center">
            <component
            :is="td.content.type"
            :schema="td.content"
            :modelValue="modelValue[td.content.name]"
            @update:modelValue="updateModelVal($event, td.content.name)"
          ></component>
          </div>
          </td>
          </tr>
        </tbody>
      </table>
      <Teleport to="body">
        <RightClickMenu
          :element-id="schema?.id"
          :options="options"
          ref="tableCellMenu"
          @option-clicked="optionClicked"
      /></Teleport>
    </div>
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
import { FormDesignCheckbox } from "../form-design-checkbox";
import { FormDesignInput } from "../form-design-input";
import { FormDesignNumber } from "../form-design-number";
import { FormDesignRadio } from "../form-design-radio";
import { FormDesignText } from "../form-design-text";

import { RightClickMenu } from "../right-click-menu";
interface SelectedOption {
  name?: string;
  type?: string;
}
interface IData {
  options: SelectedOption[];
}
type TableEmits =
  | "update:modelValue"
  | "mergeRight"
  | "mergeBottom"
  | "configureCell"
  | "addColumn"
  | "addRow";
export default defineComponent({
  name: "Table",
  components: {
    RightClickMenu,
    FormDesignInput,
    FormDesignRadio,
    FormDesignCheckbox,
    FormDesignNumber,
    FormDesignText,
  },
  data(): IData {
    return {
      options: [
        { name: ClickMenuOptions.RIGHT },
        { name: ClickMenuOptions.BOTTOM },
        { type: "divider" },
        { name: ClickMenuOptions.CONFIGURE },
        { type: "divider" },
        { name: ClickMenuOptions.ADD_ROW },
        { name: ClickMenuOptions.ADD_COLUMN },
      ],
    };
  },
  props: {
    schema: { type: Object as PropType<FormControlJsonSchema | undefined> },
    preview: { type: Boolean as PropType<boolean>, default: false },
    modelValue: {
      type: Object as PropType<Record<string, unknown>>,
      default: (props: any) => ({}),
    },
  },
  emits: [
    "update:modelValue",
    "mergeRight",
    "mergeBottom",
    "configureCell",
    "addColumn",
    "addRow",
    ""
  ],
  methods: {
    configureTableSpan(e: MouseEvent, trIndex: number, tdIndex: number) {
      if (this.preview) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      const selectedCell: TableCell = {
        tableId: this.schema?.id as string,
        trIndex,
        tdIndex,
      };
      (this.$refs.tableCellMenu as any).showMenu(e, selectedCell);
    },
    optionClicked({ item, option }: any) {
      let event: TableEmits;
      switch (option.name) {
        case ClickMenuOptions.RIGHT:
          event = "mergeRight";
          break;
        case ClickMenuOptions.BOTTOM:
          event = "mergeBottom";
          break;
        case ClickMenuOptions.CONFIGURE:
          event = "configureCell";
          break;
        case ClickMenuOptions.ADD_COLUMN:
          event = "addColumn";
          break;
        case ClickMenuOptions.ADD_ROW:
          event = "addRow";
          break;
        default:
          throw new Error("Unknown option");
      }
      this.$emit(event, item);
    },
    updateModelVal(val:unknown, fieldName:string){
      this.$emit("update:modelValue", {...this.modelValue, [fieldName]:val});
    }
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
  height: 45px;
  width: 100px;
  word-break: break-all;
}
.table-cell {
  display: table-cell;
}
</style>
