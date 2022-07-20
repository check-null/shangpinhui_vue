import Vue from 'vue'
import App from './App.vue'

import Carsousel from "@/components/carsousel";
// 三级联动组件---全局组件
import TypeNav from "@/components/typeNav";
import router from "@/router";
import store from '@/store';
import * as API from '@/api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入swiper样式
import "swiper/css/swiper.css";

import '@/mock/mockServe'
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carsousel.name, Carsousel);

Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store,
}).$mount('#app')
