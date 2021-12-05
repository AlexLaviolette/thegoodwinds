<template>
  <div id="overlay" v-if="visible">
    <div class="shade"></div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  name: 'overlay',
  data() {
    return {
    };
  },
  computed: {
    visible: function () {
      return this.$route.name === 'location'
    }
  },
  mounted() {
  },
  props: []
});
</script>

<style scoped src="./overlay.styl" lang="stylus"></style>
