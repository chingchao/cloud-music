<template>
  <transition name='slide'>
    <child-wrap>
      <Title :title='title'/>
      <scroll ref="scroll" class='list-content' :data='list'>
        <div>
          <ul class='list' v-if="list.length">
            <li v-for='(item, index) in list' :key='item.id'>
              <music-item :index='index' :item='item'></music-item>
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
import {getRecommendDetail} from '@/api/recommend'
import ChildWrap from '@/base/ChildWrap'
import MusicItem from '@/components/MusicItem'
import Title from '@/base/Title'
import Scroll from '@/base/Scroll'
import Loading from '@/base/Loading'
import Song from '@/common/js/song'

export default {
  name: 'MusicList',
  data () {
    return {
      list: [],
      info: {},
      title: ''
    }
  },
  components: {
    MusicItem,
    ChildWrap,
    Title,
    Scroll,
    Loading
  },
  created () {
    this._getRecommendDetail()
  },
  methods: {
    _getRecommendDetail () {
      getRecommendDetail(this.$route.params.id).then(res => {
        console.log(res)
        this.list = res.data.playlist.tracks.map(item => {
          return new Song(item)
        })
        this.title = res.data.playlist.name
      })
    }
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
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
