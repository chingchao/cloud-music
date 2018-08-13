<template>
  <transition name="list-fade">
    <div class="play-list pa w100p" @click="hide" v-if="showFlag">
      <div class="list-wrap pa w100p bg-white" @click.stop>
        <div class="list-header">
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'PlayingList',
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    hide () {
      this.showFlag = false
    },
    show () {
      this.showFlag = true
    }
  }
}
</script>
<style scoped lang='less'>
  .play-list {
    top: 0;
    bottom: 0;
    z-index: 99;
  }
  .list-wrap {
    height: 60%;
    bottom: 0;
    left: 0;
  }
</style>
