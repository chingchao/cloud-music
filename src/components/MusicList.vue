<template>
  <transition name='slide'>
    <div class='music-list'>
      <Title class='title' :title='title'/>
      <ul class='list'>
        <li v-for='(item, index) in list' :key='item.id'>
          <music-item :index='index' :item='item'></music-item>
        </li>
      </ul>
    </div>
  </transition>
</template>
<script>
import {getRecommendDetail} from '@/api/recommend'
import MusicItem from '@/components/MusicItem'
import Title from '@/base/Title'

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
    Title
  },
  created () {
    this._getRecommendDetail()
  },
  methods: {
    _getRecommendDetail () {
      getRecommendDetail(this.$route.params.id).then(res => {
        console.log(res)
        this.list = res.data.playlist.tracks.map(item => {
          return {
            name: item.name,
            id: item.aid,
            al_name: item.al.name,
            singers: item.ar.map(item => item.name).join('/')
          }
        })
        this.title = res.data.playlist.name
      })
    }
  }
}
</script>
<style lang='less' scoped>
  .music-list {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    overflow: auto;
    .title {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 2;
    }
    .list {
      position: absolute;
      top: 56px;
      width: 100%;
    }
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
