<template>
  <div class='recommend'>
    <!-- scroll 传入data参数，组件内部会监听 data 的数据变化，执行 refresh（）方法 -->
    <scroll ref="scroll" class="recommend-content" :data="recommend">
      <div>
        <div class='banner' v-if='banner.length'>
          <slider>
            <div class="banner-item"
              v-for='(item, index) in banner'
              :key='item.targetId + item.targetType + index'
            >
              <a :href="item.url">
                <!-- img 标签用 load 事件，当第一张图片被加载后，父级高度被撑开，需要重新调用 scroll 组件的 refresh 方法，避免出现图片加载较慢时 scroll 组件计算高度不准的问题 -->
                <img @load="loadImage" :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <ul class='menu-list flex border-b' v-show='banner.length'>
          <li class='flex flex-column' v-for="(item, index) in menuList" :key="index">
            <router-link class="flex flex-column" :to="item.link">
              <div class='icon-wrap color-theme border-theme flex'>
                <i class='iconfont' :class="item.icon"></i>
              </div>
              <p class='name'>{{item.name}}</p>
            </router-link>
          </li>
        </ul>
        <div v-show="recommend.length">
          <type-title title="精品歌单"/>
          <ul>
            <li v-for="item in recommend" :key="item.id" @click="getDetail(item.id)">
              <song-sheet-item :item="item"/>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container pa" v-show='!recommend.length'>
        <loading/>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import {getRecommend, getBanner} from '@/api/recommend'
import Scroll from '@/base/Scroll'
import Slider from '@/base/Slider'
import Loading from '@/base/Loading'
import TypeTitle from '@/base/TypeTitle'
import SongSheetItem from '@/base/SongSheetItem'
import {playListMixin} from '@/common/js/mixin'

export default {
  name: 'Recommend',
  mixins: [playListMixin],
  data () {
    return {
      recommend: [],
      banner: [],
      disName: '',
      menuList: [{
        icon: 'icon-geshou',
        name: '歌手榜',
        link: '/singer'
      }, {
        icon: 'icon-04',
        name: '每日推荐',
        link: '/dailyRecommend'
      }, {
        icon: 'icon-liebiao',
        name: '歌单',
        link: '/songSheet'
      }, {
        icon: 'icon-paixingbang',
        name: '排行榜',
        link: '/rank'
      }]
    }
  },
  components: {
    Scroll,
    Slider,
    Loading,
    TypeTitle,
    SongSheetItem
  },
  created () {
    this._getBanner()
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      getRecommend().then(res => {
        let list = res.data.playlists
        this.recommend = list.map(item => {
          return {
            name: item.name,
            img: item.coverImgUrl,
            playCount: item.playCount,
            id: item.id,
            des: item.copywriter,
            tag: item.tag,
            creator: item.creator.nickname
          }
        })
        this.disName = '精品歌单'
        console.log(this.recommend)
        console.log(res.data.playlists)
      })
    },
    _getBanner () {
      getBanner().then(res => {
        console.log(res)
        this.banner = res.data.banners
      })
    },
    getDetail (id) {
      this.$router.push({
        path: '/recommend/' + id
      })
    },
    // 当有一张图片加载，重新调用 scroll 组件的 refresh 方法，重新计算滚动高度
    loadImage () {
      if (!this.checkLoad) {
        this.$refs.scroll.refresh()
        this.checkLoad = true
      }
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
<style lang='less' scoped>
  .recommend {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .recommend-content {
    position: absolute;
    overflow: hidden;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .banner {
    img {
      width: 100%;
    }
  }
  .banner-item {
    height: 170px;
    overflow: hidden;
  }

  .menu-list {
    padding: 20px 0;
    li {
      flex: 1;
    }
    .icon-wrap {
      border-radius: 50%;
      width: 60px;
      height: 60px;
      justify-content: center;
    }
    .name {
      padding: 10px 0 0;
    }
  }

  .loading-container {
    top: 50%;
    width: 100%;
  }
</style>
