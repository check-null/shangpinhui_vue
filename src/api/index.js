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
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })