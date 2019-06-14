/**
 * Created by 41587 on 2018/7/17.
 */
import axios from 'axios'
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
// import router from '@/router'

const service = axios.create({
  timeout: 10000 // 请求时间
})

service.interceptors.request.use(config => {
  // config.url = 'http://192.168.1.21:8098/sc' + config.url + '.do';
  config.url = '/sc' + config.url + '.do';
  config.method = 'post';
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  });
  console.log(config)
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    Indicator.close();
    const res = response.data
    if (res.code !== '000') {
      if (res.code === '001') {
        Toast({
          message: '请求失败',
          iconClass: 'iconfont icon-guanbi2',
          duration: 2000
        });
      } else if (res.code === '004') {
        // router.push('/home')
        location.href = 'http://wx.mipaish.com/sc/wxAuth/redirect.do?returnUrl=' + location.href;
      } else if (res.code === '500') {
        Toast({
          message: res.msg,
          iconClass: 'iconfont icon-guanbi2',
          duration: 2000
        });
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  }, error => {
    Indicator.close();
    Toast({
      message: '网络错误',
      iconClass: 'iconfont icon-guanbi2',
      duration: 1000
    });
    return Promise.reject(error)
  })
// 如通过xmlhttprequest 状态码标识 逻辑可写在error中

export default service
