<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <audio
        v-if="musicUrl"
        :muted="muted"
        @ended="ended"
        autoplay
        :src="musicUrl"
        ref="audio"
        :loop="loop"
        @canplay="musicCanPlay"
    >
    </audio>

  </div>


</template>

<script>
import {mapState} from "vuex";
import {setItem, getItem} from "@/utils/storage";

export default {
  name: 'App',
  data() {
    return {
      musicUrl: '',
      muted: true,
      loop: this.playType === 'icon-loop',
      // 当前进度
      curWidth: 0,
      // 当前的定时器
      timer: 0
    }
  },

  computed: {
    ...mapState(['isMusicPlay', 'musicId', 'playType', 'musicIndex', 'duration'])
  },
  mounted() {
    // 监听滑块改变音乐的事件 根据 ID 获取 url
    this.$bus.$on('getSongPlayUrl', this.getSongPlayUrl)
    this.$bus.$on('changePlayState', this.changePlayState)
    this.$bus.$on('onChangeSlider', this.onChangeSlider)
    this.$bus.$on('removeSongList', this.changePlayState)


  },
  methods: {
    // 音乐加载完毕
    musicCanPlay() {
      this.$store.commit('duration', Math.floor(this.$refs.audio.duration))
      // 调用
      this.getCurWidth()
    },
    // 修改音乐播放状态
    changePlayState(data) {
      // 音乐播放 状态 为 true 那么 播放音乐
      if (data) {
        if (!this.musicUrl) {
          this.getSongPlayUrl(this.musicId)
        } else {
          this.$nextTick(() => {
            // this.$store.commit('ISMUSICPLAY', true)
            this.$refs.audio.play().catch(e => {
              console.log(e)
              this.$toast.fail('播放失败,请手动播放')
              this.$store.commit('isMusicPlay', false)
            })
            // 只能有一个定时器
            clearInterval(this.timer)
            this.getCurWidth()
            this.muted = false
          })
        }
      } else {
        this.$nextTick(() => {
          clearInterval(this.timer)
          // 修改播放状态 为 false
          this.$store.commit('ISMUSICPLAY', false)
          // 暂停音乐
          this.$refs.audio.pause()
        })
      }
    },

    // 修改音乐播放进度
    onChangeSlider(data) {
      this.$refs.audio.currentTime = data
    },

    // 播放结束
    ended() {
      // 修改播放状态
      this.$store.commit('ISMUSICPLAY', !(this.isMusicPlay))
      let song = getItem('songList')
      let i = this.musicIndex + 1
      if (i > song.length - 1) {
        i = 0
      }
      // 修改 id 和 index
      setItem('musicIndex', i)
      setItem('musicId', song[i].id)
      // 将当前的 index 保存 到 vuex 中
      this.$store.commit('CHANGEMUSICINDEX', i)
      // 修改 全局播放 id vuex
      this.$store.commit('CHANGEMUSICID', song[i].id)
      // 获取音乐播放地址
      this.getSongPlayUrl(song[i].id)
    },

    play() {
      this.$store.commit('ISMUSICPLAY', true)

      this.$nextTick(() => {
        if (this.$refs.audio) {
          this.$refs.audio.play().catch(e => {
            console.log(e)
            this.$toast.fail('播放失败,请手动播放!!!')
            this.$store.commit('ISMUSICPLAY', false)
          })
          // 只能有一个定时器
          clearInterval(this.timer)
          this.getCurWidth()
          this.muted = false
        }
      })
    },

    getCurWidth() {
      this.timer = setInterval(() => {
        if (this.duration !== 0 && this.$refs.audio) {
          this.curWidth = (100 * this.$refs.audio.currentTime) / this.duration
          this.$store.commit('CURWIDTH', this.curWidth)
          this.$store.commit('currentTime', Math.floor(this.$refs.audio.currentTime))
        }
      }, 300)
    },

    // 获取音乐播放地址
    async getSongPlayUrl(id) {
      // 清空当前播放url
      this.musicUrl = ''
      // 发送请求
      const {data} = await this.$axios(`/song/url?id=${id}`)
      // 保存 url
      console.log(data)
      if (data.data[0].code !== 200) {
        console.log(data)
        return this.$toast.fail('太概率歌曲需要会员')
      }
      this.musicUrl = data.data[0].url
      // 播放
      this.$nextTick(() => {
        this.play()
        // this.$store.commit('CHANGEMUSICID', id)
      })
    },


  },
};
</script>

<style lang="less">
#app {
  font-size: 16px;

  // 播放动画
  .recordAnimation {
    animation: disc 25s linear infinite;
  }

  .recordAnimationPause {
    animation: disc 25s linear infinite paused;
  }

  @keyframes disc {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }


  .text-hidden {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .vueAudioBetter {
    display: none;
  }

  .van-dialog {
    z-index: 9999 !important;
  }

}
</style>
