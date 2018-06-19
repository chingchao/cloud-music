<template>
  <transition name="singer-detail">
    <music-list :title="title" :list="list"></music-list>
  </transition>
</template>
<script>
// import {mapGetters} from 'vuex'
import {getSingerDetail} from '@/api/singer'
import Song from '@/common/js/song'
import MusicList from '@/components/MusicList'

export default {
  name: 'SingerDetail',
  data () {
    return {
      list: [],
      title: ''
    }
  },
  components: {
    MusicList
  },
  computed: {
    // ...mapGetters(['singer'])
  },
  created () {
    this.singer = this.$store.state.singer
    this._getSingerDetail(this.singer.id)
  },
  methods: {
    _getSingerDetail (id) {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(id).then(res => {
        console.log(res)
        this.list = res.data.hotSongs.map(item => new Song(item))
        this.title = this.singer.name
      })
    }
  }
}
</script>
<style scoped>
  .singer-detail-enter-active, .singer-detail-leave-active {
    transition: all 0.3s;
  }
  .singer-detail-enter, .singer-detail-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
