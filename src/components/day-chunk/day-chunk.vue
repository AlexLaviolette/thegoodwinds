<template>
  <div class="chunk" :style="{height: (chunk.size / 24 * 100) + '%'}">
    <div
      :class="[
        'chunk-inner',
        'weather-rating-' + chunk.weather_rating, chunk.size > 2 ? 'large-content' : '',
        chunk.size > 3 && chunk.weather_rating === 1 ? 'extra-special': '',
        chunk.is_morning ? 'is-morning' : '',
      ]">
      <div class="content">
        <div class="left">
          <img class="weather-icon" :src="require('./weather/' + chunk.icon + '.svg')">
          <div class="text">
            <p v-if="units == 'imperial'" class="wind-pop">{{ Math.round(chunk.wind_kmh / 1.609) }} <sub>mph</sub></p>
            <p v-else class="wind-pop">{{ chunk.wind_kmh }} <sub>km/h</sub></p>
            <p v-if="units == 'imperial'" class="temp">{{ Math.round((chunk.temp * 9/5) + 32) }}<sup>°F</sup></p>
            <p v-else class="temp">{{ chunk.temp }}<sup>°C</sup></p>
          </div>
        </div>
        <div class="hour">
          <!-- Chunk spans am-pm -->
          <p v-if="(chunk.size > 1 && chunk.start < 12 && chunk.start + chunk.size > 12) || (chunk.size > 1 && chunk.start + chunk.size == 24)">
            {{ today.setHours(chunk.start) | moment("ha") }}
            –
            {{ today.setHours(chunk.start + chunk.size) | moment("ha") }}
          </p>
          <!-- Chunk only exists in am or pm -->
          <p v-else-if="chunk.size > 1">
            {{ today.setHours(chunk.start) | moment("h") }}
            –
            {{ today.setHours(chunk.start + chunk.size) | moment("ha") }}
          </p>
          <!-- Single hour chunk -->
          <p v-else>
            {{ today.setHours(chunk.start) | moment("ha") }}
          </p>
        </div>
      </div>
      <div v-if="!chunk.is_morning && chunk.size > 1" class="summary">
        <p>
          <em>{{ getSummary(chunk.temp, chunk.wind_rating, chunk.pop_rating) }}</em>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  name: 'day-chunk',
  data() {
    return {
      today: new Date(),
      units: 'metric'
    };
  },
  methods: {
    getSummary: function(temp, wind, pop) {
      let pptype = temp <= 1 ? "snowy" : "rainy"

      if (wind < 2 && pop < 2) {
        return "Go Play!"
      } else if (wind <= 2 && pop <= 3) {
        return "Go Play! There's only a bit of a breeze."
      } else if (wind <= 3 && pop <= 3) {
        return "Go Play! It's only a little windy."
      } else if (wind <= 5 && pop <= 3) {
        return "It's going to be a bit windy."
      } else if (wind <= 3 && pop <= 5) {
        return `It could be a little ${pptype}.`
      } else if (wind <= 5 && pop <= 5) {
        return `It could be pretty windy and ${pptype}.`
      } else if (wind <= 3) {
        return `It could be very ${pptype}.`
      } else if (pop <= 3) {
        return "It could be very windy."
      } else if (wind <= 5) {
        return `It could be pretty windy and very ${pptype}.`
      } else if (pop <= 5) {
        return `It could be very windy and a little ${pptype}.`
      } else {
        return `It will be very windy and ${pptype}.`
      }
    }
  },
  mounted() {
    if (localStorage.units) {
      this.units = localStorage.units
    }
  },
  props: ['chunk']
});
</script>

<style scoped src="./day-chunk.styl" lang="stylus"></style>
