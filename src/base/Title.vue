<template>
  <div class="title-container">
    <div class="flex color-white" :class="className">
      <div class="back" @click="back">
          <i class='icon-fanhui iconfont'></i>
      </div>
      <div class='nav-item flex'>
          <h1 class="title ell">{{title}}</h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      default: ''
    },
    colorType: {
      type: Number,
      default: 0
    }
  },
  computed: {
    className () {
      return {
        'bg-theme': this.colorType === 0,
        'bg-transparent': this.colorType === 1
      }
    }
  },
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
    z-index: 3;
  }
  .back {
    padding: 6px 8px;
  }
  .title-wrap {
    padding-left: 0;
  }
  .title {
    max-width: 100%;
    line-height: 1;
    font-size: 20px;
  }
  .nav-item {
    flex-grow: 1;
    height: 56px;
  }
</style>
