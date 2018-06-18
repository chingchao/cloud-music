<template>
  <div class="child-page-wrap">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ChildWrap'
}
</script>
<style scoped>
  .child-page-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    background: #fff;
  }
</style>
