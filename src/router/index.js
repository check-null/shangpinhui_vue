import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
// 先复制原push函数
let originPush = VueRouter.prototype.push;
// 跳转同一个页面会报错,所以重写push
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.cal1(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}

//配置路由
export default new VueRouter({
    //配置路由
    routes: [
        {
            path: "/home", component: () => import('@/pages/home'), meta: { show: true }
        },
        {
            path: "/search/:keyword?", component: () => import('@/pages/search'), name: 'search'
        },
        {
            path: "/login", component: () => import('@/pages/login'), meta: { show: false }
        },
        {
            path: "/register", component: () => import('@/pages/register'), meta: { show: false }
        },
        {
            path: "/detail/:skuid", component: () => import('@/pages/detail'), meta: { show: true }
        },
        {
            path: "/addCartSuccess", name: 'addcartsuccess', component: () => import('@/pages/addCartSuccess'), meta: { show: true }
        },

    ]
})