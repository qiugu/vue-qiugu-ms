import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/element.js'
import VueParticles from 'vue-particles'
import 'font-awesome/css/font-awesome.min.css'
import i18n from './plugins/lang'
import 'element-ui/lib/theme-chalk/display.css'
import echarts from 'echarts'
import http from '@/axios/index'
import './permission'

Vue.use(VueParticles)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = http

new Vue({
  router,
  store,
  i18n,
  echarts,
  http,
  render: h => h(App)
}).$mount('#app')
