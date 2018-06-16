<template>
  <div class='recommend'>
    <scroll ref="scroll" class="recommend-content" :data="recommend">
      <div>
        <div class='banner' v-if='banner.length'>
          <slider>
            <div v-for='(item, index) in banner' :key='item.targetId + item.targetType + index'>
              <a :href="item.url">
                <img :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <ul class='menu-list flex border-b'>
          <li class='flex flex-column' v-for="(item, index) in menuList" :key="index">
            <div class='icon-wrap color-theme border-theme flex'>
              <i class='iconfont' :class="item.icon"></i>
            </div>
            <p class='name'>{{item.name}}</p>
          </li>
        </ul>
        <p class='dis-name'>
          {{disName}}
        </p>
        <ul>
          <li class='recommend-i flex' v-for="item in recommend" :key="item.id" @click="getDetail(item.id)">
            <div class="img-wrap pr">
              <img class='item-img h100p pa' :src="item.img" alt="">
              <p class='pa play-count'>
                <i class='iconfont icon-headseterji'></i>
                <span>{{count(item.playCount)}}</span>
              </p>
            </div>
            <div class='info flex'>
              <p class='title'>{{item.name}}</p>
              <p class='creator'>by {{item.creator}}</p>
              <p>
                <span class='color-theme border-theme tag'>{{item.tag}}</span>
                <span class='des'>{{item.des}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import {getRecommend, getBanner} from '@/api/recommend'
import Scroll from '@/base/Scroll'
import Slider from '@/base/Slider'

export default {
  name: 'Recommend',
  data () {
    return {
      recommend: [],
      banner: [],
      disName: '',
      menuList: [{
        icon: 'icon-diantai',
        name: '私人FM'
      }, {
        icon: 'icon-04',
        name: '每日推荐'
      }, {
        icon: 'icon-liebiao',
        name: '歌单'
      }, {
        icon: 'icon-paixingbang',
        name: '排行榜'
      }]
    }
  },
  components: {
    Scroll,
    Slider
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
    count: function (playCount) {
      return playCount > 10000 ? Math.floor(playCount / 10000) + '万' : playCount
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
    height: 100%;
    overflow: hidden;
  }
  .img-wrap {
    width: 90px;
    margin-right: 10px;
    flex-shrink: 0;
  }
  .dis-name {
    font-weight: 600;
    padding: 16px 0 6px 10px;
  }
  .recommend-i {
    height: 90px;
    padding: 10px;
    box-sizing: content-box;
    align-items: stretch;
    border-bottom: 1px solid #ddd;
    .title {
      padding: 6px 0 0;
    }
    .creator, .tag, .des {
      font-size: 12px;
    }
    .creator {
      margin: 6px 0;
    }
    .info {
      height: 100%;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      flex-grow: 1;
    }
  }
  .play-count {
    color: #fff;
    font-size: 12px;
    right: 0;
    top: 0;
    text-align: right;
    width: 100%;
    padding: 4px 4px 10px;
    background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0));
    .iconfont {
      font-size: 12px;
    }
  }

  .banner {
    img {
      width: 100%;
    }
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
      padding: 10px 0;
    }
  }
</style>
