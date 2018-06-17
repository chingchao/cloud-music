<template>
  <div class="flex flex-column">
    <img src="../common/img/loading.gif" width="24" height="24" alt="">
    <span class="des">{{title}}</span>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    title: {
      type: String,
      default: '加载中'
    }
  }
}
</script>
<style lang="less" scoped>
  .des {
    line-height: 2;
    font-size: 14px;
  }
</style>
