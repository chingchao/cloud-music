<template>
  <transition name="songsheet">
    <child-wrap>
      <Title title="歌单"/>
      <scroll ref="scroll" class="song-sheet-list" :data="list">
        <div>
          <ul v-if="list.length">
            <li v-for="item in list" :key="item.id" @click="getDetail(item.id)">
              <song-sheet-item :item="item"/>
            </li>
          </ul>
        </div>
      </scroll>
      <div class="loading-container pa" v-show='!list.length'>
        <loading/>
      </div>
      <router-view></router-view>
    </child-wrap>
  </transition>
</template>
<script>
import ChildWrap from '@/base/ChildWrap'
import Title from '@/base/Title'
import Scroll from '@/base/Scroll'
import Loading from '@/base/Loading'
import SongSheetItem from '@/base/SongSheetItem'
import {getSongSheet} from '@/api/recommend'
import {playListMixin} from '@/common/js/mixin'
export default {
  name: 'SongSheet',
  mixins: [playListMixin],
  data () {
    return {
      list: []
    }
  },
  components: {
    ChildWrap,
    Title,
    Scroll,
    Loading,
    SongSheetItem
  },
  created () {
    getSongSheet().then(res => {
      console.log(res.data.playlists)
      if (res.data.playlists && res.data.playlists.length) {
        this.list = res.data.playlists.map(item => {
          return {
            name: item.name,
            img: item.coverImgUrl,
            playCount: item.playCount,
            id: item.id,
            des: item.copywriter,
            tag: item.tag || item.tags[0],
            creator: item.creator.nickname
          }
        })
      }
    })
  },
  methods: {
    getDetail (id) {
      this.$router.push({
        path: '/SongSheet/' + id
      })
    },
    // minxin 中调用的方法，有歌曲播放时，重新设置页面底部高度
    handlePlaylist (playList) {
      const bottom = playList.length > 0 ? '50px' : ''
      this.$refs.scroll.$el.style.bottom = bottom
      this.$refs.scroll.refresh()
      console.log('123')
    }
  }
}
</script>
<style scoped lang="less">
  .song-sheet-list {
    overflow: hidden;
    position: absolute;
    top: 48px;
    bottom: 0;
    width: 100%;
  }
  .loading-container {
    top: 50%;
    width: 100%;
  }
  .songsheet-enter-active, .songsheet-leave-active {
    transition: all 0.3s;
  }
  .songsheet-enter, .songsheet-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
