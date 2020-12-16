import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import zyLibrary from '../packages/index'
Vue.use(zyLibrary)

new Vue({
  render: h => h(App),
}).$mount('#app')
