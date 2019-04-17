import {getLocalItem} from '../util/util';
const state = {
  //后台管理
  adminToken:getLocalItem('adminToken')?getLocalItem('adminToken'):null,
  adminName:getLocalItem('adminName')?getLocalItem('adminName'):'',

  //客户商城
  clientName:getLocalItem('clientName')?getLocalItem('clientName'):'',
  clientToken:getLocalItem('clientToken')?getLocalItem('clientToken'):null,

  //购物车数量
  car:getLocalItem('car')?getLocalItem('car'):null,
}

export default state;
