// 引入 Vue
import Vue from 'vue';
// 引入 day.js
import dayjs from 'dayjs';
// 引入语言配置
import 'dayjs/locale/zh-cn';
// 全局使用语言配置
dayjs.locale('zh-cn');
// 注册为全局过滤器
Vue.filter("Today", val => {
    return dayjs(val).format('DD')
});

Vue.filter("Month", val => {
    return dayjs(val).format('MM')
});

Vue.filter("playTime", val => {
    let minute = val / 60;
    let minutes = parseInt(minute);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    //秒
    let second = val % 60;
    let seconds = Math.round(second);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds
});

import isToday from 'dayjs/plugin/isToday'

dayjs.extend(isToday)

dayjs().isToday() // true


Vue.filter("isToday", val => {
    if (dayjs(val).isToday()) {
        return '今天'
    }
    return dayjs(val).format('MM-DD')
});

