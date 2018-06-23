<template>
  <div class="mv">
    <scroll class="mv-content" :data="newMv.concat(recommendMv)">
      <div>
        <div v-if="newMv.length">
          <type-title title="最新MV"></type-title>
          <ul class="mv-list new-mv">
            <li class="mv-item" v-for="item in newMv" :key="item.id">
              <div class="info">
                <div class="img flex">
                  <img v-lazy="item.cover" alt="item.name">
                </div>
                <p class="name ell">{{item.name}}</p>
                <p class="artist-name color-gray ell">{{item.artistName}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="recommendMv">
          <type-title title="推荐MV"></type-title>
          <ul class="mv-list">
            <li class="mv-item" v-for="item in recommendMv" :key="item.id">
              <div class="info">
                <div class="img flex">
                  <img v-lazy="item.cover" alt="item.name">
                </div>
                <p class="name ell">{{item.name}}</p>
                <p class="artist-name color-gray ell">{{item.artistName}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import {getRecommendMV, getNewMV} from '@/api/mv'
import Scroll from '@/base/Scroll'
import TypeTitle from '@/base/TypeTitle'
export default {
  name: 'Mv',
  data () {
    return {
      newMv: [],
      recommendMv: []
    }
  },
  components: {
    Scroll,
    TypeTitle
  },
  created () {
    getNewMV().then(res => {
      this.newMv = res.data.result.map(item => this.createMV(item))
      console.log(res)
    })
    getRecommendMV().then(res => {
      this.recommendMv = res.data.data.map(item => this.createMV(item))
      console.log(res)
    })
  },
  methods: {
    createMV (item) {
      return {
        id: item.id,
        name: item.name,
        artistName: item.artistName,
        cover: item.cover || item.picUrl,
        playCount: item.playCount
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .mv {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .mv-content {
    height: 100%;
    overflow: hidden;
  }
  .mv-list {
    padding: 4px 6px 0;
  }
  .mv-item {
    display: inline-block;
    margin-bottom: 12px;
  }
  .info {
    margin: 0 4px;
  }
  .img {
    width: 100%;
    max-height: 200px;
    overflow: hidden;
    justify-content: center;
    img {
      width: 100%;
      height: auto;
    }
  }
  .name {
    margin: 6px 0;
  }
  .new-mv .mv-item {
    width: 50%;
    .img {
      max-height: 100px;
    }
    .name {
      margin: 6px 0;
      font-size: 14px;
    }
    .artist-name {
      font-size: 14px;
    }
  }
</style>
