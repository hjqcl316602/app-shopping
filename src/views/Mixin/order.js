/**
 * Created by 41587 on 2018/7/23.
 */

import wx from 'weixin-js-sdk'



export default {
  data(){
    return {
      tab:{
        active:'',
        columns:['','0','1','2','3']
      },
      order:{
        pageSize:10,
        pageNum:1,
        loading:false,
        push:{
          loading:false,
          finished:true
        },
      },


      comment:{
        pagesize:20,
        pagenum:1,
        total:0,
        loading:false,
        data:[]
      },
      comment_push:{
        loading:false,
        finished:true
      },
    }
  },
  computed:{
    tabActive(){
      return this.$store.state.order.tab.active
    }
  },
  methods:{
    // 获得订单列表
    $get_order_list(more = false,loading = false){
      if(this.order.loading) return;
      this.order.loading = true;
      return new Promise((resovle,reject)=>{
        if(more){
          this.order.pageNum++ ;
        }else{
          this.order.pageNum = 1 ;
          this.order.push.finished = true;
        }
        this.$request({
          url:this.API.ORDERLIST,
          data:{
            status:this.tab.columns[this.tabActive],
            pageSize:this.order.pageSize,
            pageNum:this.order.pageNum,
          },
          loading:loading
        }).then((res)=>{
          let list = res.data['orderInfo'];
          this.order.loading = false;
          this.order.push.loading = false;

          this.$store.commit('order_list',{ list,more })

          if( list.length < this.order.pageSize){  // 判断得到的数据长度不够页长，说明没有数据可加载
            this.order.push.finished = true;
          }else{
            this.order.push.finished = false;
          }
          resovle()
        },()=>{
          this.order.pageNum--;
          this.order.loading = false;
          this.order.push.loading = false;
          this.$toast('获取订单列表失败！');
          reject('fail')
        })
      })
    },

    $get_order_detail(params){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.ORDERDETAIL,
          data:{ businessOrderNum:params.businessOrderNum,sn:params.sn },
          loading:true
        }).then((reponse)=>{
          resovle(reponse)
        },(error)=>{
          reject(error)
        })
      })
    },

    // 取消订单 -
    $cancel_order(sn){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.CANCELORDER,
          data:{ sn },
          loading:true
        }).then((reponse)=>{
          this.$get_order_list(false,false);
          resovle(reponse)
        },(error)=>{
          reject(error)
        })
      })
    },
    // 确认收货
    $confirm_order(sn,businessOrderNum){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.ORDERCONFIRM,
          data:{ sn,businessOrderNum },
          loading:true
        }).then((reponse)=>{
          this.$get_order_list(false,false);
          resovle(reponse)
        },(error)=>{
          reject(error)
        })
      })
    },

    // 添加评价
    $insert_comment(params){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.EVALUATION,
          data:{ detail:JSON.stringify(params) },
          loading:true
        }).then((reponse)=>{
          this.$get_order_list(false,false);
          resovle(reponse)
        },(error)=>{
          reject(error)
        })
      })
    },

    // 获取商品评价
    $get_comment_list(more = false,loading = false){
      if(this.comment.loading) return;
      this.comment.loading = true;
      return new Promise((resovle,reject)=>{
        if(more){
          this.comment.pagenum++ ;
        }else{
          this.comment.pagenum = 1 ;
          this.comment.data = [];
          this.comment_push.finished = true;
        }
        this.$request({
          url:this.API.EVALUATIONLIST,
          data:{
            goodId:this.good.id,
            pageSize:this.comment.pagesize,
            pageNum:this.comment.pagenum,
          },
          loading:loading
        }).then((res)=>{

          let list = res.data['goodComment']

          this.comment.data = this.comment.data.concat(list);
          console.log(this.comment.data)
          this.comment.loading = false;
          this.comment_push.loading = false;


          if( list.length < this.comment.pagesize){  // 判断得到的数据长度不够页长，说明没有数据可加载
            this.comment_push.finished = true;
          }else{
            this.comment_push.finished = false;
          }
          resovle()
        },()=>{

          this.comment.loading = false;
          this.comment_push.loading = false;
        })
      })
    },

    // 创建订单
    $create_order(params){
      return new Promise((resolve,reject)=>{
        this.$request({
          url:this.API.CREATEORDER,
          data:{
            addressId:params.addressId,
            orderDetail:JSON.stringify(params.orderDetail)
          },
          loading:true
        }).then((reponse)=>{
          resolve(reponse.data)
        },(error)=>{
          reject(error)
        })
      })
    },

    // 支付延签信息
    $order_pay(sn){

      return new Promise((resolve,reject)=>{
        /*this.$set_wx_api(['chooseWXPay']).then(()=>{

        },()=>{
          this.$toast('支付验签失败！');
        });*/
        this.$request({
          url:this.API.PAY,
          data:{
            sn:sn
          },
          loading:true
        }).then((reponse)=>{
          let dataInfo = reponse.data;

          wx.chooseWXPay({
            appId:dataInfo.appId,
            timestamp: dataInfo.timeStamp,          // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: dataInfo.nonceStr,           // 支付签名随机串，不长于 32 位
            package: dataInfo.package,            // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: dataInfo.signType,         // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: dataInfo.paySign,          // 支付签名
            success:  (res)=> {         // 支付成功后的回调函数
              this.$toast('支付成功！');
              resolve('success')
            },
            cancel:  (res)=> {         // 支付成功后的回调函数
              this.$toast('取消支付！');
              resolve('cancel')
            },
          });
        },()=>{
          this.$toast('获取支付信息失败！');
          reject()
        })

      })

    },
    // 获取物流信息
    $get_order_delivery(businessOrderNum){
      return new Promise((resolve,reject)=>{
        this.$request({
          url:this.API.GETDELIVERY,
          data:{
            businessOrderNum:businessOrderNum
          },
          loading:true
        }).then((reponse)=>{
          resolve(reponse)
        },(error)=>{
          this.$toast('获取物流信息失败！');
          reject(error)
        })
      })
    },
    //用户信息页面 -  获取订单数量信息
    $get_order_num(){
      return new Promise((resolve,reject)=>{
        this.$request({
          url:this.API.GETORDERNUM
        }).then((res)=>{
          let data = res.data;
          let orderMessage = {} ;
          orderMessage.payNum = data.unPayNum;
          orderMessage.deliveryNum = data.unShippedNum;
          orderMessage.collectNum = data.shippedNum;
          orderMessage.evaluationNum = data.unEvaluatedNum;
          this.$store.commit('order_num',orderMessage);
          resolve(res)
        },(error)=>{
          this.$toast('获取订单数量信息失败！');
          reject(error)
        })
      })

    },
  },
  watch:{

  }
}
