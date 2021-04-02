<template>
  <div class="days-column">
    <div class="days">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'days-column',
  data() {
    return {
      today: new Date()
    };
  },
  props: ['date']
});
</script>

<style scoped src="./days-column.styl" lang="stylus"></style>
