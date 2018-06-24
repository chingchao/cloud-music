<template>
  <transition name='slide'>
    <child-wrap>
      <Title v-if="list.length" title='歌单' :colorType="bgImg ? 1 : 0"/>
      <div class="info-wrap pr" ref="info">
        <div class="black-bg pa"></div>
        <img class="bg-img pa" v-if="bgImg" v-lazy="bgImg" alt="">
        <div class="info flex pa">
          <img class="cover" v-if="bgImg" v-lazy="bgImg" alt="">
          <div class="color-white">
            <span>{{title}}</span>
          </div>
        </div>
      </div>
      <scroll ref="scroll" class='list-content' :data='list'>
        <div>
          <ul class='list'>
            <li v-for='(item, index) in list' :key='item.id'>
              <music-item :index='index + 1' :item='item'></music-item>
            </li>
          </ul>
        </div>
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

export default {
  name: 'MusicList',
  props: {
    title: {
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
  mounted () {
    this.$refs.scroll.$el.style.top = this.$refs.info.clientHeight + 'px'
  }
}
</script>
<style lang='less' scoped>
  .list-content {
    overflow: hidden;
    position: absolute;
    top: 300px;
    bottom: 0;
    width: 100%;
  }
  .loading-container {
    top: 50%;
    width: 100%;
  }
  .info-wrap {
    overflow: hidden;
    height: 190px;
  }
  .bg-img {
    width: 100%;
    height: 100%;
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
    top: 50%;
    margin-top: -32px;
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
</style>
