import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

console.log(process.env.NODE_ENV)

Vue.use(require('vue-moment'));
Vue.use(require('vue-gtm'), {
  id: "GTM-KLG6JMN",
  defer: true,
  enabled: process.env.NODE_ENV === 'production',
  debug: true,
  loadScript: false, // change this if you need to access GTM scripts in components
  vueRouter: router,
  // ignoredViews: ["homepage"],
  trackOnNextTick: false,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
