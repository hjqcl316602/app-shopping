// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './js/vue.router'
import store from './views/Store'

/************************************************ 初始化方法  *******************************************************/
import  './js/vue.prototype'
import  './js/vue.plugin'
import  './js/vue.mixin.data'
import  './js/vue.mixin.methods'
import  './js/vue.mixin.filters'
import  './js/vue.mixin.route'

/************************************************ vue 自定义组件 *******************************************************/
import *  as  components  from './components'
Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
});
/************************************************ vue 自定义组件 *******************************************************/
import *  as  viewComponents  from './views/components'
Object.keys(viewComponents).forEach(key => {
  Vue.component(key, viewComponents[key])
});

/************************************************ mint-ui *******************************************************/
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

/************************************************ van-ui *******************************************************/
//import 'vant/lib/vant-css/index.min.css';// 通过在index.html 中 引用的方式
/*
import { Tab, Tabs ,Rate , Field , Picker , Popup , Toast , Switch , Dialog , List , PullRefresh  ,CellSwipe  ,NumberKeyboard   } from 'vant';
Vue.use(Tab).use(Tabs).use(Rate).use(Field).use(Picker).use(Popup).use(Toast).use(Switch).use(List).use(PullRefresh).use(CellSwipe).use(NumberKeyboard);
*/

/************************************************ css *******************************************************/
import './css/merge.css'

import App from './App'

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
