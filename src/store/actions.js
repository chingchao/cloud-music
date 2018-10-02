import * as types from './mutation-types'

const findIndex = (list, song) => list.map(item => item.id).indexOf(song.id)

export const selectPlay = ({commit, state}, {list, index}) => {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
}

export const deleteSong = ({commit, state}, song) => {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let pIndex = findIndex(playList, song)
  let sIndex = findIndex(sequenceList, song)
  let currentIndex = state.currentIndex
  playList.splice(pIndex, 1)
  sequenceList.splice(sIndex, 1)

  if (pIndex < currentIndex || currentIndex === playList.length) {
    currentIndex--
  }

  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_PLAYLIST, playList)

  if (!playList.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
}
