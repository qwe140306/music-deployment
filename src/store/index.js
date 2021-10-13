import Vue from 'vue';
import Vuex from 'vuex';
import {setItem, getItem} from "@/utils/storage";

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        cookie: localStorage.getItem('cookie') || '',
        musicIndex: getItem('musicIndex') || 0,
        musicId: getItem('musicId') || 0,
        playType: getItem('playType') || 'icon-listloop',
        musicUrl: getItem('musicUrl') || '',
        isMusicPlay: false,
        curWidth: 0,
        // 当前播放到的时间
        currentTime: '00:00',
        // 当前音乐播放总时间
        duration: 0,
        songList: getItem('songList') && getItem('songList').length !== 0 ? getItem('songList') : ''
    },
    mutations: {
        SONGLIST(state, val) {
            state.songList = val
        },
        deleteSongList(state, val) {
            state.songList.splice(val, 1)
        },
        emptySongList(state, val) {
            state.songList.splice(val)
        },
        currentTime(state, val) {
            state.currentTime = val
        },
        duration(state, val) {
            state.duration = val
        },
        CURWIDTH(state, val) {
            state.curWidth = val
        },
        // 音乐播放 URL
        MUSICURL(state, val) {
            state.musicUrl = val
        },
        ISMUSICPLAY(state, val) {
            state.isMusicPlay = val
        },
        // 当前用户 cookie
        COOKIE(store, val) {
            store.cookie = val
        },
        // 当前 音乐 index
        CHANGEMUSICINDEX(state, val) {
            setItem('musicIndex', val)
            state.musicIndex = val
        },
        // 当前音乐 ID
        CHANGEMUSICID(state, val) {
            setItem('musicId', val)
            state.musicId = val
        },

        // 修改切换状态
        CHANGEPLAYTYPE(state) {
            let playType = state.playType
            if (playType === 'icon-listloop') {
                state.playType = 'icon-random'
            } else if (playType === 'icon-random') {
                state.playType = 'icon-loop'
            } else if (playType === 'icon-loop') {
                state.playType = 'icon-listloop'
            } else {
                state.playType = 'icon-listloop'
            }
            // 将 新的保存到 localstorage
            setItem('playType', state.playType)
        }
    },
    actions: {},
    modules: {},
});
