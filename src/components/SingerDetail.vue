<template>
  <transition name="singer-detail">
    <child-wrap>
      <Title :title="singer.name"/>
      <scroll class="detail" :data="list">
        <div>
          <ul v-if="list.length">
            <li v-for='(item, index) in list' :key='item.id'>
              <music-item :index='index + 1' :item='item'></music-item>
            </li>
          </ul>
        </div>
      </scroll>
      <div class="loading-container pa" v-show="!list.length">
        <loading/>
      </div>
    </child-wrap>
  </transition>
</template>
<script>
import ChildWrap from '@/base/ChildWrap'
import Title from '@/base/Title'
import Loading from '@/base/Loading'
import Scroll from '@/base/Scroll'
import MusicItem from '@/components/MusicItem'
// import {mapGetters} from 'vuex'
import {getSingerDetail} from '@/api/singer'
import Song from '@/common/js/song'

export default {
  name: 'SingerDetail',
  data () {
    return {
      // singer: {}
      list: []
    }
  },
  components: {
    ChildWrap,
    Title,
    Loading,
    Scroll,
    MusicItem
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
      if (!this.singer.id) this.$router.push('/singer')
      getSingerDetail(id).then(res => {
        console.log(res)
        this.list = res.data.hotSongs.map(item => new Song(item))
      })
    }
  }
}
</script>
<style scoped>
  .detail {
    overflow: hidden;
    position: absolute;
    top: 56px;
    bottom: 0;
    width: 100%;
  }
  .singer-detail-enter-active, .singer-detail-leave-active {
    transition: all 0.3s;
  }
  .singer-detail-enter, .singer-detail-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .loading-container {
    top: 50%;
    width: 100%;
  }
</style>
