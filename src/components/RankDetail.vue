<template>
  <transition name="rank-detail">
    <music-list :name="name" :list="list" :bgImg="bgImg" title="榜单"></music-list>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import MusicList from '@/components/MusicList'
import Song from '@/common/js/song'
import {getRank} from '@/api/rank'

export default {
  name: 'RankDetail',
  data () {
    return {
      list: [],
      name: '',
      bgImg: ''
    }
  },
  components: {
    MusicList
  },
  computed: {
    ...mapGetters(['rankList'])
  },
  created () {
    // 得到的可能是榜单详情，可能只有榜单id
    const rankListData = this.rankList
    // const rankListData = this.$store.state.rankList
    console.log(rankListData)
    if (!rankListData.name) {
      this._getRankDetail(rankListData.id)
    } else {
      this.list = rankListData.songList.map(item => {
        return new Song(item)
      })
      this.name = rankListData.name
      this.bgImg = rankListData.coverImgUrl
    }
  },
  methods: {
    _getRankDetail (idx) {
      getRank(idx).then(res => {
        let item = res.data.playlist
        this.list = item.tracks.map(item => {
          return new Song(item)
        })
        this.name = item.name
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
