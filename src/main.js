import Vue from 'vue'
import App from './App.vue'
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/css/bootstrap.css'
import Router from 'vue-router'
import router from './router/index'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'
import element from 'element-ui'
import api from "./api"
Vue.prototype.$api = api
Vue.use(Router)
Vue.use(element)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.axios = axios;

axios.defaults.baseURL = './api' //配置axios初始路径
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
