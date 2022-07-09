import request from './request';
import mockAxios from './mockAxios';

export const reqCategoryList = () => request({
    url: '/product/getBaseCategoryList',
    method: 'get'
});

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockAxios.get("/banner");

//获取floor数据
export const reqFloorList = () => mockAxios.get("/floor");

export const reqGetSearchInfo = (params = {}) => request({ url: '/list', method: 'post', data: params });

//获取产品详情信息的接口  URL: /api/item/{ skuId }  请求方式：get   
export const reqGoodsInfo = (skuId) => request({ url: `/item/${skuId}`, method: 'get' });
//将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });
//购物车list
export const reqCartList = () => request({ url: '/cart/cartList', method: 'get' });
//删除购物车
export const reqDeleteCartById = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
//修改商品选中状态
export const reqUpdateCheckedByid = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
//获取验证码
export const reqGetCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'get' });
//注册
export const reqUserRegister = (data) => request({ url: '/user/passport/register', data, method: 'post' });
//登录
export const reqUserLogin = (data) => request({ url: '/user/passport/login', data, method: 'post' });