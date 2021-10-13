import {setItem} from "@/utils/storage";

export const changeMusicMiXin = {
    methods: {
        changeMusic(id, i) {
            if (id === this.musicId) {
                return
            }
            setItem('musicIndex', i)
            setItem('musicId', id)
            // 将当前的 index 保存 到 vuex 中
            this.$store.commit('CHANGEMUSICID', id)
            this.$store.commit('CHANGEMUSICINDEX', i)
            // 当前正在播放 暂停
            if (this.isMusicPlay) {
                this.$store.commit('ISMUSICPLAY', !(this.isMusicPlay))
            }
            // 通知修改 url
            this.$bus.$emit('getSongPlayUrl', id)
            if (this.$route.name === 'PlayMusic') {
                this.$router.replace({name: 'PlayMusic', params: {id,i}})
            }
        }
    }
}