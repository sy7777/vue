<template lang="html">
  <div id="#dashboard" @keydown.esc="handlePressEscapeKey">
    <Spinner v-if="loading" />
    <template v-if="!slideshowVisible">
      <div v-if="!loading" class="container">
        <div v-if="!dataAvailable" class="row">
          <div class="col-12">
            <div class="jumbotron">
              <h2 class="display-4">Data not found</h2>
              <hr />
              <p class="lead">
                The Asset associated with this dashboard does not contain any
                data for the streams and time periods it contains.
              </p>
            </div>
          </div>
        </div>
        <template v-if="dataAvailable">
          <div class="row mb-5">
            <div class="col-12">
              <DashboardToolbar
                :dashboard="dashboard"
                :onAddVisualisation="onToggleAddVisualisation"
                :onEditDashboard="onToggleEditDashboardModal"
                :onSaveDashboard="onClickSaveDashboardButton"
                :onDeleteDashboard="onToggleDeleteDashboardModal"
                :columnCount="columnCount"
                :onChangeColumnCount="onChangeColumnCount"
                :onToggleSlideshow="onToggleSlideshow"
                :rawDataVisible="rawDataVisible"
                :onToggleRawData="onToggleRawData"
                :dashboardPublished="dashboardPublished"
                :onTogglePublishDashboard="onTogglePublishDashboard"
                :readOnly="readOnly"
              />
            </div>
          </div>
          <template v-if="rawDataVisible">
            <div class="row">
              <div class="col-12">
                <AssetStreamRawData :data="visualisationData" />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="row">
              <div
                v-for="(visualisation, index) in visualisations"
                :class="columnClass(visualisation.columnSpan)"
                :key="index"
                style="position: initial; margin-bottom: 10px"
              >
                <VisualisationWidget
                  :visualisationType="visualisation.visualisationType"
                  :propertySettings="visualisation.propertySettings"
                  :data="visualisationData"
                  :bivariateSettings="visualisation.bivariateSettings"
                  :gaugeSettings="visualisation.gaugeSettings"
                  :name="visualisation.name"
                  :onDelete="onDeleteVisualisation.bind(null, visualisation)"
                  :columnCount="columnCount"
                  :columnSpan="visualisation.columnSpan"
                  :onChangeColumnSpan="onChangeColumnSpan(visualisation)"
                  :onMoveLeft="onMoveLeftVisualisation(visualisation)"
                  :onMoveRight="onMoveRightVisualisation(visualisation)"
                  :readOnly="readOnly"
                />
              </div>
            </div>
            <div v-if="visualisations.length === 0" class="row">
              <div class="col-12">
                <div class="jumbotron">
                  <h2 class="display-4">No visualisations found</h2>
                  <hr />
                  <p class="lead">
                    This dashboard does not contain any visualisations. Use the
                    <strong>Add Visualisation</strong> button to create new
                    widgets.
                  </p>
                  <button
                    type="button"
                    class="btn btn-primary btn-lg"
                    v-on:click="onToggleAddVisualisation"
                  >
                    Add Visualisation
                  </button>
                  <hr class="my-10" />
                  <h4 class="alert-title">New to dashboards?</h4>
                  <p class="alert-text">See examples and learn more here</p>
                  <a
                    :href="dashboardsDocumentationLink"
                    class="btn btn-light-primary"
                    target="_blank"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
      <VisualisationConfigurationModal
        :visible="addVisualisationModalVisible"
        :toggle="onToggleAddVisualisation"
        :asset="dashboard.asset"
        :onSubmit="onSubmitVisualisation"
      />
      <SaveDashboardModal
        v-if="onToggleSaveDashboardModal"
        :visible="saveDashboardModalVisible"
        :toggle="onToggleSaveDashboardModal"
        :dashboard="dashboard"
        :onChangeDashboard="onChangeDashboard"
        :onSaveDashboard="onSaveDashboard"
      />
      <ConfirmDeleteDashboardModal
        v-if="onToggleDeleteDashboardModal"
        :dashboard="dashboard"
        :visible="confirmDeleteDashboardModalVisible"
        :toggle="onToggleDeleteDashboardModal"
        :onDelete="onDeleteDashboard"
      />
      <EditDashboardModal
        v-if="onToggleEditDashboardModal"
        :visible="editDashboardModalVisible"
        :toggle="onToggleEditDashboardModal"
        :dashboard="dashboard"
        :onEditDashboard="onEditDashboard"
      >
      </EditDashboardModal>
    </template>
    <template v-if="slideshowVisible">
      <VisualisationCarousel
        :visible="slideshowVisible"
        :columnCount="columnCount"
      >
        <slide
          v-for="(page, index) in slideshowPages"
          :key="index"
          style="padding: 0px"
        >
          <div class="row">
            <div
              :class="columnClass(visualisation.columnSpan)"
              v-for="visualisation in paginatedVisualisations(page)"
              :style="slideshowColumnStyle"
              :key="visualisation.id"
            >
              <div :style="slideshowVisualisationStyle">
                <label>{{ visualisation.name }}</label>
                <Visualisation
                  :visualisationType="visualisation.visualisationType"
                  :propertySettings="visualisation.propertySettings"
                  :data="visualisationData"
                  :bivariateSettings="visualisation.bivariateSettings"
                  :gaugeSettings="visualisation.gaugeSettings"
                  :name="visualisation.name"
                  :onDelete="onDeleteVisualisation.bind(null, visualisation)"
                  :columnCount="columnCount"
                  :columnSpan="visualisation.columnSpan"
                />
              </div>
            </div>
          </div>
        </slide>
      </VisualisationCarousel>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IAssetStream, IDashboard, IVisualisation } from "@/shared/models";
import { Spinner } from "@/components/spinner";
import { DashboardToolbar } from "@/shared/components/dashboard-toolbar";
import { VisualisationConfigurationModal } from "@/shared/components/visualisation-configuration-modal";
import { Visualisation } from "@/shared/components/visualisation";
import { SaveDashboardModal } from "@/shared/components/save-dashboard-modal";
import { ConfirmDeleteDashboardModal } from "@/shared/components/confirm-delete-dashboard-modal";
import { EditDashboardModal } from "@/shared/components/edit-dashboard-modal";
import { VisualisationCarousel } from "@/shared/components/visualisation-carousel";
import { AssetStreamRawData } from "@/shared/components/asset-stream-raw-data";
import { VisualisationWidget } from "@/shared/components/visualisation-widget";

export default defineComponent({
  components: {
    Spinner,
    DashboardToolbar,
    VisualisationConfigurationModal,
    Visualisation,
    SaveDashboardModal,
    ConfirmDeleteDashboardModal,
    EditDashboardModal,
    VisualisationCarousel,
    AssetStreamRawData,
    VisualisationWidget,
  },
  computed: {
    dashboardsDocumentationLink: function (): string {
      return "https://axisstreamsupport.z8.web.core.windows.net/articles/dashboards";
    },
    dataAvailable: function (): boolean {
      return this.visualisationData.reduce(
        (available: boolean, dataset: any) => {
          return available || !!dataset.data.length;
        },
        false
      );
    },
    visualisationData: function (): any[] {
      return this.dashboard.asset.streams.map((assetStream: IAssetStream) => {
        const data = this.$store.getters["sdsStream/getStreamData"]({
          sdsStreamId: assetStream.streamId,
          searchParameters: assetStream.searchParameters,
        });

        return {
          assetStream,
          sdsStreamId: assetStream.streamId,
          data,
        };
      });
    },
    visualisations: function (): IVisualisation[] {
      return this.dashboard.visualisations
        .concat()
        .sort((a, b) => a.order - b.order);
    },
    slideshowPages: function (): number {
      const count: number = this.visualisations.reduce((acc, item) => {
        return acc + item.columnSpan;
      }, 0);

      switch (this.columnCount) {
        case 1:
          return count;
        case 2:
          return Math.ceil(count / 4);
        case 3:
          return Math.ceil(count / 9);
        case 4:
          return Math.ceil(count / 16);
        default:
          return count;
      }
    },
    slideshowColumnStyle: function (): Record<string, unknown> {
      return {
        height: `${100 / this.columnCount}vh`,
        padding: 0,
      };
    },
    slideshowVisualisationStyle: function (): Record<string, unknown> {
      const scale = (() => {
        switch (this.columnCount) {
          case 1:
            return 0.9;
          case 2:
            return 0.8;
          case 3:
            return 0.6;
          case 4:
            return 0.5;
          default:
            return 0.9;
        }
      })();

      const translate = (() => {
        switch (this.columnCount) {
          case 1:
            return 0;
          case 2:
            return 20;
          case 3:
            return 40;
          case 4:
            return 100;
          default:
            return 0;
        }
      })();

      return {
        transform: `translateY(-${translate}px) scale(${scale})`,
      };
    },
  },
  methods: {
    columnClass: function (columnSpan: number): string {
      const columns: number = (12 / this.columnCount) * columnSpan;
      const truncated: number = columns > 12 ? 12 : columns;

      return `col-lg-${truncated}`;
    },
    paginatedVisualisations: function (page: number): any[] {
      const count: number = this.visualisations.reduce((acc, item) => {
        return acc + item.columnSpan;
      }, 0);

      const visualisations = this.visualisations.flatMap((item) => {
        return Array(item.columnSpan).fill(item);
      });

      const paginated = (() => {
        switch (this.columnCount) {
          case 1:
            return [visualisations[page - 1]];
          case 2: {
            const start = (page - 1) * 4;
            const end = start + 4;
            return visualisations.slice(start, end);
          }
          case 3: {
            const start = (page - 1) * 9;
            const end = start + 9;
            return visualisations.slice(start, end);
          }
          case 4: {
            const start = (page - 1) * 16;
            const end = start + 16;
            return visualisations.slice(start, end);
          }
          default:
            return [visualisations[page - 1]];
        }
      })();

      return paginated.filter((x, i, a) => a.indexOf(x) === i);
    },
    handlePressEscapeKey: function (): void {
      if (this.slideshowVisible && this.onToggleSlideshow) {
        this.onToggleSlideshow();
      }
    },
  },
  props: {
    loading: Boolean,
    dashboard: {
      type: Object as PropType<IDashboard>,
      required: true,
    },
    addVisualisationModalVisible: Boolean,
    onToggleAddVisualisation: {
      type: Function as PropType<() => void>,
      required: true,
    },
    onSubmitVisualisation: {
      type: Function as PropType<(visualisation: any) => void>,
      required: true,
    },
    onChangeDashboard: {
      type: Function as PropType<(dashboard: IDashboard) => void>,
      required: false,
    },
    onClickSaveDashboardButton: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onToggleSaveDashboardModal: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onSaveDashboard: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onToggleDeleteDashboardModal: {
      type: Function as PropType<() => void | undefined>,
      required: false,
    },
    confirmDeleteDashboardModalVisible: Boolean,
    onDeleteDashboard: {
      type: Function as PropType<() => void>,
      required: false,
    },
    columnCount: {
      type: Number,
      required: true,
    },
    onChangeColumnCount: {
      type: Function as PropType<(columnCount: number) => void>,
      required: true,
    },
    saveDashboardModalVisible: Boolean,
    onToggleEditDashboardModal: {
      type: Function as PropType<() => void>,
      required: false,
    },
    editDashboardModalVisible: Boolean,
    onEditDashboard: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onDeleteVisualisation: {
      type: Function as PropType<(visualisation: any) => void>,
      required: true,
    },
    slideshowVisible: Boolean,
    onToggleSlideshow: {
      type: Function as PropType<() => void>,
      required: false,
    },
    rawDataVisible: Boolean,
    onToggleRawData: {
      type: Function as PropType<() => void>,
      required: false,
    },
    readOnly: Boolean,
    dashboardPublished: Boolean,
    onTogglePublishDashboard: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onChangeColumnSpan: {
      type: Function as PropType<
        (visualisation: IVisualisation) => (span: number) => void
      >,
      required: false,
    },
    onMoveLeftVisualisation: {
      type: Function as PropType<(visualisation: IVisualisation) => () => void>,
      required: false,
    },
    onMoveRightVisualisation: {
      type: Function as PropType<(visualisation: IVisualisation) => () => void>,
      required: false,
    },
  },
  watch: {
    slideshowVisible: {
      handler: function (): void {
        if (this.slideshowVisible) {
          this.$notify({
            type: "info",
            title: "Press escape to exit slideshow",
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },
});
</script>
