<template>
  <div class="play-music" v-if="Object.keys(song).length !== 0">
    <van-image class="backImg" :src="song.al.picUrl"></van-image>
    <div class="top-bar">
      <van-icon name="arrow-left" @click="returnPre" size="0.54rem" color="#ffffff"></van-icon>
      <div class="song-info">
        <span class="song-name van-ellipsis">{{ song.name }}</span>
        <span class="song-author van-ellipsis">{{ song.ar[0].name }}</span>
      </div>
      <van-icon size="0.54rem" color="#ffffff" name="share"/>
    </div>
    <div class="songImg-wrap">
      <van-image :class="isMusicPlay?'recordAnimation':'recordAnimationPause'" width="7rem" height="7rem" round
                 class="songImg" :src="song.al.picUrl"></van-image>
    </div>
    <div class="control">
      <van-row type="flex">
        <van-col span="2">
          <van-icon name="like-o" size="0.70rem"></van-icon>
        </van-col>
        <van-col span="2">
          <van-icon name="down" size="0.68rem"></van-icon>
        </van-col>
        <van-col span="2">
          <van-icon name="music-o" size="0.72rem"></van-icon>
        </van-col>
        <van-col span="2">
          <van-icon name="chat-o" size="0.72rem"></van-icon>
        </van-col>
        <van-col span="2">
          <van-icon name="weapp-nav" size="0.70rem"></van-icon>
        </van-col>
      </van-row>
      <!--  进度条  -->
      <div class="progressBar">
        <div class="currentTime">{{ currentTime | playTime }}</div>
        <van-slider
            class="progress"
            :value="curWidth"
            @change="onChangeSlider"
            bar-height="1px"
            active-color="#FFFFFF"
            inactive-color="#A5A5A5"
        >
          <template #button>
            <div class="custom-button"></div>
          </template>
        </van-slider>
        <div class="duration">{{ duration | playTime }}</div>
      </div>
      <!--  播放控制  -->
      <van-row type="flex">
        <van-col span="2">
          <van-icon class="iconfont" @click="changePlayType" :class-prefix="playType" size="0.70rem"></van-icon>
        </van-col>
        <van-col span="2">
          <van-icon @click="onMusicChange('pre')" class-prefix="iconfont icon-pre" name="down"
                    size="0.68rem"></van-icon>
        </van-col>
        <van-col span="4">
          <van-icon @click="changePlayState" :name="isMusicPlay?'pause-circle-o':'play-circle-o'"
                    size="1.5rem"></van-icon>
        </van-col>
        <van-col span="2">
          <van-icon @click="onMusicChange('next')" class-prefix="iconfont icon-next" size="0.68rem"></van-icon>
        </van-col>
        <van-col @click="songListShow = !songListShow" span="2">
          <van-icon class-prefix="iconfont icon-playlist" size="0.70rem"></van-icon>
        </van-col>
      </van-row>

      <van-popup v-model="songListShow" round position="bottom"
                 :style="{ height: '55%',width:'90%',margin:'0 5%' }" safe-area-inset-bottom
      >
        <play-song-list :song-list="songList"/>
      </van-popup>
    </div>

  </div>
</template>

<script>
import {getItem, setItem, removeItem} from "@/utils/storage";
import {mapState} from "vuex";
import PlaySongList from '@/components/PlaySongList'
import {changeMusicMiXin} from "@/mixins/changeMusic";


export default {
  name: "playMusic",
  props: {
    id: {require: true},
  },
  mixins: [changeMusicMiXin],
  data() {
    return {
      // 当前音乐信息
      song: {},
      songListShow: false,
      songList: []
    }
  },
  components: {PlaySongList},
  computed: {
    // musicIndex  音乐 在播放列表的下标   musicId 播放音乐 id    musicPlay 是否正在播放音乐
    ...mapState(['musicIndex', 'musicId', 'isMusicPlay', 'playType', 'duration', 'currentTime', 'curWidth']),

  },
  methods: {
    // 拖动音乐播放进度条
    onChangeSlider(value) {
      this.$emit('onChangeSlider', value)
    },
    //返回上一页
    returnPre() {
      this.$router.back()
    },
    deleteMusic(id, index) {
      this.songList.splice(index, 1)
      setItem('songList', this.songList)
      if (this.songList.length === 0) {
        this.songListShow = false
        removeItem('songList')
        this.$bus.$emit('removeSongList')
        this.$router.back()
        return
      }
      if (id === this.musicId) {
        this.changeMusic(this.songList[index].id, index)
        // 路由跳转传递新的 ID 获取播放地址
      }
    },
    // 清空播放列表
    emptyMusic() {
      this.$dialog.confirm({
        message: '确定清空播放列表?',
      })
          .then(() => {
            this.songListShow = false
            this.songList.splice(0, this.songList.length)
            removeItem('songList')
            this.$bus.$emit('removeSongList')
            this.$router.back()
          })
          .catch(() => {
            this.$toast({
              message: '已取消',
              position: 'top'
            })
          });
    },
    // 修改音乐播放状态
    changePlayState() {
      this.$store.commit('ISMUSICPLAY', !(this.isMusicPlay))
      this.$bus.$emit('changePlayState', this.isMusicPlay)
    },
    // 切换 歌曲函数
    onMusicChange(type) {
      let songList = getItem('songList')
      let i
      // 判断切换音乐状态 随机和列表
      if (getItem('playType') === 'icon-random') {
        //  随机播放 随机 index 不管前后,但是 不应该和当前一样 , 大小是 list.length -1
        i = Math.floor(Math.random() * songList.length);
        // 随机 i 和 全局 index 一致 i +1
        if (i === this.musicIndex) {
          i++
        }
      } else {
        // 列表播放 根据 切换 类型修改 index
        if (type === 'pre') {
          // 上一首 index - 1
          i = this.musicIndex - 1

        } else {
          // 下一首 index + 1
          i = this.musicIndex + 1
        }
      }
      // 统一判断
      if (i < 0) {
        // 不能小于 0
        i = songList.length - 1
      } else if (i > songList.length - 1) {
        // 不能大于 数组长度 - 1 最后一位的下标
        i = 0
      }
      // 修改 全局 index 因为还是 同一个列表

      let id = songList[i].id

      setItem('musicIndex', i)
      setItem('musicId', id)
      this.$store.commit('CHANGEMUSICINDEX', i)
      // 当前正在播放 暂停
      if (this.isMusicPlay) {
        this.$store.commit('ISMUSICPLAY', !(this.isMusicPlay))
      }
      // 路由跳转传递新的 ID 获取播放地址
      this.$router.replace({name: 'PlayMusic', params: {id}})
    },
    // 切换播放类型函数
    changePlayType() {
      // 修改全局播放类型
      this.$store.commit('CHANGEPLAYTYPE')
    },
    // 获取歌曲信息
    async getSongInfo(id) {
      const {data} = await this.$axios(`/song/detail?ids=${id}`)
      this.song = data.songs[0]
      setItem('musicIndex', 0)
      setItem('musicId', id)
    },
  },
  watch: {
    musicIndex(newVal) {
      this.song = getItem('songList')[newVal]
    },
    $route(to, from) {
      // 路由 跳转到 PlayMusic
      if (to.name === 'PlayMusic') {
        this.song = getItem('songList')[this.musicIndex]
        // 判断 id 和全局 id 是否相同,相同 不修改 不同 获取音乐播放url将并且 更新页面
        if (to.params.id !== this.musicId) {
          // 统一修改全局 Id
          this.$store.commit('CHANGEMUSICID', to.params.id)
          // 传递 ID 获取 播放 url
          console.log(to.params.id,this.musicId)
          console.log('3')
          this.$bus.$emit('getSongPlayUrl', to.params.id)
        }
      }
    }
  },


  created() {
    this.songList = getItem('songList')
    // 页面第一次挂载保存 id
    this.$store.commit('CHANGEMUSICID', this.id)
    let i = -1
    if (this.songList === null) {
      console.log('????')
      return this.getSongInfo(this.id)
    }
    this.songList.forEach((item, index) => {
      if (item.id === this.id) {
        i = index
      }
    })
    if (i === -1) {
      console.log('????')
      return this.getSongInfo(this.id)
    } else {
      this.song = this.songList[i]
    }
    setItem('musicId', this.id)
    if (!this.isMusicPlay || this.id !== this.musicId) {
      console.log('4')
      this.$bus.$emit('getSongPlayUrl', this.id)
    }
  },
  mounted() {
    console.log('5')
  },
  activated() {
    this.$bus.$on('deleteMusic', this.deleteMusic)
    this.$bus.$on('emptyMusic2', this.emptyMusic)
    if (this.songList.length === 0) {
      this.songList = getItem('songList')
    }
  },
  deactivated() {
    this.$bus.$off('deleteMusic', this.deleteMusic)
    this.$bus.$off('emptyMusic2', this.emptyMusic)
  }


}
</script>

<style scoped lang="less">

// 进度条
.progressBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 10px;

  .currentTime, .duration {
    font-size: 12px;
    transform: scale(.8);
    width: 30px;
    color: #fff;
  }

  .progress {
    width: 280px;
  }

}

.custom-button {
  width: 7px;
  height: 7px;
  background-color: #fff;
  border-radius: 100px;
}

.play-music {
  padding: 15px;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;

  .control {
    margin-bottom: 50px;
  }

  // 背景模糊化
  .backImg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .7;
    z-index: -2;
    -webkit-filter: blur(30px);
    filter: blur(30px) brightness(.8);
    transform: scale(1.3);
  }

  // 中间歌曲背景
  .songImg-wrap {
    width: 100%;
    height: 440px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    .songImg {
      width: 100%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, .2);
    }
  }

  .van-row {
    justify-content: space-evenly;
    align-items: center;

    .van-col {
      text-align: center;
      color: #ffffff;
    }
  }


  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .song-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #ffffff;

      .song-name {
        width: 180px;
        text-align: center;
      }

      .song-author {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.49);
      }
    }
  }
}

</style>