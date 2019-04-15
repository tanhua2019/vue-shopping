// import * as types from './mutation-types';
import { setLocalItem } from '../util/util';
export const SET_ADMIN_TOKEN = 'SET_ADMIN_TOKEN';
export const SET_ADMIN_NAME = 'SET_ADMIN_NAME';
export const ADMIN_LOGOUT = 'ADMIN_LOGOUT';

export const SET_CLIENT_TOKEN = 'SET_CLIENT_TOKEN';
export const SET_CLIENT_NAME = 'SET_CLIENT_NAME';
export const CLIENT_LOGOUT = 'CLIENT_LOGOUT';
export const CAR = 'CAR';
export const DELETE = 'DELETE';
export const SHOWCAR = 'SHOWCAR';

const mutations = {
  //管理员
  [SET_ADMIN_TOKEN]: (state, adminToken) => {
    state.adminToken = adminToken;
    setLocalItem('adminToken', adminToken);
  },
  [ADMIN_LOGOUT]: (state) => {
    state.adminToken = null;
    state.adminName = '';
    localStorage.removeItem('adminToken', 'adminName');
  },
  [SET_ADMIN_NAME]: (state, name) => {
    state.adminName = name;
    setLocalItem('adminName', name);
  },

  //客户
  [SET_CLIENT_TOKEN]: (state, clientToken) => {
    state.clientToken = clientToken;
    setLocalItem('clientToken', clientToken);
  },
  [SET_CLIENT_NAME]: (state, name) => {
    state.clientName = name;
    setLocalItem('clientName', name);
  },
  [CLIENT_LOGOUT]: (state) => {
    state.clientToken = null;
    state.clientName = '';
    state.car = null;
    localStorage.removeItem('clientToken', 'clientName','car');
  },
  [SHOWCAR]: (state,car) => {
    state.car = car;
    setLocalItem('car', car);
  },
  [CAR]: (state,car) => {
    state.car++;
    setLocalItem('car', car);
  },
  [DELETE]: (state,car) => {
    state.car--;
    setLocalItem('car', car);
  },
}

export default mutations;
