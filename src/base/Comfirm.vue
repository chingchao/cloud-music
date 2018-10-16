<template>
  <transition name="confirm">
    <div v-show="showFlag" @click.stop class="comfirm-wrap pa w100p h100p flex">
      <div class="content">
        <p v-if="title" class="title">{{title}}</p>
        <div class="text">
          {{text}}
        </div>
        <div class="flex btns">
          <span class="cancel" @click="cancel">{{cancelBtnText}}</span>
          <span class="confirm" @click="confirm">{{confirmBtnText}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Comfirm',
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      required: true
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    hide () {
      this.showFlag = false
    },
    show () {
      this.showFlag = true
    },
    cancel () {
      this.hide()
      this.$emit('cancel')
    },
    confirm () {
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>
<style scoped lang="less">
  .comfirm-wrap {
    top: 0;
    left: 0;
    z-index: 999;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
  }
  .title {
    padding: 20px 0 0;
    font-weight: bold;
  }
  .content {
    width: 70%;
    border-radius: 6px;
    background: #fff;
    text-align: center;
  }
  .text {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }
  .btns {
    span {
      width: 50%;
      padding: 6px 0;
      margin: 6px 0;
      text-align: center;
      color: red;
      display: inline-block;
    }
    .confirm {
      border-left: 1px solid #ddd;
      font-weight: 600;
    }
  }

  .confirm-enter, .confirm-leave-to {
    opacity: 0;
  }
  .confirm-enter-active, .confirm-leave-active {
    transition: .5s;
    // animation: confirm-fadein 1s
  }
  @keyframes confirm-fadein {
    0% {
      transform: scale(0)
    }
    50% {
      transform: scale(1.1)
    }
    100% {
      transform: scale(1)
    }
  }
</style>
