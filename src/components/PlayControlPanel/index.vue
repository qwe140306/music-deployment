<template>
  <div class="play-control-panel" v-if="songList.length !== 0">
    <!-- 歌曲播放 -->
    <van-swipe class="my-swipe" :show-indicators="false" duration="1000" @change="onSwipeChange" ref="musicSwipe"
               :initial-swipe="musicIndex">
      <van-swipe-item v-for="(song,index) in songList" :key="song.id" @click="playMusic(song.id,index)">
        <div class="left">
          <div class="music-record" :class="isMusicPlay?'recordAnimation':'recordAnimationPause'">
            <van-image width="0.9rem" height="0.9rem"
                       round :src="song.al.picUrl" lazy-load></van-image>
          </div>
          <div class="music-info">
            <span class="music-name van-ellipsis">{{ song.name }}</span>
            <span class="author van-ellipsis"> - {{ song.ar[0].name }}</span>
          </div>
        </div>

      </van-swipe-item>

    </van-swipe>
    <div class="right">
      <van-circle
          v-model="currentRate"
          :rate="curWidth"
          :color="gradientColor"
          layer-color="#eee"
          :stop-propagation="false"
      >
        <template #default>
          <van-icon
              @click="changePlayState"
              :name="isMusicPlay?'pause':'play'"
              size="0.50rem"
          >
          </van-icon>
        </template>
      </van-circle>
      <van-icon @click="songListShow = !songListShow" class="iconfont icon-24gl-playlistMusic" size="0.6rem"></van-icon>
    </div>

    <van-popup v-model="songListShow" round position="bottom"
               :style="{ height: '55%',width:'90%',margin:'0 5%' }" safe-area-inset-bottom
               get-container="#app"
    >

      <play-song-list :song-list="songList"/>
    </van-popup>
  </div>

</template>

<script>
import {getItem, setItem, removeItem} from "@/utils/storage";
import {mapState} from "vuex"
import PlaySongList from '@/components/PlaySongList'
import {changeMusicMiXin} from "@/mixins/changeMusic"

export default {
  name: 'playControlPanel',
  components: {PlaySongList},
  mixins: [changeMusicMiXin],
  data() {
    return {
      songList: [],
      currentRate: 1,
      gradientColor: {
        '0%': '#3fecff',
        '100%': '#6149f6',
      },
      songListShow: false
    }
  },

  computed: {
    ...mapState(['musicIndex', 'isMusicPlay', 'playType', 'curWidth', 'musicId']),
  },
  activated() {
    this.$bus.$on('deleteMusic', this.deleteMusic)
    this.$bus.$on('emptyMusic', this.emptyMusic)
    this.songList = getItem('songList') || []
  },
  deactivated() {
    this.$bus.$off('deleteMusic', this.deleteMusic)
    this.$bus.$off('emptyMusic', this.emptyMusic)
  },
  methods: {
    // 修改音乐播放状态
    changePlayState() {
      this.$store.commit('ISMUSICPLAY', !(this.isMusicPlay))
      this.$bus.$emit('changePlayState', this.isMusicPlay)
    },
    onSwipeChange(i) {
      let id = this.songList[i].id
      this.changeMusic(id, i)
    },
    playMusic(id, index) {
      this.$router.push({name: 'PlayMusic', params: {id, index}})
    },

    deleteMusic(id, index) {
      this.songList.splice(index, 1)
      setItem('songList', this.songList)
      if (this.songList.length === 0) {
        this.songListShow = false
        removeItem('songList')
        this.$bus.$emit('removeSongList')
        return
      }
      if (id === this.musicId) {
        this.onSwipeChange(index)
      }
    },
    // 清空播放列表
    emptyMusic() {
      this.$dialog.confirm({
        message: '确定清空播放列表?',
      })
          .then(() => {
            // 关闭
            this.songListShow = false
            removeItem('songList')
            this.songList.splice(0, this.songList.length)
            this.$bus.$emit('removeSongList')
          })
          .catch(() => {
            this.$toast({
              message: '已取消',
              position: 'top'
            })
          });
    }

  },

};
</script>

<style scoped lang="less">

.play-control-panel {
  position: relative;
  z-index: 10;
}

.my-swipe {
  height: 50px;
  background-color: #ffff;
}

.my-swipe .van-swipe-item {
  width: 375px !important;
  box-sizing: border-box;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  color: black;
  display: flex;
  align-items: center;
  padding: 0 15px;

  .left {
    display: flex;
    min-width: 80px;
    justify-content: space-between;
    align-items: center;
  }

  .left {
    .music-record {
      border-radius: 50%;
      overflow: hidden;
      width: 48px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      background: linear-gradient(90deg, rgba(0, 0, 0, 1) 18%, rgba(108, 108, 108, 0.8715861344537815) 50%, rgba(0, 0, 0, 1) 81%);
    }

    .music-info {
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;

      .music-name {
        font-size: 16px;
        max-width: 120px;
      }

      .author {
        font-size: 12px;
        color: #a5a5a5;
        line-height: 100%;
        margin-left: 10px;
        transform: scale(0.83);
      }
    }
  }

}

.right {
  position: absolute;
  top: 50%;
  right: 15px;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
  background-color: #fff;
  height: 100%;
  padding: 0 15px;
  margin-right: -15px;

  .icon-24gl-playlistMusic {
    height: 30px;
    line-height: 27px;
  }

  .icon-play2 {
    margin-left: 3px;
  }

  .van-circle {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
}

// 弹出层

</style>
