<template lang="html">
  <modal :visible="visible" :toggle="toggle" title="Add Token" size="xl">
    <div class="modal-body">
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Project</label>
        <div class="col-sm-9">
          <dropdown v-bind:text="projectDropdownText" variant="primary">
            <dropdown-item-button
              v-for="project in projects"
              v-on:click="selectedProject = project"
              :key="project.id"
            >
              {{ project.name }}
            </dropdown-item-button>
          </dropdown>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputName" class="col-sm-3 col-form-label">Name</label>
        <div class="col-sm-9">
          <input
            id="inputName"
            type="text"
            class="form-control"
            v-model="name"
            placeholder="Name"
          />
          <small class="text-muted">
            Enter a name to help identify this token
          </small>
        </div>
      </div>
      <div class="form-group row">
        <label for="textareaToken" class="col-sm-3 col-form-label">Token</label>
        <div class="col-sm-9">
          <textarea
            id="textareaToken"
            class="form-control"
            v-model="token"
            placeholder="e.g. hK51SfIVJN2RhMV3b8I9GrkcDSPHI3Nqob7Gtu85kLljuajosc9kdPv0cGXazROdxzTZ0zQqZLUydvxi"
            row="2"
          ></textarea>
          <small class="text-muted">
            Paste the token given to you by an asset manager above.
          </small>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-light mr-3" v-on:click="toggle">
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-success"
        v-on:click="handleSubmit"
        :disabled="invalid"
      >
        Submit
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IProject } from "@/models";

interface IData {
  selectedProject: IProject | undefined;
  name: string;
  token: string;
}

export default defineComponent({
  computed: {
    invalid: function (): boolean {
      return !this.name || !this.token || !this.selectedProject;
    },
    projectDropdownText: function (): string {
      return this.selectedProject
        ? this.selectedProject.name
        : "Select a project";
    },
  },
  data: function (): IData {
    return {
      selectedProject: undefined,
      name: "",
      token: "",
    };
  },
  methods: {
    handleSubmit: function (): void {
      this.onSubmit({
        name: this.name,
        token: this.token,
        project: this.selectedProject as IProject,
      });
      this.name = "";
      this.token = "";
    },
  },
  props: {
    visible: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onSubmit: {
      type: Function as PropType<
        ({
          name,
          token,
          project,
        }: {
          name: string;
          token: string;
          project: IProject;
        }) => void
      >,
      required: true,
    },
    projects: {
      type: Array as PropType<IProject[]>,
      required: true,
    },
  },
});
</script>
