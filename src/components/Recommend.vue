<template>
  <div class='recommend'>
    <ul>
      <li class='recommend-i' v-for="item in recommend" :key="item.id" @click="getDetail(item.id)">
        <img class='item-img' :src="item.img" alt="">
        <p class='title'>{{item.name}}</p>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
import {getRecommend} from '@/api/recommend'

export default {
  name: 'Recommend',
  data () {
    return {
      recommend: []
    }
  },
  created () {
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
            id: item.id
          }
        })
        console.log(this.recommend)
        console.log(res.data.playlists)
      })
    },
    getDetail (id) {
      this.$router.push({
        path: '/recommend/' + id
      })
    }
  }
}
</script>
<style lang='less' scoped>
  .recommend {
    height: 100%;
  }
  .item-img {
    width: 80px;
    height: 80px;
  }
  .recommend-i {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    .title {
      padding: 6px 0 0;
    }
  }
</style>
