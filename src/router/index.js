import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PlayList from '@/components/PlayList'
// import BaseNav from '@/base/BaseNav'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/playlist',
      name: 'PlayList',
      component: PlayList
    }
  ]
})
