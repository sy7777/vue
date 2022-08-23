<template>
  <table class="table table-bordered">
    <tbody>
      <tr v-for="tr in schema?.trs">
        <td
          v-for="td in tr.tds"
          :colspan="td.colspan"
          :rowspan="td.rowspan"
        ></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { FormControlJsonSchema } from "@/models";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "Table",
  props: {
    schema: { type: Object as PropType<FormControlJsonSchema | undefined> },
  },
});
</script>


<style scoped>
tr{
  border: 1px solid #25623f;
}
</style>