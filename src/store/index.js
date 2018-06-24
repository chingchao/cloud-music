import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getter'
import state from './state'
import mutations from './mutations'
// vux 的插件，修改state 时，会在控制台打印 logger
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// 调试工具，在开发环境下使用
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  // 严格模式，开启会检测 state 的修改是否来源于 mutation
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
