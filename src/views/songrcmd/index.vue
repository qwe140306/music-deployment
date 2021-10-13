<template>
  <div class="daily-recommend">
    <header class="header">
      <van-icon @click="$router.replace({name:'Home'})" class="return-left" color="#fff" name="arrow-left"
                size="0.533rem"/>
      <van-image width="10rem" height="6.667rem" :src="require('@/assets/2.jpg')" alt="Error"/>
      <div class="time">
        <div class="time-wrap">
          <span class="today">{{ Date.now() | Today }} </span>
          <span class="month"> / {{ Date.now() | Month }}</span>
        </div>
        <span class="luck">
          查看今日运势
          <van-icon name="arrow" size="0.312rem"></van-icon>
        </span>
      </div>
      <van-button class="pastRCMD" round size="mini">
        历史日推
        <van-icon name="arrow" size="0.312rem"></van-icon>
      </van-button>
    </header>
    <van-sticky>
      <div class="title">
        <van-icon class="play-icon" name="play-circle" color="#E34D3B" size="0.533rem"/>
        <span class="text">播放全部</span>
        <van-icon name="passed" size="0.533rem"/>
      </div>
    </van-sticky>
    <van-list
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        ref="scrollTop"
    >
      <div class="song-item" v-for="(song,index) in dailySongs" :key="song.id" @click="playMusic(song.id,index)">
        <van-image
            width="1.333rem"
            height="1.333rem"
            :src="song.al.picUrl"
        />
        <div class="song-info">
          <div class="song-name van-ellipsis">
            <span>{{ song.name }} &nbsp</span>
            <span class="alias" v-if="song.alia.length !== 0">( {{ song.alia[0] }} )</span>
          </div>
          <div class="author van-ellipsis">
            <span v-if="song.RcmdReasons" class="reasons">{{ song.RcmdReasons }}</span>
            {{ song.ar[0].name }} - {{ song.al.name }}
          </div>
        </div>
        <van-icon class="iconfont icon-youcecaidan" size="0.533rem"/>
      </div>
    </van-list>
    <playControlPanel/>
  </div>
</template>

<script>
import playControlPanel from '@/components/PlayControlPanel'
import {setItem, getItem} from "@/utils/storage";

export default {
  name: "songrcmd",
  components: {playControlPanel},
  data() {
    return {
      finished: false,
      dailySongs: [],
      show: false,
      // 保存滚动条
      scrollTop: 0,
      ids: []
    }
  },

  created() {
    this.getDailyRCMD()
  },

  methods: {
    // 跳转路由
    playMusic(id, index) {
      // console.log(id,index)
      // 保存当前 歌曲在 播放列表中的 ID
      this.$store.commit('CHANGEMUSICINDEX', index)
      // 保存 播放列表
      setItem('songList', this.dailySongs)
      // 跳转播放界面
      this.$router.push({name: 'PlayMusic', params: {id}})
    },
    onLoad() {
      this.finished = true;
    },
    async getDailyRCMD() {
      const {data} = await this.$axios('/recommend/songs')
      let {dailySongs, recommendReasons} = data.data
      dailySongs.forEach(song => {
        recommendReasons.forEach(reasons => {
          if (song.id === reasons.songId) {
            song.RcmdReasons = reasons.reason
          }
        })
      })
      this.dailySongs = dailySongs
    }
  }
}
</script>

<style scoped lang="less">
.daily-recommend {
  margin-bottom: 50px;

  .play-control-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .header {
    position: relative;

    .return-left {
      position: absolute;
      top: 20px;
      left: 10px;
      color: #ffffff !important;
      z-index: 999999;
    }

    .img {
      background: rgb(9, 16, 32);
      background: linear-gradient(180deg, rgba(9, 16, 32, 0) 0%, rgba(142, 136, 146, 0) 0%, rgba(255, 255, 255, 1) 100%);
    }

    .time {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #efefef;
      text-align: center;

      .time-wrap {
        display: flex;
        align-items: end;
        margin-bottom: 10px;

        .today {
          font-size: 52px;
          line-height: 52px;
          margin-right: 8px;
        }

        .month {
          font-size: 20px;
          line-height: 32px;
        }
      }

      .luck {
        font-size: 12px;
      }
    }

    .pastRCMD {
      border: none;
      padding-left: 10px !important;
      position: absolute;
      bottom: 20px;
      right: 20px;
      background-color: rgba(0, 0, 0, .1);
      color: #f5f5f5;
    }

  }

  .van-sticky {

    .title {
      display: flex;
      background-color: #fff;
      padding: 0 15px;
      justify-content: space-between;
      align-items: center;
      height: 50px;

      .play-icon {
        margin-right: 20px;
      }

      .text {
        flex: 1;
      }
    }
  }


  .song-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    margin-bottom: 20px;

    .van-image {
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 0 3px rgba(0, 0, 0, .3);
    }

    .song-info {
      width: 240px;

      .song-name {

        .alias {
          color: #a5a5a5;
        }

        margin-bottom: 5px;
      }

      .author {
        font-size: 12px;
        color: #a5a5a5;

        .reasons {
          background-color: #f5f5f5;
          color: #ffc300;
        }
      }

    }
  }

}
</style>