<template>
  <div class="my-container">

    <!--  顶部  -->
    <van-nav-bar class="animate__animated" :class="isTop?'top-user-nav   animate__fadeIn':''">
      <template #left>
        <van-icon name="wap-nav" size="0.58667rem"/>
      </template>
      <template #title v-if="isTop">
        <div class="top-userInfo">
          <van-image width="0.72rem" height="0.72rem" round :src="userInfo.avatarUrl"></van-image>
          <span class="nickname van-ellipsis">{{ userInfo.nickname }}</span>
        </div>
      </template>
      <template #right>
        <van-icon name="search" size="0.58667rem"/>
      </template>
    </van-nav-bar>
    <!--  主体内容  -->
    <div class="main" @scroll.passive="getScroll($event)" ref="hhh">
      <div class="userInfo" v-if="userInfo.avatarUrl" @click="signOut">
        <van-image :src="userInfo.avatarUrl" width="1.333rem" height="1.333rem" round></van-image>
        <div class="user-center">
          <div class="nickname van-ellipsis">{{ userInfo.nickname }}</div>
          <div class="level">
            <van-icon size="0.72rem" :class="userInfo.vipType === 11?'vip-activa':''"
                      class="iconfont icon-VIP"></van-icon>
            <van-button round>Lv.{{ level }}</van-button>
          </div>
        </div>
        <van-icon name="arrow" size="0.42rem"></van-icon>
      </div>

      <!--   音乐应用   -->
      <div class="music-application">
        <van-row type="flex">
          <van-col span="6">
            <van-icon name="friends" size="0.82rem"></van-icon>
            <span>我的好友</span>
          </van-col>
          <van-col span="6">
            <van-icon name="star" size="0.82rem"></van-icon>
            <span>收藏和赞</span>
          </van-col>
          <van-col span="6">
            <van-icon name="bag" size="0.82rem"></van-icon>
            <span>已购</span>
          </van-col>
          <van-col span="6">
            <van-icon name="play-circle" size="0.82rem"></van-icon>
            <span>最近播放</span>
          </van-col>
          <van-col span="6">
            <van-icon class="iconfont icon-yunpanlogo-_huabanfuben" size="0.82rem"></van-icon>
            <span>云盘</span>
          </van-col>
          <van-col span="6">
            <van-icon class="iconfont icon-feed" size="0.82rem"></van-icon>
            <span>我的播客</span>
          </van-col>
        </van-row>
      </div>

      <!--   我喜欢的音乐   -->
      <div class="like-music" v-if="likeSong.coverImgUrl">
        <van-image :src="likeSong.coverImgUrl" width="1.333rem" height="1.333rem">
        </van-image>
        <div class="center">
          <div class="like">我喜欢的音乐</div>
          <div class="like-count">{{ likeSong.trackCount }}首</div>
        </div>
        <van-button icon="like-o" round size="mini">
          心动模式
        </van-button>
      </div>
      <!--  收藏的歌单    -->
      <div class="collection-song-list">
        <van-row class="title" type="flex" justify="space-between">
          <van-col span="7">收藏歌单({{ userPlayList.length }}个)</van-col>
          <van-col span="4">
            <van-icon class="iconfont icon-youcecaidan" size="0.42rem"></van-icon>
          </van-col>
        </van-row>
        <div class="item-wrap" v-if="userPlayList.length !== 0">
          <div class="list-item" @click="toPlayListDetail(list.id)" v-for="list in userPlayList" :key="list.id">
            <van-image width="1.333rem" height="1.333rem" :src="list.coverImgUrl"></van-image>
            <div class="list-item-info">
              <div class="list-name van-ellipsis">{{ list.name }}</div>
              <div class="list-count van-ellipsis">
                {{ list.trackCount }}首,by {{ list.creator.nickname }}
              </div>
            </div>
            <van-icon class="iconfont icon-youcecaidan" size="0.42rem"></van-icon>
          </div>
        </div>
        <div class="null-list-item" v-else>
          暂无收藏歌单
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {removeItem} from "@/utils/storage";

export default {
  name: 'my',
  data() {
    return {
      userInfo: {},
      scrollTop: 0,
      level: 0,
      likeSong: {},
      userPlayList: [],
      isTop: false,
      scroll: 0
    }
  },

  methods: {
    // 退出登录
    signOut() {
      this.$dialog.confirm({
        title: '是否退出登录?',
      })
          .then(() => {
            removeItem('cookie')
            this.$store.commit('COOKIE', '')
            this.userInfo = {}
            this.likeSong = {}
            this.userPlayList = []
            this.$toast({
              message: '退出成功',
              position: 'top'
            })
            this.$router.replace({name: 'Home'})
          })
          .catch(() => {
            this.$toast({
              message: '已取消',
              position: 'top'
            })
          });
    },
    // 获取用户信息
    async getUserInfo() {
      const {data: {profile}} = await this.$axios(`/user/account?date=${Date.now()}`)
      this.userInfo = profile
    },
    async getUserPlayList() {
      const {data} = await this.$axios(`/user/playlist?uid=${this.userInfo.userId}&date=${Date.now()}`)
      this.likeSong = data.playlist[0]
      this.userPlayList = data.playlist.splice(1)
    },

    // 跳转歌单详情
    toPlayListDetail(id) {
      this.$router.push({
        name: 'PlayListDetail', query: {
          id
        }
      })
    },

    getScroll(event) {
      if (event.target.scrollTop > 50 && !this.isTop) {
        this.isTop = true
      } else if (event.target.scrollTop < 50) {
        this.isTop = false
      }
    },
    async getLevel() {
      const {data} = await this.$axios.get(`/user/level?date=${Date.now()}`)
      this.level = data.data.level
    },
    beforeDestroy() {
      console.log('销毁')
    }
  },
  async activated() {
    this.$refs.hhh.scrollTop = this.scroll
    if (Object.keys(this.userInfo).length === 0) {
      await this.getUserInfo()
      this.getLevel()
      this.getUserPlayList()
    }
  },
  deactivated() {
  },
  beforeRouteLeave(to, from, next) {
    console.log()
    this.scroll = this.$refs.hhh.scrollTop
    next()
  }

}
</script>

<style scoped lang="less">
.my-container {
  background-color: #f5f5f5;
  height: 100vh;
  box-sizing: border-box;
  // 顶部搜索
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
    background-color: #f5f5f5;

    /deep/ .van-icon {
      color: black;
    }

    .top-userInfo {
      display: flex;
      align-items: center;

      .nickname {
        width: 120px;
        font-size: 12px;
        color: #fff;
      }

      .van-image {
        margin-right: 10px;
      }
    }


  }

  .top-user-nav {
    background-color: #e04439;

    /deep/ .van-icon {
      color: white;
    }
  }

  .main {
    height: 521px;
    overflow-x: auto;
    margin-top: 46px;
    padding: 15px;

    .userInfo {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .van-image {
        margin: 0 15px;
        border: 2px solid white;
      }

      .user-center {
        flex: 1;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;

        .nickname {
          width: 125px;
          font-weight: 600;
        }

        .level {
          display: flex;
          align-items: center;

          .van-icon {
            height: 20px;
            color: #a5a5a5;
            line-height: 20px;
          }

          .vip-activa {
            color: black !important;
          }

          .van-button {
            width: 38px;
            height: 22px;
            font-size: 12px;
            transform: scale(.83);
          }
        }


      }

    }

    .music-application {
      margin-top: 20px;
      width: 100%;
      background-color: #fff;
      border-radius: 12px;
      padding: 12px;
      box-sizing: border-box;


      .van-row {
        .van-col {
          height: 70px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 12px;

          .van-icon {
            color: rgb(211, 80, 80);
          }
        }

        .van-col:active {
          background-color: #f5f5f5;
          border-radius: 12px;
        }
      }
    }

    .like-music {
      height: 80px;
      margin-top: 15px;
      border-radius: 12px;
      width: 100%;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .van-image {
        margin: 0 15px;
        border-radius: 8px;
        overflow: hidden;

        .van-icon-like {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .center {
        flex: 1;
        font-size: 12px;

        .like {
          font-size: 14px;
        }

        .like-count {
          color: #737373;
          font-size: 12px;
        }
      }

      .van-button {
        padding: 12px 10px;
        margin-right: 20px;

        .van-icon-like-o {
          color: #e04439;
        }

        .like-count {
          font-size: 12px;
        }
      }


    }

    .collection-song-list {
      margin-top: 15px;
      width: 100%;
      background-color: #fff;
      border-radius: 12px;
      padding-bottom: 20px;
      margin-bottom: 30px;

      .null-list-item {
        height: 40px;
        text-align: center;
        font-size: 12px;
        color: #a5a5a5;
        line-height: 40px;
      }

      .title {
        height: 50px;
        align-items: center;

        .van-col {
          text-align: center;
          font-size: 12px;
        }
      }

      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .van-image {
          border-radius: 8px;
          overflow: hidden;
          margin: 0 15px;

        }

        .list-item-info {
          flex: 1;
          margin: 15px 0;

          .list-name {
            font-size: 14px;
            width: 200px;
          }

          .list-count {
            font-size: 12px;
            color: #737373;
          }
        }

        .van-icon {
          width: 57.5px;
          text-align: center;
        }
      }

      .list-item:active {
        background-color: rgba(0, 0, 0, .1);
      }

    }
  }
}
</style>