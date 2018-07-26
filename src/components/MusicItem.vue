<template>
  <div class='music-item flex' @click="selectSong">
    <span v-if="index" class='order color-gray'>{{index}}</span>
    <div class='flex-grow flex info border-b' :class="{'search-p': !index}">
      <div class='flex-grow'>
        <p class='name'>{{item.name}}</p>
        <span class='singer color-gray'>{{item.singers}} - {{item.al_name}}</span>
      </div>
      <i class='icon-more iconfont color-gray'></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MusicItem',
  props: ['index', 'item'],
  methods: {
    selectSong () {
      this.$emit('selectItem', this.item, this.index - 1)
    }
  }
}
</script>

<style lang='less' scoped>
  .music-item {
    width: 100%;
  }
  .order {
    padding: 0 5px;
    width: 3em;
    font-size: 18px;
    text-align: center;
    flex-shrink: 0;
  }
  .iconfont {
    font-size: 20px;
    padding: 10px;
  }
  .flex-grow {
    flex-grow: 1;
  }
  .name {
    // font-size: 18px;
    margin-bottom: 6px;
  }
  .info {
    padding-top: 14px;
    padding-bottom: 10px;
  }
  .search-p {
    padding-left: 14px;
  }
</style>
