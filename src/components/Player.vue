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
      <div class="play-content w100p pr">
        <div class="band flex">
          <div class="img-wrap flex">
            <img :src="currentSong.img" alt="">
          </div>
          <p class="playing-lyric">此歌曲为没有填词的纯音乐，请您欣赏</p>
        </div>
      </div>
      <div class="fotter flex w100p pr">
        <div class="process flex w100p">
          <span>2:30</span>
          <div class="bar pr">
            <span class="pa flex">
              <i class="bg-theme"></i>
            </span>
          </div>
          <span>0:20</span>
        </div>
        <div class="flex w100p">
          <i class="iconfont icon-xunhuanbofang"></i>
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
      <i class="iconfont icon-zanting1 center-icon" v-if="playing" @click.stop="play(false)"></i>
      <i class="iconfont icon-bofang center-icon" v-else @click.stop="play(true)"></i>
      <i class="iconfont icon-liebiao"></i>
    </div>
    </transition>
    <audio ref="audio" :src="currentSong.url"></audio>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  computed: {
    ...mapGetters(['playing', 'fullScreen', 'playList', 'currentSong', 'currentIndex'])
  },
  mounted () {
    console.log(this.currentSong)
  },
  methods: {
    closePlayer () {
      this.setFullScreen(false)
    },
    changeSong (num) {
      let index = this.currentIndex + num
      index = index < 0 ? this.playList.length : index >= this.playList.length ? 0 : index
      this.setCurrentIndex(index)
      if (!this.playing) this.play(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      play: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
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
    height: 56px;
    line-height: 56px;
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
    font-size: 20px;
    flex-direction: column;
    justify-content: space-around;
    line-height: 1;
    .singer {
      font-size: 16px;
    }
  }

  .play-content {
    flex: 1;
    flex-direction: column;
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
    .icon-liebiao {
      margin-left: 6px;
    }
  }
  .playing-lyric {
    padding: 0 10px;
    margin-top: 30px;
  }

  .fotter {
    height: 130px;
    padding: 0 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
  }
  .process {
    margin-bottom: 20px;
    .bar {
      flex: 1;
      height: 2px;
      background: rgba(256,256,256,0.4);
      margin: 0 20px;
      span {
        width: 14px;
        height: 14px;
        top: 0;
        left: 0;
        margin-top: -7px;
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
      font-size: 40px;
    }
    .center-icon {
      font-size: 46px;
      margin: 0 10px;
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
