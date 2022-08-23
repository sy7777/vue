<template>
  <div>
    <div class="border-bottom">Basic Fields</div>
    <!-- <div class="row gx-1 gy-1"> -->
      <div
        class="d-flex justify-content-center form-designer-field-list"
        v-for="field in fields"
      >
        <div
          class="form-designer-field"
          @click="emitFormField(field.type)"
        >
          <strong>{{ field.name }}</strong>
          <i :class="field.icon"></i>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import {
  FieldDetail,
  FieldType,
  FormControlJsonSchema,
  FormJsonSchema,
} from "@/models";
import { defineComponent } from "vue";
import { v4 as uuidv4 } from "uuid";
interface FieldList {
  fields: FieldDetail[];
}
export default defineComponent({
  name: "FormDesignFields",
  data(): FieldList {
    return {
      fields: [
        {
          type: FieldType.INPUT,
          name: "Input box",
          icon: "bi-input-cursor bi form-icon",
        },
        {
          type: FieldType.TEXTAREA,
          name: "Textarea",
          icon: "bi-card-text bi form-icon",
        },
        {
          type: FieldType.NUMBER,
          name: "Number",
          icon: "bi-123 bi form-icon",
        },
        {
          type: FieldType.RADIO,
          name: "Single Select",
          icon: "bi-check2-circle bi form-icon",
        },
        {
          type: FieldType.CHECKBOX,
          name: "Multiple Select",
          icon: "bi-check2-square bi form-icon",
        },
        {
          type: FieldType.TABLE,
          name: "Table",
          icon: "bi-grid-3x2 bi form-icon",
        },
        {
          type: FieldType.TEXT,
          name: "Text",
          icon: "bi bi-fonts form-icon",
        },
        // {
        //   type: "button",
        //   name: "Button",
        //   icon: "bi-bootstrap bi form-icon",
        // },
      ],
    };
  },
  methods: {
    emitFormField(type: FieldType) {
      let formJsonSchema: FormControlJsonSchema = {
        id: uuidv4(),
        type: type,
        name: `field_${uuidv4()}`,
        title: "Default Title",
        placeholder: "Please enter...",
        required: false,
      };
      if (type === FieldType.CHECKBOX || type === FieldType.RADIO) {
        formJsonSchema = {
          ...formJsonSchema,
          options: [{ value: "default option", name: "default name" }],
        };
      }
      if (type === FieldType.TABLE) {
        formJsonSchema = {
          ...formJsonSchema,
          trs: [
            {
              tds: [
                {
                  colspan: 1,
                  rowspan: 1,
                },
                {
                  colspan: 1,
                  rowspan: 1,
                },
              ],
            },
            {
              tds: [
                {
                  colspan: 1,
                  rowspan: 1,
                },
                {
                  colspan: 1,
                  rowspan: 1,
                },
              ],
            },
          ],
        };
      }
      this.$emit("onAddItem", formJsonSchema);
    },
  },
});
</script>

<style scoped>
.form-designer-field-list {
  padding: 0 10px 7px 30px;
  flex-flow: row wrap;
}
.form-designer-field {
  background-color: #25623f;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  height: 32px;
  line-height: 24px;
  margin: 10px 0 0;
  overflow: hidden;
  padding: 4px 24px 4px 8px;
  position: relative;
  text-align: left;
  text-overflow: ellipsis;
  transition: border-color 0.3s ease;
  white-space: nowrap;
  width: 145px;
}
.form-designer-field .form-icon {
  font-size: 20px;
  position: absolute;
  right: 8px;
  top: 5px;
}
</style>
