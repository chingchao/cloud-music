<template>
  <transition name="rank-detail">
    <child-wrap>
      <Title :title="rankList.name || ''"/>
      <scroll class="detail" :data="songList">
        <div>
          <ul v-if="songList.length">
            <li v-for='(item, index) in songList' :key='item.id'>
              <music-item :index='index + 1' :item='item'></music-item>
            </li>
          </ul>
        </div>
      </scroll>
      <div class="loading-container pa" v-show="!songList.length">
        <loading/>
      </div>
    </child-wrap>
  </transition>
</template>
<script>
import ChildWrap from '@/base/ChildWrap'
import Title from '@/base/Title'
import Loading from '@/base/Loading'
import Scroll from '@/base/Scroll'
import MusicItem from '@/components/MusicItem'
// import {mapGetters} from 'vuex'
import Song from '@/common/js/song'
import {getRank} from '@/api/rank'
import CreateRankDetail from '@/common/js/rankDetail'

export default {
  name: 'RankDetail',
  data () {
    return {
      rankList: {}
    }
  },
  components: {
    ChildWrap,
    Title,
    Loading,
    Scroll,
    MusicItem
  },
  computed: {
    // ...mapGetters(['rankList']),
    songList () {
      if (!this.rankList.songList) return []
      return this.rankList.songList.map(item => {
        return new Song(item)
      })
    }
  },
  created () {
    // 得到的可能是榜单详情，可能是榜单id
    const rankList = this.$store.state.rankList
    if (!rankList.name) {
      this._getRankDetail(rankList)
    } else {
      this.rankList = rankList
    }
  },
  methods: {
    _getRankDetail (idx) {
      getRank(idx).then(res => {
        let item = res.data.playlist
        this.rankList = new CreateRankDetail(item, idx)
      })
    }
  }
}
</script>
<style scoped>
  .detail {
    overflow: hidden;
    position: absolute;
    top: 56px;
    bottom: 0;
    width: 100%;
  }
  .rank-detail-enter-active, .rank-detail-leave-active {
    transition: all 0.3s;
  }
  .rank-detail-enter, .rank-detail-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .loading-container {
    top: 50%;
    width: 100%;
  }
</style>
