<template>
  <div class="player pa w100p" v-if="playList.length">
    <transition name="full">
    <div class="flex w100p color-white full-screen" v-if="fullScreen">
      <div class="bg-filter pa w100p h100p" :style="{'background-image': 'url(' + currentSong.img + ')'}"></div>
      <div class="title pr w100p">
        <i class="iconfont icon-xiangxia-copy pa" @click="closePlayer"></i>
        <div class="title-text pa w100p ell flex h100p">
          <h1 class="w100p ell">{{currentSong.name}}</h1>
          <span class="w100p ell singer">{{currentSong.singers}}</span>
        </div>
      </div>
      <div class="play-content w100p pr flex">
        <div class="band flex">
          <div class="img-wrap flex">
            <img :src="currentSong.img" alt="">
          </div>
          <p class="playing-lyric">此歌曲为没有填词的纯音乐，请您欣赏</p>
        </div>
      </div>
      <div class="fotter flex w100p pr">
        <div class="progress-wrap flex w100p">
          <span class="time">{{format(currentTime)}}</span>
          <div class="bar-wrap"
            ref="progressBar"
            @touchstart.prevent="progressStart"
            @touchmove.prevent="progressMove"
            @touchend.prevent="progressEnd"
          >
            <div class="bar pr">
              <div class="dib pa progress" :style="{width: progressWidth}">
                <span class="pa flex">
                  <i class="bg-theme"></i>
                </span>
              </div>
            </div>
          </div>
          <span class="time">{{format(duration)}}</span>
        </div>
        <div class="flex w100p">
          <i class="iconfont" :class="iconMode" @click="changeMode"></i>
          <div class="oprate flex">
            <i class="iconfont icon-yduishangyiqu" @click="changeSong(-1)"></i>
            <i class="iconfont icon-zanting1 center-icon" v-if="playing" @click="play(false)"></i>
            <i class="iconfont icon-bofang center-icon" v-else @click="play(true)"></i>
            <i class="iconfont icon-xiayiqu" @click="changeSong(1)"></i>
          </div>
          <i class="iconfont icon-liebiao"></i>
        </div>
      </div>
    </div>
    </transition>
    <transition name="mini">
    <div class="flex w100p small-screen bg-white" v-if="!fullScreen" @click="setFullScreen(true)">
      <img :src="currentSong.img" alt="">
      <div class="info flex">
        <span class="song-name ell">{{currentSong.name}}</span>
        <span class="singer ell">{{currentSong.singers}}</span>
      </div>
      <div class="pr" @click.stop="play(!playing)">
        <svg class="pa" width="28" height="28" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle class="circle-bar pa" r="50" cx="50" cy="50" fill="transparent" stroke-dasharray="314" :stroke-dashoffset="dashOffset"></circle>
        </svg>
        <i class="iconfont icon-zanting1 center-icon" v-if="playing"></i>
        <i class="iconfont icon-bofang center-icon" v-else></i>
      </div>
      <i class="iconfont icon-liebiao"></i>
    </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="ended"></audio>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
import {playMode} from '@/common/js/config'
export default {
  data () {
    return {
      // audio 有一个canplay 事件，表示可以播放了，这是才能去切换歌曲，不然会报错。
      songReady: false,
      currentTime: 0,
      duration: 0,
      // 进度
      percent: 0
    }
  },
  created () {
    // 进度条点击/拖动 存放数据
    this.touch = {}
  },
  computed: {
    progressWidth () {
      return (this.percent * 100 | 0) + '%'
    },
    dashOffset () {
      return (1 - this.percent) * 314
    },
    iconMode () {
      return this.mode === playMode.sequence ? 'icon-xunhuanbofang' : this.mode === playMode.loop ? 'icon-danquxunhuan' : 'icon-suijibofang'
    },
    ...mapGetters(['playing', 'fullScreen', 'playList', 'currentSong', 'currentIndex', 'mode'])
  },
  mounted () {
    console.log(this.currentSong)
  },
  methods: {
    closePlayer () {
      this.setFullScreen(false)
    },
    changeSong (num) {
      if (!this.songReady) return false
      this.songReady = false
      let index = this.currentIndex + num
      index = index < 0 ? this.playList.length : index >= this.playList.length ? 0 : index
      this.setCurrentIndex(index)
      if (!this.playing) this.play(true)
    },
    ready () {
      this.songReady = true
      this.duration = this.$refs.audio.duration
    },
    error () {
      this.songReady = true
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
      // 如果在拖动进度条，不改变进度条宽度
      if (this.touch.init) return false
      this.percent = this.currentTime / this.duration
    },
    ended () {
      this.changeSong(1)
    },
    // 格式化时间
    format (time) {
      let minute = time / 60 | 0
      let second = time % 60 | 0
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      return minute + ':' + second
    },

    // 进度条拖动/点击
    _getPercent (x) {
      let percent = (x - this.touch.left) / this.touch.width
      percent = percent < 0 ? 0 : percent
      percent = percent > 1 ? 1 : percent
      this.percent = percent
      this.currentTime = this.duration * percent
      if (!this.touch.init) {
        this.$refs.audio.currentTime = this.currentTime
      }
    },
    progressStart (e) {
      this.touch.init = true
      this.touch.left = this.$refs.progressBar.offsetLeft
      this.touch.width = this.$refs.progressBar.clientWidth
    },
    progressMove (e) {
      if (!this.touch.init) return false
      this._getPercent(e.touches[0].clientX)
    },
    progressEnd (e) {
      this.touch.init = false
      this._getPercent(e.changedTouches[0].clientX)
    },
    // 切换播放模式
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      play: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE'
    })
  },
  watch: {
    currentSong () {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing (newPlaying) {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        newPlaying ? audio.play() : audio.pause()
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .player {
    bottom: 0;
    z-index: 10;
    // height: 50px;
    box-shadow: 0 0 10px 0px rgba(0,0,0,0.1);
  }
  .full-screen {
    top: 0;
    bottom: 0;
    position: fixed;
    flex-direction: column;
    background-color: #444;
  }
  .bg-filter {
    top: 0;
    left: 0;
    background: #aaa;
    opacity: 0.5;
    filter: blur(10px);
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    transform: scale(1.3);
  }
  .title {
    height: 48px;
    line-height: 48px;
  }
  .icon-xiangxia-copy {
    padding: 0 18px;
    z-index: 2;
  }
  .title-text {
    padding: 0 50px;
    box-sizing: border-box;
    text-align: center;
    left: 0;
    font-size: 18px;
    flex-direction: column;
    justify-content: center;
    line-height: 1.2;
    h1 {
      line-height: 1.2;
    }
    .singer {
      font-size: 14px;
      margin-top: 2px;
    }
  }

  .play-content {
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
  }
  .band {
    height: 100%;
    flex-direction: column;
    justify-content: center;
  }
  .img-wrap {
    align-self: center;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 250px;
    }
  }
  .small-screen {
    padding: 0 10px;
    box-sizing: border-box;
    height: 50px;
    color: #666;
    img {
      width: 36px;
      height: 36px;
      border-radius: 3px;
    }
    .info {
      flex: 1;
      margin: 0 10px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    // .song-name: {
    // }
    .singer {
      color: #999;
      font-size: 14px;
    }
    .circle-bar {
      stroke: #dd4137;
      stroke-width: 6px;
      transform: scale(.92) rotate(-90deg);
      transform-origin: center;
    }
    .icon-liebiao {
      margin-left: 8px;
    }
  }
  .playing-lyric {
    padding: 0 10px;
    margin-top: 30px;
  }

  .fotter {
    height: 160px;
    padding: 0 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
  }
  .progress-wrap {
    margin-bottom: 26px;
    .bar-wrap {
      flex: 1;
      padding: 6px 0;
      margin: 0 10px;
    }
    .bar {
      height: 2px;
      background: rgba(256,256,256,0.4);
    }
    .time {
      min-width: 3rem;
    }
    .progress {
      height: 100%;
      width: 0;
      background: #fff;
      span {
        width: 14px;
        height: 14px;
        top: 0;
        right: -7px;
        margin-top: -6px;
        background: #fff;
        border-radius: 50px;
        justify-content: center;
        i {
          width: 4px;
          height: 4px;
          border-radius: 6px;
          display: inline-block;
        }
      }
    }
  }
  .oprate {
    flex: 1;
    justify-content: center;
    text-align: center;
    .iconfont {
      font-size: 44px;
      touch-action: none;
    }
    .center-icon {
      font-size: 54px;
      margin: 0 14px;
    }
  }

  .full-enter-active, .full-leave-active {
    transition: 0.4s;
    .title, .fotter {
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
  }
  .full-enter, .full-leave-to {
    opacity: 0;
    .title{
      transform: translate3d(0, -100px, 0)
    }
    .fotter {
      transform: translate3d(0, 100px, 0)
    }
  }
  .mini-enter-active, .mini-leave-active {
    transition: all 0.4s;
  }
  .mini-enter, .mini-leave-to {
    opacity: 0;
  }
</style>
