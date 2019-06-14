<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import order  from '../Mixin/order'
  import Clipboard from 'clipboard';
  import ListStatus  from '../components/list.status.vue'
  import SwipeTab  from '../components/swipe.tab.vue'
  export default {
    name: "",
    mixins:[ order ],
    components: { ListStatus ,SwipeTab  },
    beforeRouteLeave(to, from, next){
      this.$createConfirm().hide();
      next();
    },
    beforeCreate(){
    },
    created(){

    },
    beforeMount(){
    },
    mounted(){
      this._init_page()
    },
    activated(){

    },
    computed:{
      orders(){
        //console.log(this.$store.state.order.orders)
        return this.$store.state.order.orders
      }
    },
    data(){
      return {

        popup:{
          show:false
        },

        delivery:{
          list:[]
        },

        tab:{
          items:[
            { name :'全部' ,value:'' },
            { name :'待付款' ,value:'0' },
            { name :'待发货' ,value:'1' },
            { name :'待收货' ,value:'2' },
            { name :'待评价' ,value:'3' }
          ],
          active:1
        }
      }
    },
    methods: {
      _init_page(){
        let status  = this.$route['query']['status'];
        this.$store.commit('order_tab_active',status);
        this.tab.active = status;
        this.$get_order_list(false,true);
      },

      _change_swipe_tab(index,title){
        this.$store.commit('order_tab_active',index);
        window.scrollTo(0,0);
        this.$get_order_list(false,true);
      },

      operate_order(item,type){
        if(type == 'cancel' ){
          this.$createConfirm({
            message:'确定取消订单么？',
            onOk:_=>{
              this.$cancel_order(item['sn']).then(()=>{
                this.$toast('取消订单成功！')
              },()=>{
                this.$toast('取消订单失败！')
              })
            }
          }).show();
        }else if(type == 'delivery'){
          this.$createConfirm({
            message:'请收到商品后再确认收货？',
            onOk:_=>{
              this.$confirm_order(item['sn'],item['businessOrderNum']).then(()=>{
                this.$toast('收货成功!')
              },()=>{
                this.$toast('收货失败!')
              })
            }
          }).show();
        }
        else if(type == 'pay'){
          let sn = item['sn'];
          this.$order_pay(sn).then((message)=>{
            if(message == 'success'){
              this.$get_order_list(false,false);
              this.$router.push({ name :'UserOrderType',query:{ sn :sn ,type:'delivery'}});
              //this.$router.push({ name :'SubmitStatus',query:{ type :'pay',status:'success',back:1,time:3}})
            }

          })
        }else if( type == 'eval'){
          this.$router.push({name:'UserOrderEval',query:{sn:item['sn'],businessOrderNum :item['businessOrderNum'] ,come:'list'  }})
        }else if(type == 'detail'){
          this.$router.push({name:'UserOrderDetail',query:{ sn:item['sn'],businessOrderNum :item['businessOrderNum']  } })
        }else if( type == 'logistics'){

          this.$get_order_delivery(item['businessOrderNum']).then((response)=>{
            this.delivery.list = response['data'] || [];
            this.popup.show = true
          });


        }
      },

      _copy_logistics(){
        let clipboard = new Clipboard('.copy-btn')
        clipboard.on('success', e => {
          this.$toast('复制成功！');
          clipboard.destroy()
        });
        clipboard.on('error', e => {
          this.$toast('复制失败！');
          clipboard.destroy()
        })
      },


    },
    watch: {
      ['tab.active'](val){
      }
    },
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-order">

    <my-tip title="物流信息"  v-model="popup.show" okText="关闭">
      <div slot="content" >
        <template v-if="delivery.list.length == 0 ">
          <div class="com-padding--ud com-text--center">暂无物流信息</div>
        </template>
        <template  v-if="delivery.list.length > 0 ">
          <div v-for="(item,index) in delivery.list" style="width: 80vw" class="com-padding com-padding__lg--ad">

            <div class=" com-flex com-content--between com-items--center  " >
              <div class="com-flex__col--ao">
                <div class="com-text com-text__height--lg com-text--bold">{{ item.logisticsType}}快递单号</div>
                <div class="com-text__wrap--break">{{ item.logisticsNo  }}</div>
                <div class="com-text com-text__height--lg com-text--bold">发货时间</div>
                <div class="com-text__wrap--break">{{ item.created }}</div>
              </div>

              <div class="com-text--right" style="width: 100px">
                <button class="copy-btn vi-btn__simple vi-btn--theme2"
                        :data-clipboard-text = "item.logisticsNo"
                        @click="_copy_logistics"
                >复制单号</button></div>
            </div>

          </div>

        </template>

      </div>
    </my-tip>

    <div class="vi-order__header vi-header com-background vi-box--shadow">
            <SwipeTab :options="tab.items" v-model="tab.active" @change="_change_swipe_tab" :tab-num="5"></SwipeTab>
    </div>

    <!-- <div class="">
       <van-tabs   :swipe-threshold="4" swipeable @click="change_tab" ref="tabs">
         <van-tab title="全部" ></van-tab>
         <van-tab title="待付款" ></van-tab>
         <van-tab title="待发货" ></van-tab>
         <van-tab title="待收货" ></van-tab>
         <van-tab title="待评价" ></van-tab>
       </van-tabs>
     </div>-->

    <template>
      <div class=" vi-header__content" v-if="orders.length > 0">
        <van-list v-model="order.push.loading"
                  :finished="order.push.finished"
                  @load="$get_order_list(true,false)"
                  :offset="30"
        >
          <div class="com-background  com-margin--bm com-padding__lg--ad" v-for="item in orders"  >
            <div class="com-padding--ud  com-flex com-content--between">
              <span class="com-text--bold">订单状态</span>
              <span class="com-text--bold com-text--theme" :class="{'com-text--dark': item.orderStatusStr == '已完成'}">{{ item.orderStatusStr}}</span>
            </div>
            <div class="com-padding--ud " @click="operate_order(item,'detail')">

              <div v-if=" item.pics &&   item.pics.length == 1 ">
                <div class="com-flex com-items--start" >

                  <div class="vi-img__box vi-img--order ">
                    <img  :src="item['pics'][0]" alt="">
                    <img src="../../img/logo-error.png" class="vi-img--error small" alt="">
                  </div>

                  <div class="com-flex__col--ao com-padding--ad">
                    <p class="com-text--bold com-text__height--md">{{ item['goodName'] }}</p>
                    <p class="com-text--bold com-text__height--md">￥{{ item['price'] | str_money}}</p>
                    <p class="com-text--sm com-text--light com-text__height--sm" v-for="(specs,index) in item['specsName'].split(',')">{{  specs }}</p><!--
                  <p class="com-text--sm com-text--gray com-text__height--sm">重量：500g</p>-->
                  </div>

                  <div class="com-text com-text--bold" >
                    x {{ item['num'] }}
                  </div>
                </div>
              </div>

              <div class="" v-if="item.pics && item.pics.length > 1">
                <div class="vi-order__imgs com-flex com-wrap" >
                  <div class="vi-img__box vi-img--order  com-margin--rt com-margin--bm" v-for="pic  in item.pics" >
                    <img :src="pic" alt="">
                    <img src="../../img/logo-error.png" class="vi-img--error small" alt="">
                  </div>
                  <!--<div class="vi-img__box vi-img&#45;&#45;order com-margin&#45;&#45;rt com-margin&#45;&#45;bm">
                    <img src="../../img/shopCar.png" alt="">
                  </div>-->
                </div>
              </div>
              <div class=" com-text--right"><span class="com-text--light">共{{ item['totalNum']  }}件商品 合计</span> <span class="com-text--lg com-text--bold ">￥{{ item['totalPrice'] | str_money }}</span></div>
            </div>
            <div class="com-padding--ud com-flex com-content--end " v-if="item.orderStatusStr != '待发货'">
              <!--<div class="vi-btn__simple vi-btn&#45;&#45;light com-margin&#45;&#45;lt">查看详情</div>-->
              <div class="vi-btn__simple vi-btn--light com-margin--lt" v-if="item.orderStatusStr == '待付款'" @click="operate_order(item,'cancel')">取消订单</div>
              <div class="vi-btn__simple vi-btn--theme com-margin--lt" v-if="item.orderStatusStr == '待收货'" @click="operate_order(item,'delivery')">确认收货</div>
              <div class="vi-btn__simple vi-btn--theme com-margin--lt" v-if="item.orderStatusStr == '待付款'" @click="operate_order(item,'pay')">去付款</div>
              <div class="vi-btn__simple vi-btn--theme com-margin--lt" v-if="item.orderStatusStr == '待评价'" @click="operate_order(item,'eval')">去评价</div>
              <div class="vi-btn__simple vi-btn--light com-margin--lt" v-if="item.orderStatusStr == '待收货' || item.orderStatusStr == '待评价'" @click="operate_order(item,'logistics')">查看物流</div>
            </div>
          </div>
        </van-list>
        <div v-if="order.push.finished && orders.length > order.pageSize" class="com-text--light com-text--center com-padding__lg--ud"> ~没有更多订单了~</div>
      </div>
      <div  v-else>
        <ListStatus cover content="暂无订单，去购买商品吧~~" ></ListStatus>
      </div>
    </template>

  </div>





</template>
<style scoped>
  .van-popup{ background-color: transparent }
</style>
<!--
<div class="com-background com-border&#45;&#45;tp com-margin&#45;&#45;bm">
  <div class="vi-module__header com-border&#45;&#45;bm">
    <span class="com-text&#45;&#45;lg com-text&#45;&#45;gray">订单状态</span>
    <span class="com-text&#45;&#45;lg com-text&#45;&#45;theme">待付款</span>
  </div>
  <div class="com-padding com-border&#45;&#45;bm">
    <div class=" com-flex com-items&#45;&#45;start">

      <div class="vi-img__box vi-img&#45;&#45;order ">
        <img src="../../img/shopCar.png" alt="">
      </div>

      <div class="com-flex__col&#45;&#45;ao com-padding&#45;&#45;ad">
        <p class="com-text&#45;&#45;lg com-text__height&#45;&#45;md">三支书没带手机空间的</p>
        <p class="com-text&#45;&#45;theme com-text__height&#45;&#45;md">￥12.11</p>
        <p class="com-text&#45;&#45;sm com-text&#45;&#45;gray com-text__height&#45;&#45;sm">口味：烧烤</p>
        <p class="com-text&#45;&#45;sm com-text&#45;&#45;gray com-text__height&#45;&#45;sm">重量：500g</p>
      </div>

      <div class="com-text" >
        *3
      </div>
    </div>
    <div class="com-text&#45;&#45;gray com-text&#45;&#45;right">共2件商品 合计 <span class="com-text&#45;&#45;lg">￥289</span><span>.00</span> </div>
  </div>
  <div class="com-padding com-flex com-content&#45;&#45;end com-border&#45;&#45;bm">
    <div class="vi-btn__simple vi-btn&#45;&#45;light com-margin&#45;&#45;lt">查看详情</div>
    <div class="vi-btn__simple vi-btn&#45;&#45;theme com-margin&#45;&#45;lt">付款</div>
    <div class="vi-btn__simple vi-btn&#45;&#45;theme com-margin&#45;&#45;lt">评价</div>
  </div>
</div>-->
