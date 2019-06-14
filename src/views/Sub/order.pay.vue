<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import wx from 'weixin-js-sdk'
  export default {
    name: "",
    components: {},
    beforeRouteEnter (to, from, next) {
      next(vm=> {
      })
    },
    beforeRouteLeave(to, from, next){
      next();
    },
    beforeRouteUpdate (to, from, next) {
      next();
    },
    beforeCreate(){
    },
    created(){
    },
    beforeMount(){
    },
    mounted(){
      //this.get_order_detail();
    },
    activated(){
    },
    props: [],
    data(){
      return {
        order:{
          sn:'',
          amount:''
        }
      }
    },
    methods: {
      get_order_detail(){
        this.order.sn = this.$route.query.orderSn;
        this.order.amount = this.$route.query.payAmount;
      },
      order_pay(){
        this.$router.push({ name : 'SubmitStatus',query:{ status:'success',type:'pay'}})

        this.$order_pay().then((data)=>{
          wx.chooseWXPay({
            appId:data.appId,
            timestamp: data.timeStamp,          // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: data.nonceStr,           // 支付签名随机串，不长于 32 位
            package: data.package,            // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: data.signType,         // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: data.paySign,          // 支付签名
            success:  (res)=> {         // 支付成功后的回调函数
              this.$router.push({ name : 'SubmitStatus'})
            }
          });
        },()=>{

        });
      },
    },
    watch: {/*'': {handler(val, olval){}, deep: true} */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-order-pay">
    <div class="com-padding com-text--center com-text--light com-text--lg">
      请在有效时间范围内付款，否则订单将会被回置
    </div>
    <div class="com-background com-flex com-content--center com-items--center com-border--ud">
      <div class="" style="padding: 40px 0 ;">
        <p class="com-text com-text--xl-xxx com-text--center">￥{{ order.amount  }}</p>
        <!--<p class="com-text com-text&#45;&#45;lg com-text&#45;&#45;theme com-margin&#45;&#45;tp com-text&#45;&#45;center">00:02:36</p>-->
      </div>
    </div>

    <!-- <div class="com-background com-border&#45;&#45;ud com-margin&#45;&#45;tp">
         <div class="com-text&#45;&#45;lg com-text&#45;&#45;gray com-padding com-border&#45;&#45;bm">支付方式</div>
         <div class="com-flex vi-row&#45;&#45;lg com-content&#45;&#45;between com-padding com-items&#45;&#45;center">
             <span class="com-text com-text&#45;&#45;lg">微信支付</span>
           <span class="com-text iconfont icon-gouxuan com-text&#45;&#45;theme com-text&#45;&#45;xl"></span>
         </div>
     </div>-->

    <div class="vi-btn__submit vi-btn--theme com-margin__lg--tp"  @click="order_pay">确定支付</div>
  </div>
</template>
<style scoped></style>
