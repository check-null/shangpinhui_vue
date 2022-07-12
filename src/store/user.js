//登录与注册的模块
import {
    reqGetCode,
    reqUserRegister,
    reqUserLogin,
} from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";
const state = {
    code: "",
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
};
const actions = {
    async getCode({ commit }, phone) {
        //获取验证码的这个接口：把验证码返回，但是正常情况，后台把验证码发到用户手机上【省钱】
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    //登录业务
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        //服务器下发token，用户唯一标识符(uuid)
        //将来经常通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            //用户已经登录成功且获取到token
            commit("USERLOGIN", result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
