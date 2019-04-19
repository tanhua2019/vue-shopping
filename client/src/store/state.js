const state = {
  //客户商城
  clientName:localStorage.getItem('clientName')?localStorage.getItem('clientName'):'',
  clientToken:localStorage.getItem('clientToken')?localStorage.getItem('clientToken'):null,
  //购物车
  car:localStorage.getItem('car')?localStorage.getItem('car'):null,
  //后台管理
  adminToken:localStorage.getItem('adminToken')?localStorage.getItem('adminToken'):null,
  adminName:localStorage.getItem('adminName')?localStorage.getItem('adminName'):'',
}
export default state;
