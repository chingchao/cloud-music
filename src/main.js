// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// import MuseUI from 'muse-ui'
// import 'muse-ui/dist/muse-ui.css'

// import '@/common/style/index.less'

// 解决移动端点击事件300ms延迟
fastclick.attach(document.body)

// Vue.use(MuseUI)
Vue.use(VueLazyLoad, {
  loading: require('./common/img/img-loading.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // render: h => h(App)
  components: { App },
  template: '<App/>'
})
