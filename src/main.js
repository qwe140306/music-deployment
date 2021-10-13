import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';


Vue.config.productionTip = false;  //  生产模式


// vant 组件注册
import '@/utils/vant';
// 移动端设配
import 'amfe-flexible';
// 引入图标字体
import '@/css/iconfont.css';
// 引入axios请求模块
import '@/utils/request';
// 引入时间处理插件
import '@/utils/day';
//处理数字
import '@/utils/count'

new Vue({
    router,
    store,
    beforeCreate() {
        //安装全局事件总线，$bus就是当前应用的vm
        Vue.prototype.$bus = this
    },
    render: h => h(App),
}).$mount('#app');
