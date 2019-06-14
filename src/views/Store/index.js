/**
 * Created by 41587 on 2018/7/22.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import good from './good';
import car from './car';
import order from './order';
import address from './address';
import base from './base';
import achievement from './achievement';
import activity from './activity';

export default new Vuex.Store({
  modules:{ good,car,order,address,base ,achievement , activity },
  strict:false
})
