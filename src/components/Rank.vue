<template>
  <transition name="rank">
    <child-wrap>
      <Title title="排行榜"></Title>
      <scroll class="rank-list" ref="scroll" :data="rankArr">
        <div>
          <div v-if="rankArr.length === 5">
            <type-title title="官方榜"/>
            <ul class="rank-ul">
              <li class="border-b flex brank-item" v-for="item in rankList" :key="item.idx" @click="rankDetail(item.idx)">
                <!-- <router-link class="flex brank-item" to> -->
                  <img class="brank-img" v-lazy="item.coverImgUrl" alt="">
                  <div class="flex flex-column song-list ell">
                    <p class="ell w100p" v-for="(v, i) in item.rankSongList" :key="v.id">{{i + 1}}. {{v.name}}</p>
                  </div>
                <!-- </router-link> -->
              </li>
            </ul>
            <type-title title="全球榜"/>
            <ul class="global-rank flex">
              <li class="g-item flex flex-column" v-for="item in globalRank" :key="item.idx" @click="rankDetail(item.idx)">
                <img v-lazy="item.img" :alt="item.name">
                <span class="ell">{{item.name}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="loading-container pa" v-show='rankArr.length !== 5'>
          <loading/>
        </div>
        <router-view></router-view>
      </scroll>
    </child-wrap>
  </transition>
</template>
<script>
import {getRank} from '@/api/rank'
import globalRank from '@/common/js/rank'
import ChildWrap from '@/base/ChildWrap'
import Title from '@/base/Title'
import Scroll from '@/base/Scroll'
import TypeTitle from '@/base/TypeTitle'
import Loading from '@/base/Loading'
import {mapMutations} from 'vuex'
import CreateRankDetail from '@/common/js/rankDetail'

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
      globalRank
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
          [idx]: new CreateRankDetail(item, idx)
        }
        this.rankArr.push(idx)
        console.log(res)
      })
    },
    rankDetail (idx) {
      this.$router.push({
        path: '/rank/' + idx
      })
      // 全球榜需要到详情页在发请求
      this.setRankDetail(this.rankList[idx] || idx)
    },
    ...mapMutations({
      setRankDetail: 'SET_RANK_DETAIL'
    })
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
