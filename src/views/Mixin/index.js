
import axios from 'axios'
import qs from 'qs'
import { PROP_REQUEST,HTTP_TEST,HTTP_SC,HTTP_WX } from '../../js/vue.config';
import { insert_flg } from '../../js-package/app.string'
import { _is_number_express ,_get_format_thousand ,_get_clear_decimal } from '../../js-package/app.number'

//************************************************* 自定义过滤器 ******************************************/
const filters = {
  filters:{
    str_name:value =>{
      return value + '123456'
    },
    str_money:value=>{
      if(value){
        return (value / 100).toFixed(2) ;
      } else{
        return '0.00'
      }
    },
    str_token:value=>{
      if(value){
        return (Number(value)).toFixed(4) ;
      } else{
        return '0.0000'
      }
    },

    str_money_format:(value)=>{
      if(value > 9999){
        return value / 10000 + '万'
      }
      if(value > 999){
        return value / 1000 + '千'
      }
      if(value > 99){
        return value / 100 + '百'
      }
      return value;
    },
      // 数据格式化 - 转化为千分位
    str_money_thousand:value=>{
      if(!_is_number_express(value)){
        return '0.00'
      }
      return _get_format_thousand(value)
    },
    // 数据格式化 - 转化为千分位,并且当大于10000时，去掉小数部分
    str_money_thousand_integer:value=>{
      if(!_is_number_express(value)){
        return '0.00'
      }

      return value > 9999 ?   _get_format_thousand(  value  ).split('.')[0] :  _get_format_thousand(value)
    },



    // 当数量超过多少时显示...
    str_number_large:value=>{
      return ( value > 99 ) ? '...' : value
    },



    str_grade :value =>{
      let str = ['非常差','差','一般','好','非常好'];
      if(value){
         return str[value-1]
      }else{
        return '无评论'
      }
    },
    //电话号码 138-1234-1234
    str_mobile :value =>{
      if(value){
        let str = value.substring(0,3) + '-' + value.substring(3) ;
        let str2 = str.substring(0,8) + '-' + str.substring(8);
        return str2
      }else{
        return ''
      }
    },

  }
};

//************************************************* 自定义指令 ******************************************/
const directives = {
  directives:{
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
};

//************************************************* 项目配置信息 ******************************************/
const configs = {

  data(){
    return {
      API : {
        // home
        IMGLIST: '/ad/getAd.do', //首页轮播图
        GOODINDEX:'/good/index.do', // 首页推荐商品
        GOODLIST: '/good/list.do', //商品列表 // 暂时没有用
        GOODINFO: '/good/goodInfo.do', //获取商品信息
        EVALUATIONLIST: '/comment/list.do', //获取商品评价
        SEARCH: '/good/search.do',    //搜索商品
        GOODCLICK:'/good/click.do ',  // 单击商品 - 获取访问量

        //address
        GETDEFAULTADDRESS: '/address/getDefaultAddress.do', //获取默认地址
        ADDRESSLIST: '/address/getAddressList.do', //获取地址列表
        DELETEADDRESS: '/address/delAddress.do', //删除地址
        CHANGEDEFAULTADDRESS: '/address/changeDefaultAddress.do', //改变默认地址
        ADDRESSDETAIL: '/address/getAddress.do', //获取地址详情
        AREALIST: '/address/getAreaList.do', //获取全国地址
        ADDADDRESS: '/address/addAddress.do', //添加地址
        UPDATEADDRESS: '/address/updateAddress.do', // 更新地址

        // order
        CREATEORDER: '/order/createOrder.do',  //创建订单
        GETORDERNUM: '/order/orderNum.do', //查询各类订单数量
        ORDERLIST: '/order/orderInfo.do', //查询订单列表
        ORDERDETAIL: '/order/detail.do', //订单详情
        ORDERCONFIRM:'order/confirm.do',  // 确认收货
        ORDERDETSIL: '/order/orderDet.do', //查询单个订单信息
        DETAILINFO: '/order/orderDetailInfo.do',  //查询订单中的商品
        CANCELORDER: '/order/cellOrder.do',       //取消订单
        EVALUATION: '/comment/add.do',            //添加评价
        GETEVALUATIONINFO: '/comment/getComment.do', //查看评价信息
        PAY: '/order/pay.do',   //支付接口
        GETDELIVERY:'/order/delivery.do', //  获取物流信息

        // 购物车
        GETSHOPCAR: '/car/getCar.do',     //获取购物车信息
        UPDATESHOPCAR: '/car/addCar.do',  //添加购物车
        CHECKSTOCK:'/order/checkStock.do', // //检查购物车数据是否超过库存

        //基础功能
        GETQRCODE:'/qrcode/get.do',       // 获取二维码
        GETBANKDETAIL:'/agency/bank.do',   //获取银行信息 { cardNo }
        GETFOLLOWER:'/agency/follower.do', // 获得下级代理
        GETRANDCODE:'/agency/randCode.do ', // 获得手机验证码
        INSERTDETAIL:'/agency/insertDetail.do',  // 更新会员信息
        GETDETAIL:'/agency/detail.do',  // 获取会员信息
        GETCUSTOMER:'/feed/getCustomer.do', // 获得客服电话
        GETMEMACTIVE:'/mem/active.do',  // 获得登录信息

        // 业绩中心
        GETACHIECMENTINFO:'/statistics/info.do', //用户的业绩
        GETACHIECMENTDETAIL:'/statistics/memPercent.do', //获得会员等级

        //钱包
        GETWALLETINFO:'/wallet/info.do',// 得到通证和钱
        GETWALLETTOKENHIS:'/wallet/tokenHis.do' ,       // 通证兑换记录
        GETWALLETAMOUNTHIS:'/wallet/jdHis.do',          // 积点兑换记录
        GETWALLETBBINFO:'/wallet/bbInfo.do',              //获得当前bb的兑换积点的兑换率
        INSERTWALLETCASH:'/wallet/cash.do',               //提现
        INSERTWALLETCHANGEBB:'/wallet/exchangeBB.do',     // 兑换bb 通证
        // 活动
        DIRECTNUMBER:'/team/directNumOrder.do' ,  // 得到排行榜数据
        GETAWARDLIST:'/wallet/winAward.do' ,  // 奖品清单
        GETBBORDER:'/wallet/bbOrder.do',        // 可兑换的商品
        PAYAGENCY:'/wallet/payAgency.do',      // 支付成为代理
        GETMYTEAM:'/team/myTeam.do' ,           // 我的现有团队
      },
    }
  },
};
//************************************************* 路由处理 ******************************************/

//noKeepAlive 表示到底了，不会再从这个页面进入下一个页面，即不需要做缓存，离开的时候销毁掉
// （解决keepAlive不能实现的结果，一个页面跳转到另一个页面，缓存与否不一致出现后一页会调用前页的created,mounted等方法）
const routes = {

  beforeRouteLeave(to,from,next){
    // 商品详情页会通过分享，所以返回键就直接退出项目了，需要在meta信息中设置 back ，回到哪个页面
    //debugger

    if(this.popup && this.popup.show){    // 由于子页面的该事件会后执行，所以目前只能通过在这里执行弹出框的显示和隐藏
      this.popup.show = false ;
      next(false)
    }else{
      let fromNum = from.meta.pageNum;
      let toNum = to.meta.pageNum;
      //debugger
      /*if( fromNum && toNum && fromNum > toNum ){
        this.$destroy()
      }*/
      let keepAliveToPath = from.meta.keepAliveToPath || [] ;
      let toName = to.name ;
      if(keepAliveToPath.indexOf(toName) == -1 ){

        this.$destroy()
      }
      next()
    }
  }
};
//************************************************* 数据请求方法 ******************************************/

const request = {
  methods:{
    $request({url ,type = 'POST' ,data ,responseType = 'json' ,headerContentType='application/x-www-form-urlencoded' , loading = false,interval=0 }){

      const baseURL = (PROP_REQUEST) ? HTTP_SC: HTTP_TEST;

      if(loading){
        this.$createLoading().show();
        interval = 300; // 如果需要加载动画，则延长返回时间，否则接口过快，出现页面闪烁
      }
      return new Promise((resolve,reject)=>{
        axios({
          url:`${url}`,
          baseURL:baseURL,
          data:data,
          transformRequest: [function (data) {
            data = qs.stringify(data);
            return data
          }],
          method:type,
          headers: {'Content-Type': headerContentType },
          timeout:10000
        }).then((reponse)=>{

          setTimeout(()=>{

            setTimeout(()=>{
              this.$createLoading().hide();
            },100);


            let data = reponse.data;
            if(data['code'] == '000'){
              resolve(data)
            }else if(data['code'] == '004'){
              let router = window.location.href.split('#')[1];
              sessionStorage.setItem('redirect',router );
              let fromUser = this.$https.query(window.location.href)['fromUser'] || '';
              sessionStorage.setItem('fromUser',fromUser );

              this.$router.push({ path: '/SubPage/SubLogin' });
              //this.$router.push({ path: '/SubPage/SubLogin', query: { redirect: router }});
              ///this.init_login(); // 接口调用失败后处理
            }else{
              reject(data);
            }
          },interval)

        },(data)=>{
          this.$toast('请求失败，请检查网络');

          setTimeout(()=>{
            this.$createLoading().hide();
          },100);

        }).catch( (error)=> {

          setTimeout(()=>{
            this.$createLoading().hide();
          },100);

          console.error(error)
        })
      })
    },

  }
};

export  {
  filters,
  directives,
  routes,
  configs,
  request
}
