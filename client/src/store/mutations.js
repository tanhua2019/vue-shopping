const mutations = {
  //用户
  setclientToken(state, clientToken) {
    state.clientToken = clientToken;
    localStorage.setItem('clientToken', clientToken);
  },
  setclientName(state, name) {
    state.clientName = name;
    localStorage.setItem('clientName', name);
  },
  clientLogout(state) {
    state.clientToken = null;
    state.clientName = '';
    state.car = null;
    localStorage.removeItem('clientToken', 'clientName', 'car');
  },
  //购物车
  showCar(state, car) {
    state.car = car;
    localStorage.setItem('car', car);
  },
  addCar(state, car) {
    state.car++;
    localStorage.setItem('car', car);
  },
  deleteCar(state, car) {
    state.car--;
    localStorage.setItem('car', car);
  },
  //管理员
  setadminToken(state, adminToken) {
    state.adminToken = adminToken;
    localStorage.setItem('adminToken', adminToken);
  },
  adminLogout(state) {
    state.adminToken = null;
    state.adminName = '';
    localStorage.removeItem('adminToken', 'adminName');
  },
  setadminName(state, name) {
    state.adminName = name;
    localStorage.setItem('adminName', name);
  },
}
export default mutations;
