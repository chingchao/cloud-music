<template>
  <div id="app" class='flex flex-column'>
    <base-nav/>
    <!-- <img src="./assets/logo.png"> -->
    <div class="content">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <player/>
  </div>
</template>

<script>
import BaseNav from '@/base/BaseNav'
import Player from '@/components/Player'

export default {
  name: 'App',
  components: {
    BaseNav,
    Player
  }
}
</script>

<style src='@/common/style/index.less' lang='less'></style>

<style scoped>
  #app {
    /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }
  .content {
    flex-grow: 1;
    width: 100%;
    overflow: auto;
    position: relative;
    z-index: 2;
  }
</style>
