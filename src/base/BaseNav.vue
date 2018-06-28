<template>
    <!-- <mu-appbar class='bg-theme' textColor='#fff' :zDepth=zDepth>
        <template slot='left'>
            <div>
                <i class='icon-caidan iconfont active'></i>
            </div>
        </template>
        <template slot='default'>
            <mu-flex class='nav-item' align-items="center" justify-content="center">
                <router-link to='/home'>
                    <i class="iconfont icon-yinyue i-nav"></i>
                </router-link>
                <router-link to='/recommend'>
                    <i class="iconfont icon-yinle-yuanshijituantubiao i-nav"></i>
                </router-link>
                <router-link to='/mv'>
                    <i class="iconfont icon-shipin i-nav"></i>
                </router-link>
            </mu-flex>
        </template>
        <template slot='right'>
            <router-link to='/search'>
                <i class="iconfont icon-sousuo active"></i>
            </router-link>
        </template>
    </mu-appbar> -->
    <div class="bg-theme color-white nav flex">
        <div>
            <i class='icon-caidan iconfont active'></i>
        </div>
        <div class="nav-item flex">
            <router-link to='/home'>
                <i class="iconfont icon-yinyue i-nav"></i>
            </router-link>
            <router-link to='/recommend'>
                <i class="iconfont icon-yinle-yuanshijituantubiao i-nav"></i>
            </router-link>
            <router-link to='/mv'>
                <i class="iconfont icon-shipin i-nav"></i>
            </router-link>
        </div>
        <div>
            <router-link to='/search'>
                <i class="iconfont icon-sousuo active"></i>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
  name: 'BaseNav'
}
</script>
<style lang='less' scoped>
.nav {
    height: 56px;
    padding: 0 10px;
    flex-shrink: 0;
    width: 100%;
    position: relative;
    z-index: 1;
    box-sizing: border-box;
}
.iconfont {
  color: #d0d0d0;
  font-size: 28px;
}
.nav-item {
  line-height: 1;
  justify-content: center;
  flex-grow: 1;
}
.i-nav {
  padding: 0 16px;
}
.router-link-active .iconfont,
.active {
  color: #fff;
}
.center-icon {
  margin: 0 6px;
}
</style>
