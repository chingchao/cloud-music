<template>
  <scroll
    :data="singers"
    ref="singerList"
    :listenScroll="listenScroll"
    @scroll="scroll"
    :probeType="probeType"
  >
    <ul class="singer-ul">
      <li class="singer-group" v-for="group in singers" :key="group.title" ref="singerGroup">
        <p class="title bg-gray">{{group.title}}</p>
        <div class="info flex" v-for="v in group.item" :key="v.id" @click="selectItem(v)">
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
    <div class="fixed-title title bg-gray w100p" v-show="fixedTitle" ref="fixedTitle">{{fixedTitle}}</div>
  </scroll>
</template>
<script>
import Scroll from '@/base/Scroll'
import {getData} from '@/common/js/dom'

// 每个锚点的高度
const ANCHOR_HEIGHT = 14
// title 的高度
const TITLE_HEIGHT = 26

export default {
  name: 'SingerList',
  data () {
    return {
      currentIndex: 0,
      // 滚动的距离
      scrollY: -1,
      // 计算每个 singerGroup 底部到父级顶部的高度差，小于 fixedTitle 高度时，fixedtitle 需要向上移
      diff: -1
    }
  },
  props: {
    singers: {
      type: Array,
      default: () => []
    }
  },
  created () {
    // 记录锚点点击和滑动时的数据
    this.touch = {}
    // 是否监听 scroll 组件的滚动事件。给 scroll 传入一个 listenScroll 的 props，scroll 内部派发 scroll 事件
    this.listenScroll = true
    // 每个 singerGroup 到顶部的高度
    this.listHeight = []
    // 将 probeType = 3 传给 scroll，BScroll 在 probeType = 3 时，可以在滚动动画运行过程中实时派发 scroll 事件。
    this.probeType = 3
  },
  computed: {
    shortcutList () {
      return this.singers.map(item => item.title[0])
    },
    fixedTitle () {
      if (this.scrollY > 0) return ''
      return this.singers[this.currentIndex] ? this.singers[this.currentIndex].title : ''
    }
  },
  components: {
    Scroll
  },
  watch: {
    // 在dom渲染完成后获取每个 singerGroup 的高度
    singers () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      // 滚动到顶部 newY > 0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 滚动到底部
      this.currentIndex = listHeight.length - 2
    },
    diff (newVal) {
      // fixedTop 是 .fixed-title 在 y 轴上的偏移
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) return
      this.fixedTop = fixedTop
      this.$refs.fixedTitle.style.transform = `translate3d(0, ${this.fixedTop}px, 0)`
    }
  },
  methods: {
    selectItem (singer) {
      this.$emit('select', singer)
    },
    onShoutcutTouchStart (e) {
      let index = parseInt(getData(e.target, 'index'))
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.index = index
      this._scrollTo(index)
    },
    onShoutcutTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      // 增量
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let index = delta + parseInt(this.touch.index)
      this._scrollTo(index)
    },
    // 滚动事件
    scroll (pos) {
      this.scrollY = pos.y
    },
    _scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.shortcutList.length - 1) {
        index = this.shortcutList.length - 1
      }
      this.currentIndex = index
      // scrollToElement 方法的第二个参数表示滚动动画时间
      this.$refs.singerList.scrollToElement(this.$refs.singerGroup[index], 0)
    },
    // 获取每个 singerGroup 到顶部的高度，用来判断那个锚点高亮
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.singerGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        height = list[i].clientHeight + height
        this.listHeight.push(height)
      }
    },
    refresh () {
      this.$refs.singerList.refresh()
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
  .fixed-title {
    position: fixed;
    top: 48px;
    left: 0;
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
