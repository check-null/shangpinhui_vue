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