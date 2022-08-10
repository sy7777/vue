<template lang="html">
  <div v-if="markers.length > 0" v-bind:id="id" v-bind:style="mapStyle"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import _ from "lodash";

import { MapMarker } from "@/models";

declare global {
  interface Window {
    L: any;
  }
}

window.L = window.L || {};

export default defineComponent({
  data: function () {
    return {
      mapboxMapRef: undefined,
      mapStyle: {
        minHeight: "450px",
        height: "100%",
      },
      id: _.uniqueId("map3d-").toString(),
    };
  },
  props: {
    markers: {
      type: Array as PropType<MapMarker[]>,
      required: true,
    },
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
    getDefaultCoordinates: function (): number[] {
      if (this.markers && this.markers.length) {
        const coordinates: number[] = this.markers
          .reduce(
            (coordinates: any, marker: MapMarker) => [
              coordinates[0] + marker.coordinates[1],
              coordinates[1] + marker.coordinates[0],
            ],
            [0, 0]
          )
          .map((coordinate: any) => coordinate / this.markers.length);

        return coordinates;
      } else {
        const defaultLatitude = -33.664623;
        const defaultLongitude = 122.40362;

        return [defaultLongitude, defaultLatitude];
      }
    },
    renderMarkers: function () {
      this.markers.forEach((marker: MapMarker) => {
        let m = marker.html ? document.createElement("div") : undefined;

        if (m && marker.html) {
          m.innerHTML = marker.html;
        }

        const mapboxMarker: any = new window.mapboxgl.Marker(m)
          .setLngLat([marker.coordinates[1], marker.coordinates[0]])
          .addTo(this.mapboxMapRef as any);
      });

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
    },
    renderMap: function () {
      if (this.mapboxMapRef as any) {
        (this.mapboxMapRef as any).remove();
      }

      // @ts-ignore
      (this.mapboxMapRef as any) = new window.mapboxgl.Map({
        accessToken: process.env.VUE_APP_LEAFLET_ACCESS_TOKEN,
        container: this.id,
        zoom: 13.1,
        center: this.getDefaultCoordinates(),
        pitch: 85,
        bearing: 80,
        style: "mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y",
      });

      (this.mapboxMapRef as any).addControl(
        new window.mapboxgl.NavigationControl()
      );

      (this.mapboxMapRef as any).on("load", () => {
        this.renderMarkers();

        (this.mapboxMapRef as any).addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });

        (this.mapboxMapRef as any).setTerrain({
          source: "mapbox-dem",
          exaggeration: 1.5,
        });

        (this.mapboxMapRef as any).addLayer({
          id: "sky",
          type: "sky",
          paint: {
            "sky-type": "atmosphere",
            "sky-atmosphere-sun": [0.0, 0.0],
            "sky-atmosphere-sun-intensity": 15,
          },
        });

        (this.mapboxMapRef as any).setFog({
          range: [2, 12],
          color: "white",
          "horizon-blend": 0.1,
        });
      });
    },
  },
});
</script>
