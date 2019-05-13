import {get,post,deletes} from '../config/axios-client'


//用户登录
export const login = data => post('/api/user/login', data);
//用户注册
export const signup = data => post('/api/user/signup', data);
//得到类目
export const getTypes = () => get('/api/admin/getType');
//获得不同类目的商品
export const getGoodsList = typeId => get('/api/mall/getGoodsByType?typeId='+typeId);
//获得商品详情页信息
export const getGoodsInfo = id => get('/api/mall/getGoodsInfo?id='+id);
//获得商品详情页问答区数据
export const getGoodsMsg = id => get('/api/mall/getGoodsMsg?id='+id);
//发送商品msg
export const askGoodsMsg = data => post('/api/mall/askGoodsMsg',data);
//加入购物车
export const addOrder = data => post('/api/mall/addOrder',data);
//获得用户订单列表
export const getOrderByState = (state,token) => get('/api/mall/getOrderByState?state='+state+'&token='+token);
//删除订单
export const deleteOrder = id => deletes('/api/mall/deleteOrder?id='+id);
//确认收货
export const confirmReceive = id => get('/api/mall/confirmReceive?id='+id);
//确认付款
export const pay = id => get('/api/mall/pay?id='+id);
//获得用户资料
export const getUserData = token => get('/api/user/data?token='+token);
//更改用户资料
export const updateUserData = data => post('/api/user/updateUserData',data);
//更改用户密码
export const updatePwd = data => post('/api/user/updatePwd',data);
//结算购物车
export const settleAccounts = data => post('/api/mall/settleAccounts',data);
//发送评价
export const sendComment = data => post('/api/mall/sendComment',data);
//获得商品评论
export const getComment = goodsId => get('/api/mall/getGoodsComment?goodsId='+goodsId);
//关键词搜索商品
export const searchGoods = (keyword='') => get('/api/mall/searchGoods?keyword='+keyword);
