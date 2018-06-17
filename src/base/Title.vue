<template>
  <div class="title-container">
    <mu-appbar class='bg-theme' textColor='#fff' :zDepth="0">
      <template slot='left'>
          <div class="back" @click="back">
              <i class='icon-fanhui iconfont'></i>
          </div>
      </template>
      <template slot='default'>
          <mu-flex class='nav-item' align-items="center" justify-content="start">
             <h1 class="title ell">{{title}}</h1>
          </mu-flex>
      </template>
    </mu-appbar>
  </div>
</template>
<script>
export default {
  name: 'Title',
  props: ['title'],
  methods: {
    back () {
      window.history.back()
    }
  }
}
</script>
<style scoped>
  .title-container {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
  }
  .title-wrap {
    padding-left: 0;
  }
  .title {
    max-width: 100%;
  }
</style>
