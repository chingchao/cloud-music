<template>
  <div class="pa w100p h100p" v-if="playList.length">
    <div class="player pa w100p" :class="{'t0': fullScreen || showFlag}">
      <transition name="full">
        <div class="flex w100p color-white full-screen" v-if="fullScreen">
          <div class="bg-filter pa w100p h100p" :style="{'background-image': 'url(' + album_img + ')'}"></div>
          <div class="title pr w100p">
            <i class="iconfont icon-xiangxia-copy pa" @click="closePlayer"></i>
            <div class="title-text pa w100p ell flex h100p">
              <h1 class="w100p ell">{{currentSong.name}}</h1>
              <span class="w100p ell singer">{{currentSong.singers}}</span>
            </div>
          </div>
          <div class="play-content w100p pr flex">
            <slider class="flex w100p play-slider" :autoPlay="autoPlay">
              <div class="band flex">
                <div class="img-wrap flex">
                  <img :src="album_img" alt="">
                </div>
                <p class="playing-lyric">{{lyricText || currentSong.name}}</p>
              </div>
              <div class="lyric-wrap w100p">
                <scroll ref="lyricList" class="lyric-scroll" :data="currentLyric && currentLyric.lines">
                  <div>
                    <ul v-if="currentLyric">
                      <li ref="lyricLine" :class="{active: lyricIndex == index}" v-for="(item, index) in currentLyric.lines" :key="item.txt + index">{{item.txt}}</li>
                    </ul>
                  </div>
                </scroll>
              </div>
            </slider>
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
              <i class="iconfont icon-liebiao" @click="showPlayingList"></i>
            </div>
          </div>
        </div>
      </transition>
      <transition name="mini">
        <div class="flex w100p small-screen bg-white pa" v-if="!fullScreen" @click="setFullScreen(true)">
          <img :src="album_img" alt="">
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
          <i class="iconfont icon-liebiao" @click.stop="showPlayingList"></i>
        </div>
      </transition>
      <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="ended"></audio>
    </div>
    <playing-list
      @changeMode="changeMode"
      :iconMode="iconMode"
      :sequenceList="sequenceList"
      :currentSongId="currentSong.id"
      :showFlag="showFlag"
      @changeFlag="changeFlag"
    />
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
import Slider from '@/base/Slider'
import Scroll from '@/base/Scroll'
import Lyric from 'lyric-parser'
import PlayingList from '@/components/PlayingList'
import {playMode} from '@/common/js/config'
import {shuffle} from '@/common/js/util'
import {getLyric, getAlbumDetail} from '@/api/player'
export default {
  data () {
    return {
      // audio 有一个canplay 事件，表示可以播放了，这是才能去切换歌曲，不然会报错。
      songReady: false,
      currentTime: 0,
      duration: 0,
      album_img: '',
      // 进度
      percent: 0,
      lyricIndex: -1,
      lyricText: '',
      currentLyric: null,
      // 是否显示播放列表
      showFlag: false
    }
  },
  created () {
    // 进度条点击/拖动 存放数据
    this.touch = {}
    // 歌词显示自动切换
    this.autoPlay = false
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
    ...mapGetters(['playing', 'fullScreen', 'playList', 'currentSong', 'currentIndex', 'mode', 'sequenceList'])
  },
  mounted () {
    // console.log(this.currentSong)
  },
  components: {
    Slider,
    Scroll,
    PlayingList
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
      // this.getActiveIndex()
    },
    ended () {
      if (this.mode === playMode.loop) {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      } else {
        this.changeSong(1)
      }
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
        this.play(true)
      }
      if (this.currentLyric) {
        this.currentLyric.seek(this.currentTime * 1000)
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
      let list = []
      if (this.mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.setPlayList(list)
      this.setCurrentIndexFn(list)
    },
    // 切换模式后重设当前播放的歌曲
    setCurrentIndexFn (list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
      this.play(true)
    },
    // 显示播放列表
    showPlayingList () {
      this.showFlag = true
    },

    // 显示隐藏播放列表
    changeFlag (flag) {
      this.showFlag = flag
      console.log(flag)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      play: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    })
  },
  watch: {
    currentSong () {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
      if (this.currentLyric) {
        this.currentLyric.stop()
      }

      // 搜索列表无专辑图片，需要发请求从专辑详情中获取
      if (this.currentSong.img) {
        this.album_img = this.currentSong.img
      } else {
        getAlbumDetail(this.currentSong.album_id).then(res => {
          this.album_img = res.data.album.picUrl
        })
      }

      getLyric(this.currentSong.id).then(res => {
        console.log(res)
        if (res.data.code !== 200 || !res.data.lrc) {
          this.currentLyric = null
          this.lyricText = ''
          this.lyricIndex = 0
          return false
        }
        this.currentLyric = new Lyric(res.data.lrc.lyric, ({lineNum, txt}) => {
          console.log({lineNum, txt})
          this.lyricIndex = lineNum
          this.lyricText = txt
          if (!this.fullScreen) return false
          if (lineNum > 4) {
            let lineEl = this.$refs.lyricLine[lineNum - 4]
            this.$refs.lyricList.scrollToElement(lineEl, 1000)
          } else {
            this.$refs.lyricList.scrollTo(0, 0, 1000)
          }
        })
        if (this.currentLyric) {
          this.currentLyric.play()
        }
      })
    },
    playing (newPlaying) {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        newPlaying ? audio.play() : audio.pause()
      })
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .player {
    bottom: 0;
    z-index: 10;
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
    flex-shrink: 0;
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
  .play-slider {
    flex-grow: 1;
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
      height: 250px;
    }
  }
  .small-screen {
    padding: 0 10px;
    box-sizing: border-box;
    height: 50px;
    color: #666;
    bottom:0;
    box-shadow: 0 0 10px 0px rgba(0,0,0,0.1);
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
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
      margin-top: 4px;
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
  .lyric-wrap {
    overflow: hidden;
    text-align: center;
    padding: 0 20px 0;
    box-sizing: border-box;
    li {
      padding: 10px 0;
      line-height: 1.3;
      color: #ddd;
      font-size: 14px;
      transition: .3s;
    }
    li.active {
      color: #fff;
      font-size: 16px;
    }
  }
  .lyric-scroll {
    flex: 1;
    height: 380px;
    overflow: hidden;
  }

  .fotter {
    height: 160px;
    padding: 0 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
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
