import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Recommend from '@/components/Recommend'
import MusicList from '@/components/MusicList'
import Rank from '@/components/Rank'
import Singer from '@/components/Singer'
// import BaseNav from '@/base/BaseNav'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    }, {
      path: '/recommend',
      name: 'recommend',
      component: Recommend,
      children: [{
        path: ':id',
        component: MusicList
      }, {
        path: '/rank',
        name: 'rank',
        component: Rank
      }, {
        path: '/singer',
        name: 'singer',
        component: Singer
      }]
    }
  ]
})
