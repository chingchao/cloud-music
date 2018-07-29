<template>
  <div class="no-result-wrap flex">
    <!-- <img src="../common/img/img-loading.png" alt=""> -->
    <span>{{title}}</span>
  </div>
</template>
<script>
export default {
  name: 'NoResult',
  props: {
    title: {
      default: '无内容',
      type: String
    }
  }
}
</script>
<style scope lang="less">
  .no-result-wrap {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    flex-direction: column;
  }
</style>
