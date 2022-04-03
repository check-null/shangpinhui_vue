import Vue from 'vue'
import App from './App.vue'

// 三级联动组件---全局组件
import TypeNav from "@/components/typeNav";
import router from "@/router";
import store from '@/store';

import '@/mock/mockServe'
Vue.component(TypeNav.name, TypeNav);

Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
