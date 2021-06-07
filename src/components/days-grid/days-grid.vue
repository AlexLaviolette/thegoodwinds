<template>
  <div class="grid" :class="isLoaded ? '' : 'loading'">
    <div class="date-header">
      <div class="single-date" v-for="(chunks, date, i) in chunked" :key="i">
        <p class="day">{{ date | moment("ddd")}}</p>
        <p class="date">{{ date | moment("D")}}</p>
      </div>
    </div>
    <div class="days-grid-wrap" :class="unlocked ? 'unlocked' : ''" id="grid-wrap">
      <div class="time-col" ref="time">
        <p v-for="(val, i) in timeVals" :key="i">
          <span>{{val}}</span><span class="dash">—</span>
        </p>
      </div>
      <div class="days-grid" ref="daysGrid" v-if="chunked">
        <days-column v-for="(chunks, date, i) in chunked" :date="date" :key="i">
          <day-chunk v-for="(chunk, i) in chunks" :key="i" :chunk="chunk"></day-chunk>
        </days-column>
      </div>
    </div>
    <button aria-label="Unlock weather predictions for night time" class="up" :class="unlocked ? 'unlocked' : ''" @click="showMorning()">
      <span class="arrow">&#10154;</span>
      <span v-if="!unlocked" class="tooltip">Click to view early morning weather&nbsp;predictions.</span>
    </button>

  </div>
</template>

<script>
import Vue from 'vue';
import daysColumn from '@/components/days-column/days-column.vue'
import dayChunk from '@/components/day-chunk/day-chunk.vue'

export default Vue.extend({
  name: 'days-grid',
  data() {
    return {
      chunked: undefined,
      isLoaded: false,
      unlocked: false,
      timeVals: Array(24).fill().map((v, i) => {
        let val = i % 12;
        val = val == 0 ? 12 : val;
        return `${val} ${i < 12 ? 'AM' : 'PM'}`
      })
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
    this.watcher = this.$store.watch((state, getters) => getters.city, () => {
      this.getLocation();
    })
  },
  methods: {
    showMorning: function () {
      if (this.unlocked) {
        this.$refs.daysGrid.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        this.$refs.time.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        this.$nextTick(() => {
          setTimeout(() => {
            this.unlocked = false;
          }, 500)
        });
      } else {
        this.unlocked = true;
        this.$nextTick(() => {
          this.$refs.daysGrid.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          this.$refs.time.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        });
      }

    },
    getLocation: async function () {
      this.isLoaded = false
      try {
        let lat = localStorage.lat;
        let lon = localStorage.lon;
        let result = await this.$axios.get(process.env.VUE_APP_API_URL + '/weather/chunked?start=9&lat=' + lat + '&lon=' + lon);
        this.isLoaded = true
        this.chunked = result.data;
        this.$nextTick(() => {
          var container = this.$el.querySelector("#grid-wrap")
          container.scrollTop = container.scrollHeight
        })
      } catch(error) {
        console.error(error);
      }
    }
  },
  beforeDestroy: function() {
    this.watcher();
  },
});
</script>

<style scoped src="./days-grid.styl" lang="stylus"></style>
