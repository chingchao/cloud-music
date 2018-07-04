// import mutations from './mutations'
import * as types from './mutation-types'

export const selectPlay = ({commit, state}, {list, index}) => {
  commit(types.SET_SEQUENCE_LIST, list)
}
