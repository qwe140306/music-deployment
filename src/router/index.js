import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import {Toast} from "vant";


/*//解决编程式路由往同一地址跳转时会报错的情况  重写路由 push 和 replace 方法
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}*/


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: () => import('@/views/Layout'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/Home'),
            },
            {
                path: '/podcast',
                name: 'Podcast',
                component: () => import('@/views/Podcast'),
            },
            {
                path: '/community',
                name: 'Community',
                component: () => import('@/views/Community'),
            },
            {
                path: '/follow',
                name: 'Follow',
                component: () => import('@/views/Follow'),
                meta: {
                    isLogin: true,
                },
            },
            {
                path: '/my',
                name: 'My',
                component: () => import('@/views/My'),
                meta: {
                    isLogin: true,
                },
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login'),
    },
    {
        name: 'SongRCMD',
        path: '/songrcmd',
        component: () => import('@/views/songrcmd'),
        meta: {
            isLogin: true
        }
    },
    {
        name: 'PlayMusic',
        path: '/playmusic/:id',
        component: () => import('@/views/playMusic'),
        props: true
    },
    {
        name: 'Search',
        path: '/search',
        component: () => import('@/views/Search'),
    },
    {
        name: 'PlayListDetail',
        path: '/playlist/detail',
        component: () => import('@/components/playListDetail'),
    }
];

const router = new VueRouter({
    routes,
});


router.beforeEach((to, from, next) => {

    if (to.meta.isLogin) {
        if (!store.state.cookie) {
            return router.push({
                name: 'Login',
                params: {
                    redirect: to.path,
                },
            });
        }
    }
    if (to.path === '/login') {
        if (store.state.cookie) {
            Toast({
                message: '已登录!',
                position: 'top',
            })
            return next(false)
        }
        return next()
    }
    // console.log(to, from);
    next();
});

export default router;
