import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueParticles from 'vue-particles'
import 'font-awesome/css/font-awesome.min.css'
import i18n from './plugins/lang'
import ElementUI from 'element-ui'
import './plugins/theme.scss'
//  按需加载echarts图表，减小打包体积
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import http from '@/axios/index'
import directives from '@/directives/index'
import './permission'

Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = http
directives(Vue)

new Vue({
  router,
  store,
  i18n,
  echarts,
  http,
  render: h => h(App)
}).$mount('#app')
