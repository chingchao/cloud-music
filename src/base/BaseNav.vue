<template>
    <mu-appbar class='bg-theme' textColor='#fff' :zDepth=zDepth>
        <template slot='left'>
            <div>
                <i class='icon-caidan iconfont active'></i>
            </div>
        </template>
        <template slot='default'>
            <mu-flex class='nav-item' align-items="center" justify-content="center">
                <router-link to='/'>
                    <i class="iconfont icon-yinyue i-nav"></i>
                </router-link>
                <router-link to='/recommend'>
                    <i class="iconfont icon-yinle-yuanshijituantubiao i-nav active"></i>
                </router-link>
                <router-link to='/recommend'>
                    <i class="iconfont icon-shipin i-nav"></i>
                </router-link>
            </mu-flex>
        </template>
        <template slot='right'>
            <router-link to='/recommend'>
                <i class="iconfont icon-sousuo active"></i>
            </router-link>
        </template>
    </mu-appbar>
</template>
<script>
export default {
  name: 'BaseNav',
  data () {
    return {
      zDepth: 0
    }
  }
}
</script>
<style lang='less' scoped>
    .iconfont {
        color: #d0d0d0;
        font-size: 28px;
    }
    .nav-item {
        line-height: 1;
    }
    .i-nav {
        padding: 0 16px;
    }
    .active {
        color: #fff;
    }
    .center-icon {
        margin: 0 6px;
    }
</style>
