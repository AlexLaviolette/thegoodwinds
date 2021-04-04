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
            <p v-if="units == 'imperial'" class="temp">{{ Math.round((chunk.temp * 9/5) + 32) }}<sup>°F</sup></p>
            <p v-else class="temp">{{ chunk.temp }}<sup>°C</sup></p>
            <p v-if="units == 'imperial'" class="wind-pop">{{ Math.round(chunk.wind_kmh / 1.609) }} mph</p>
            <p v-else class="wind-pop">{{ chunk.wind_kmh }} km/h</p>
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
      <div v-if="chunk.size > 1" class="summary">
        <p v-if="chunk.weather_rating > 1">
          <em>
            {{`It's ${ratingVerb[chunk.wind_rating]} windy${comparisonLanguage(chunk.wind_rating, chunk.pop_rating)}`}}
            <br>
            {{`${ratingVerb[chunk.pop_rating]} rainy.`}}
          </em>
        </p>
        <p v-else-if="chunk.size < 4">
          <em>Only {{chunk.size}} hours<br> of great weather</em>
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
      units: 'metric',
      ratingVerb: {
        '1': 'not',
        '2': 'not that',
        '3': 'a bit',
        '4': 'kinda',
        '5': 'pretty',
        '6': 'very',
      }
    };
  },
  methods: {
    comparisonLanguage: function(wind, pop) {
      // if (wind < 3 && pop < 3) return ' and '
      if (wind < 3 && pop > 2) {
        return ', but '
      } else {
        return ' and '
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
