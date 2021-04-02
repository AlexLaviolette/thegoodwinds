<template>
  <div>
    <div class="date-header">
      <div class="single-date" v-for="(chunks, date, i) in chunked" :key="i">
        <p class="day">{{ date | moment("ddd")}}</p>
        <p class="date">{{ date | moment("D")}}</p>
      </div>
    </div>
    <div class="days-grid" v-if="chunked">
      <days-column v-for="(chunks, date, i) in chunked" :date="date" :key="i">
        <day-chunk v-for="(chunk, i) in chunks" :key="i" :chunk="chunk"></day-chunk>
      </days-column>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import daysColumn from '@/components/days-column/days-column.vue'
import dayChunk from '@/components/day-chunk/day-chunk.vue'
// import response from './response.js'
export default Vue.extend({
  name: 'days-grid',
  data() {
    return {
      chunked: undefined
    };
  },
  components: {
    'days-column': daysColumn,
    'day-chunk': dayChunk,
  },
  created: function () {
    if (!localStorage.lat || !localStorage.lon) {
      this.$router.push({name: 'location'})
    } else {
      this.getLocation()
    }
  },
  methods: {
    getLocation: async function () {
      try {
        let lat = localStorage.lat;
        let lon = localStorage.lon;
        let result = await this.$axios.get(process.env.VUE_APP_API_URL + '/weather/chunked?start=9&lat=' + lat + '&lon=' + lon);
        this.chunked = result.data;
      } catch(error) {
        console.error(error);
      }
    }
  }
});
</script>

<style scoped src="./days-grid.styl" lang="stylus"></style>
