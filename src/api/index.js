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
//获取用户信息【需要带着用户的token向服务器要用户信息】
export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo', method: 'get' });
//退出登录
export const reqLogout = () => request({ url: '/user/passport/logout', method: 'get' });
//获取用户地址信息
export const reqAddressInfo = () => request({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });
//获取商品清单
export const reqOrderInfo = () => request({ url: '/order/auth/trade', method: 'get' });
//提交订单的接口
export const reqSubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' });
//获取支付信息
export const reqPayInfo = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });
//获取支付订单状态
export const reqPayStatus = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });
//获取个人中心的数据
export const reqMyOrderList = (page, limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'get' });