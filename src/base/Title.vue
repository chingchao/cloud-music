<template>
  <div class="title-container">
    <div class="flex color-white" :class="className">
      <div class="back" @click="back">
          <i class='icon-fanhui iconfont'></i>
      </div>
      <div v-if="type==='input'" class='nav-item flex nav-input pr'>
          <form class="w100p" action="" @submit.prevent="searchFn">
            <input class="dib input border-b w100p h100p" type="search" v-model="keyWords">
          </form>
          <i class="icon-cha iconfont pa" v-show="keyWords" @click="empty"></i>
      </div>
      <div v-else class='nav-item flex'>
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
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      keyWords: ''
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
    },
    empty () {
      this.keyWords = ''
    },
    searchFn () {
      this.$emit('search', this.keyWords)
    }
  }
}
</script>
<style lang="less" scoped>
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
  .nav-input {
    margin-right: 10px;
    form {
      height: 70%;
    }
    .input {
      flex: 1;
      align-items: stretch;
      background: transparent;
      outline: none;
      color: white;
      padding-right: 40px;
    }
    // placeholder
    input[type=search]::-webkit-input-placeholder{
      color: rgba(256,256,256,0.5);
    }
    // 搜索框去掉小×
    input[type=search]::-webkit-search-cancel-button{
      -webkit-appearance: none;
    }
    i {
      width: 40px;
      right: 0;
      height: 40px;
      line-height: 40px;
      text-align: right;
    }
  }
</style>
