// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import caseDetail from './caseDetail.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/comment/stylus/index.styl'
import axios from 'axios'
axios.defaults.headers.common['Authorization'] =localStorage.getItem(localStorage.email)
Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(caseDetail)
})
