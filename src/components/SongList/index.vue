<template>
  <!--推荐歌单-->
  <div class="song-list-wrap">
    <!-- 标题 -->
    <Title
        v-if="recommendedSongList && recommendedSongList.uiElement && recommendedSongList.uiElement.subTitle"
        :title="recommendedSongList.uiElement.subTitle.title"
        :iconText="recommendedSongList.uiElement.button.text"
    />
    <!-- 推荐歌单 -->
    <div class="recommended-song-list">
      <div class="song-list" v-for="item in recommendedSongList.creatives" :key="item.creativeId"
           @click="toPlayListDetail(item.creativeId)">
        <van-image :src="item.uiElement.image.imageUrl" lazy-load></van-image>
        <div class="song-list-title">
          <p>{{ item.uiElement.mainTitle.title }}</p>
        </div>
        <van-button round size="mini" class="playCount">
          <van-icon class=" iconfont icon-play2" size="0.266rem"></van-icon>
          {{ item.resources[0].resourceExtInfo.playCount | Count }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title';

export default {
  name: "SongList",
  components: {Title},
  props: {
    recommendedSongList: {
      default: {},
      required: true,
    }
  },
  methods: {
    // 跳转歌单详情
    toPlayListDetail(id) {
      this.$router.push({
        name: 'PlayListDetail', query: {
          id
        }
      })
    },
  }

}
</script>

<style scoped lang="less">
// 推荐歌单列表
.song-list-wrap {
  margin-bottom: 15px;
  padding: 0 15px;

  .recommended-song-list {
    display: flex;
    overflow-x: auto;
    height: 130px;

    .song-list {
      margin-right: 10px;
      width: 100px !important;
      height: 130px !important;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;

      .song-list-title {
        font-size: 12px;
        height: 32px;


        p {
          transform: scale(0.83);
          margin: 0 0 0 -6px;
          width: 119px;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; /* 这里是超出几行省略 */
          overflow: hidden;
        }

      }


      .van-image {
        width: 100px;
        height: 100px;
        border-radius: 12px;
        overflow: hidden;
        flex: 1;
      }

      .playCount {
        position: absolute;
        right: 0;
        background-color: rgba(0, 0, 0, 0.2);
        font-size: 12px;
        transform: scale(0.75);
        padding: 0 8px;
        border: none;
        color: #fff;
      }
    }

  }
}
</style>