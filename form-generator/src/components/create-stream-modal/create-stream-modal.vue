<template lang="html">
  <modal :visible="visible" :toggle="toggle" title="Create Stream" size="lg">
    <div class="modal-body">
      <div class="form-group row">
        <label for="inputID" class="col-sm-3 col-form-label">ID</label>
        <div class="col-sm-9">
          <input
            id="inputID"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': isInvalidStreamId }"
            v-model="newStreamId"
            placeholder="ID"
          />
          <div v-if="duplicateStreamId" class="invalid-feedback">
            A stream with this ID already exists. Please choose another.
          </div>
          <div v-if="missingStreamId" class="invalid-feedback">
            Please provide a stream ID
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputName" class="col-sm-3 col-form-label">Name</label>
        <div class="col-sm-9">
          <input
            id="inputName"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': isInvalidStreamName }"
            v-model="newStreamName"
            placeholder="Name"
          />
          <div v-if="missingStreamName" class="invalid-feedback">
            Please provide a stream name
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputDescription" class="col-sm-3 col-form-label"
          >Description</label
        >
        <div class="col-sm-9">
          <input
            id="inputDescription"
            type="text"
            class="form-control"
            v-model="newStreamDescription"
            placeholder="Description"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Type</label>
        <div class="col-sm-9">
          <vue3-simple-typeahead
            placeholder="Search for type"
            :items="sdsTypes"
            :minInputLength="1"
            :itemProjection="(sdsType) => sdsType.Name"
            @selectItem="newStreamType = $event"
            @onInput="typeSearch = $event"
          >
          </vue3-simple-typeahead>
          <div v-if="isInvalidStreamType" class="invalid-feedback d-block">
            Please provide a stream type
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-light mr-3" v-on:click="toggle">
        Cancel
      </button>
      <button type="button" class="btn btn-success" v-on:click="handleSubmit">
        Submit
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ISdsStream, ISdsType } from "@/models";

interface ICreateStreamModalData {
  newStreamId: string;
  newStreamName: string;
  newStreamDescription: string;
  newStreamType: ISdsType | undefined;
  wasValidated: boolean;
  missingStreamId: boolean;
  missingStreamName: boolean;
  missingStreamType: boolean;
  duplicateStreamId: boolean;
  typeSearch: string;
}

export default defineComponent({
  computed: {
    sdsTypeDropdownText: function (): string {
      return this.newStreamType ? this.newStreamType.Name : "Select a Type";
    },
    isInvalidStreamId: function (): boolean {
      return (
        this.wasValidated && (this.missingStreamId || this.duplicateStreamId)
      );
    },
    isInvalidStreamName: function (): boolean {
      return this.wasValidated && this.missingStreamName;
    },
    isInvalidStreamType: function (): boolean {
      return this.wasValidated && this.missingStreamType;
    },
  },
  data: function (): ICreateStreamModalData {
    return {
      newStreamId: "",
      newStreamName: "",
      newStreamDescription: "",
      newStreamType: undefined,
      wasValidated: false,
      missingStreamId: true,
      missingStreamName: true,
      missingStreamType: true,
      duplicateStreamId: false,
      typeSearch: "",
    };
  },
  methods: {
    validate: function (): boolean {
      this.missingStreamId = !this.newStreamId;
      this.missingStreamName = !this.newStreamName;
      this.missingStreamType = !this.newStreamType;
      this.duplicateStreamId = !!this.sdsStreams.find(
        (item: ISdsStream) => item.Id === this.newStreamId
      );

      this.wasValidated = true;

      return !(
        this.missingStreamId ||
        this.missingStreamName ||
        this.missingStreamType ||
        this.duplicateStreamId
      );
    },
    handleSubmit: function (): void {
      if (this.validate()) {
        const newStream: ISdsStream = {
          Id: this.newStreamId,
          TypeId: (this.newStreamType as ISdsType).Id,
          Name: this.newStreamName,
          Description: this.newStreamDescription,
        };

        this.onCreateStream(newStream);
      }
    },
  },
  props: {
    visible: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true,
    },
    sdsTypes: {
      type: Array as PropType<ISdsType[]>,
      required: true,
    },
    onCreateStream: {
      type: Function as PropType<(sdsStream: ISdsStream) => void>,
      required: true,
    },
    sdsStreams: {
      type: Array as PropType<ISdsStream[]>,
      required: true,
    },
  },
});
</script>
