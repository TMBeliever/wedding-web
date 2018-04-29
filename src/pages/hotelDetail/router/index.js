import Vue from 'vue'
import Router from 'vue-router'

import hotelDetail from '@/components/hotelDetail'
import allHotel from '@/components/allHotel'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hotel/:id',component:hotelDetail
    },
    {
      path: '/all',component:allHotel
    }
  ]
})
