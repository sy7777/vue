<template lang="html">
  <div>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <button
          type="button"
          class="nav-link border-0 bg-transparent"
          :class="{ active: streamMenuVisible }"
          v-on:click="showStreamMenu()"
        >
          <span class="nav-text">Streams</span>
        </button>
      </li>
      <li class="nav-item">
        <button
          type="button"
          class="nav-link border-0 bg-transparent"
          :class="{ active: algorithmMenuVisible }"
          v-on:click="showAlgorithmMenu()"
        >
          <span class="nav-text">Algorithms</span>
        </button>
      </li>
    </ul>
    <div class="tab-content mt-5">
      <div v-if="streamMenuVisible" class="d-flex">
        <ul class="nav nav-bolder nav-light-info flex-column nav-pills">
          <li
            v-for="(configuration, i) of configurations"
            class="nav-item"
            :key="i"
          >
            <span
              class="nav-link cursor-pointer"
              :class="{ active: configuration.sdsStreamId === activeNav }"
              v-on:click="showNav(configuration.sdsStreamId)"
            >
              {{ configuration.sdsStreamId }}
            </span>
          </li>
        </ul>
        <div v-if="activeConfiguration" class="tab-content ml-2 flex-grow-1">
          <ul class="list-group">
            <li
              class="list-group-item d-flex justify-content-between"
              v-for="(setting, i) of activeConfiguration.settings"
              :key="i"
            >
              <div class="d-flex">
                <b-form-checkbox
                  name="dashboard-switch"
                  v-model="setting.selected"
                ></b-form-checkbox>
                <div class="font-weight-bolder">
                  {{ setting.property.Name }}
                </div>
              </div>
              <div class="d-flex">
                <div
                  class="radio-inline"
                  :class="{ invisible: !setting.selected }"
                >
                  <label class="radio radio-outline radio-primary">
                    <input
                      type="radio"
                      :name="setting.id"
                      :value="setting.interpretation"
                      :checked="
                        setting.interpretation ===
                        visualisationAttributeInterpretation.CATEGORICAL
                      "
                      @input="
                        (event) =>
                          handleChangeSettingInterpretation(
                            activeConfiguration,
                            setting,
                            visualisationAttributeInterpretation.CATEGORICAL
                          )
                      "
                    />
                    <span></span>
                    Categorical
                  </label>
                  <label class="radio radio-outline radio-primary">
                    <input
                      type="radio"
                      :name="setting.id"
                      :value="setting.interpretation"
                      :checked="
                        setting.interpretation ===
                        visualisationAttributeInterpretation.QUANTITATIVE
                      "
                      @input="
                        (event) =>
                          handleChangeSettingInterpretation(
                            activeConfiguration,
                            setting,
                            visualisationAttributeInterpretation.QUANTITATIVE
                          )
                      "
                    />
                    <span></span>
                    Quantitative
                  </label>
                  <label class="radio radio-outline radio-primary">
                    <input
                      type="radio"
                      :name="setting.id"
                      :value="setting.interpretation"
                      :checked="
                        setting.interpretation ===
                        visualisationAttributeInterpretation.MAXIMUM
                      "
                      @input="
                        (event) =>
                          handleChangeSettingInterpretation(
                            activeConfiguration,
                            setting,
                            visualisationAttributeInterpretation.MAXIMUM
                          )
                      "
                    />
                    <span></span>
                    Maximum
                  </label>
                  <label class="radio radio-outline radio-primary">
                    <input
                      type="radio"
                      :name="setting.id"
                      :value="setting.interpretation"
                      :checked="
                        setting.interpretation ===
                        visualisationAttributeInterpretation.MINIMUM
                      "
                      @input="
                        (event) =>
                          handleChangeSettingInterpretation(
                            activeConfiguration,
                            setting,
                            visualisationAttributeInterpretation.MINIMUM
                          )
                      "
                    />
                    <span></span>
                    Minimum
                  </label>
                  <label class="radio radio-outline radio-primary">
                    <input
                      type="radio"
                      :name="setting.id"
                      :value="setting.interpretation"
                      :checked="
                        setting.interpretation ===
                        visualisationAttributeInterpretation.MEAN
                      "
                      @input="
                        (event) =>
                          handleChangeSettingInterpretation(
                            activeConfiguration,
                            setting,
                            visualisationAttributeInterpretation.MEAN
                          )
                      "
                    />
                    <span></span>
                    Mean
                  </label>
                  <label class="radio radio-outline radio-primary">
                    <input
                      type="radio"
                      :name="setting.id"
                      :value="setting.interpretation"
                      :checked="
                        setting.interpretation ===
                        visualisationAttributeInterpretation.SUMMATION
                      "
                      @input="
                        (event) =>
                          handleChangeSettingInterpretation(
                            activeConfiguration,
                            setting,
                            visualisationAttributeInterpretation.SUMMATION
                          )
                      "
                    />
                    <span></span>
                    Summation
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="algorithmMenuVisible"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { VisualisationAttributeInterpretation } from "@/shared/constants";

interface IData {
  activeNav: string;
  streamMenuVisible: boolean;
  algorithmMenuVisible: boolean;
  visualisationAttributeInterpretation: typeof VisualisationAttributeInterpretation;
}

export default defineComponent({
  computed: {
    activeConfiguration: function (): any {
      return this.configurations.find(
        (item: any) => item.sdsStreamId === this.activeNav
      );
    },
  },
  data: function (): IData {
    return {
      activeNav: "",
      streamMenuVisible: true,
      algorithmMenuVisible: false,
      visualisationAttributeInterpretation:
        VisualisationAttributeInterpretation,
    };
  },
  methods: {
    handleChangeSettingInterpretation: function (
      configuration: any,
      setting: any,
      interpretation: VisualisationAttributeInterpretation
    ): void {
      const newConfigurations: any[] = this.configurations.map((i) => {
        if (i.sdsStreamId === configuration.sdsStreamId) {
          return {
            ...i,
            settings: i.settings.map((j) => {
              if (j.id === setting.id) {
                return {
                  ...j,
                  interpretation,
                };
              } else {
                return j;
              }
            }),
          };
        } else {
          return i;
        }
      });

      this.onChangeConfigurations(newConfigurations);
    },
    showNav: function (sdsStreamId: string): void {
      this.activeNav = sdsStreamId;
    },
    showStreamMenu: function (): void {
      this.streamMenuVisible = true;
      this.algorithmMenuVisible = false;
    },
    showAlgorithmMenu: function (): void {
      this.streamMenuVisible = false;
      this.algorithmMenuVisible = true;
    },
  },
  props: {
    configurations: {
      type: Array as PropType<any[]>,
      required: true,
    },
    onChangeConfigurations: {
      type: Function as PropType<(configurations: any[]) => void>,
      required: true,
    },
  },
});
</script>
