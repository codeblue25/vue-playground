import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
    load: {
        key: "",
        language : "ko",
        libraries: 'places',
    },
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
