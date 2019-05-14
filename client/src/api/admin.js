import {get,post,deletes} from '../config/axios-client'


//管理员登录
export const login = data => post('/api/admin/login',data);

//获取所有用户信息
export const getAllUser = () => get('/api/admin/allUser');

//删除指定用户
export const deleteUser = id => deletes('/api/admin/deleteUser?id='+id);

//搜索用户
export const getSearchUser = val => get('/api/admin/searchUser?word='+val);

//更改密码
export const changePwd = data => post('/api/admin/changePwd',data);

//得到未回复的信息
export const getNoReplyMsg = () => get('/api/admin/noReplyMsg');

//得到已回复的信息
export const getRepliedMsg = () => get('/api/admin/repliedMsg');

//得到已回复的信息
export const reply = data => post('/api/admin/reply',data);

//得到订单
export const getOrders = state => get('/api/admin/orders?state='+state);

//得到订单
export const getAOrder = id => get('/api/admin/order?id='+id);

//修改订单
export const changeOrder = data => post('/api/admin/changeOrder',data);

//删除指定订单
export const deleteOrder = id => deletes('/api/admin/deleteOrder?id='+id);

//得到商品
export const getGoods = id => get('/api/admin/getGoodsByType?typeId='+id);

//得到类目
export const getTypes = () => get('/api/admin/getType');

//增加类目
export const addType = data => post('/api/admin/addType',data);

//删除类目
export const deleteType = id => deletes('/api/admin/deleteType?id='+id);

//得到商品信息
export const getGoodsInfo = id => get('/api/admin/getGoodsInfo?id='+id);

//增加商品
export const addGoods = data => post('/api/admin/addGoods',data);

//增加规格
export const addSpec = data => post('/api/admin/addSpec',data);

//删除规格
export const deleteSpec = data => deletes('/api/admin/deleteSpec',data);

//更新商品信息
export const updateGoods = data => post('/api/admin/updateGoods',data);

//删除指定商品
export const deleteGoods = id => deletes('/api/admin/deleteGoods?id='+id);

