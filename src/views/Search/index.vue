<template>
  <div class="search">
    <van-field
        @input="getSearchSuggest"
        label-width="0.64rem"
        v-model="searchText"
        :placeholder="showKeyword"
        @keydown.enter="enterSerach"
        ref="searchInp"
        @focus="getSearchSuggest($event.target.value)"
        clearable
    >
      <template #left-icon>
        <van-icon name="arrow-left" @click="returnPre"></van-icon>
      </template>
    </van-field>

    <!--  搜索历史 -->
    <div class="history" v-if="historyList.length > 0 && searchResults.length === 0 && !searchText">
      <div class="text">历史</div>
      <div class="history-list">
        <van-button @click="clickSearch($event.target.innerText)" class="history-item" v-for="history in historyList"
                    :key="history" size="mini" round>
          {{ history }}
        </van-button>
      </div>
      <van-icon @click="deleteHistory" size="0.54rem" name="delete-o"></van-icon>
    </div>

    <!--  热搜列表  -->
    <div class="hot-search" v-if="!searchText && searchResults.length === 0">
      <van-tag color="#ffffff" text-color="#000000" size="large"
      >热搜榜
      </van-tag
      >
      <div class="hot-search-list">
				<span
            class="hot-search-item"
            v-for="(hot, index) in hotList"
            :key="hot.score"
            @click="clickSearch(hot.searchWord)"
        >
					<span
              class="score-ranking"
              :class="index < 3 ? 'firstThree' : ''"
          >{{ index + 1 }}</span
          >
					<span
              class="hot-text van-ellipsis"
              :class="index < 3 ? 'firstText' : ''"
          >{{ hot.searchWord }}</span
          >
					<van-image
              width="0.8rem"
              v-if="hot.iconUrl && hot.iconType !== 5"
              :src="hot.iconUrl"
          />
					<van-image
              width="0.3rem"
              v-if="hot.iconUrl && hot.iconType === 5"
              :src="hot.iconUrl"
          />
				</span>
      </div>
    </div>
    <!--  搜索联想  -->
    <div class="search-suggest" v-else-if="suggest.length > 0 && searchResults.length === 0">
      <van-cell
          icon="search"
          v-for="sug in suggest"
          :key="sug.keyword"
          @click="clickSearch($event.target.innerText)"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div v-html="sug.keyword"></div>
        </template>
      </van-cell>
    </div>
    <!--  没有搜索联想   -->
    <div class="search-suggest-null"
         v-else-if="!isShowNotMatch && suggest.length === 0 && searchText && searchResults.length === 0">
      <van-cell @click="clickSearch(searchText)">搜索”{{ searchText }}“</van-cell>
    </div>
    <!--  搜索结果  -->
    <div class="search-results" v-else-if="searchResults.length !== 0">
      <!--   头部   -->
      <van-sticky offset-top="1.36rem">
        <div class="title">
          <van-icon class="play-icon" name="play-circle" color="#E34D3B" size="0.533rem"/>
          <span class="text">播放全部</span>
          <van-icon name="passed" size="0.533rem"/>
        </div>
      </van-sticky>

      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          class="results-list"
          v-if="searchResults.length !== 0"
      >
        <div class="result-item" @click="playMusic(item)" v-for="item in searchResults" :key="item.id">
          <div class="item-left">
            <div class="song-name">{{ item.name }}</div>
            <div class="song-author">{{ item.ar[0].name }}-{{ item.al.name }}</div>
            <div class="song-tip" v-if="item.alia">{{ item.alia[0] }}</div>
          </div>
          <div class="item-right">
            <van-icon class-prefix="iconfont icon-youcecaidan" size="0.54rem"></van-icon>
          </div>
        </div>
      </van-list>
    </div>
    <playControlPanel/>

  </div>
</template>

<script>
import {debounce} from 'lodash';
import {getItem, setItem} from "@/utils/storage";
import {mapState} from "vuex";
import playControlPanel from '@/components/PlayControlPanel'


export default {
  name: 'Search',
  components: {playControlPanel},
  data() {
    return {
      isSend: false,
      // 搜索关键字
      searchText: '',
      showKeyword: '',
      hotList: [],
      // 匹配关键字列表
      suggest: [],
      // 没有更多了!
      hasMore: false,
      // 当前播放歌曲index
      index: 0,
      // 搜索结果歌曲列表
      searchResults: [],
      // 是否加载中
      loading: false,
      // 是否没有更多了
      finished: false,
      // 历史记录
      historyList: getItem('historyList') || [],
      isShowNotMatch: true,
      songCount: 0
    };
  },
  computed: {
    ...mapState(['musicIndex'])
  },
  methods: {
    //清空历史记录
    deleteHistory() {
      this.$dialog.confirm({
        message: '是否清空历史记录',
      })
          .then(() => {
            this.historyList = []
            removeItem('historyList')
          })
          .catch(() => {
            // on cancel
          });
    },
    // 回车搜索
    enterSerach(event) {
      if (!event.target.value.trim()) {
        this.searchText = this.showKeyword
      }
      this.$refs.searchInp.blur()
      this.search(this.searchText)
    },
    // 点击搜索
    clickSearch(text) {
      console.log(text)
      this.searchText = text
      this.$refs.searchInp.blur()
      this.search(text)
    },
    // 触底刷新
    async onLoad() {
      let text = this.$refs.searchInp.value
      await this.search(text, this.searchResults.length)
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      console.log(this.searchResults.length)
      console.log(this.songCount)
      if (this.searchResults.length >= this.songCount) {
        this.finished = true;
      }
    },
    // 返回
    returnPre() {
      this.searchText = ''
      this.suggest = []
      this.searchResults = []
      this.$router.replace({name: 'Home'})
    },
    // 跳转播放
    playMusic(song) {
      let songList = getItem('songList')
      if (songList === null) {
        //  没有播放列表
        // 保存播放列表
        setItem('songList', [song])
        // 没有播放列表 index 自然就是 0
        this.$store.commit('CHANGEMUSICINDEX', 0)
        // 携带 id 跳转 播放页面
        this.$router.push({name: 'PlayMusic', params: {id: song.id}})
      } else {
        // 播放列表不为空
        // push 到播放列表中
        // 需要判断数组是否含有 该 id
        let i

        songList.forEach((item, index) => {
          if (item.id === song.id) {
            i = index
            console.log(i)
          }
        })

        if (i === undefined) {
          console.log(i)
          console.log('baocunle')
          // 进入代表 数组中没有 当前歌曲
          i = this.musicIndex * 1 + 1
          // splice 向数组的 i 项添加
          songList.splice(i, 0, song)
          // 保存到本地
          setItem('songList', songList)
        }
        //  保存新的 index
        this.$store.commit('CHANGEMUSICINDEX', i)
        //  跳转路由 携带 id
        this.$router.push({name: 'PlayMusic', params: {id: song.id}})
      }
    },
    // 默认搜索关键词
    async searchDefault() {
      const {data} = await this.$axios('/search/default');
      this.showKeyword = data.data.showKeyword;
    },
    // 搜索排行版
    async getSearchHot() {
      const {data} = await this.$axios('/search/hot/detail');
      this.hotList = data.data;
    },
    // 搜索联想防抖函数
    getSearchSuggest: debounce(async function (value) {
      this.searchResults = []
      this.isShowNotMatch = true
      if (!value.trim()) {
        this.isSend = true
        this.suggest = [];
        return;
      }
      this.isSend = false
      const {data} = await this.$axios(
          `/search/suggest?keywords=${value}&type=mobile`
      );
      // 如果返回一个空对象 那么设置 搜索列表为空 和 显示是否搜索输入关键词
      if (Object.keys(data.result).length === 0) {
        this.suggest = []
        this.isShowNotMatch = false
        return
      }
      // 有搜索结果显示 搜索列表
      this.isShowNotMatch = true
      //搜索结果高亮
      // 正则
      let replaceReg = new RegExp(value, 'g')
      // 替换的 字符串
      let replaceString = '<span style="color: #e04439" class="search-value">' + value + '</span>';
      data.result.allMatch.forEach(item => {
        item.keyword = item.keyword.replace(replaceReg, replaceString);
      })
      // 保存数据
      this.suggest = data.result.allMatch;
    }, 200),
    //  搜索
    async search(text, length) {
      if (this.finished) {
        return;
      }
      this.isSend = true

      try {
        const {data} = await this.$axios(`/cloudsearch?keywords=${text}&type=1&offset=${length || 0}`)
        if (data.result.songCount === 0) {
          return this.$toast.fail('没有搜索到结果')
        }
        this.searchResults.push(...data.result.songs)
        this.songCount = data.result.songCount
        //保存历史记录
        // 判断数组是否搜过过该记录  有返回下标 没有返回 -1
        let i = this.historyList.indexOf(text)
        if (i !== -1) {
          // 不等于 -1 将该 索引所属项移除
          this.historyList.splice(i, 1)
        }
        // 添加到数组头部
        this.historyList.unshift(text)
        setItem('historyList', this.historyList)

      } catch (e) {
        console.dir(e)
      }
    }
  },

  created() {
    this.getSearchHot();
    this.searchDefault();
  },
};
</script>

<style scoped lang="less">
.search {
  margin-top: 51px;
  height: 100%;
  box-sizing: border-box;

  .play-control-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .van-field {
    background-color: #e04439;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;

    /deep/ .van-field__left-icon {
      width: 30px;
      color: white;
    }

    /deep/ .van-field__control {
      border-bottom: 1px solid white;
      padding: 3px 0 3px 0;
      color: white;
    }

    /deep/ input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #efefef;
      /* placeholder字体大小  */
      font-size: 14px;
    }
  }

  .hot-search {
    padding: 5px 16px;

    .van-tag {
      font-weight: bold !important;
      padding: 5px 0;
    }
  }

  .hot-search-list {
    margin-top: 15px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border-radius: 7px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 15px 0;

    .hot-search-item {
      width: 45% !important;
      overflow: hidden;
      display: flex;
      align-items: center;
      height: 40px;
      font-size: 14px;

      .firstThree {
        color: #e04439;
      }

      .van-image {
        margin-left: 5px;
      }

      .firstText {
        font-weight: bold;
      }

      .score-ranking {
        text-align: center;
        padding: 10px 10px;
      }
    }

    .hot-search-item:active {
      background-color: rgba(0, 0, 0, .1);
      border-radius: 15px;
    }
  }

  .search-results {
    width: 100%;
    box-sizing: border-box;

    .van-sticky {
      .title {
        display: flex;
        background-color: white;
        justify-content: space-between;
        padding: 10px 15px;
        align-items: center;

        .text {
          flex: 1;
          margin-left: 10px;
          font-weight: bold;
        }
      }
    }


  }

  .search-suggest-null {
    margin-top: 51px;
  }

  .history {
    padding: 10px 15px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    .text {
      padding: 0 5px;
      font-size: 14px;
      font-weight: bold;
      line-height: 26px;
      width: 30px;
    }

    .history-list {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      flex: 1;
    }

    .van-button {
      padding: 2px 12px;
      margin-right: 10px;
      flex-shrink: 0;
    }

    .van-icon {
      padding: 0 5px;
    }
  }
}

</style>
