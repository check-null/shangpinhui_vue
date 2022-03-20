// home
import { reqCategoryList } from "@/api";
// 数据存储的地方
const state = {
    categoryList: []
};
// 修改state唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    }

};
// action:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async categoryList({ commit }) {
        //reqgetCategoryList返回的是一个Promise对象
        //需要用await接受成功返回的结果，await必须要结合async一起使用（CP）
        let result = await reqCategoryList();
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
};
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}