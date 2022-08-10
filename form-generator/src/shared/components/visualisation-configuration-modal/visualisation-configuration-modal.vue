<template lang="html">
  <modal :visible="visible" :toggle="toggle" title="Widget Settings" size="xl">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <div v-if="selectedSettings.length" class="mr-2">
                <h6 class="mb-3">Attributes:</h6>
                <span
                  v-for="setting in selectedSettings"
                  class="label lable-rounded label-inline label-primary mr-2"
                  :key="setting.property.Id"
                >
                  {{ setting.property.Name }}
                </span>
              </div>
              <div v-if="visualisationName" class="mr-2">
                <h6 class="mb-3">Name:</h6>
                <span class="label label-info label-pill label-inline mr-2">
                  {{ visualisationName }}
                </span>
              </div>
              <div v-if="selectedVisualisation" class="mr-2">
                <h6 class="mb-3">Visualisation:</h6>
                <span class="label label-success label-pill label-inline mr-2">
                  {{ selectedVisualisation }}
                </span>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <button
                type="button"
                class="btn btn-light-warning ml-5"
                v-on:click="clearSettings()"
              >
                Clear Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <div class="row">
            <div class="col-12">
              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <button
                    type="button"
                    class="nav-link border-0 bg-transparent"
                    :class="{ active: attributeSettingsVisible }"
                    v-on:click="showAttributeSettings()"
                  >
                    <span class="nav-text">Attribute Settings</span>
                  </button>
                </li>
                <li class="nav-item">
                  <button
                    type="button"
                    class="nav-link border-0 bg-transparent"
                    :class="{ active: visualisationSettingsVisible }"
                    v-on:click="showVisualisationSettings()"
                  >
                    <span class="nav-text">Visualisation Settings</span>
                  </button>
                </li>
                <li class="nav-item">
                  <button
                    type="button"
                    class="nav-link border-0 bg-transparent"
                    :class="{ active: previewVisible }"
                    v-on:click="showPreview()"
                  >
                    <span class="nav-text">Preview</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="tab-content mt-5">
            <div v-if="attributeSettingsVisible" class="row">
              <div class="col-12">
                <VisualisationConfigurationAttributeSettings
                  :configurations="configurations"
                  :onChangeConfigurations="handleChangeConfigurations"
                />
              </div>
            </div>
            <template v-if="visualisationSettingsVisible">
              <div class="row">
                <div class="col-12">
                  <div
                    v-if="!selectedSettings.length"
                    class="alert alert-custom alert-light"
                  >
                    <div class="alert-text">
                      Select at least one attribute to view visualisation
                      settings
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-5">
                    <div class="form-group">
                      <label for="visualisationNameInput"> Name </label>
                      <input
                        type="text"
                        class="form-control"
                        id="visualisationNameInput"
                        v-model="visualisationName"
                        placeholder="Enter name..."
                      />
                      <small class="text-muted">Optional</small>
                    </div>
                  </div>
                  <div v-if="selectedSettings.length === 1" class="mb-5">
                    <UnivariateVisualisationSettings
                      :propertySettings="selectedSettings"
                      :selectedVisualisation="selectedVisualisation"
                      :onSelectVisualisation="handleSelectVisualisation"
                      :gaugeSettings="gaugeSettings"
                      :onChangeGaugeSettings="handleChangeGaugeSettings"
                    />
                  </div>
                  <div v-if="isBivariateData" class="mb-5">
                    <BivariateVisualisationSettings
                      :propertySettings="selectedSettings"
                      :bivariateSettings="bivariateSettings"
                      :onChange="handleChangeBivariateSettings"
                      :selectedVisualisation="selectedVisualisation"
                      :onSelectVisualisation="handleSelectVisualisation"
                    />
                  </div>
                  <div v-if="selectedSettings.length > 2" class="mb-5">
                    <MultivariateVisualisationSettings
                      :propertySettings="selectedSettings"
                      :selectedVisualisation="selectedVisualisation"
                      :onSelectVisualisation="handleSelectVisualisation"
                    />
                  </div>
                  <div v-if="coordinatesAvailable" class="mb-5">
                    <MapVisualisationSettings
                      :propertySettings="selectedSettings"
                      :selectedVisualisation="selectedVisualisation"
                      :onSelectVisualisation="handleSelectVisualisation"
                    />
                  </div>
                  <div v-if="timeDependentVisualisation" class="mb-5">
                    <TimeVisualisationSettings
                      :propertySettings="selectedSettings"
                      :selectedVisualisation="selectedVisualisation"
                      :onSelectVisualisation="handleSelectVisualisation"
                    />
                  </div>
                </div>
              </div>
            </template>
            <template v-if="previewVisible">
              <div class="row" v-if="!selectedVisualisation">
                <div class="col-12">
                  <div class="alert alert-custom alert-light">
                    <div class="alert-text">
                      Attribute and visualisation settings must be configured
                      for a preview to be displayed
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <Visualisation
                    v-if="selectedVisualisation"
                    :visualisationType="selectedVisualisation"
                    :propertySettings="visualisationProperties"
                    :data="visualisationData"
                    :bivariateSettings="bivariateSettings"
                    :gaugeSettings="gaugeSettings"
                    :name="visualisationName"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-light" v-on:click="toggle()">
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-primary ml-5"
        v-on:click="handleSubmit()"
      >
        Submit
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { v4 as uuidv4 } from "uuid";

import { IAsset, IAssetStream } from "@/shared/models";
import { UnivariateVisualisationSettings } from "@/shared/components/univariate-visualisation-settings";
import { BivariateVisualisationSettings } from "@/shared/components/bivariate-visualisation-settings";
import { MultivariateVisualisationSettings } from "@/shared/components/multivariate-visualisation-settings";
import { MapVisualisationSettings } from "@/shared/components/map-visualisation-settings";
import { TimeVisualisationSettings } from "@/shared/components/time-visualisation-settings";
import { Visualisation } from "../visualisation";
import { VisualisationConfigurationAttributeSettings } from "../visualisation-configuration-attribute-settings";
import { canSupportBivariateVisualisations } from "@/shared/services";
import {
  IVisualisationGaugeSettings,
  IVisualisationGaugeSettingsRange,
} from "@/shared/models";
import { VisualisationAttributeInterpretation } from "@/shared/constants";

const defaultGaugeSettings = (): IVisualisationGaugeSettings => {
  return {
    id: uuidv4(),
    minimum: 0,
    ranges: [],
  };
};

interface IData {
  configurations: any[];
  bivariateSettings: any;
  selectedVisualisation: undefined | string;
  visualisationName: string;
  attributeSettingsVisible: boolean;
  visualisationSettingsVisible: boolean;
  previewVisible: boolean;
  gaugeSettings: IVisualisationGaugeSettings;
}

export default defineComponent({
  components: {
    UnivariateVisualisationSettings,
    BivariateVisualisationSettings,
    MultivariateVisualisationSettings,
    MapVisualisationSettings,
    TimeVisualisationSettings,
    Visualisation,
    VisualisationConfigurationAttributeSettings,
  },
  computed: {
    selectedSettings: function () {
      return this.configurations
        .flatMap((item: any) => item.settings)
        .filter((item: any) => item.selected);
    },
    coordinatesAvailable: function () {
      const latitude: boolean = this.selectedSettings.some(
        (item: any) => item.property.Id.toLowerCase() === "latitude"
      );
      const longitude: boolean = this.selectedSettings.some(
        (item: any) => item.property.Id.toLowerCase() === "longitude"
      );
      return latitude && longitude;
    },
    visualisationProperties: function () {
      return this.configurations
        .flatMap((item: any) => item.settings)
        .filter((item: any) => item.selected);
    },
    visualisationData: function () {
      return this.configurations.map((item: any) => {
        const assetStream: IAssetStream = this.asset.streams.find(
          (assetStream: IAssetStream) =>
            assetStream.streamId === item.sdsStreamId
        ) as IAssetStream;

        return {
          assetStream,
          sdsStreamId: item.sdsStreamId,
          data: this.$store.getters["sdsStream/getStreamData"]({
            sdsStreamId: item.sdsStreamId,
            searchParameters: assetStream.searchParameters,
          }),
        };
      });
    },
    timeDependentVisualisation: function () {
      return (
        this.selectedSettings.length === 2 &&
        this.selectedSettings.some(
          (item: any) =>
            item.property.Id.toLowerCase() === "timestamp" ||
            item.property.Id.toLowerCase().includes("date")
        )
      );
    },
    isBivariateData: function () {
      return canSupportBivariateVisualisations(this.selectedSettings);
    },
  },
  data: function (): IData {
    return {
      configurations: [],
      bivariateSettings: undefined,
      selectedVisualisation: undefined,
      visualisationName: "",
      attributeSettingsVisible: true,
      visualisationSettingsVisible: false,
      previewVisible: false,
      gaugeSettings: defaultGaugeSettings(),
    };
  },
  methods: {
    clearSettings: function () {
      this.visualisationName = "";
      this.selectedVisualisation = undefined;
      this.bivariateSettings = undefined;
      (this.gaugeSettings = defaultGaugeSettings()),
        this.initialiseConfigurations();
    },
    extractActiveProperties: function (properties: any[]) {
      return properties.filter((property: any) => property.active);
    },
    handleChangeBivariateSettings: function (settings: any) {
      this.bivariateSettings = settings;
    },
    handleChangeGaugeSettings: function (
      settings: IVisualisationGaugeSettings
    ) {
      this.gaugeSettings = settings;
    },
    handleSelectVisualisation: function (visualisation: string) {
      this.selectedVisualisation = visualisation;
    },
    handleSubmit: function () {
      this.onSubmit({
        id: uuidv4(),
        visualisationType: this.selectedVisualisation,
        bivariateSettings: this.bivariateSettings,
        gaugeSettings: this.gaugeSettings,
        propertySettings: this.selectedSettings,
        name: this.visualisationName,
        columnSpan: 1,
        order: Math.random() * 100,
      });
    },
    showAttributeSettings: function (): void {
      this.visualisationSettingsVisible = false;
      this.attributeSettingsVisible = true;
      this.previewVisible = false;
    },
    showVisualisationSettings: function (): void {
      this.visualisationSettingsVisible = true;
      this.attributeSettingsVisible = false;
      this.previewVisible = false;
    },
    showPreview: function (): void {
      this.visualisationSettingsVisible = false;
      this.attributeSettingsVisible = false;
      this.previewVisible = true;
    },
    initialiseConfigurations: function () {
      const configurations: any = this.asset.streams.map(
        (assetStream: IAssetStream) => {
          const activeProperties: any[] = this.extractActiveProperties(
            assetStream.properties
          );

          return {
            sdsStreamId: assetStream.streamId,
            settings: activeProperties.map((property: any) => ({
              id: uuidv4(),
              sdsStreamId: assetStream.streamId,
              selected: false,
              interpretation:
                property.SdsType.SdsTypeCode === 18
                  ? VisualisationAttributeInterpretation.CATEGORICAL
                  : VisualisationAttributeInterpretation.QUANTITATIVE,
              property,
            })),
          };
        }
      );

      this.configurations = configurations;

      //if (!!this.configurations.length) {
      //  this.activeNav = this.configurations[0].sdsStreamId;
      //}
    },
    handleChangeConfigurations: function (configurations: any[]): void {
      this.configurations = configurations;
    },
  },
  props: {
    visible: Boolean,
    toggle: {
      type: Function as PropType<() => void>,
      required: true,
    },
    asset: {
      type: Object as PropType<IAsset>,
      required: true,
    },
    onSubmit: {
      type: Function as PropType<(visualisation: any) => void>,
      required: true,
    },
  },
  watch: {
    asset: {
      handler: function () {
        this.initialiseConfigurations();
      },
      immediate: true,
      deep: true,
    },
  },
});
</script>
