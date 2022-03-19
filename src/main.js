import Vue from 'vue'
import App from './App.vue'

// 三级联动组件---全局组件
import TypeNav from "@/pages/home/typeNav";
Vue.component(TypeNav.name, TypeNav);

import { reqCategoryList } from "@/api";
reqCategoryList();

Vue.config.productionTip = false;
import router from "@/router";
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
