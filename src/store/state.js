import {playMode} from '@/common/js/config'

const state = {
  singer: {},
  rankList: {},

  /**
   * 播放器
   */
  // 播放
  playing: false,
  // 全屏
  fullScreen: false,
  // 播放列表
  playList: [],
  // 原始列表
  sequenceList: [],
  // 播放模式（顺序/随机）
  mode: playMode.sequence,
  // 播放索引
  currentIndex: -1
}

export default state
