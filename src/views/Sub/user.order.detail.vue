<script type="text/ecmascript-6">
  import address from '../Mixin/address'
  import car from '../Mixin/car'
  import order from '../Mixin/order'
  import wx from 'weixin-js-sdk'
  export default {
    name: "userOrderDetail",
    mixins:[address,car,order],
    components:{   },
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

      this.$get_address_list(true);
      this.init_page();
    },
    mounted(){

    },
    activated(){

    },
    computed:{
      selectedAddress(){
        let address = this.$store.state.address.address ;
        let bool = address.some((item)=>{ return item['selected'] });
        if(bool){
          return address.filter((item)=>{ return item['selected']   }) ;
        }else {
          return address.filter((item)=> {
            return item['default'] == 1
          });
        }
      },
      carList(){
        return this.$store.state.car.cars
      },
      //总金额
      totalAmount(){
        let money = 0;
        this.order.detail.length > 0 && this.order.detail.forEach((item,i)=>{
          money += item['num'] * item['originPrice'];
        });
        return money
      }
    },
    data(){
      return {
        order:{
          type:'',
          id:'',
          sn:'',
          businessOrderNum:'',
          detail:{}
        },
        order_id:'',
        good_stock:{
          show:false,
          options:[]
        }

      }
    },
    methods: {

      init_page(){
        this.order.sn = this.$route.query['sn'];
        this.order.businessOrderNum = this.$route.query['businessOrderNum'] || '0'; // 从支付取消过来的时候，没有商户id，需要初始化一个默认值
        this.$get_order_detail({sn:this.order.sn,businessOrderNum:this.order.businessOrderNum}).then((response)=>{
          this.order.detail = response.data
        },()=>{
          this.$toast('获取订单详情失败！')
        })
      },
      // 支付
      order_pay(sn){
        this.$order_pay(sn).then((message)=>{
          if(message == 'success'){
            this.$get_order_list(false,false);
            this.$router.replace({ name :'UserOrderType',query:{ sn :sn ,type:'delivery'}});
            //this.$router.push({ name :'SubmitStatus',query:{ type :'pay',status:'success',back:1,time:3}})
          }
          //this.$router.push({ name :'SubmitStatus',query:{ type :'pay',status:'success',back:1,time:3}})
        })
      },
      // 操作按钮
      order_submit(type){

        if(type == 'pay'){
          this.order_pay(this.order.sn)
        }else if( type == 'eval'){
          this.$router.push({name:'UserOrderEval',query:{ sn:this.order['sn'],businessOrderNum :this.order['businessOrderNum'] ,come:'detail' } })
        }else if(type == 'confirm'){

          this.$createConfirm({
            message:'请收到商品后再确认收货？',
            onOk:_=>{
              this.$confirm_order(this.order['sn'],this.order['businessOrderNum']).then(()=>{
                this.init_page();
                this.$toast('收货成功!');
              },()=>{
                this.$toast('收货失败!')
              })
            }
          }).show();
        }
      },
      Jump_to_detail(good){
        this.$router.push({ name :'OrderDetail',query:{ goodid:good['goodId'] }})
      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true} */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-user-order-detail vi-footer__content">

    <template >
      <!--<div class="com-background com-padding&#45;&#45;ad com-margin&#45;&#45;bm com-text__height&#45;&#45;xl com-text&#45;&#45;lg com-text&#45;&#45;theme" :class="{'com-text&#45;&#45;dark': order.detail.orderStatusStr == '已完成'}">
        {{ order.detail.orderStatusStr }}
      </div>-->
      <div style="height:100px" class="vi-background-gradient com-padding__lg--ad com-flex com-content--between com-items--center">
        <div class="com-text--lg com-text--bold com-text--white">{{ order.detail.orderStatusStr }}</div>
        <div class="vi-user-order-label">
          <div class="vi-user-order-label--inner">
            <div class="vi-user-order-icon vi-icon vi-icon__order-status "
            :class="{
            'vi-icon__fk':order.detail.orderStatusStr == '待付款',
            'vi-icon__fh':order.detail.orderStatusStr == '待发货',
            'vi-icon__sh':order.detail.orderStatusStr == '待收货',
            'vi-icon__pj':order.detail.orderStatusStr == '待评价',
            'vi-icon__ok':order.detail.orderStatusStr == '已完成',
            }"
            ></div>
          </div>
        </div>
      </div>
      <div class="com-background com-padding com-margin--bm   " v-if="order.detail.deliveryList && order.detail.deliveryList.length > 0">
        <div  v-for="(delivery,de) in order.detail.deliveryList" class="com-text--lg com-text__height--md"> {{ delivery['logisticsType'] }}快递  {{ delivery['logisticsNo'] }} </div>
      </div>

      <div class="  vi-order__address com-background  com-padding__lg com-margin--bm">
        <div class="com-flex com-content--between com-items--center">
          <div class="com-text com-text--bold">送货地址</div>
        </div>
        <div class="com-padding--tp  " v-if="selectedAddress.length > 0 ">
          <div class="com-flex com-content--between">
            <span class="com-text--light">{{ order.detail.name }}</span><span class="com-text--light">{{ order.detail.mobile}}</span>
          </div>
          <div class="com-margin--tp    com-text--light">{{ order.detail.areaName + order.detail.address }}</div>
        </div>
      </div>

      <template>
        <div class="com-margin--tp  com-background com-padding__lg ">
          <div class="   com-text  com-text--bold ">商品列表</div>
          <div class="vi-orders">
            <div class="item com-background" v-for="(good,i) in order.detail.detailList" @click="Jump_to_detail(good)">
              <div class="com-padding--ud ">
                <div class=" com-flex com-items--start">
                  <div class="vi-img__box vi-img--order ">
                    <img :src="good.pic" alt="">
                    <img src="../../img/icon-error.png" class="vi-img--error " alt="">
                  </div>
                  <div class="com-flex__col--ao com-padding--ad">
                    <p class="com-text--bold com-text__height--md com-text__visible--two">{{ good.goodName}}</p>
                    <p class="com-text--bold com-text__height--md">￥{{ good.price | str_money }}</p>
                    <p class="com-text--sm com-text--light com-text__height--sm" v-for="(specs,indexs) in good['specsName'].split(',')">{{  specs }}</p>
                  </div>
                  <div class="com-text" >
                    x {{ good.num }}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </template>
      <template>
        <div class="com-padding--ud com-padding__lg--ad com-background com-margin--tp ">
          <div class="com-flex com-content--between com-text com-text__height--md com-text--light"><span>商品总价</span><span>￥{{ order.detail.totalAmount | str_money}}</span> </div>
          <div class="com-flex com-content--between com-text com-text__height--md com-text--light"><span>优惠金额</span><span>￥0.00</span> </div>
          <div class="com-flex com-content--between com-text com-text__height--md com-text--light"><span>运费</span><span>￥0.00</span> </div>
          <div class="com-flex com-content--between com-text com-text__height--md com-text--light"><span>运费优惠</span><span>￥0.00</span> </div>
          <div class="com-flex com-content--between com-text com-text__height--md com-text--light"><span>订单总价</span><span>￥{{ order.detail.payAmount | str_money }}</span> </div>
          <div class="com-flex com-content--between com-text com-text__height--md com-text--light"><span>实付</span><span >￥{{ order.detail.payAmount | str_money}}</span> </div>
        </div>

      </template>

      <template>
        <div class="com-margin--tp  com-background com-padding__lg">
          <div class=" com-text   com-text--bold ">其他信息</div>
          <div class="com-padding--tp">
            <div class="com-text com-text--light com-text__height">订单号：{{ order.detail.sn}}</div>
            <div class="com-text com-text--light com-text__height">下单日期：{{ order.detail.createTime}}</div>
          </div>
        </div>
      </template>


      <div class="vi-footer ">
        <div v-if="order.detail.orderStatusStr == '待付款'" class="com-background vi-row--lg com-flex com-content--between com-items--center " >
          <span class="com-padding__lg--lt com-flex  com-items--center "><span>实际付款：</span><span class="com-text--theme com-text--bold com-text--xl">￥{{ order.detail.payAmount | str_money }}</span></span>
          <div class="com-flex__col--8 vi-btn__submit vi-btn--theme com-text--bold"  @click="order_submit('pay')">付款</div>
        </div>
        <div v-if="order.detail.orderStatusStr == '待评价'"  class="vi-btn__submit vi-btn--theme com-text--bold" @click="order_submit('eval')">去评价</div>
        <div v-if="order.detail.orderStatusStr == '待收货'"  class="vi-btn__submit vi-btn--theme com-text--bold" @click="order_submit('confirm')">确认收货</div>
      </div>
    </template>


    <van-popup v-model="good_stock.show">
      <div class="my-dialog">
        <div class="my-dialog__header"  >库存不足提醒</div>
        <div class="my-dialog__content">
          <div class="my-dialog__message my-dialog__message--has-title"  >
            <div class="vi-table">
              <div class="vi-table--tr"><div class="vi-table--th">商品</div><div class="vi-table--th">规格</div><div class="vi-table--th">剩余</div></div>
              <div class="vi-table--tr" v-for="(item,index) in good_stock.options">
                <div class="vi-table--td">{{ item['goodName'] }}</div>
                <div class="vi-table--td">{{ item['specsName']}}</div>
                <div class="vi-table--td">{{ item['stock']}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class=" my-dialog__footer my-dialog__footer--buttons ">
          <button class="my-button my-button--default my-button--large my-dialog__confirm " @click="jump_back()"><!---->
          <span class="my-button__text">
            返回修改
          </span>
          </button>
        </div>
      </div>
    </van-popup>

  </div>


</template>
<style scoped>
  .van-popup{ background-color: transparent }
  .my-dialog{ width: 80vw }
  .vi-table { display: table;border-collapse: collapse;  border-spacing: 0; width: 100% }
  .vi-table--tr { display: table-row; }
  .vi-table--td { display: table-cell; text-align: center;vertical-align: middle; padding: 5px;min-width: 50px;max-width: 400px; }
  .vi-table--th { display: table-cell; text-align: center;vertical-align: middle; padding: 5px;  background-color: #fbfbfb;  }


</style>
