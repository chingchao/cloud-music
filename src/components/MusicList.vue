<template>
  <transition name='slide'>
    <child-wrap>
      <Title v-if="title" :title='title' :colorType="bgImg ? 1 : 0"/>
      <scroll ref="scroll" class='list-content' :class="{'translate-y': bgImg}" :data='list'>
        <div>
          <div class="info">
            <img class="bg-img" v-if="bgImg" v-lazy="bgImg" alt="">
          </div>
          <ul class='list' v-if="list.length">
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
  components: {
    MusicItem,
    ChildWrap,
    Title,
    Scroll,
    Loading
  }
}
</script>
<style lang='less' scoped>
  .list-content {
    overflow: hidden;
    position: absolute;
    top: 56px;
    bottom: 0;
    width: 100%;
  }
  .loading-container {
    top: 50%;
    width: 100%;
  }

  .bg-img {
    width: 100%;
  }
  .translate-y {
    top: 0;
  }
</style>
