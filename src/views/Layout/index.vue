<template>
  <div class="layout-container">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <div class="layout">
      <play-control-panel/>
      <van-tabbar v-model="active" route>
        <van-tabbar-item name="/home" icon="music-o" to="/home">发现</van-tabbar-item>
        <van-tabbar-item name="/podcast" to="/podcast">
          <span class="icon-fonthei">播客</span>
          <template #icon>
            <van-icon class="iconfont icon-feed" size="0.58667rem"/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="/my" to="/my">
          <span>我的</span>
          <template #icon>
            <van-icon class="iconfont icon-music" size="0.58667rem"/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="/follow" icon="friends-o" to="/follow">关注</van-tabbar-item>
        <van-tabbar-item name="/community" icon="warning-o" to="/community">云村</van-tabbar-item>
      </van-tabbar>
    </div>

  </div>

</template>

<script>
import PlayControlPanel from "@/components/PlayControlPanel";

export default {
  name: 'Layout',
  data() {
    return {
      active: '/home',
    };
  },
  components: {PlayControlPanel},

  created() {
    if (this.$route.path !== this.active) {
      this.active = this.$route.path;
    }
  },
};
</script>

<style scoped lang="less">

.layout-container {

  .layout {
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0;
    overflow: hidden;
    .van-tabbar{
      position: absolute !important;

    }
  }
}

</style>
