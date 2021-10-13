<template>
  <div class="new-song-list" v-if="newSong.length !== 0">
    <van-tabs
        line-height="0"
        v-model="newSongActive"
        background="#fff"
        title-active-color="#000"
        title-inactive-color="#A3A3A3"

    >
      <template #nav-right>
        <van-button round size="mini">
          更多
          <van-icon name="arrow" size="0.32rem"></van-icon>
        </van-button>
      </template>
      <van-tab v-for="item in newSong" :title="item[0].uiElement.mainTitle.title"
               :key="item[0].uiElement.mainTitle.title">
        <music-swipe :songPage="item"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import MusicSwipe from '@/components/MusicSwipe'

export default {
  name: "TabsMusicList",
  props: {
    newSong: {
      type: Array,
      default: []
    }
  },
  components: {MusicSwipe},
  data() {
    return {
      newSongActive: 0,
    }
  },
}
</script>

<style scoped lang="less">
// 新歌推荐
.new-song-list {
  .van-tabs {
    position: relative;
    padding: 0 15px;

    // 轮播
    .my-swipe {
      .van-swipe-item {
        color: #fff;
        width: 320px;
        height: 180px;

        .song-info-wrap {
          width: 100%;
          height: 50px;
          display: flex;
          margin-bottom: 10px;

          .song-img {
            border-radius: 10px;
            overflow: hidden;
            margin-right: 8px;
            width: 50px;
            height: 50px;
          }

          .song-info {
            display: flex;
            flex-direction: column;
            flex: 1;
            justify-content: space-evenly;

            .song-resources {
              font-size: 14px;
              font-weight: 500 !important;
              color: #000;

              .song-name {
                margin: 0;
                padding: 0;
                font-weight: unset;

                .alias {
                  color: rgb(134, 134, 134);
                }

                .author {
                  padding: 0;
                  margin: 0;
                  color: rgb(134, 134, 134);
                  font-size: 12px;
                }
              }
            }
          }

          .subTitle {
            padding: 0;
            margin: 0;
            color: rgb(134, 134, 134);
            font-size: 12px;

          }
        }
      }
    }


    /deep/ .van-tabs__nav {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .van-tab {
        flex: unset;
        border-right: 1px solid #ddd;
        padding: 0 8px 0 1px;
        margin: 0 8px 0 0;
        font-size: 16px;
        font-weight: bold;

      }

      .van-button {
        padding: 0 2px 0 10px;
        position: absolute;
        right: 0;
        font-size: 12px;
      }
    }


  }
}
</style>