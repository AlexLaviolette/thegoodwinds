<template>
  <div>
    <days-grid></days-grid>
    <overlay>
      <map-component></map-component>
    </overlay>
  </div>
</template>

<script>
import daysGrid from '@/components/days-grid/days-grid.vue';
import overlay from '@/components/overlay/overlay.vue';
import map from '@/components/map/map.vue';

import Vue from 'vue';
export default Vue.extend({
  name: 'home',
  data() {
    return {
    };
  },
  components: {
    'days-grid': daysGrid,
    'overlay': overlay,
    'map-component': map,
  },
});
</script>

<style src="./home.styl" lang="stylus"></style>
