<template lang="html">
  <div v-bind:id="id" v-bind:style="mapStyle"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import _ from "lodash";

import { MapMarker } from "@/models";

export default defineComponent({
  data: function () {
    return {
      mapboxMapRef: undefined,
      mapStyle: {
        minHeight: "450px",
        height: "100%",
      },
      id: _.uniqueId("heatMap-").toString(),
    };
  },
  props: {
    markers: {
      type: Array as PropType<MapMarker[]>,
      required: true,
    },
    colour: String,
  },
  watch: {
    markers: {
      handler: function () {
        setTimeout(() => {
          this.renderMap();
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    renderMap: function () {
      const token = process.env.VUE_APP_LEAFLET_ACCESS_TOKEN;
      const defaultLatitude = -33.664623;
      const defaultLongitude = 122.40362;

      if (this.mapboxMapRef as any) {
        (this.mapboxMapRef as any).remove();
      }

      // @ts-ignore
      (this.mapboxMapRef as any) = new window.mapboxgl.Map({
        accessToken: token,
        container: this.id,
        style: "mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y",
        center: [defaultLongitude, defaultLatitude],
        zoom: 14,
      });

      (this.mapboxMapRef as any).on("load", () => {
        //   (this.mapboxMapRef as any).flyTo({
        //     center: this.markers.reduce((coordinates: any, marker: MapMarker) => {
        //       return [
        //         coordinates[0] + marker.coordinates[1],
        //         coordinates[1] + marker.coordinates[0],
        //       ];
        //     }, [0, 0]).map((coordinate: any) => coordinate / this.markers.length),
        //   });

        const minLongitude: number = this.markers.reduce(
          (min: number, marker: MapMarker) =>
            marker.coordinates[1] < min ? marker.coordinates[1] : min,
          Infinity
        );
        const minLatitude: number = this.markers.reduce(
          (min: number, marker: MapMarker) =>
            marker.coordinates[0] < min ? marker.coordinates[0] : min,
          Infinity
        );
        const maxLongitude: number = this.markers.reduce(
          (max: number, marker: MapMarker) =>
            marker.coordinates[1] > max ? marker.coordinates[1] : max,
          -Infinity
        );
        const maxLatitude: number = this.markers.reduce(
          (max: number, marker: MapMarker) =>
            marker.coordinates[0] > max ? marker.coordinates[0] : max,
          -Infinity
        );

        (this.mapboxMapRef as any).fitBounds(
          [
            [minLongitude, minLatitude],
            [maxLongitude, maxLatitude],
          ],
          { padding: 50 }
        );

        const coordinates: number[][] = this.markers.map(
          (marker: MapMarker) => [marker.coordinates[1], marker.coordinates[0]]
        );

        let geojson = {
          type: "FeatureCollection",
          features: this.markers.map((marker: MapMarker) => ({
            type: "Feature",
            properties: {
              mag: 1.0,
            },
            geometry: {
              type: "Point",
              coordinates: [marker.coordinates[1], marker.coordinates[0]],
            },
          })),
        };

        (this.mapboxMapRef as any).addSource("markers", {
          type: "geojson",
          data: geojson,
        });

        (this.mapboxMapRef as any).addLayer(
          {
            id: "earthquakes-heat",
            type: "heatmap",
            source: "markers",
            maxzoom: 20,
            paint: {
              // Increase the heatmap color weight weight by zoom level
              // heatmap-intensity is a multiplier on top of heatmap-weight
              "heatmap-intensity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0,
                1,
                20,
                3,
              ],
              // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
              // Begin color ramp at 0-stop with a 0-transparancy color
              // to create a blur-like effect.
              "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0,
                "rgba(33,102,172,0)",
                0.2,
                "rgb(103,169,207)",
                0.4,
                "rgb(209,229,240)",
                0.6,
                "rgb(253,219,199)",
                0.8,
                "rgb(239,138,98)",
                1,
                this.colour ? this.colour : "rgb(178,24,43)",
              ],
              // Adjust the heatmap radius by zoom level
              "heatmap-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0,
                2,
                20,
                20,
              ],
            },
          },
          "waterway-label"
        );
      });
    },
  },
});
</script>
