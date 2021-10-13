import Vue from 'vue';
import axios from 'axios';
import {Toast} from 'vant';

const request = axios.create({
    baseURL: 'https://netease-cloud-music-api-theta-snowy-46.vercel.app/',
    withCredentials: true, // default
});

request.interceptors.request.use(
    config => {
        const regExp = /\/search\/suggest/;
        if (!regExp.test(config.url)) {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0,
            });
        }
        return config;
    },
    error => {
        Toast.clear()
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    response => {
        Toast.clear()
        return response;
    },
    error => {
        Toast.clear()
        return Promise.reject(error);
    }
);

Vue.prototype.$axios = request;
