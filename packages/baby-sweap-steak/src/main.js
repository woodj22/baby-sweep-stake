import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import 'es6-promise/auto'

Vue.config.productionTip = false
Vue.use(VueResource);

new Vue({
  render: h => h(App),
}).$mount('#app')
