<template>
  <div>
    <mu-appbar class='bg-theme' textColor='#fff' :zDepth="0">
      <template slot='left'>
          <div class="back" @click="back">
              <i class='icon-fanhui iconfont'></i>
          </div>
      </template>
      <template slot='default'>
          <mu-flex class='nav-item' align-items="center" justify-content="start">
             <h1 class="title">{{title}}</h1>
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
<style>
  .title-wrap {
    padding-left: 0;
  }
  .title {
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
