<template>
  <transition name="search">
    <child-wrap>
      <Title ref="searchNode" type="input" @search="search"/>
      <scroll class='search-wrap'>
        <div>
          <div class="hot-wrap">
            <p class="text color-gray">热门搜索</p>
            <ul class="flex hot-search">
              <li class="hot-item" v-for="(item, index) in hotSearchList" :key="index">{{item.first}}</li>
            </ul>
          </div>
          <ul class="history-list">
            <li class="flex" v-for="item in historyList" :key="item">
              <i class="iconfont icon-jilu color-gray"></i>
              <p class="text flex border-b">
                <span>{{item}}</span>
                <i class="iconfont icon-cha color-gray delete-icon"></i>
              </p>
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
import ChildWrap from '@/base/ChildWrap'
import Title from '@/base/Title'
import Scroll from '@/base/Scroll'
import Loading from '@/base/Loading'
import {hotSearch, searchFn} from '@/api/search'
export default {
  name: 'Serach',
  data () {
    return {
      hotSearchList: [],
      historyList: ['Ronghao Lee', 'Selina']
    }
  },
  components: {
    ChildWrap,
    Title,
    Scroll,
    Loading
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
    search (k) {
      if (!k) {
        k = this.hotSearchList[0] ? this.hotSearchList[0].first : ''
        this.inputNode.value = this.placeholder
      }
      if (!k) return false
      searchFn(k).then(res => {
        console.log(res)
      })
    }
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
    top: 56px;
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
