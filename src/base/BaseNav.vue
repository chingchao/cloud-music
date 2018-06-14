<template>
    <mu-appbar class='bg-theme' textColor='#fff' :zDepth=zDepth>
        <template slot='left'>
            <div>
                <mu-icon class='icon active' size="30" value="sort"></mu-icon>
            </div>
        </template>
        <template slot='default'>
            <mu-flex align-items="center" justify-content="center" style="">
                <router-link to='/'>
                    <mu-icon class='icon center-icon active' size='30' value='audiotrack'></mu-icon>
                </router-link>
                <router-link to='/playlist'>
                    <mu-icon class='icon center-icon' size='30' value='audiotrack'></mu-icon>
                </router-link>
                <mu-icon class='icon center-icon' size='30' value='audiotrack'></mu-icon>
            </mu-flex>
        </template>
        <template slot='right'>
            <mu-icon class='icon active' size='30' value='brightness_1'></mu-icon>
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
<style lang='less'>
    .icon {
        color: #d9d9d9;
    }
    .active {
        color: #fff;
    }
    .center-icon {
        margin: 0 6px;
    }
</style>
