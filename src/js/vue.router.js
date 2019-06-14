import Vue from 'vue'
import Router from 'vue-router'
import * as cookies from '../js-package/app.cookie';
import { browserType } from '../js-package/app.brower'
import wx from 'weixin-js-sdk'
import axios from 'axios'
import { set_wx_sign } from './vue.wx'
import store from '../views/Store/index'
import { routes } from './vue.router.routes'

Vue.use(Router);

const router = new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {x: 0, y: to.meta.savedPosition || 0}
    }
  },
  routes: routes
});

//noKeepAlive 表示到底了，不会再从这个页面进入下一个页面，即不需要做缓存，离开的时候销毁掉
// （解决keepAlive不能实现的结果，一个页面跳转到另一个页面，缓存与否不一致出现后一页会调用前页的created,mounted等方法）


router.beforeEach((to, from, next) => {
  console.log(to.name) // 该处的打印和下面的定时器可能是解决很多安卓手机无法登陆重定向的原因，但是不太明白其中的原因
  // 从登陆页面回来，需要重新加载当前页面

  setTimeout(()=>{
    document.title = to.meta.title;
    let href = window.location.href;
    let isAuth = to.meta.isAuth;            // 是否需要登录

    let fromIndex = href.indexOf('&from=');       //先判断是否是微信分享过来的 - 需要进行路径的组装
    let fromIndex2 = href.indexOf('?from=');

    if (fromIndex > -1 || fromIndex2 > -1) {
      let index2 = href.indexOf('?');
      let newHref = '';

      if(fromIndex > -1){
        newHref = href.substring(0,fromIndex);
      }
      if(fromIndex2 > -1){
        newHref = href.substring(0,fromIndex2);
      }
      location.replace( newHref.substring(0,index2) + '#'+ newHref.substring(index2+1) ) ;

      /*let path = newHref.substring(index2+1);
       //alert(path)
       next({ path:'/Main/Index' })*/

    } else {
      // 判断页面是否需要登录，并且是否存在cookies，否则跳转到登录页面
      // sessionStorage 用于第一次进入项目，必须要去登陆页面进行登录（获取信息，并且延长登录过期时间）

      if( isAuth && !store.state.base.isAuth){   // 只能存store，不然刷新session存在，则不能获取到用户类型等数据
        store.commit('auth_message',true);
        sessionStorage.setItem('redirect',to.fullPath);
        if(to.query['fromUser']){
          sessionStorage.setItem('fromUser',to.query['fromUser'] );
        }
        next({ path: '/SubPage/SubLogin' });
        //query: { redirect: to.fullPath }
      }else{
        next();
      }
    }
  },0)

});

// 设置微信
router.afterEach((to)=>{
  // 判断是否已经隐藏了 - 不需要重复拉取验签信息
  let browser = browserType();
  //alert(browser)
  let web = window.location.href;
  let href = '';
  if(browser == 'ios'){
    href = web.split('#')[0];         // 专门用于ios的js验签
  }
  if(browser =='android'){
    web = web.split('#')[0]+ '#' + to.fullPath;
    href = encodeURIComponent(web)
  }

  set_wx_sign(href);
  wx.ready(()=>{
    wx.hideAllNonBaseMenuItem();
  })

});

/*router.beforeResolve((to,from,next)=>{
 console.log('beforeResolve')
 next()
 })*/

export default router

// 分享出来的路径
// http://wx.gsb01.com/sc/index.html?from=singlemessage#/Main/User
