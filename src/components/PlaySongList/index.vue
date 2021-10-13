<template>
  <div class="play-song-list">
    <h4>当前播放<span class="song-list-length">({{ songList.length }})</span></h4>
    <van-row type="flex" justify="space-between">
      <van-col span="6">
        <van-icon name="add-o" size="0.426rem"/>
        收藏全部
      </van-col>
      <van-col span="2">
        <van-icon @click="emptyMusic" name="delete-o" size="0.426rem"/>
      </van-col>
    </van-row>
    <van-list>
      <div v-if="songList.length !== 0" class="song-list" @click="changeMusic(item.id,index)"
           v-for="(item,index) in songList" :key="item.id">
        <div :class="id === item.id ?'active':''" class="title van-ellipsis">
          <span class="custom-title">{{ item.name }}</span>
          <span class="custom-author"> - {{ item.ar[0].name }}</span>
        </div>
        <div class="right-icon" @click.stop="deleteSong(item.id,index)">
          <van-icon name="cross" size="0.373rem"/>
        </div>
      </div>

    </van-list>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {changeMusicMiXin} from "@/mixins/changeMusic"

export default {
  name: "PlaySongList",
  mixins: [changeMusicMiXin],
  props: {
    songList: {
      require: true
    }
  },
  computed: {
    ...mapState(['musicId', 'musicIndex']),
  },
  data() {
    return {
      id: 0
    }
  },
  watch: {
    musicId(val) {
      this.id = val
    }
  },
  created() {
    this.id = this.musicId
  },
  methods: {
    deleteSong(id, index) {
      this.$bus.$emit('deleteMusic', id, index)
    },
    emptyMusic() {
      this.$bus.$emit('emptyMusic')
      this.$bus.$emit('emptyMusic2')
    }
  },

}
</script>

<style scoped lang="less">
.play-song-list {
  overflow: hidden;
  height: 100%;
  position: relative;

  h4 {
    margin: 0;
    padding: 15px 15px 0;

    .song-list-length {
      font-size: 14px;
      margin-left: 5px;
      font-weight: 500;
    }
  }

  .van-row {
    padding: 0 15px;
    margin-top: 15px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    text-align: center;

    .van-col:active:not('.right-icon') {
      background-color: rgba(0, 0, 0, .1);
    }
  }


  .van-list {
    overflow-y: auto;
    position: absolute;
    top: 90px;
    bottom: 0;
    width: 100%;

    .song-list {
      padding: 5px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        width: 225px;

        .custom-title {
          font-size: 14px;
          font-weight: 600;
        }


        .custom-author {
          font-size: 12px;
          display: inline-block;
          transform: scale(0.83);
        }

      }

      .active {
        color: #e04439 !important;
      }

      .right-icon {
        width: 20px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: #a5a5a5;
      }
    }

    .song-list:active {
      background-color: rgba(0, 0, 0, .1);
    }

  }
}
</style>