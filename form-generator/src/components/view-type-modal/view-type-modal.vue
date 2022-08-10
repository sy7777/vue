<template lang="html">
  <modal :visible="visible" :toggle="toggle" title="Type" size="lg">
    <div class="modal-body">
      <div class="form-group row">
        <label for="inputID" class="font-weight-bold col-sm-3 col-form-label"
          >ID</label
        >
        <div class="col-sm-9">
          <input
            id="inputID"
            type="text"
            class="form-control-plaintext"
            :value="sdsType.Id"
            readonly
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="inputName" class="font-weight-bold col-sm-3 col-form-label"
          >Name</label
        >
        <div class="col-sm-9">
          <input
            id="inputName"
            type="text"
            class="form-control-plaintext"
            :value="sdsType.Name"
            readonly
          />
        </div>
      </div>
      <div class="form-group row">
        <label
          for="inputDescription"
          class="font-weight-bold col-sm-3 col-form-label"
          >Description</label
        >
        <div class="col-sm-9">
          <input
            id="inputDescription"
            type="text"
            class="form-control-plaintext"
            :value="sdsType.Description"
            readonly
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="inputType" class="font-weight-bold col-sm-3 col-form-label"
          >Attributes</label
        >
        <div class="col-sm-9">
          <table class="table">
            <thead>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Key</th>
              <th scope="col">Description</th>
              <th scope="col">UoM</th>
              <th scope="col">Type</th>
            </thead>
            <tbody>
              <tr v-for="property in sdsType.Properties" :key="property.Id">
                <td>{{ property.Id }}</td>
                <td>{{ property.Name }}</td>
                <td>
                  <span v-if="property.IsKey" class="badge badge-success">
                    Yes
                  </span>
                  <span v-if="!property.IsKey" class="badge badge-light">
                    No
                  </span>
                </td>
                <td>{{ property.Description }}</td>
                <td>
                  {{ property.Uom }}
                </td>
                <td>
                  {{ getSdsType(property.SdsType.SdsTypeCode) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="form-group row">
        <label class="font-weight-bold col-sm-3 col-form-label">Streams</label>
        <div class="col-sm-9">
          <div v-if="!currentSdsTypeStreams.length" class="alert alert-light">
            <h4 class="alert-text">
              This type does not have any streams associated with it
            </h4>
          </div>
          <template v-if="currentSdsTypeStreams.length">
            <table class="table table-sm">
              <thead>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
              </thead>
              <tbody>
                <tr
                  v-for="sdsStream in currentSdsTypeStreams"
                  :key="sdsStream.Id"
                >
                  <td>{{ sdsStream.Id }}</td>
                  <td>{{ sdsStream.Name }}</td>
                  <td>{{ sdsStream.Description }}</td>
                </tr>
              </tbody>
            </table>
            <small class="text-muted">
              All streams must be deleted before this type can be deleted.
            </small>
          </template>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-light mr-3" v-on:click="toggle">
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-danger"
        v-on:click="onDelete"
        :disabled="!!currentSdsTypeStreams.length"
      >
        Delete
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { ISdsStream, ISdsType } from "@/models";
import { getSdsTypeByTypeCode } from "@/services/sds-mapping";

interface IViewTypeModalData {
  currentSdsTypeStreams: ISdsStream[];
}

export default defineComponent({
  data: function (): IViewTypeModalData {
    return {
      currentSdsTypeStreams: [],
    };
  },
  methods: {
    getSdsType: function (typeCode: string) {
      return getSdsTypeByTypeCode(typeCode);
    },
    getCurrentSdsTypeStreams: function (): ISdsStream[] {
      if (this.sdsType && this.sdsStreams) {
        return this.sdsStreams.filter(
          (sdsStream: ISdsStream) => sdsStream.TypeId === this.sdsType.Id
        );
      } else {
        return [];
      }
    },
  },
  props: {
    visible: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true,
    },
    sdsType: {
      type: Object as PropType<ISdsType>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<() => void>,
      required: true,
    },
    sdsStreams: {
      type: Array as PropType<ISdsStream[]>,
      required: true,
    },
  },
  watch: {
    sdsStreams: {
      handler: function () {
        this.currentSdsTypeStreams = this.getCurrentSdsTypeStreams();
      },
      deep: true,
      immediate: true,
    },
    sdsType: {
      handler: function () {
        this.currentSdsTypeStreams = this.getCurrentSdsTypeStreams();
      },
      deep: true,
      immediate: true,
    },
  },
});
</script>
