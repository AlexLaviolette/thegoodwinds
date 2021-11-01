<template>
  <div id="nav">
    <div class="title">
      <router-link class="logo" :to="{name: 'home'}"><img src="horizontal-logo-blue.png"/></router-link>
    </div>
    <div class="links">
      <router-link class="link" :to="{name: 'about'}">About</router-link>
      <router-link class="btn" :to="{name: 'location'}">
        <span v-if="city" class="location">
          {{city}}<span class="symbol">&#10146;</span>
        </span>
        <span v-else>
          <span class="desktop">Set </span>Location
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'nav-component',
  data() {
    return {
      city: this.$store.state.city
    };
  },
  created: function () {
    this.watcher = this.$store.watch((state, getters) => getters.city, (city) => {
      this.city = city;
    })
  },
  beforeDestroy: function() {
    this.watcher();
  }
};
</script>


<style scoped src="./nav.styl" lang="stylus"></style>