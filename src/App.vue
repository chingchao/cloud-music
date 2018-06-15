<template>
  <div id="app" class='flex flex-column'>
    <base-nav class='nav'/>
    <!-- <img src="./assets/logo.png"> -->
    <div class="content">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import BaseNav from '@/base/BaseNav'
export default {
  name: 'App',
  components: {
    BaseNav
  }
}
</script>

<style src='@/common/style/index.less' lang='less'></style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.nav {
  flex-shrink: 0;
  width: 100%;
  position: relative;
  z-index: 1;
}
.content {
   flex-grow: 1;
   width: 100%;
   overflow: auto;
   position: relative;
   z-index: 2;
}
</style>
