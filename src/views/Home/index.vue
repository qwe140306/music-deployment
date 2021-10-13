<template>
  <div class="home-container">
    <!-- 顶部搜索 -->
    <van-nav-bar>
      <template #left>
        <van-icon name="wap-nav" size="0.58667rem"/>
      </template>
      <template #title>
        <van-search
            @click="$router.push({name:'Search'})"
            placeholder="请输入搜索关键词"
            shape="round"
        />
      </template>
      <template #right>
        <van-icon class="iconfont icon-mic" size="0.53rem"/>
      </template>
    </van-nav-bar>
    <div class="main" ref="main">
      <!-- 轮播图 -->
      <van-swipe class="loop-img" autoplay="3000" indicator-color="#fff" v-if="ballList.length !== 0">
        <van-swipe-item v-for="item in banners" :key="item.bannersId">
          <van-image :src="item.pic" lazy-load></van-image>
          <div
              class="typeTitle"
              :style="`backgroundColor:${item.titleColor}`"
          >
            {{ item.typeTitle }}
          </div>
        </van-swipe-item>
      </van-swipe>
      <!-- 入口列表 -->
      <div class="ball-list" v-if="banners.length !==0">
        <div
            class="ball-item"
            v-for="(ball, index) in ballList"
            :key="ball.id"
            @click="ballRouteJMP(ball.id,ball.routerUrl)"
        >
          <div class="ball-img-back">
            <img class="ball-img" :class="ball.id === 19000 ?'zaonieA':''" :src="ball.iconUrl"/>
            <span class="today" v-if="index === 0">{{
                today | Today
              }}</span>
          </div>
          <span class="ball-text">{{ ball.name }}</span>
        </div>
      </div>
      <!-- 推荐歌单 -->
      <song-list :recommended-song-list="recommendedSongList"/>
      <!-- 歌曲推荐 -->
      <div class="song-recomd" v-if="songRemds.uiElement">
        <Title
            :title="songRemds.uiElement.subTitle.title"
            :refreshIcon="'icon-refresh'"
            :leftIcon="'icon-play'"
            :iconText="songRemds.uiElement.button.text"
        />
        <music-swipe :song-page="songRemds.creatives"/>
      </div>
      <!--   精选音乐视频   -->
      <div class="musicVideo" v-if="musicVideo.uiElement">
        <Title
            :title="musicVideo.uiElement.subTitle.title"
            :iconText="musicVideo.uiElement.button.text"
            :leftIcon="'icon-refresh'"
        />
        <div class="video-wrap">
          <div
              class="video-item"
              v-for="item in musicVideo.extInfo"
              :key="item.id"
          >
            <van-image
                width="2.667rem"
                height="4rem"
                fit="cover"
                :src="item.resource.mlogBaseData.coverUrl +'?param=100y150'"
                lazy-load
            ></van-image>
            <div class="video-title">
              {{ item.resource.mlogBaseData.text }}
            </div>
          </div>
        </div>
      </div>

      <!--   排行版   -->
      <div class="ranking" v-if="banners.length !==0">
        <Title :title="'排行版'"/>
        <van-swipe
            class="swipe-page"
            :show-indicators="false"
            touchable
            :loop="false"
        >
          <van-swipe-item v-for="item in ranking" :key="item.id">
            <template #default>
              <h4>
                {{ item.name }}
                <van-icon
                    name="arrow"
                    size="0.426rem"
                ></van-icon>
              </h4>
              <div class="song-list">
                <div
                    class="song-list-item"
                    v-for="(song, index) in item.tracks"
                    :key="song.id"
                >
                  <van-image
                      lazy-load
                      :src="song.al.picUrl"
                  ></van-image>
                  <span class="ranking-index">{{
                      index + 1
                    }}</span>
                  <span class="song-name">{{
                      song.name
                    }}</span>
                  <span class="author">
										- {{ song.ar[0].name }}</span>
                </div>
              </div>
            </template>
          </van-swipe-item>
        </van-swipe>
      </div>

      <!--   你的雷达歌单   -->
      <song-list
          v-if="radarSongList.creatives"
          :recommended-song-list="radarSongList"
      />

      <!-- 新歌推荐 -->
      <tabs-music-list v-if="newSong" :new-song="newSong"/>

      <!--   专属场景歌单   -->
      <song-list
          v-if="sceneSongList.creatives"
          :recommended-song-list="sceneSongList"
      />

      <!-- 音乐日历  -->
      <div class="music-calendar-wrap" v-if="musicCalendar.uiElement">
        <Title
            :title="musicCalendar.uiElement.subTitle.title"
            :icon-text="musicCalendar.uiElement.button.text"
        />
        <div class="receive-good-luck">
          <div>领取你的今日好运</div>
          <div class="luck-read">
            查看运势解读
            <van-icon name="arrow"></van-icon>
          </div>
        </div>
        <div class="music-calendar">
          <div
              class="music-calendar-item"
              v-for="calendar in musicCalendar.creatives"
              :key="calendar.creativeId"
          >
            <div class="calendar-title ">
              <div class="time-container">
								<span class="time">{{
                    calendar.resources[0].resourceExtInfo.startTime | isToday
                  }}</span>
                <span class="hot" v-if="calendar.resources[0].uiElement.labelTexts">{{
                    calendar.resources[0].uiElement.labelTexts[0]
                  }}</span>
                <span class="labelTexts"
                      v-else>{{ calendar.resources[0].resourceExtInfo.startTime > Date.now() ? '预告' : '发布' }}</span>
              </div>
              <div class="title text-hidden">
                {{
                  calendar.resources[0].uiElement.mainTitle.title
                }}
              </div>
            </div>
            <van-image
                width="1.33rem"
                height="1.33rem"
                :src="calendar.resources[0].uiElement.image.imageUrl"
                lazy-load
            />
          </div>
        </div>
      </div>

      <!-- 底部垫底 -->
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
import SongList from '@/components/SongList';
import Title from '@/components/Title';
import TabsMusicList from '@/components/TabsMusicList';
import MusicSwipe from '@/components/MusicSwipe';
import {throttle} from 'lodash'

export default {
  name: 'Home',
  data() {
    return {
      //新歌推荐
      newSongActive: 0,
      // 轮播图列表
      banners: [],
      // 图标列表
      ballList: [],
      today: Date.now(),
      // 推荐歌单
      recommendedSongList: {},
      //新歌推荐
      newSongList: [],
      //  音乐日历
      musicCalendar: {},
      // 精选歌曲
      songRemds: {},
      //雷达歌单
      radarSongList: {},
      // 官方播放歌单
      sceneSongList: {},
      //音乐视频
      musicVideo: {},
      //  排行版
      ranking: [],
      cursor: '',
      loading: false,
      finished: false,
      refresh: false,
      // 当前滚动条高度
      scrollTop: 0,
    };
  },
  components: {Title, SongList, TabsMusicList, MusicSwipe},
  computed: {
    // 数据处理
    newSong() {
      if (this.newSongList.length === 0) {
        return
      }
      let title = [];
      this.newSongList.forEach(item => {
        if (title.indexOf(item.uiElement.mainTitle.title) === -1) {
          title.push(item.uiElement.mainTitle.title);
        }
      });
      console.log(title)
      let length = title.length
      let arr = new Array(length);

      for (let i = 0; i < length; i++) {
        arr[i] = []
      }

      this.newSongList.forEach(item => {
        let i = title.indexOf(item.uiElement.mainTitle.title);
        if (i !== -1) {
          arr[i].push(item);
        }
      });
      return arr;
    },
  },
  methods: {
    // 入口图标跳转 奇奇怪怪
    ballRouteJMP(id, url) {
      if (id === 13000) {
        return window.open(url)
      }
      this.$router.push(url)
    },
    // 奇怪的函数
    throttled() {
    },
    // 滚动
    getScroll() {
      console.log('正在监测滚动条')
      let {main} = this.$refs
      if (this.cursor === null) {
        //null 销毁事件监听
        this.$refs.main.removeEventListener('scroll', this.throttled)
      }
      // 如果 当前滚动条高度 - 容器可视化高度 === 当前滚动条距离顶部高度 就去获取新的数据
      if (main.scrollHeight - main.clientHeight === main.scrollTop) {
        this.getSwipe()
      }

    },
    // 获取首屏数据
    async getSwipe() {
      try {
        const {data} = await this.$axios.get(`/homepage/block/page?refresh=${this.refresh}${this.cursor ? '&cursor=' + this.cursor : ''}`)
        this.cursor = data.data.cursor
        let blocks = data.data.blocks;
        blocks.forEach(item => {
          switch (item.blockCode) {
            case 'HOMEPAGE_BANNER':
              this.banners = item.extInfo.banners;
              break;
            case 'HOMEPAGE_BLOCK_PLAYLIST_RCMD':
              this.recommendedSongList = item;
              break;
            case 'HOMEPAGE_BLOCK_STYLE_RCMD':
              this.songRemds = item;
              break;
            case 'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG':
              this.newSongList = item.creatives;
              break;
            case 'HOMEPAGE_MUSIC_CALENDAR':
              this.musicCalendar = item;
              break
            case 'HOMEPAGE_MUSIC_MLOG':
              this.musicVideo = item
              break;
            case 'HOMEPAGE_BLOCK_MGC_PLAYLIST':
              this.radarSongList = item
              break
            case 'HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST':
              this.sceneSongList = item
              break
            default:
              console.log(`Sorry, we are out`);
          }

        })

      } catch (error) {
        this.$toast.fail(error.message);
      }
    },
    // 获取入口图标
    async getBail() {
      const {data} = await this.$axios.get('/homepage/dragon/ball');
      data.data.forEach(item => {
        if (item.id === 13000) {
          return item.routerUrl = item.url
        }
        item.routerUrl = (item.url.split('//')[1].split('?')[0]).toLowerCase()
      })
      this.ballList = data.data;
    },
    // 获取排行版
    async getTopList() {
      const {data} = await this.$axios.get('/toplist');
      let ranking = data.list.slice(0, 8);
      ranking.forEach(item => {
        this.getDetail(item.id)
      })
    },

    async getDetail(id) {
      let {data: res} = await this.$axios.get(
          `/playlist/detail?id=${id}`
      );
      res.playlist.tracks.splice(3);
      this.ranking.push(res.playlist);
    },
  },
  mounted() {
    this.throttled = throttle(this.getScroll, 400)
    this.$nextTick(() => {
      this.$refs.main.addEventListener('scroll', this.throttled)
    })
  },
  // 组件内路由守卫
  beforeRouteLeave(to, from, next) {
    // 路由跳转 保存 scrollTop
    this.scrollTop = this.$refs.main.scrollTop
    next()
  },
  // 路由激活 修改 scrollTop
  activated() {
    this.$refs.main.scrollTop = this.scrollTop
  },
  created() {
    this.getSwipe();
    this.getBail();
    this.getTopList();
  },
};
</script>

<style scoped lang="less">
.home-container {
  .main {
    padding: 46px 0 0;
    height: 100vh;
    box-sizing: border-box;
    overflow: auto;
  }

  // 顶部搜索
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;

    /deep/ .van-icon {
      color: black;
    }

    /deep/ .van-nav-bar__title {
      flex: 1 !important;
      max-width: 75% !important;
    }

    .van-search {
      padding: 0;
      border-radius: 50%;
      background-color: #a5a5a5;
    }
  }

  // 轮播图
  .loop-img {
    padding: 10px 15px 5px;

    .van-swipe-item {
      height: 146px;

      .van-image {
        width: 340px;
        height: 146px;
      }

      .typeTitle {
        position: absolute;
        right: 35px;
        bottom: 0;
        font-size: 10px;
        color: #fff;
        padding: 5px;
        font-weight: 300;
        border-top-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }
    }

    /deep/ .van-image__img {
      border-radius: 12px !important;
    }
  }

  // 入口图标
  .ball-list {
    display: flex;
    overflow-x: auto;
    padding-left: 15px;
    border-bottom: 1px solid #bdbdbd2d;

    .ball-item {
      margin: 5px;
      display: flex;
      flex-direction: column;
      width: 60px;
      height: 70px;
      justify-content: center;
      align-items: center;


      .ball-img-back {
        background-color: #fde9e9;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        margin-bottom: 5px;
        position: relative;

        .today {
          color: rgba(213, 117, 117, 0.87);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-55%, -30%);
          font-size: 12px;
        }

        .ball-img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgb(181, 39, 39);
          background: linear-gradient(28deg, rgba(181, 39, 39, 1) 35%, rgba(227, 109, 109, 1) 77%, rgba(255, 255, 255, 1) 100%);
        }

        .zaonieA {
          filter: invert(100%) sepia(70%) saturate(620%) hue-rotate(17deg) brightness(116%) contrast(100%);
          opacity: .3;
        }
      }

      .ball-text {
        font-size: 12px;
        width: 60px;
        text-align: center;
      }
    }
  }

  // 音乐视频
  .musicVideo {
    padding: 0 15px;

    .video-wrap {
      display: flex;
      overflow-x: auto;
      height: 200px;

      .video-item {
        margin-right: 10px;
        width: 100px;

        .van-image {
          border-radius: 10px;
          overflow: hidden;
        }

        .video-title {
          font-size: 12px;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; /* 这里是超出几行省略 */
          overflow: hidden;
        }
      }
    }
  }

  // 音乐日历
  .music-calendar-wrap {
    padding: 15px;

    // 按钮
    .receive-good-luck {
      padding: 8px 12px;
      border: 1px solid #eee;
      border-radius: 10px;
      display: flex;
      font-size: 14px;
      justify-content: space-between;
      align-items: center;

      .luck-read {
        font-size: 12px;
        color: #a5a5a5;
      }
    }

    // 按钮激活样式
    .receive-good-luck:active {
      background-color: #eee;
    }

    // 日历 item
    .music-calendar-item {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      border-bottom: 1px solid #eee;
      padding: 15px 0;

      .calendar-title {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 250px;

        .time-container {
          .time {
            font-size: 12px;
            color: #a5a5a5;
          }

          .hot {
            color: #ff8100 !important;
          }

          .labelTexts,
          .hot {
            display: inline-block;
            font-size: 12px;
            transform: scale(83%);
            padding: 3px 5px;
            background-color: #f5f5f5;
            border-radius: 5px;
            color: #949494;
          }
        }

        .title {
          font-size: 16px;
        }
      }

      .van-image {
        border-radius: 8px;
        overflow: hidden;
      }
    }
  }

  // 排行版
  .ranking {
    padding: 0 15px;

    .swipe-page {
      height: 235px;

      .van-swipe-item {
        border-radius: 12px;
        box-shadow: 0 0 5px #dcdcdc;
        margin: 5px;
        height: 225px !important;
        width: 335px !important;
        box-sizing: border-box;
        padding: 15px 10px;
        display: flex;
        flex-direction: column;
        text-align: center;

        .song-list {
          .song-list-item {
            display: flex;
            height: 50px;
            margin: 10px 0;
            font-size: 12px;
            align-items: center;

            .van-image {
              width: 50px;
              height: 50px;
              border-radius: 5px;
              overflow: hidden;
            }

            .ranking-index {
              width: 30px;
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              font-weight: 600;
            }

            .song-name {
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              font-weight: 600;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              max-width: 140px;
            }

            .author {
              color: #a5a5a5;
              max-width: 100px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              margin-left: 8px;
            }
          }
        }

        h4 {
          margin: 0;
        }
      }
    }
  }

  // 歌曲推荐
  .song-recomd {
    padding: 0 15px;
  }

  // 底部垫底
  .bottom {
    height: 100px;
    width: 100%;
  }
}
</style>
