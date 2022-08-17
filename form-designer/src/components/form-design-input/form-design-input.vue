<template>
  <div class="form-draggable">
    <strong>Input box</strong>
    <input type="text" class="form-control">
  </div>
</template>

<style scoped>
.col {
  border: 1px solid #000;
  height: 100%;
}
.form-designer-field-list {
  width: 330px;
  padding: 0 10px 10px 20px;
  flex-flow: row wrap;
  min-width: 357px;
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

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name:"Input"
});
</script>
