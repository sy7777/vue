<template>
  <div>
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
      <div class="form-group d-flex flex-column align-items-start">
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
          <div class="row" v-for="option in schema?.options">
            <div class="col-5 p-1">
              <input type="text" class="form-control" v-model="option.name" />
            </div>
            <div class="col-5 p-1">
              <input type="text" class="form-control" v-model="option.value" />
            </div>
            <div class="col-2 p-1 d-flex align-items-center justify-content-center">
              <i class="bi bi-trash"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { FieldType, FormControlJsonSchema, FormJsonSchema } from "@/models";
import { defineComponent, PropType } from "vue";
import { cloneDeep } from "lodash";
interface IData {
  selectedSchema: FormControlJsonSchema | undefined;
}
export default defineComponent({
  name: "FormDesignCustomise",
  data(): IData {
    return {
      selectedSchema: undefined,
    };
  },
  props: {
    schema: { type: Object as PropType<FormControlJsonSchema | undefined> },
  },
  methods: {
    addOption() {
      this.schema?.options?.push({
        name: "default name",
        value: "default option",
      });
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
i{
  cursor: pointer;
}

</style>
