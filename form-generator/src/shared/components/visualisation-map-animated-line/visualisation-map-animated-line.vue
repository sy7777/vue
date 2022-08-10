<template lang="html">
  <div v-bind:id="id" v-bind:style="mapStyle"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import _ from "lodash";

import { MapMarker } from "@/models";

export default defineComponent({
  data: function (): any {
    return {
      mapboxMapRef: undefined as any,
      mapStyle: {
        minHeight: "450px",
        height: "100%",
      },
      id: _.uniqueId("animatedLineMap-").toString(),
      play: undefined,
    };
  },
  methods: {
    renderLine: function () {
      const coordinates: [number, number][] = this.markers.map(
        (marker: MapMarker) => [marker.coordinates[1], marker.coordinates[0]]
      );

      let geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [coordinates[0]],
            },
          },
        ],
      };

      this.mapboxMapRef.addSource("line", {
        type: "geojson",
        data: geojson,
      });

      let animation;

      // @ts-ignore
      this.mapboxMapRef.addLayer({
        id: "line-animation",
        type: "line",
        source: "line",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#ffffff",
          "line-width": 5,
          "line-opacity": 1,
        },
      });

      let index = 0;

      const animateLine = () => {
        if (typeof this.play === "undefined" || this.play) {
          if (index > coordinates.length - 1) {
            index = 0;
            geojson.features[0].geometry.coordinates = [coordinates[0]];
          } else {
            let newCoords = geojson.features[0].geometry.coordinates.concat([
              coordinates[index],
            ]);
            newCoords = newCoords.slice(Math.max(newCoords.length - 5, 0));
            // @ts-ignore
            geojson.features[0].geometry.coordinates = newCoords;
            index++;
          }

          this.mapboxMapRef.getSource("line").setData(geojson);
        }

        setTimeout(() => {
          animation = requestAnimationFrame(animateLine);
        }, 250);
      };

      animateLine();
    },
    renderMap: function () {
      if (this.markers && this.markers.length) {
        if (this.mapboxMapRef) {
          this.mapboxMapRef.remove();
        }

        const defaultCoordinates: [number, number] =
          this.markers[0].coordinates;

        // @ts-ignore
        this.mapboxMapRef = new window.mapboxgl.Map({
          accessToken: process.env.VUE_APP_LEAFLET_ACCESS_TOKEN,
          container: this.id,
          zoom: 13.1,
          center: [defaultCoordinates[1], defaultCoordinates[0]],
          style: "mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y",
        });

        this.mapboxMapRef.addControl(new window.mapboxgl.NavigationControl());

        this.mapboxMapRef.on("load", () => {
          this.mapboxMapRef.addSource("mapbox-dem", {
            type: "raster-dem",
            url: "mapbox://mapbox.mapbox-terrain-dem-v1",
            tileSize: 512,
            maxzoom: 14,
          });

          this.mapboxMapRef.setTerrain({
            source: "mapbox-dem",
            exaggeration: 1.5,
          });

          this.renderLine();
        });
      }
    },
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
});
</script>
