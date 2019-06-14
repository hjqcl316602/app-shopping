/**
 * Created by huangjunquan on 2018/4/24.
 */

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import mutations from './vuex.mutations.js'
import state from './vuex.state.js'
export default new Vuex.Store({ state, mutations })
