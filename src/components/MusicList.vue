<template>
  <transition name='slide'>
    <child-wrap>
      <Title v-if="list.length" :title='title' :colorType="bgImg ? 1 : 0"/>
      <div class="info-wrap pr bg-white" ref="info">
        <div class="black-bg pa"></div>
        <img class="bg-img pa" v-if="bgImg" v-lazy="bgImg" alt="">
        <div class="info flex pa">
          <img class="cover" v-if="bgImg" v-lazy="bgImg" alt="">
          <div class="color-white">
            <span class="title-text">{{name}}</span>
          </div>
        </div>
      </div>
      <scroll ref="scroll"
        class='list-content'
        :data='list'
        :probe-type="probeType"
        :listen-scroll="listenScroll"
        @scroll="scroll"
      >
        <div class="pr list-wrap">
          <ul class='list'>
            <li v-for='(item, index) in list' :key='item.id'>
              <music-item :index='index + 1' :item='item' @selectItem="selectSong"></music-item>
            </li>
          </ul>
        </div>
        <div ref="layer" class="layer pa w100p bg-white"></div>
        <div class="loading-container pa" v-show='!list.length'>
          <loading/>
        </div>
      </scroll>
    </child-wrap>
  </transition>
</template>
<script>
import ChildWrap from '@/base/ChildWrap'
import MusicItem from '@/components/MusicItem'
import Title from '@/base/Title'
import Scroll from '@/base/Scroll'
import Loading from '@/base/Loading'
import {playListMixin} from '@/common/js/mixin'
import {mapActions} from 'vuex'

const MIN_HEIGHT = 48

export default {
  name: 'MusicList',
  mixins: [playListMixin],
  props: {
    name: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    },
    bgImg: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '歌单'
    }
  },
  data () {
    return {
      scrollY: 0
    }
  },
  computed: {
    // scrollTopValue () {
    //   return this.$refs.info.clientHeight + 'px'
    // }
  },
  components: {
    MusicItem,
    ChildWrap,
    Title,
    Scroll,
    Loading
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted () {
    this.bgImgHeight = this.$refs.info.clientHeight
    this.$refs.scroll.$el.style.top = this.bgImgHeight + 'px'
  },
  methods: {
    scroll (pos) {
      this.scrollY = pos.y
    },
    selectSong (item, index) {
      this.selectPlay({
        list: this.list,
        index
      })
    },
    // minxin 中调用的方法，有歌曲播放时，重新设置页面底部高度
    handlePlaylist (playList) {
      const bottom = playList.length > 0 ? '50px' : ''
      this.$refs.scroll.$el.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  watch: {
    scrollY (newY) {
      let translateY = Math.max(newY, -this.bgImgHeight + MIN_HEIGHT)
      this.$refs.layer.style['transform'] = `translate3d(0, ${translateY}px, 0)`
      // this.$refs.layer.style['top'] = `${translateY}px`
      let zIndex = 0
      if (newY < -this.bgImgHeight + MIN_HEIGHT) {
        this.$refs.info.style.height = MIN_HEIGHT + 'px'
        zIndex = 2
      } else {
        this.$refs.info.style.height = this.bgImgHeight + 'px'
      }
      this.$refs.info.style.zIndex = zIndex
    }
  }
}
</script>
<style lang='less' scoped>
  .list-content {
    position: absolute;
    top: 300px;
    bottom: 0;
    width: 100%;
    z-index: 1;
  }
  .loading-container {
    top: 50%;
    width: 100%;
  }
  .info-wrap {
    overflow: hidden;
    height: 190px;
    z-index: 0;
  }
  .bg-img {
    width: 100%;
    height: 190px;
    vertical-align: middle;
    filter: blur(20px);
    transform: scale(1.2);
  }
  .black-bg {
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .info {
    top: 66px;
    padding: 0 30px;
    z-index: 2;
  }
  .cover {
    width: 100px;
    height: 100px;
    border-radius: 3px;
    flex-shrink: 0;
    margin-right: 10px;
  }
  .title-text {
    line-height: 1.4;
  }
  .list-wrap {
    z-index: 1;
  }
  .layer {
    top: 0;
    left: 0;
    bottom: 0;
  }
</style>
