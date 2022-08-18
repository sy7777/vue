<template>
  <div class="form-group">
    <label>Inline radios</label>
    <div class="radio-inline">
      <label class="radio">
        <input type="radio" name="radios2" />
        <span></span>
        Option 1
      </label>
      <label class="radio">
        <input type="radio" name="radios2" />
        <span></span>
        Option 2
      </label>
      <label class="radio">
        <input type="radio" name="radios2" />
        <span></span>
        Option 3
      </label>
    </div>
    <span class="form-text text-muted">Some help text goes here</span>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "FormDesignRadio",
});
</script>
