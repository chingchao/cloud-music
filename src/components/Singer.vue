<template>
  <transition name="singer">
    <child-wrap>
      <Title title="歌手"/>
      <singer-list class="singer-wrap" :v-if="singers.length" :singers="singers" @select="selectSinger"></singer-list>
      <div class="loading-container pa" v-show="!singers.length">
        <loading/>
      </div>
      <router-view></router-view>
    </child-wrap>
  </transition>
</template>
<script>
import {getSinger} from '@/api/singer'
import SingerList from '@/base/SingerList'
import ChildWrap from '@/base/ChildWrap'
import Title from '@/base/Title'
import Loading from '@/base/Loading'
import pinyin from 'pinyin'
import {mapMutations} from 'vuex'

const HOT_NAME = '热门'
const HOT_LEN = 10

export default {
  name: 'Singer',
  data () {
    return {
      singers: []
    }
  },
  components: {
    SingerList,
    Title,
    Loading,
    ChildWrap
  },
  created () {
    this._getSinger()
  },
  methods: {
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSinger () {
      getSinger().then(res => {
        this.singers = this._normalizeSinger(res.data.artists)
      })
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          item: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_LEN) {
          map.hot.item.push(this._getSingerItem(item))
        }
        let key = pinyin(item.name)[0][0][0].toUpperCase()
        if (key === '蔡') key = 'C'
        if (key === '澤') key = 'Z'
        if (!map[key]) {
          map[key] = {
            title: key,
            item: []
          }
        }
        map[key].item.push(this._getSingerItem(item))
      })

      // 处理得到有序的列表
      let hot = []
      let ret = []
      for (let k in map) {
        if (map[k].title.match(/[a-zA-Z]/)) {
          ret.push(map[k])
        } else {
          hot.push(map[k])
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      console.log(ret)
      return hot.concat(ret)
    },
    _getSingerItem (item) {
      return {
        name: item.name,
        picUrl: item.picUrl,
        id: item.id
      }
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>
<style scoped>
  .singer-enter-active, .singer-leave-active {
    transition: all 0.3s;
  }
  .singer-enter, .singer-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .loading-container {
    top: 50%;
    width: 100%;
  }
  .singer-wrap {
    overflow: hidden;
    position: absolute;
    top:48;
    bottom: 0;
    width: 100%;
  }
</style>
