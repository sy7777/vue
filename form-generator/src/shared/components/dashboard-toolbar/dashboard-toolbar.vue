<template lang="html">
  <div class="d-flex justify-content-between flex-wrap">
    <div class="d-flex align-items-center">
      <h2 class="display-4">
        {{ dashboard.name }}
      </h2>
    </div>
    <div class="d-flex flex-wrap align-items-center">
      <template v-if="!readOnly">
        <span class="switch mr-4" v-if="onTogglePublishDashboard">
          <label class="d-flex align-items-center">
            <span v-if="dashboardPublished" class="font-weight-bold mr-2"
              >Published</span
            >
            <span v-if="!dashboardPublished" class="font-weight-bold mr-2"
              >Unpublished</span
            >
            <input
              type="checkbox"
              name="publishedDashboard"
              :checked="dashboardPublished"
              v-on:change="onTogglePublishDashboard"
            />
            <span></span>
          </label>
        </span>
      </template>
      <span class="switch mr-4" v-if="onToggleRawData">
        <label class="d-flex align-items-center">
          <span class="font-weight-bold mr-2">Table View</span>
          <input
            type="checkbox"
            name="rawData"
            :checked="rawDataVisible"
            v-on:change="onToggleRawData"
          />
          <span></span>
        </label>
      </span>
      <button
        v-if="!readOnly && onToggleSlideshow"
        type="button"
        class="btn btn-secondary mr-4"
        v-on:click="onToggleSlideshow()"
      >
        Slideshow
      </button>
      <div
        class="btn-group mr-4 d-none d-md-block"
        role="group"
        aria-label="column count"
      >
        <button
          type="button"
          class="btn font-weight-bold"
          :class="{
            'btn-outline-secondary': columnCount !== 1,
            'btn-secondary': columnCount === 1,
          }"
          v-on:click="onChangeColumnCount(1)"
        >
          1
        </button>
        <button
          type="button"
          class="btn font-weight-bold"
          :class="{
            'btn-outline-secondary': columnCount !== 2,
            'btn-secondary': columnCount === 2,
          }"
          v-on:click="onChangeColumnCount(2)"
        >
          2
        </button>
        <button
          type="button"
          class="btn font-weight-bold"
          :class="{
            'btn-outline-secondary': columnCount !== 3,
            'btn-secondary': columnCount === 3,
          }"
          v-on:click="onChangeColumnCount(3)"
        >
          3
        </button>
        <button
          type="button"
          class="btn font-weight-bold"
          :class="{
            'btn-outline-secondary': columnCount !== 4,
            'btn-secondary': columnCount === 4,
          }"
          v-on:click="onChangeColumnCount(4)"
        >
          4
        </button>
      </div>
      <div class="mt-4 mt-md-0" v-if="!readOnly">
        <button
          type="button"
          class="btn btn-sm-block btn-light-primary mr-2 mb-2 mb-md-0"
          v-on:click="onAddVisualisation"
        >
          Add Visualisation
        </button>
        <button
          v-if="onDeleteDashboard"
          type="button"
          class="btn btn-sm-block btn-light-danger mr-2 mb-2 mb-md-0"
          v-on:click="onDeleteDashboard"
        >
          Delete Dashboard
        </button>
        <button
          v-if="onEditDashboard"
          type="button"
          class="btn btn-sm-block btn-light-warning mr-2 mb-2 mb-md-0"
          v-on:click="onEditDashboard"
        >
          Edit Dashboard
        </button>
        <button
          v-if="onSaveDashboard"
          type="button"
          class="btn btn-sm-block btn-light-success mb-2 mb-md-0"
          v-on:click="onSaveDashboard"
        >
          Save dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IDashboard } from "@/shared/models";

export default defineComponent({
  props: {
    dashboard: {
      type: Object as PropType<IDashboard>,
      required: true,
    },
    onAddVisualisation: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onEditDashboard: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onSaveDashboard: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onDeleteDashboard: {
      type: Function as PropType<() => void>,
      required: false,
    },
    columnCount: Number,
    onChangeColumnCount: {
      type: Function as PropType<(columnCount: number) => void>,
      required: true,
    },
    onToggleSlideshow: {
      type: Function as PropType<() => void>,
      required: false,
    },
    rawDataVisible: Boolean,
    onToggleRawData: {
      type: Function as PropType<() => void>,
      required: false,
    },
    dashboardPublished: Boolean,
    onTogglePublishDashboard: {
      type: Function as PropType<() => void>,
      required: false,
    },
    readOnly: Boolean,
  },
});
</script>
