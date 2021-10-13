<template>
  <div class="title-container">
    <h2 class="leftTitle">
      <van-icon v-if="refreshIcon" class="iconfont" :class="refreshIcon" size="0.426rem"></van-icon>
      {{ title }}
    </h2>
    <div class="rightIcon">
      <van-button round size="mini">
        <van-icon v-if="leftIcon" class="iconfont" :class="leftIcon" size="0.32rem"></van-icon>
        {{ iconText }}
        <van-icon v-if="!leftIcon" :name="rightIcon" size="0.32rem"></van-icon>
      </van-button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      default: '歌单',
    },
    rightIcon: {
      default: 'arrow',
    },
    iconText: {
      default: '更多',
    },
    leftIcon: {
      default: ""
    },
    refreshIcon: {
      default: ""
    }
  },


 
};
</script>

<style lang="less" scope>
.title-container {
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;

  .leftTitle {
    font-size: 16px;
    margin: 0;
  }

  .van-button {

    font-size: 12px;
    padding: 0 10px 0 5px;

    .iconfont{
      padding: 0;
      margin: 0;
      transform: scale(83%);
    }
  }
}
</style>
