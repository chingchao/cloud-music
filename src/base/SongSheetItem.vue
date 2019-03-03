<template>
  <div class="recommend-i flex">
    <div class="img-wrap pr">
      <img class='item-img h100p pa' v-lazy="item.img" alt="">
      <p class='pa play-count'>
        <i class='iconfont icon-headseterji'></i>
        <span>{{count(item.playCount)}}</span>
      </p>
    </div>
    <div class='info flex'>
      <p class='title'>{{item.name}}</p>
      <p class='creator'>by {{item.creator}}</p>
      <p>
        <span class='color-theme border-theme tag'>{{item.tag}}</span>
        <span class='des'>{{item.des}}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SongSheetItem',
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    count: function (playCount) {
      return playCount > 10000 ? Math.floor(playCount / 10000) + '万' : playCount
    }
  }
}
</script>
<style scoped lang="less">
  .recommend-i {
    height: 90px;
    padding: 10px;
    box-sizing: content-box;
    align-items: stretch;
    border-bottom: 1px solid #ddd;
    .title {
      padding: 6px 0 0;
      line-height: 1.4;
    }
    .creator, .tag, .des {
      font-size: 12px;
    }
    .tag {
      display: inline-block;
      padding: 2px 4px;
      border-radius: 3px;
      transform: scale(0.8);
    }
    .creator {
      margin: 6px 0;
      color: #999;
    }
    .info {
      height: 100%;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      flex-grow: 1;
    }
  }
  .play-count {
    color: #fff;
    font-size: 12px;
    right: 0;
    top: 0;
    text-align: right;
    width: 100%;
    padding: 4px 4px 10px;
    background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0));
    .iconfont {
      font-size: 12px;
    }
  }
  .img-wrap {
    width: 90px;
    margin-right: 10px;
    flex-shrink: 0;
  }
</style>
