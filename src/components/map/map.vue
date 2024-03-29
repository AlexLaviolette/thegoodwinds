<template>
  <div>
    <h2 class="title">Set Your Location</h2>
    <p class="error" v-if="error">&#x26A0; Please enter a location to continue.</p>
    <input :class="error ? 'error' : ''" ref="pac" :model="pac" id="pac-input" class="controls" type="text" placeholder="Where do you want to play?" />
    <div class="map-holder">
      <div ref="map" id="map"></div>
    </div>
    <router-link v-if="locationExists" :to="{name: 'home'}" class="close" @click="visible=false" aria-label="close map overlay">×</router-link>
    <div id="get-weather">
      <button @click="setLocation" tag="button" class="btn">Set Location</button>
    </div>
  </div>
</template>

<script>
import init from '@/utils/gplaces';

export default {
  name: 'map-component',
  data() {
    return {
      map: undefined,
      pac: '',
      error: false,
      notSet: false,
      locationExists: false,
      google: null,
      markers: [],
      searchbox: null
    };
  },
  mounted: function () {
    this.initGMaps()
  },
  methods: {
    initGMaps: async function () {
      this.google = await init();
      let initialCenter = { lat: 43.6425662, lng: -79.3892455 };
      if (localStorage.lat && localStorage.lon) {
        initialCenter = {lat: Number(localStorage.lat), lng: Number(localStorage.lon)}
        this.locationExists = true;
      }
      this.map = new this.google.maps.Map(this.$refs.map, {
        center: initialCenter,
        zoom: 13,
        mapTypeId: "roadmap",
      });
      // Create the search box and link it to the UI element.
      const input = this.$refs.pac;
      this.searchBox = new this.google.maps.places.SearchBox(input);
      // this.map.controls[this.google.maps.ControlPosition.TOP_LEFT].push(input);
      // Bias the SearchBox results towards current map's viewport.
      this.map.addListener("bounds_changed", () => {
        this.searchBox.setBounds(this.map.getBounds());
      });
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      this.searchBox.addListener("places_changed", this.placesChangeHandler)
      this.saveLocation()
    },
    placesChangeHandler: function () {
      const places = this.searchBox.getPlaces();
      if (places.length == 0) return
      this.saveLocation(places[0])

      // Clear out the old markers.
      this.markers.forEach((marker) => marker.setMap(null));
      this.markers = [];
      // For each place, get the icon, name and location.
      const bounds = new this.google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
        const icon = {
          url: place.icon,
          size: new this.google.maps.Size(71, 71),
          origin: new this.google.maps.Point(0, 0),
          anchor: new this.google.maps.Point(17, 34),
          scaledSize: new this.google.maps.Size(25, 25),
        };
        // Create a marker for each place.
        let map = this.map
        this.markers.push(
          new this.google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    },
    saveLocation: function (places) {
      this.notSet = false;
      if (places) {
        this.error = false;
        localStorage.lat = places.geometry.location.lat();
        localStorage.lon = places.geometry.location.lng();
        let country = places.address_components.find((x) => x.types[0] === "country")
        let city = places.address_components.find((x) => x.types[0] === "locality")
        if (places.name) {
          localStorage.place_name = places.name;
        }
        if (city && city.long_name) {
          localStorage.city = city.long_name;
        }
        if (country && country.short_name == "US") {
          localStorage.units = 'imperial';
        } else {
          localStorage.units = 'metric';
        }
      } else {
        this.notSet = true;
      }
    },
    setLocation: function () {
      if (this.notSet) {
        this.error = true
      } else {
        this.$store.dispatch('updateCity')
        this.$router.push({name: 'home'})
      }

    }
  },
  beforeDestroy: function () {
    this.google.maps.event.clearListeners(this.map, 'bounds_changed');
  }

};
</script>


<style scoped src="./map.styl" lang="stylus"></style>