<template>
  <transition name="rank-detail">
    <music-list :title="title" :list="rankList" :bgImg="bgImg"></music-list>
  </transition>
</template>
<script>
// import {mapGetters} from 'vuex'
import MusicList from '@/components/MusicList'
import Song from '@/common/js/song'
import {getRank} from '@/api/rank'

export default {
  name: 'RankDetail',
  data () {
    return {
      rankList: [],
      title: '',
      bgImg: ''
    }
  },
  components: {
    MusicList
  },
  computed: {
    // ...mapGetters(['rankList']),
  },
  created () {
    // 得到的可能是榜单详情，可能是榜单id
    const rankListData = this.$store.state.rankList
    if (!rankListData.name) {
      this._getRankDetail(rankListData)
    } else {
      this.rankList = rankListData.songList.map(item => {
        return new Song(item)
      })
      this.title = rankListData.name
      this.bgImg = rankListData.coverImgUrl
    }
  },
  methods: {
    _getRankDetail (idx) {
      getRank(idx).then(res => {
        let item = res.data.playlist
        this.rankList = item.tracks.map(item => {
          return new Song(item)
        })
        this.title = item.name
        this.bgImg = item.coverImgUrl
      })
    }
  }
}
</script>
<style scoped>
  .rank-detail-enter-active, .rank-detail-leave-active {
    transition: all 0.3s;
  }
  .rank-detail-enter, .rank-detail-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
