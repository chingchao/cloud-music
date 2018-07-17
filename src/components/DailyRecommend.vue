<template>
  <transition name="daily">
    <music-list :name="name" :list="list" title="每日推荐"></music-list>
  </transition>
</template>

<script>
import {getDailyRecommond} from '@/api/recommend'
import MusicList from '@/components/MusicList'
export default {
  name: 'dailyRecommend',
  data () {
    return {
      list: [],
      name: '每日推荐'
    }
  },
  components: {
    MusicList
  },
  created () {
    getDailyRecommond().then(res => {
      console.log(res)
    })
  }
}
</script>

<style scoped>
  .daily-enter-active, .daily-leave-active {
    transition: all 0.3s;
  }
  .daily-enter, .daily-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
