<template>
  <div>
    <days-grid ref="days"></days-grid>
    <overlay>
      <map-component @setLocation="$refs.days.getLocation()"></map-component>
    </overlay>
  </div>
</template>

<script>
import daysGrid from '@/components/days-grid/days-grid.vue';
import overlay from '@/components/overlay/overlay.vue';
import map from '@/components/map/map.vue';
import Vue from 'vue';

<<<<<<< HEAD
import Vue from 'vue';
=======
>>>>>>> main
export default Vue.extend({
  name: 'home',
  data() {
    return {
<<<<<<< HEAD
=======
      today: new Date(),
      units: 'metric'
>>>>>>> main
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
