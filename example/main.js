import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import NavBar from './component/NavBar'
import RoundLink from './component/RoundLink'
import './style/index.less'

Vue.use(VueRouter)
Vue.component(NavBar.name, NavBar)
Vue.component(RoundLink.name, RoundLink)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
