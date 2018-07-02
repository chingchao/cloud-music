export const singer = state => state.singer
export const rankList = state => state.rankList
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const palyList = state => state.palyList
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = state => {
  return state.palyList[state.currentIndex] || {}
}
