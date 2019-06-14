
import wx from 'weixin-js-sdk'
import axios from 'axios'
import * as configs from './vue.config';

// 获取验签信息
function get_wx_sign(href){
  return new Promise((resolve,reject)=>{
    axios({
      url:configs['HTTP_REQUEST_WX'] + '/common/js.do?url=' + href
    }).then((reponse)=>{
      let data = reponse.data;
      resolve(data)
    },()=>{
      reject()
    })
  })
}
// 设置微信js接口
export  function set_wx_sign(href){
  get_wx_sign(href).then((message)=>{
    wx.config({
      debug: false,
      appId: message['appId'],
      timestamp: message['timestamp'],
      nonceStr:message['nonceStr'] ,
      signature:message['signature'],
      jsApiList: ['hideAllNonBaseMenuItem','previewImage','uploadImage','chooseImage','getLocalImgData','onMenuShareAppMessage','onMenuShareTimeline','showMenuItems','chooseWXPay']
    });
  })
}
// 设置分享
export function set_wx_share({title,desc,link,imgUrl}){
  return new Promise((resolve,reject)=>{
      wx.ready(()=>{
        wx.showMenuItems({
          menuList: ['menuItem:share:appMessage','menuItem:share:timeline']
        });
        wx.onMenuShareAppMessage({
          title: title,
          desc: desc,
          link:  link, //window.location.href.split('#')[0]+'?'+window.location.href.split('#')[1],
          imgUrl: imgUrl,
          success:  () =>{
            resolve('message')
          },
          cancel:() =>{
            reject('message')
          }
        });
        wx.onMenuShareTimeline({
          title:title,
          desc: desc,
          link:  link ,//|| href.split('#')[0]+'?' + href.split('#')[1],
          imgUrl: imgUrl,
          success:  () =>{
            resolve('line')
          },
          cancel:() =>{
            reject('line')
          }
        });
      })
  })
}
// 隐藏全部的按钮
export function hide_all_menus(){
  wx.hideAllNonBaseMenuItem();
}



