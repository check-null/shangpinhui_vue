import { reqCartList } from '@/api';

const state = {};
const mutations = {};
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList();
        console.log("🚀 ~ file: shopCart.js ~ line 8 ~ getCartList ~ result", result);
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}