<template>
  <div class="play-list-detail" v-if="playlist.id">
    <van-sticky v-if="playlist.id">
      <div class="title topbar">
        <van-icon class="play-icon" @click="$router.go(-1)" name="arrow-left" color="#ffffff" size="0.533rem"/>
        <span class="text van-ellipsis">{{ playlist.name }}</span>
        <van-icon class-prefix="iconfont icon-youcecaidan" color="#ffffff" size="0.533rem"/>
      </div>
    </van-sticky>
    <div class="list-info-wrap" v-if="playlist.id">
      <van-image width="2.666rem" height="2.666rem" :src="playlist.coverImgUrl"></van-image>
      <div class="list-info">
        <div class="list-name">{{ playlist.name }}</div>
        <div class="list-author">
          <van-image width="0.586rem" height="0.586rem" round :src="playlist.creator.avatarUrl"></van-image>
          <span class="author-name">{{ playlist.creator.nickname }}</span>
        </div>
        <div class="description-wrap">
          <div class="description van-ellipsis">
            {{ playlist.description }}
          </div>
          <van-icon name="arrow" size="0.32rem"></van-icon>
        </div>

      </div>
    </div>
    <div class="comment-share" v-if="playlist.id">
      <div class="back-box"></div>
      <div class="wrap">
        <div class="item">
          <van-icon name="passed" size="0.586rem"/>
          <span class="text">{{ playlist.subscribedCount | Count }}</span>

        </div>
        <div class="line">|</div>
        <div class="item">
          <van-icon size="0.586rem" name="chat-o"/>
          <span class="text">{{ playlist.commentCount | Count }}</span>

        </div>
        <div class="line">|</div>
        <div class="item">
          <van-icon size="0.586rem" class="iconfont icon-fenxiang"/>
          <span class="text">{{ playlist.shareCount | Count }}</span>
        </div>
      </div>
    </div>

    <van-sticky v-if="playlist.id" offset-top="1.333rem">
      <div class="title ">
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
        :immediate-check="false"
    >
      <div class="result-item" v-for="(item,index) in songList" :key="item.id" @click="playMusic(item.id,index)">
        <van-icon class="index iconfont icon-zhengzaibofang" color="#e04439" size="0.426rem"
                  v-if="item.id === musicId"></van-icon>
        <div class="index" v-else>{{ index + 1 }}</div>
        <div class="item-left">
          <div class="name-wrap van-ellipsis">
            <span class="song-name  ">{{ item.name }}</span>
            <span class="song-alia" v-if="item.alia.length > 0">({{ item.alia[0] }})</span>
          </div>
          <div class="song-info van-ellipsis">
            <span class="song-author">
              <span v-for="author in item.ar" :key="author.id">
                {{ author.name }}
              </span>
            </span>
            <span class="song-origin" v-if="item.originSongSimpleData">
              <span v-for="origin in item.originSongSimpleData.artists" :key="origin.id">
                | 原唱: {{ origin.name }}
              </span>
              <span> - {{ item.al.name }}</span>
            </span>
          </div>
        </div>
        <div class="item-right">
          <van-icon class-prefix="iconfont icon-youcecaidan" color="#a5a5a5" size="0.54rem"></van-icon>
        </div>
      </div>

    </van-list>
    <playControlPanel/>
  </div>
</template>

<script>
import playControlPanel from '@/components/PlayControlPanel'
import {setItem, getItem} from "@/utils/storage";
import {mapState} from "vuex";
import store from "@/store";

export default {
  name: "playListDetail",
  components: {playControlPanel},
  computed: {
    ...mapState(['musicId', 'cookie'])
  },
  data() {
    return {
      finished: false,
      playList: {},
      // 歌单id
      id: 0,
      // 歌曲详情
      songList: [],
      // 歌单信息
      playlist: {},
      ids: []
    }

  },
  created() {
    this.id = this.$route.query.id
    this.getPlayListDetail(this.id)
  },
  watch: {
    $route(newRoute, oldRoute) {
      if (newRoute.name === 'PlayListDetail') {
        if (this.id !== newRoute.query.id) {
          this.playlist = {}
          this.songList = []
          this.id = newRoute.query.id
          this.getPlayListDetail(this.id)
        }
      }
    }
  },
  methods: {
    async getPlayListDetail(id) {
      const {data} = await this.$axios(`/playlist/detail?id=${id}`)
      this.playlist = data.playlist
      // this.playList = data.playlist
      let arr = []
      data.playlist.trackIds.forEach(item => {
        arr.push(item.id)
      })
      this.ids = arr
      if (arr.length > 500) {
        arr.splice(0, 500)
      }
      this.getSongDetail(arr)
    },
    // 获取歌曲详情
    async getSongDetail(arr) {
      let arrStr = arr.join(',')
      const {data} = await this.$axios.get(`/song/detail?ids=${arrStr}`)
      this.songList.push(...data.songs)
    },
    // 跳转路由
    playMusic(id, index) {
      // console.log(id,index)
      // 保存当前 歌曲在 播放列表中的 ID
      this.$store.commit('CHANGEMUSICINDEX', index)
      // 保存 播放列表
      setItem('songList', this.songList)
      // 跳转播放界面
      this.$router.push({name: 'PlayMusic', params: {id}})
    },
    async onLoad() {
      this.finished = true
    },

  },
}
</script>

<style scoped lang="less">
.play-list-detail {
  margin-bottom: 50px;


  .topbar {
    background-color: #817C82 !important;

    .text {
      color: #ffffff;
    }
  }

  .play-control-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
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

  .result-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 15px;
    margin: 10px 0;

    .index {
      width: 30px;
      line-height: 30px;
      text-align: center;
      margin-right: 10px;
      color: #a5a5a5;
    }

    .item-left {
      flex: 1;
      display: flex;
      flex-direction: column;


      .name-wrap, .song-info {
        width: 250px !important;
      }

      .song-name {
        font-size: 14px;
      }

      .song-alia {
        color: #a5a5a5;
        margin-left: 5px;
      }

      .song-info {
        font-size: 12px;
        color: #a5a5a5;
      }

    }

  }

  .list-info-wrap {
    display: flex;
    background-color: #817C82;
    padding: 15px;

    .van-image {
      border-radius: 12px;
      overflow: hidden;
      margin-right: 12px;
    }

    .list-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #d7d7d7;
      padding: 5px 0;

      .list-name {
        color: #ffffff;
      }

      .list-author {
        display: flex;
        align-items: center;
        font-size: 12px;
        margin: 10px 5px;
      }

      .description-wrap {
        width: 210px;
        font-size: 12px;
        display: flex;
        align-items: center;

        .van-icon {
          height: 16px;
          line-height: 18px;
        }
      }

      .description-wrap:active {
        background-color: rgba(0, 0, 0, .1);
      }
    }
  }

  .comment-share {
    position: relative;
    margin-bottom: 40px;

    .back-box {
      width: 100%;
      height: 20px;
      background-color: #817C82;
      border-bottom-left-radius: 30%;
      border-bottom-right-radius: 30%;

    }


    .wrap {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 225px;
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      background-color: white;
      padding: 5px 20px;
      font-size: 14px;
      box-shadow: 0 0 10px rgba(0, 0, 0, .2);
      border-radius: 20px;
      margin-bottom: 20px;

      .item {
        height: 30px;
        display: flex;
        align-items: center;

        .text {
          margin-left: 5px;
        }
      }

      .item:active {
        color: #a5a5a5;
      }

    }


  }

}


</style>