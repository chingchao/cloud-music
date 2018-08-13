import {mapGetters} from 'vuex'

export const playListMixin = {
  computed: {
    ...mapGetters(['playList'])
  },
  mounted () {
    this.handlePlaylist(this.playList)
  },
  activated () {
    this.handlePlaylist(this.playList)
  },
  watch: {
    playList (newList) {
      this.handlePlaylist(newList)
    }
  },
  methods: {
    handlePlaylist () {
      throw new Error('this component needs handlePlaylist method')
    }
  }
}
