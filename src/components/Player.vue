<template>
  <div class="player pa w100p" v-if="!palyList.length">
    <div class="flex w100p color-white full-screen" v-if="fullScreen">
      <div class="title pr w100p">
        <i class="iconfont icon-xiangxia-copy pa" @click="setFullScreen(false)"></i>
        <span class="title-text pa w100p ell">title</span>
      </div>
      <div class="play-content w100p">
        <div class="band flex">
          <div class="img-wrap flex">
            <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003JFTIm1Wd4n2.jpg?max_age=2592000" alt="">
          </div>
          <p class="playing-lyric">此歌曲为没有填词的纯音乐，请您欣赏</p>
        </div>
      </div>
      <div class="fotter flex w100p">
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
            <i class="iconfont icon-yduishangyiqu"></i>
            <i class="iconfont icon-zanting1 center-icon" v-if="playing"></i>
            <i class="iconfont icon-bofang center-icon" v-else></i>
            <i class="iconfont icon-xiayiqu"></i>
          </div>
          <i class="iconfont icon-liebiao"></i>
        </div>
      </div>
    </div>
    <div class="flex w100p small-screen bg-white" v-else @click="setFullScreen(true)">
      <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003JFTIm1Wd4n2.jpg?max_age=2592000" alt="">
      <div class="info flex">
        <span class="song-name ell">Rance</span>
        <span class="singer ell">Lee</span>
      </div>
      <i class="iconfont icon-zanting1 center-icon" v-if="playing"></i>
      <i class="iconfont icon-bofang center-icon" v-else></i>
      <i class="iconfont icon-liebiao"></i>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  computed: {
    ...mapGetters(['playing', 'fullScreen', 'palyList'])
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  }
}
</script>
<style lang="less" scoped>
  .player {
    bottom: 0;
    z-index: 10;
    height: 50px;
  }
  .full-screen {
    background: #585858;
    top: 0;
    bottom: 0;
    position: fixed;
    flex-direction: column;
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
    height: 100%;
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
</style>
