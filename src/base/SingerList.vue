<template>
  <scroll :data="singers" ref="singerList">
    <ul class="singer-ul">
      <li class="singer-group" v-for="group in singers" :key="group.title" ref="singerGroup">
        <p class="title bg-gray">{{group.title}}</p>
        <div class="info flex" v-for="v in group.item" :key="v.id">
          <img class="img" v-lazy="v.picUrl" :alt="v.name">
          <span class="name">{{v.name}}</span>
        </div>
      </li>
    </ul>
    <div class="shortcut-list bg-gray"
      v-if="shortcutList.length"
      @touchstart="onShoutcutTouchStart"
      @touchmove.stop.prevent="onShoutcutTouchMove"
    >
      <ul>
        <li class="li"
          v-for="(item, index) in shortcutList"
          :key="item"
          :data-index="index"
          :class="{'color-theme': currentIndex === index}"
        >{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>
<script>
import Scroll from '@/base/Scroll'
import {getData} from '@/common/js/dom'

// 每个锚点的高度
const ANCHOR_HEIGHT = 14

export default {
  name: 'SingerList',
  data () {
    return {
      currentIndex: 0
    }
  },
  props: {
    singers: {
      type: Array,
      default: () => []
    }
  },
  created () {
    this.touch = {}
  },
  computed: {
    shortcutList () {
      return this.singers.map(item => item.title[0])
    }
  },
  components: {
    Scroll
  },
  methods: {
    onShoutcutTouchStart (e) {
      let index = getData(e.target, 'index')
      if (!index) return
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.index = index
      this._scrollTo(index)
    },
    onShoutcutTouchMove (e) {
      if (!this.touch.index) return
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      // 增量
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let index = delta + parseInt(this.touch.index)
      this._scrollTo(index)
    },
    _scrollTo (index) {
      this.currentIndex = parseInt(index)
      // scrollToElement 方法的第二个参数表示滚动动画时间
      this.$refs.singerList.scrollToElement(this.$refs.singerGroup[index], 0)
    }
  }
}
</script>
<style lang="less" scoped>
  .singer-ul {
    padding: 0 0 10px 0;
  }
  .singer-group {
    // padding: 10px;
  }
  .info {
    padding: 10px 20px;
  }
  .title {
    padding: 6px 20px;
    font-size: 14px;
  }
  .img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .shortcut-list {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    z-index: 2;
    .li {
      font-size: 14px;
      line-height: 14px;
    }
  }
</style>
