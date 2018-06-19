import * as types from './mutation-types'

const matutaions = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_RANK_DETAIL] (state, rankList) {
    state.rankList = rankList
  }
}

export default matutaions
