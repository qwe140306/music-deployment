// 引入 Vue
import Vue from 'vue';

Vue.filter("Count", val => {
    val = val.toString()
    if (val.length > 8) {
        return (val.slice(0, val.length - 8) + '亿')

    } else if (val.length > 5 && val.length < 9) {

        return (val.slice(0, val.length - 4) + '万')

    } else {
        return val
    }
});







