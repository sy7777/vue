<template lang="html">
  <div v-bind:id="id" v-bind:style="mapStyle"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import _ from "lodash";

import { MapMarker } from "@/models";

declare global {
  interface Window {
    mapboxgl: any;
  }
}

window.mapboxgl = window.mapboxgl || {};

interface IData {
  mapboxMapRef: any;
  mapStyle: {
    height: string;
  };
  id: string;
}

export default defineComponent({
  props: ["height", "markers", "colour"],
  data: function (): IData {
    return {
      mapboxMapRef: undefined,
      mapStyle: {
        height: "0px",
      },
      id: _.uniqueId("map-").toString(),
    };
  },
  watch: {
    height: {
      handler: function () {
        this.mapStyle = {
          height: this.height,
        };

        setTimeout(() => {
          this.renderMap();
        });
      },
      immediate: true,
      deep: true,
    },
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
    getDefaultCoordinates: function (): [number, number] {
      if (this.markers && this.markers.length) {
        const coordinates: [number, number] = this.markers
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
      if (this.markers.length) {
        this.markers.forEach((marker: MapMarker) => {
          let m = marker.html ? document.createElement("div") : undefined;
          let options: any = undefined;

          if (m && marker.html) {
            m.innerHTML = marker.html;
          }

          if (marker.anchor) {
            options = {
              anchor: marker.anchor,
            };
          }

          const mapboxMarker: any = new window.mapboxgl.Marker(m, options)
            .setLngLat([marker.coordinates[1], marker.coordinates[0]])
            .addTo(this.mapboxMapRef);

          if (marker.popup) {
            const popup = new window.mapboxgl.Popup({ offset: 25 }).setHTML(
              marker.popup
            );
            mapboxMarker.setPopup(popup);
          }
        });

        if (this.markers.length === 1) {
          this.mapboxMapRef.setZoom(13);
        } else {
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

          this.mapboxMapRef.fitBounds(
            [
              [minLongitude, minLatitude],
              [maxLongitude, maxLatitude],
            ],
            { padding: 50 }
          );
        }
      }
    },
    renderMap: function () {
      if (this.mapboxMapRef) {
        this.mapboxMapRef.remove();
      }

      this.mapboxMapRef = new window.mapboxgl.Map({
        accessToken: process.env.VUE_APP_LEAFLET_ACCESS_TOKEN,
        container: this.id,
        center: this.getDefaultCoordinates(),
        style: "mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y",
      });

      this.mapboxMapRef.addControl(new window.mapboxgl.NavigationControl());

      this.mapboxMapRef.on("load", () => {
        this.renderMarkers();

        this.mapboxMapRef.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
      });
    },
  },
});
</script>
