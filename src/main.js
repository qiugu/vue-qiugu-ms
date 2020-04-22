import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import VueParticles from 'vue-particles'
import 'font-awesome/css/font-awesome.min.css'
import i18n from './plugins/lang'
import ElementUI from 'element-ui'
import './plugins/theme.scss'
import directives from '@/directives'
import './mock/index'

Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.config.productionTip = false
directives(Vue)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
