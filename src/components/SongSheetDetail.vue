<template>
  <transition name='slide'>
    <music-list :name="name" :list="list" :bgImg="bgImg" title="歌单"></music-list>
  </transition>
</template>
<script>
import MusicList from '@/components/MusicList'
import Song from '@/common/js/song'
import {getRecommendDetail} from '@/api/recommend'
export default {
  name: 'SongSheetDetail',
  data () {
    return {
      name: '',
      list: [],
      bgImg: ''
    }
  },
  components: {
    MusicList
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
        this.name = res.data.playlist.name
        this.bgImg = res.data.playlist.coverImgUrl
      })
    }
  }
}
</script>
<style lang='less' scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
