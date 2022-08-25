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
        <div>
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
      </div>
      <div class="form-group" v-if="displayTableOption">
        <div class="d-flex justify-content-between">
          <label>Table Config</label>
          <div class="d-flex">
            <i class="bi bi-plus-circle" @click="addRow">Add Row &nbsp;</i>
            <i class="bi bi-plus-circle" @click="addColumn">Add Column</i>
          </div>
        </div>
        <div>
          <div
            class="row-area"
            v-for="(row, index) in selectedSchema?.trs"
            :key="index"
          >
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <div class="d-flex justify-content-between">
                      <div>row - {{ index + 1 }}</div>
                      <div class="d-flex">
                        <i class="bi bi-gear" @click="configRow(row)"></i>
                        <i class="bi bi-trash" @click="deleteRow(index)"></i>
                      </div>
                    </div>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div v-for="(column, index) in row.tds" class="row">
                      <div class="col-3 p-1">
                        colspan
                        <input type="text" class="form-control" />
                      </div>
                      <div class="col-3 p-1">
                        rowspan
                        <input type="text" class="form-control" />
                      </div>
                      <div class="col-3 p-1">
                        type
                        <input type="text" class="form-control" />
                      </div>
                      <div
                        class="col-2 p-1 d-flex align-items-center justify-content-center"
                      >
                        <i class="bi bi-trash" @click="deleteOption(index)"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div v-for="(column, index) in row.tds" class="row">
              <div class="col-3 p-1">
                colspan
                <input type="text" class="form-control" />
              </div>
              <div class="col-3 p-1">
                rowspan
                <input type="text" class="form-control" />
              </div>
              <div class="col-3 p-1">
                type
                <input type="text" class="form-control" />
              </div>
              <div
                class="col-2 p-1 d-flex align-items-center justify-content-center"
              >
                <i class="bi bi-trash" @click="deleteOption(index)"></i>
              </div>
            </div> -->
          </div>
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
  TableRow,
} from "@/models";
import { defineComponent, PropType } from "vue";
import { cloneDeep } from "lodash";
import { EmptyState } from "@/components";
import { tsRestType } from "@babel/types";
import { EditTableRow } from "@/components/edit-table-row";
interface IData {
  selectedSchema: FormControlJsonSchema | undefined;
  emptyMsg: string;
}
export default defineComponent({
  name: "FormDesignCustomise",
  components: { EmptyState },
  data(): IData {
    return {
      selectedSchema: undefined,
      emptyMsg: "Please select a form control.",
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
    addRow() {
      const lastRow =
        this.selectedSchema?.trs?.[this.selectedSchema?.trs?.length - 1];
      // const newRow = this.selectedSchema?.trs
      this.selectedSchema?.trs?.push(cloneDeep(lastRow) as TableRow);
    },
    deleteRow(index: number) {
      if (this.selectedSchema?.trs && this.selectedSchema?.trs.length > 1) {
        this.selectedSchema?.trs?.splice(index, 1);
      }
    },
    addColumn() {
      this.selectedSchema?.trs?.forEach((tr) => {
        tr.tds.push({ colspan: 1, rowspan: 1 });
      });
    },
    deleteColumn(index: number) {
      this.selectedSchema?.trs?.forEach((tr) => {
        if (tr.tds.length > 1) {
          tr.tds.splice(index, 1);
        }
      });
    },
    configRow(row: TableRow) {
      this.$vbsModal.open({ content: EditTableRow });
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
      return (
        this.selectedSchema?.type === FieldType.TEXT ||
        this.selectedSchema?.type === FieldType.TABLE
      );
    },
    displayTableOption() {
      return this.selectedSchema?.type === FieldType.TABLE;
    },
  },
  watch: {
    schema: {
      immediate: true,
      handler: function (newVal: FormControlJsonSchema) {
        console.log(newVal);
        if (newVal) {
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
