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
      id: _.uniqueId("animatedLineMap-").toString(),
      play: true,
    };
  },
  methods: {
    renderMap: function () {
      if (this.markers && this.markers.length) {
        if (this.mapboxMapRef as any) {
          (this.mapboxMapRef as any).remove();
        }

        const defaultCoordinates: [number, number] =
          this.markers[0].coordinates;

        // @ts-ignore
        (this.mapboxMapRef as any) = new window.mapboxgl.Map({
          accessToken: process.env.VUE_APP_LEAFLET_ACCESS_TOKEN,
          container: this.id,
          center: [defaultCoordinates[1], defaultCoordinates[0]],
          style: "mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y",
          zoom: 15,
          pitch: 65,
          bearing: -180,
          interactive: false,
        });

        const coordinates: [number, number][] = this.markers.map(
          (marker: MapMarker) => [marker.coordinates[1], marker.coordinates[0]]
        );

        const routes = {
          target: coordinates,
          camera: coordinates.map((point: any) => [point[0] - 0.01, point[1]]),
        };

        const targetRoute = routes.target;
        const cameraRoute = routes.camera;

        (this.mapboxMapRef as any).on("load", () => {
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
              "sky-atmosphere-sun": [0.0, 90.0],
              "sky-atmosphere-sun-intensity": 15,
            },
          });

          (this.mapboxMapRef as any).addSource("trace", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: targetRoute,
              },
            },
          });

          (this.mapboxMapRef as any).addLayer({
            type: "line",
            source: "trace",
            id: "line",
            paint: {
              "line-color": "#ffffff",
              "line-width": 1,
            },
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
          });

          (this.mapboxMapRef as any).setFog({
            range: [2, 12],
            color: "white",
            "horizon-blend": 0.1,
          });

          (this.mapboxMapRef as any).addSource("point", {
            type: "geojson",
            data: {
              type: "Point",
              coordinates: coordinates[0],
            },
          });

          (this.mapboxMapRef as any).addLayer({
            id: "point",
            source: "point",
            type: "circle",
            paint: {
              "circle-radius": 5,
              "circle-color": "#e74c3c",
            },
          });

          const animationDuration = 3000 * this.markers.length;
          const cameraAltitude = 1000;
          // get the overall distance of each route so we can interpolate along them
          const routeDistance = window.turf.lineDistance(
            window.turf.lineString(targetRoute)
          );
          const cameraRouteDistance = window.turf.lineDistance(
            window.turf.lineString(cameraRoute)
          );

          let start: any;

          const frame = (time: any) => {
            if (typeof this.play !== "undefined" && !this.play) {
              window.requestAnimationFrame((offsetTime: any) => {
                start = start + offsetTime - time;
                frame(offsetTime);
              });
              return;
            }

            if (!start) start = time;
            // phase determines how far through the animation we are
            const phase = (time - start) / animationDuration;

            // phase is normalized between 0 and 1
            // when the animation is finished, reset start to loop the animation
            if (phase > 1) {
              // wait 1.5 seconds before looping
              setTimeout(() => {
                start = 0.0;
              }, 1500);
            }

            // use the phase to get a point that is the appropriate distance along the route
            // this approach syncs the camera and route positions ensuring they move
            // at roughly equal rates even if they don't contain the same number of points
            const alongRoute = window.turf.along(
              window.turf.lineString(targetRoute),
              routeDistance * phase
            ).geometry.coordinates;

            const alongCamera = window.turf.along(
              window.turf.lineString(cameraRoute),
              cameraRouteDistance * phase
            ).geometry.coordinates;

            const camera = (this.mapboxMapRef as any).getFreeCameraOptions();

            // set the position and altitude of the camera
            camera.position = window.mapboxgl.MercatorCoordinate.fromLngLat(
              {
                lng: alongCamera[0],
                lat: alongCamera[1],
              },
              cameraAltitude
            );

            // tell the camera to look at a point along the route
            camera.lookAtPoint({
              lng: alongRoute[0],
              lat: alongRoute[1],
            });

            (this.mapboxMapRef as any).getSource("point").setData({
              type: "Point",
              coordinates: [alongRoute[0], alongRoute[1]],
            });

            (this.mapboxMapRef as any).setFreeCameraOptions(camera);

            window.requestAnimationFrame(frame);
          };

          window.requestAnimationFrame(frame);
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
