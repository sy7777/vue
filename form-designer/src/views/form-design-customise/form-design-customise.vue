<template>
  <div class="customise-area">
    <div class="border-bottom">Customise the field</div>
    <div v-if="selectedSchema">
      <!-- {{ selectedSchema.id }} -->
      <div class="form-group d-flex flex-column align-items-start">
        <label>Title</label>
        <input
          type="text"
          class="form-control"
          v-model="selectedSchema.title"
        />
      </div>
      <div
        class="form-group d-flex flex-column align-items-start"
        v-if="!hideFieldName"
      >
        <label>Field Name(Short name of the title)</label>
        <input type="text" class="form-control" v-model="selectedSchema.name" />
      </div>
      <div
        class="form-group d-flex flex-column align-items-start"
        v-if="displayPlaceholder"
      >
        <label>Placeholder</label>
        <input
          type="text"
          class="form-control"
          v-model="selectedSchema.placeholder"
        />
      </div>
      <div class="form-group" v-if="displayOptions">
        <div class="d-flex justify-content-between">
          <label>Options</label
          ><i class="bi bi-plus-circle" @click="addOption"></i>
        </div>

        <div
          class="row"
          v-for="(option, index) in selectedSchema?.options"
          :key="index"
        >
          <div class="col-5 p-1">
            <input type="text" class="form-control" v-model="option.name" />
          </div>
          <div class="col-5 p-1">
            <input type="text" class="form-control" v-model="option.value" />
          </div>
          <div
            class="col-2 p-1 d-flex align-items-center justify-content-center"
          >
            <i class="bi bi-trash" @click="deleteOption(index)"></i>
          </div>
        </div>
      </div>
      <div class="form-group" v-if="displayTableOption && selectedCell">
        <div class="d-flex flex-column align-items-start">
          <label>Table Cell Content Type:</label>
          <select class="form-select" v-model="selectedCell.content.type">
            <option :value="option.value" v-for="option in cellOptions" :key="option.name">
              {{ option.name }}
            </option>
          </select>
        </div>

        <div
          v-if="displayTableCellText"
          class="d-flex flex-column align-items-start"
        >
          <label>Table cell text:</label>
          <textarea
            type="text"
            class="form-control"
            v-model="selectedCell.content.title"
          />
        </div>
        <div
        class="d-flex flex-column align-items-start"
        v-if="!displayTableCellText"
      >
        <label>Cell name(Short name)</label>
        <input type="text" class="form-control" v-model="selectedCell.content.name" />
      </div>
      </div>
    </div>
    <div
      v-else
      class="empty-state d-flex justify-content-center align-items-center"
    >
      <EmptyState :emptyMsg="emptyMsg"></EmptyState>
    </div>
  </div>
</template>

<script lang="ts">
import {
  FieldType,
  FormControlJsonSchema,
  FormJsonSchema,
  TableCell,
  TableColumn,
  TableRow,
} from "@/models";
import { defineComponent, PropType } from "vue";
import { cloneDeep } from "lodash";
import { EmptyState } from "@/components";
import { v4 as uuidv4 } from "uuid";
interface IData {
  selectedSchema: FormControlJsonSchema | undefined;
  emptyMsg: string;
  selectedCell: TableColumn | undefined;
  cellOptions: { name: string; value: FieldType }[];
}
export default defineComponent({
  name: "FormDesignCustomise",
  components: { EmptyState },
  data(): IData {
    return {
      selectedSchema: undefined,
      emptyMsg: "Please select a form control.",
      selectedCell: undefined,
      cellOptions: [
        { name: "Input Box", value: FieldType.INPUT },
        { name: "Text", value: FieldType.TEXT },
        { name: "CheckBox", value: FieldType.CHECKBOX },
        { name: "Radio", value: FieldType.RADIO },
      ],
    };
  },
  props: {
    schema: { type: Object as PropType<FormControlJsonSchema | undefined> },
  },
  methods: {
    addOption() {
      this.selectedSchema?.options?.push({
        name: "default name",
        value: "default option",
      });
    },
    deleteOption(index: number) {
      if (
        this.selectedSchema?.options?.length &&
        this.selectedSchema?.options?.length > 1
      ) {
        this.selectedSchema?.options?.splice(index, 1);
      }
    },
    addRow(cell: TableCell) {
      if (this.selectedSchema?.trs) {
        const sumCols = this.selectedSchema?.trs[0].tds
          .map((item) => item.colspan)
          .reduce(function (partial, value) {
            return partial + value;
          });
        const rowJson: TableRow = { tds: [] };
        for (let i = 0; i < sumCols; i++) {
          // insert value as selected index
          rowJson.tds.splice(cell.trIndex + 1, 0,{
            colspan: 1,
            rowspan: 1,
            content: {
              id: uuidv4(),
              type: FieldType.TEXT,
              name: `table_field_${uuidv4()}`,
              placeholder: "Please enter...",
              required: false,
              options: [{ value: "default option" }],
            },
          });
        }

        // get the current rowspan max
        let maxRowSpan = 1;
        this.selectedSchema?.trs[cell.trIndex].tds.forEach((item) => {
          if (maxRowSpan < item.rowspan) {
            maxRowSpan = item.rowspan;
          }
        });

        // insert value in max rowspan
        this.selectedSchema?.trs.splice(cell.trIndex + maxRowSpan, 0, rowJson);
      }
    },
    deleteRow(index: number) {
      if (this.selectedSchema?.trs && this.selectedSchema?.trs.length > 1) {
        this.selectedSchema?.trs?.splice(index, 1);
      }
    },
    addColumn(cell: TableCell) {
      this.selectedSchema?.trs?.forEach((tr) => {
        tr.tds.splice(cell.tdIndex + 1, 0, {
          colspan: 1,
          rowspan: 1,
          content: {
            id: uuidv4(),
            type: FieldType.TEXT,
            name: `table_field_${uuidv4()}`,
            placeholder: "Please enter...",
            required: false,
            options: [{ value: "default option" }],
          },
        });
      });
    },
    deleteColumn(index: number) {
      this.selectedSchema?.trs?.forEach((tr) => {
        if (tr.tds.length > 1) {
          tr.tds.splice(index, 1);
        }
      });
    },
    configureCell(cell: TableCell) {
      // this.$vbsModal.open({ content: EditTableRow });
      if (this.selectedSchema?.trs) {
        this.selectedCell =
          this.selectedSchema?.trs[cell.trIndex].tds[cell.tdIndex];
      }
    },
    mergeRight(cell: TableCell) {
      if (this.selectedSchema?.trs) {
        const tds = this.selectedSchema.trs[cell.trIndex].tds;
        // calculate sum of cols
        const sumCols = tds
          .map((td: TableColumn) => td.colspan)
          .reduce((partial, value) => {
            return partial + value;
          });
        // check if this is the last col, if so, cannot merge ??
        if (sumCols - tds[cell.tdIndex].colspan <= cell?.tdIndex) {
          this.$vbsModal.confirm({message:"It is the last col, cannot merge",icon:"bi bi-exclamation-circle"});
          return;
        }
        // get the current table cell colspan
        const currentColspan = tds[cell.tdIndex].colspan;
        // check selected cell rowspan insistant with the one will be merged
        if (
          tds[cell.tdIndex].rowspan !==
          tds[cell.tdIndex + currentColspan].rowspan
        ) {
          this.$vbsModal.confirm({message:"rowspan is not suitable, cannot merge",icon:"bi bi-exclamation-circle"});
          console.log("rowspan is not suitable, cannot merge");
          return;
        }
        // merge cells
        tds[cell.tdIndex].colspan += tds[cell.tdIndex + currentColspan].colspan;
        // set the colspan of merged cell to 0
        tds[cell.tdIndex + currentColspan].colspan = 0;
      }
    },
    mergeBottom(cell: TableCell) {
      // check last row
      if (this.selectedSchema?.trs) {
        const tds = this.selectedSchema.trs[cell.trIndex].tds;
        if (
          this.selectedSchema?.trs.length - tds[cell.tdIndex].rowspan <=
          cell.trIndex
        ) {
          this.$vbsModal.confirm({message:"It is the last row, cannot merge",icon:"bi bi-exclamation-circle"});
          console.log("this is the last row");
          return;
        }
        // getCurrentRowspan
        const currentRowspan = tds[cell.tdIndex].rowspan;
        // check rowspan insistant with next one
        if (
          tds[cell.tdIndex].colspan !==
          this.selectedSchema.trs[cell.trIndex + currentRowspan].tds[
            cell.tdIndex
          ].colspan
        ) {
          console.log("rowspan doesn't match");
          return;
        }
        // get next row rowspan
        const nextRowspan =
          this.selectedSchema.trs[cell.trIndex + currentRowspan].tds[
            cell.tdIndex
          ].rowspan;
        // merge
        tds[cell.tdIndex].rowspan = currentRowspan + nextRowspan;
        // set merged cell rowspan to 0
        this.selectedSchema.trs[cell.trIndex + currentRowspan].tds[
          cell.tdIndex
        ].rowspan = 0;
      }
    },
  },
  computed: {
    displayOptions() {
      return (
        this.selectedSchema?.type === FieldType.CHECKBOX ||
        this.selectedSchema?.type === FieldType.RADIO
      );
    },
    displayPlaceholder() {
      return (
        this.selectedSchema?.type === FieldType.INPUT ||
        this.selectedSchema?.type === FieldType.NUMBER ||
        this.selectedSchema?.type === FieldType.TEXTAREA
      );
    },
    hideFieldName() {
      return this.selectedSchema?.type === FieldType.TEXT;
    },
    displayTableOption() {
      return this.selectedSchema?.type === FieldType.TABLE;
    },
    displayTableCellText() {
      return this.selectedCell?.content.type === FieldType.TEXT;
    },
  },
  watch: {
    schema: {
      immediate: true,
      handler: function (newVal: FormControlJsonSchema) {
        console.log(newVal);
        if (newVal) {
          this.selectedCell = undefined;
          this.selectedSchema = { ...newVal };
          if (newVal.options) {
            this.selectedSchema = {
              ...this.selectedSchema,
              options: [...newVal.options],
            };
          }
        } else {
          this.selectedSchema = undefined;
        }
      },
    },
    "selectedCell.content.type": {
      handler: function (newVal: FieldType, oldVal: FieldType) {
        if (
          this.selectedCell &&
          newVal !== FieldType.TEXT &&
          oldVal === FieldType.TEXT
        ) {
          this.selectedCell.content.title = undefined;
        }
      },
      deep: true,
    },
    selectedSchema: {
      handler: function (newVal: FormControlJsonSchema) {
        if (newVal) {
          this.$emit("onUpdateControlDetail", cloneDeep(newVal));
        }
      },
      deep: true,
    },
  },
});
</script>
<style scoped>
.form-group {
  padding: 0.7rem;
}
i {
  cursor: pointer;
}
.customise-area {
  height: 100%;
  overflow: auto;
}
.empty-state {
  height: 90%;
}
.row-area {
  border: 1px dashed #0000;
  background-color: rgb(237, 232, 232);
  margin: 7px;
}
</style>
