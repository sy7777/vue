<template>
  <div class="col">
    Customise the field
    <div v-if="selectedSchema">{{ selectedSchema.id }}</div>
  </div>
</template>

<style scoped>
.col {
  /* border: 1px solid #000; */
  height: max-content;
}
</style>

<script lang="ts">
import { FormJsonSchema } from "@/models";
import { defineComponent, PropType } from "vue";
interface IData {
  selectedSchema: FormJsonSchema | undefined;
}
export default defineComponent({
  name: "FormDesignCustomise",
  data(): IData {
    return {
      selectedSchema: undefined,
    };
  },
  props: {
    schema: { type: Object as PropType<FormJsonSchema | undefined> },
  },
  watch: {
    schema: {
      immediate: true,
      handler: function (newVal) {
        console.log(newVal);
        if (newVal) {
          this.selectedSchema = { ...newVal };
        }
      },
    },
  },
});
</script>
