import Vuex from 'vuex';
import Vue from 'vue';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
	  actions,
	  getters,
	  state,
	  mutations,
});
