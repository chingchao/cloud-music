<template>
  <transition name="list-fade">
    <div class="play-list pa w100p" @click="hide" v-show="showFlag">
      <div class="list-wrap pa w100p bg-white flex" @click.stop>
        <div class="list-header w100p flex">
          <div class="header-grow flex">
            <i class="iconfont play-mode color-gray" :class="iconMode" @click="changeMode"></i>
            <span class="play-num">{{'(' + sequenceList.length + ')'}}</span>
          </div>
          <i class="iconfont icon-shanchu delete-icon color-gray"></i>
        </div>
        <scroll :data="sequenceList" class="list-content">
          <ul>
            <li class="flex music-item" v-for="item in sequenceList" :key="item.name + item.id">
              <p class="music-name ell" :class="{'color-theme': item.id === currentSongId}">{{item.name}}</p>
              <div class="icon-wrap color-theme">
                <i class="iconfont icon-shoucang like-icon"></i>
                <i class="icon-cha iconfont"></i>
              </div>
            </li>
          </ul>
        </scroll>
        <div class="list-footer w100p color-theme">
          <span class="close-list dib" @click="hide">关闭列表</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Scroll from '@/base/Scroll'

export default {
  name: 'PlayingList',
  props: {
    iconMode: {
      default: 'icon-xunhuanbofang',
      type: String
    },
    sequenceList: Array,
    currentSongId: {
      type: Number,
      required: true
    },
    showFlag: Boolean
  },
  components: {
    Scroll
  },
  methods: {
    hide () {
      this.$emit('changeFlag', false)
    },
    show () {
      this.$emit('changeFlag', true)
    },
    changeMode () {
      this.$emit('changeMode')
    }
  }
}
</script>
<style scoped lang='less'>
  .play-list {
    top: 0;
    bottom: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.5);
  }
  .list-wrap {
    height: 60%;
    bottom: 0;
    left: 0;
    flex-direction: column;
  }
  .list-header {
    flex-shrink: 0;
    padding: 10px 16px;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    .header-grow {
      flex-grow: 1;
    }
    .delete-icon {
      font-size: 22px;
    }
    .play-mode {
      font-size: 20px;
      margin-right: 6px;
    }
    .play-num {
      font-size: 14px;
    }
  }
  .list-content {
    flex-grow: 1;
    overflow: hidden;
    ul {
      padding: 6px 16px;
    }
    li {
      padding: 6px 0;
    }
    .music-item {
      i {
        font-size: 18px;
      }
    }
    .icon-wrap {
      flex-shrink: 0;
    }
    .like-icon {
      margin-right: 4px;
    }
  }
  .music-name {
    flex-grow: 1;
    margin-right: 14px;
  }
  .list-footer {
    padding: 10px 0;
    text-align: center;
    flex-shrink: 0;
    font-size: 14px;
    border-top: 1px solid #ddd;
    .close-list {
      padding: 6px 10px;
      border-radius: 40px;
      border: 1px solid #dd4137;
    }
  }

  .list-fade-enter, .list-fade-leave-to {
    background: transparent;
  }
  .list-fade-enter .list-wrap, .list-fade-leave-to .list-wrap {
    transform: translate3d(0, 100%, 0);
  }
  .list-fade-enter-active, .list-fade-leave-active {
    transition: .5s;
  }
  .list-fade-enter-active .list-wrap, .list-fade-leave-active .list-wrap {
    transition: .5s;
  }
</style>
