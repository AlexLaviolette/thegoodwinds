<template>
  <div id="nav">
    <div class="title">
      <router-link class="logo" :to="{name: 'home'}">GoodWinds</router-link>
      <p>The Disc-Golf weather app.</p>
    </div>
    <div class="links">
      <router-link :to="{name: 'about'}">About</router-link>
      <router-link class="btn" :to="{name: 'location'}"><span>Set </span>Location</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'nav-component',
  data() {
    return {
    };
  },
  mounted: function () {
  },
  methods: {
  },
};
</script>


<style scoped src="./nav.styl" lang="stylus"></style>