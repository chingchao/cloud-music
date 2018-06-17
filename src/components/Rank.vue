<template>
  <transition name="rank">
    <child-wrap>
      <Title title="排行榜"></Title>
      <scroll class="rank-list" ref="scroll" :data="rankArr">
        <div>
          <div v-if="rankArr.length === 5">
            <type-title title="官方榜"/>
            <ul class="rank-ul">
              <li class="border-b flex brank-item" v-for="item in rankList" :key="item.idx">
                <!-- <router-link class="flex brank-item" to> -->
                  <img class="brank-img" v-lazy="item.coverImgUrl" alt="">
                  <div class="flex flex-column song-list ell">
                    <p class="ell w100p" v-for="(v, i) in item.rankSongList" :key="v.id">{{i}}. {{v.name}}</p>
                  </div>
                <!-- </router-link> -->
              </li>
            </ul>
            <type-title title="全球榜"/>
            <ul class="global-rank flex">
              <li class="g-item flex flex-column" v-for="item in globalRank" :key="item.idx">
                <img v-lazy="item.img" :alt="item.name">
                <span class="ell">{{item.name}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="loading-container pa" v-show='rankArr.length !== 5'>
          <loading/>
        </div>
      </scroll>
    </child-wrap>
  </transition>
</template>
<script>
import {getRank} from '@/api/rank'
import ChildWrap from '@/base/ChildWrap'
import Title from '@/base/Title'
import Scroll from '@/base/Scroll'
import TypeTitle from '@/base/TypeTitle'
import Loading from '@/base/Loading'
export default {
  name: 'Rank',
  data () {
    return {
      /* "0": 云音乐新歌榜,
        "1": 云音乐热歌榜,
        "2": 网易原创歌曲榜,
        "3": 云音乐飙升榜,
        "4": 云音乐新电力榜,
        "5": UK排行榜周榜,
        "6": 美国Billboard周榜
        "7": KTV嗨榜,
        "8": iTunes榜,
        "9": Hit FM Top榜,
        "10": 日本Oricon周榜
        "11": 韩国Melon排行榜周榜,
        "12": 韩国Mnet排行榜周榜,
        "13": 韩国Melon原声周榜,
        "14": 中国TOP排行榜(港台榜),
        "15": 中国TOP排行榜(内地榜)
        "16": 香港电台中文歌曲龙虎榜,
        "17": 华语金曲榜,
        "18": 中国嘻哈榜,
        "19": 法国 NRJ EuroHot 30周榜,
        "20": 台湾Hito排行榜,
        "21": Beatport全球电子舞曲榜,
        "22": 云音乐ACG音乐榜,
        "23": 云音乐嘻哈榜
      */
      rankList: {
        '0': {},
        '1': {},
        '2': {},
        '3': {},
        '4': {}
      },
      rankArr: [],
      globalRank: [{
        idx: '23',
        name: '云音乐嘻哈榜',
        img: 'http://p1.music.126.net/RChr5NydlXafIV1GVEHJdg==/19073228207465342.jpg?param=150y150'
      }, {
        idx: '5',
        name: 'UK排行榜周榜',
        img: 'http://p1.music.126.net/VQOMRRix9_omZbg4t-pVpw==/18930291695438269.jpg?param=150y150'
      }, {
        idx: '6',
        name: '美国Billboard周榜',
        img: 'http://p1.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg?param=150y150'
      }, {
        idx: '7',
        name: 'KTV唛榜',
        img: 'http://p1.music.126.net/H4Y7jxd_zwygcAmPMfwJnQ==/19174383276805159.jpg?param=150y150'
      }, {
        idx: '8',
        name: 'iTunes榜',
        img: 'http://p1.music.126.net/83pU_bx5Cz0NlcTq-P3R3g==/18588343581028558.jpg?param=150y150'
      }, {
        idx: '9',
        name: 'Hit FM Top榜',
        img: 'http://p1.music.126.net/54vZEZ-fCudWZm6GH7I55w==/19187577416338508.jpg?param=150y150'
      }, {
        idx: '10',
        name: '日本Oricon周榜',
        img: 'http://p1.music.126.net/Rgqbqsf4b3gNOzZKxOMxuw==/19029247741938160.jpg?param=150y150'
      }, {
        idx: '15',
        name: '中国TOP排行榜（内地榜）',
        img: 'http://p1.music.126.net/2klOtThpDQ0CMhOy5AOzSg==/18878614648932971.jpg?param=150y150'
      }, {
        idx: '14',
        name: '中国TOP排行榜（港台榜',
        img: 'http://p1.music.126.net/JPh-zekmt0sW2Z3TZMsGzA==/18967675090783713.jpg?param=150y150'
      }]
    }
  },
  components: {
    Title,
    ChildWrap,
    Scroll,
    TypeTitle,
    Loading
  },
  created () {
    for (let key in this.rankList) {
      this._getRank(key)
    }
  },
  methods: {
    _getRank (idx) {
      getRank(idx).then(res => {
        let item = res.data.playlist
        this.rankList = {
          ...this.rankList,
          [idx]: {
            id: idx,
            name: item.name,
            coverImgUrl: item.coverImgUrl,
            songList: item.tracks,
            rankSongList: item.tracks.slice(0, 3),
            updateTime: item.updateTime,
            songCount: item.trackCount,
            subscribedCount: item.subscribedCount
          }
        }
        this.rankArr.push(idx)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .rank-list {
    overflow: hidden;
    position: absolute;
    top: 56px;
    bottom: 0;
    width: 100%;
  }
  .rank-ul {
    padding-left: 10px;
  }
  .brank-item {
    margin-bottom: 6px;
    padding: 0 10px 0 0;
    align-items: stretch;
  }
  .brank-img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .song-list {
    align-items: flex-start;
    justify-content: space-around;
    padding: 6px 0;
  }

  .global-rank {
    flex-wrap: wrap;
    padding-bottom: 20px;
    padding-left: 10px;
  }
  .g-item {
    width: 33.3%;
    margin-bottom: 10px;
    align-items: flex-start;
    img {
      width: 90%;
    }
    span {
      font-size: 14px;
      margin-top: 6px;
      width: 90%;
      text-align: center;
    }
  }

  .loading-container {
    top: 50%;
    width: 100%;
  }

  .rank-enter-active, .rank-leave-active {
    transition: all 0.3s;
  }
  .rank-enter, .rank-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
