<template>
  <div class="slider pr" ref='slider'>
    <div class="slider-group flex" ref='sliderGroup'>
      <slot></slot>
    </div>
    <div class="dots pa flex w100p">
      <span class='dot' v-for="(item, index) in dots" :class="{active: currentPageIndex === index}" :key='index'></span>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  name: 'Slider',
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    // 是否轮播
    loop: {
      type: Boolean,
      default: true
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 轮播间隔
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted () {
    // 在 Dom 渲染完成后初始化，浏览器的刷新通常17ms一次，如果设置成1ms，浏览器也会等到17ms后才渲染，20ms比较合理
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()

      // 自动轮播
      if (this.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if (!this.slider) return
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  distroy () {
    clearTimeout(this.timer)
  },
  methods: {
    // 设置 slider 的宽度
    _setSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children

      // slider 的宽度
      let width = 0
      // 每一个 child 的宽度等于容器的宽度
      let sliderWidth = this.$refs.slider.clientWidth

      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        // 给每个 child 加 class，设置样式。（因为 child 元素是 <slot> 接受的，为降低耦合度，不能在使用 Slider 组件时给子元素加 class）
        child.classList.add('slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }

      // 如果需要左右滚动，左右还需要各放一个 child
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // 初始化 dot
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    // 初始化
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        // 横向滚动
        scrollX: true,
        // 纵向滚动
        scrollY: false,
        // 惯性
        momentum: false,
        // 是否用于 slider 滚动
        snap: true,
        // 是否可以无缝循环轮播
        snapLoop: this.loop,
        // 滑动阀值，大于阀值则可以滑动到下一页
        snapThreshold: 0.3,
        // 轮播切换的动画时间
        snapSpeed: 400,
        // 允许点击
        click: true
      })

      // 切换事件
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        // 如果循环轮播，前后都加了一个元素，需要减一
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex

        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    // 自动轮播
    _play () {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        // 参数：x轴索引，y轴索引，动画时间
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  }
}
</script>
<style lang='less' scoped>
  .dots {
    bottom: 6px;
    left: 0;
    justify-content: center;
    .dot {
      width: 10px;
      height: 10px;
      margin: 4px;
      background: rgba(256,256,256,0.7);
      border-radius: 100%;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: #fff;
      }
    }
  }
</style>
