<template>
  <div id="about">
    <section>
      <div class="title">
        <router-link class="logo" :to="{name: 'home'}"><img src="horizontal-logo-blue.png"/></router-link>
      </div>
      <p>
        GoodWinds is a disc-golf weather app to help you figure out the best times in the coming week to play disc golf.
        Weather is chunked into blocks and ranked based on a blended analysis of <i>Wind</i>, <i>Temperature</i>, <i>Precipitation</i>,
        and <i>Time of Day</i>.
      </p>
      <p>
        This website is maintained by <a href="https://github.com/AlexLaviolette" target="_blank">Alex</a> and <a href="https://github.com/kravse" target="_blank">Jared</a>.
        We get our weather information from the free <a href="https://openweathermap.org/api" target="_blank">Open Weather API</a>. The code used in this site is open source, so feel free to contribute&nbsp;on&nbsp;<a href="https://github.com/TheGoodWinds" target="_blank">GitHub</a>.
      </p>
      <div id="privacy-policy">
        <h4>Privacy Policy</h4>
        <p>
          We don't store your data.

          We don't even have a database to store it in. Even if Paul McBeth asks really really nicely, we don't have anything to show him.
        </p>
      </div>
    </section>
  </div>
</template>

<script>

import Vue from 'vue';
export default Vue.extend({
  name: 'about',
  data() {
    return {
    };
  },
});
</script>

<style src="./about.styl" lang="stylus"></style>
