<template lang="html">
  <div class="subheader py-6" id="kt_subheader">
    <div
      class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap"
    >
      <div class="d-flex align-items-baseline flex-wrap mr-5">
        <h5 class="text-dark-50 font-weight-bold my-1 mr-5">Tools</h5>
      </div>
      <ul class="nav nav-pills nav-light-primary nav-boldest d-none d-md-flex">
        <li class="nav-item">
          <router-link :to="{ name: 'tools-home' }" class="nav-link">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'tools-data-mapping-home' }"
            class="nav-link"
          >
            Data Mapping
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="d-flex flex-column d-md-none bg-light">
    <router-link :to="{ name: 'tools-home' }" class="btn btn-block btn-link">
      <span class="font-weight-bolder">Home</span>
    </router-link>
    <router-link
      :to="{ name: 'tools-data-mapping' }"
      class="btn btn-block btn-link"
    >
      <span class="font-weight-bolder">Data Mapping</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
