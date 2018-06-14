<template>
  <ul>
    <li class='play-list' v-for="item in playList" :key="item.id">
      <img class='item-img' :src="item.img" alt="">
      <p class='title'>{{item.name}}</p>
    </li>
  </ul>
</template>
<script>
import axios from 'axios'
export default {
  name: 'PlayList',
  data () {
    return {
      playList: [{
        name: '1',
        img: '',
        playCount: 0,
        id: ''
      }]
    }
  },
  created () {
    let $this = this
    axios.get('http://zqblog.top:5000/top/playlist/highquality', {}).then((res) => {
      let list = res.data.playlists
      $this.playList = list.map(item => {
        return {
          name: item.name,
          img: item.coverImgUrl,
          playCount: item.playCount,
          id: item.id
        }
      })
      console.log($this.playList)
      console.log(res.data.playlists)
    })
  }
}
</script>
<style lang='less' scoped>
  .item-img {
    width: 80px;
    height: 80px;
  }
  .play-list {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    .title {
      padding: 6px 0 0;
    }
  }
</style>
