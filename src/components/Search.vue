<template>
  <transition name="search">
    <child-wrap>
      <Title ref="searchNode" type="input" @search="search" :query="query"/>
      <scroll ref="scroll" class='search-wrap'>
        <div>
          <div v-if="!searchResult.length">
            <div class="hot-wrap">
              <p class="text color-gray">热门搜索</p>
              <ul class="flex hot-search">
                <li class="hot-item" v-for="(item, index) in hotSearchList" :key="index" @click="addQuery(item.first)">{{item.first}}</li>
              </ul>
            </div>
            <ul v-if="historyList.length" class="history-list">
              <li class="flex" v-for="(item, index) in historyList" :key="item">
                <i class="iconfont icon-jilu color-gray"></i>
                <p class="text flex border-b">
                  <span>{{item}}</span>
                  <i class="iconfont icon-cha color-gray delete-icon" @click="deleteHistory(index)"></i>
                </p>
              </li>
            </ul>
          </div>
          <ul v-else>
            <li v-for="(item, index) in searchResult" :key="item.id">
              <music-item :item='item' @selectItem="selectSong(item, index)"/>
            </li>
          </ul>
        </div>
        <div v-if="!hotSearchList.length" class="loading-container pa">
          <loading/>
        </div>
      </scroll>
    </child-wrap>
  </transition>
</template>
<script>
import {SearchSong} from '@/common/js/song'
import ChildWrap from '@/base/ChildWrap'
import Title from '@/base/Title'
import Scroll from '@/base/Scroll'
import Loading from '@/base/Loading'
import MusicItem from '@/components/MusicItem'
import {playListMixin} from '@/common/js/mixin'
import {hotSearch, searchFn} from '@/api/search'
import {mapActions} from 'vuex'
export default {
  name: 'Serach',
  mixins: [playListMixin],
  data () {
    return {
      hotSearchList: [],
      historyList: [],
      query: '',
      searchResult: []
    }
  },
  components: {
    ChildWrap,
    Title,
    Scroll,
    Loading,
    MusicItem
  },
  created () {
    this._getHotSearch()
    this.placeholder = ''
  },
  mounted () {
    this.inputNode = this.$refs.searchNode.$el.querySelector('input')
    this.inputNode.focus()
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next(vm => {
      vm.inputNode.focus()
      console.log(vm.historyList)
    })
  },
  // befroeRouteUpdate (to, from, next) {
  //   console.log('befroeRouteUpdate')
  //   next()
  // },
  // beforeRouteLeave (to, from, next) {
  //   console.log('beforeRouteLeave')
  //   next()
  // },
  watch: {
    hotSearchList (newList) {
      this.placeholder = newList[0] ? newList[0].first : ''
      this.inputNode.placeholder = this.placeholder
    }
  },
  methods: {
    _getHotSearch () {
      hotSearch().then(res => {
        console.log(res)
        this.hotSearchList = res.data.result.hots
      })
    },
    addQuery (query) {
      this.query = query
      this.search(query)
    },
    search (k) {
      if (!k) {
        // k = this.hotSearchList[0] ? this.hotSearchList[0].first : ''
        // this.query = this.placeholder
        this.searchResult = []
      }
      if (!k) return false
      searchFn(k).then(res => {
        console.log(res)
        this.historyList.unshift(k)
        this.searchResult = res.data.result.songs.map(item => {
          return new SearchSong(item)
        })
      })
    },
    selectSong (item, index) {
      this.selectPlay({
        list: this.searchResult,
        index
      })
    },
    // 删除历史搜索
    deleteHistory (index) {
      this.historyList.splice(index, 1)
    },
    // minxin 中调用的方法，有歌曲播放时，重新设置页面底部高度
    handlePlaylist (playList) {
      const bottom = playList.length > 0 ? '50px' : ''
      this.$refs.scroll.$el.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    ...mapActions([
      'selectPlay'
    ])
  }
}
</script>
<style lang="less" scoped>
  .search-enter-active, .search-leave-active {
    transition: all 0.3s;
  }
  .search-enter, .search-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .loading-container {
    top: 50%;
    width: 100%;
  }
  .search-wrap {
    overflow: hidden;
    position: absolute;
    top: 48px;
    bottom: 0;
    width: 100%;
  }

  .hot-wrap {
    padding: 0 10px;
    .text {
      margin: 20px 0;
    }
  }
  .hot-search {
    flex-wrap: wrap;
  }
  .hot-item {
    border-radius: 50px;
    padding: 4px 10px;
    border: 1px solid #ddd;
    margin: 0 10px 10px 0;
  }
  .history-list {
    margin: 10px 0;
    li {
      padding-left: 10px;
    }
    .text {
      flex-grow: 1;
      margin-left: 6px;
      line-height: 40px;
      span {
        flex-grow: 1;
      }
    }
    .delete-icon {
      font-size: 18px;
      padding: 0 10px;
    }
  }
</style>
