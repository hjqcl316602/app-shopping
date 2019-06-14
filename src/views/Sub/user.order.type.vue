<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        import order from '../Mixin/order'
        export default {
                name: "",
                components: {},
                mixins:[order],
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
                  this.order.type = this.$route.query['type'];
                  this.order.sn = this.$route.query['sn'];
                  this.get_order_list();
                },
                activated(){
                },
                props: [],
                data(){
                        return {
                          order:{
                            type:'',
                            sn:'',
                            list:[],
                            detail:{}
                          }
                        }
                },
                methods: {
                  get_order_list(){
                    if(this.order.type == 'delivery'){
                      this.$get_order_detail( { sn: this.order.sn }).then((data)=>{
                        this.order.list = data['data']['detailList']
                        this.order.detail = data['data']
                      })
                    }
                  },
                  check_order_detail(item){
                    this.$router.push({name:'UserOrderDetail',query:{ sn:this.order.sn,businessOrderNum :item[0]['businessOrderNum']  } })
                  }
                },
                watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
                destroy(){
                },
                filters:{
                  ['order_price_total'](val){
                    let moneyTotal = 0 ;
                    val.forEach((item,i)=>{
                      moneyTotal += Number(item['payPrice'])
                    })
                    return ( moneyTotal / 100 ).toFixed(2);
                  }
                }
        }
</script>
<template>
<div class="vi-user-order-type">
  <template v-if="order.type == 'delivery'">

    <template>
      <div style="height:100px" class="vi-background-gradient com-padding__lg--ad com-flex com-content--between com-items--center">
        <div class="com-text--lg com-text--bold com-text--white">交易成功</div>
        <div class="vi-user-order-label">
          <div class="vi-user-order-label--inner">
            <div class="vi-user-order-icon vi-icon vi-icon__order-status vi-icon__ok"></div>
          </div>
        </div>
      </div>
    </template>

    <template>
      <div class="  vi-order__address com-background  com-padding__lg com-margin--bm">
        <div class="com-flex com-content--between com-items--center">
          <div class="com-text com-text--bold">送货地址</div>
        </div>
        <div class="com-padding--tp  " >
          <div class="com-flex com-content--between">
            <span class="com-text--light">{{ order.detail.name }}</span><span class="com-text--light">{{ order.detail.mobile}}</span>
          </div>
          <div class="com-margin--tp    com-text--light">{{ order.detail.areaName + order.detail.address }}</div>
        </div>
      </div>
    </template>

    <template>
      <div class="com-margin--tp  com-background com-padding__lg">
        <div class="com-text  com-text--bold ">商品列表</div>
        <div class="  " @click="check_order_detail(item)" v-for="(item,index) in order.list">

          <template v-for="(li,l) in item">
            <div class="com-flex com-items--start com-padding--ud" >

              <div class="vi-img__box vi-img--order ">
                <img  :src="li['pic']" alt="">
                <img src="../../img/icon-error.png" class="vi-img--error " alt="">
              </div>

              <div class="com-flex__col--ao com-padding--ad">
                <p class="com-text--bold com-text__height--md">{{ li['goodName'] }}</p>
                <p class="com-text--bold com-text__height--md">￥{{ li['price'] | str_money}}</p>
                <p class="com-text--sm com-text--light com-text__height--sm" v-for="(specs,specs_index) in li['specsName'].split(',')">{{  specs }}</p>
              </div>

              <div class="com-text com-text--bold" >
                x {{ li['num'] }}
              </div>
            </div>
            <!--<div class=" com-text&#45;&#45;right">合计：<span class="com-text&#45;&#45;lg com-text&#45;&#45;bold ">￥{{ item[0]['payPrice'] | str_money }}</span></div>-->
          </template>

          <!--<template class="" v-if="item.length > 1">
            <div class="vi-order__imgs com-flex com-wrap" >
              <div class="vi-img__box vi-img&#45;&#45;order  com-margin&#45;&#45;rt com-margin&#45;&#45;bm" v-for="(ite,it) in item" >
                <img :src="ite.pic" alt="">
                <img src="../../img/logo-error.png" class="vi-img&#45;&#45;error small" alt="">
              </div>
              &lt;!&ndash;<div class="vi-img__box vi-img&#45;&#45;order com-margin&#45;&#45;rt com-margin&#45;&#45;bm">
                <img src="../../img/shopCar.png" alt="">
              </div>&ndash;&gt;
            </div>
            <div class=" com-text&#45;&#45;right"><span class="com-text&#45;&#45;light">共{{ item.length }}件商品 合计：</span><span class="com-text&#45;&#45;lg com-text&#45;&#45;bold ">￥{{ item | order_price_total }}</span></div>
          </template>-->

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
      <div class="com-margin--tp com-margin--bm com-background com-padding__lg">
        <div class=" com-text   com-text--bold ">其他信息</div>
        <div class="com-padding--tp">
          <div class="com-text com-text--light com-text__height">订单号：{{ order.detail.sn}}</div>
          <div class="com-text com-text--light com-text__height">下单日期：{{ order.detail.createTime}}</div>
        </div>
      </div>
    </template>

  </template>


  <!--<template v-for="item in orders" >
    <div class="com-background  com-margin&#45;&#45;bm com-padding__lg&#45;&#45;ad"  >
      <div class="com-padding&#45;&#45;ud  com-flex com-content&#45;&#45;between">
        <span class="com-text&#45;&#45;bold">订单状态</span>
        <span class="com-text&#45;&#45;lg com-text&#45;&#45;theme" :class="{'com-text&#45;&#45;dark': item.orderStatusStr == '已完成'}">{{ item.orderStatusStr}}</span>
      </div>
      <div class="com-padding&#45;&#45;ud " @click="operate_order(item,'detail')">

        <div v-if=" item.pics &&   item.pics.length == 1 ">
          <div class="com-flex com-items&#45;&#45;start" >

            <div class="vi-img__box vi-img&#45;&#45;order ">
              <img  :src="item['pics'][0]" alt="">
              <img src="../../img/logo-error.png" class="vi-img&#45;&#45;error small" alt="">
            </div>

            <div class="com-flex__col&#45;&#45;ao com-padding&#45;&#45;ad">
              <p class="com-text&#45;&#45;bold com-text__height&#45;&#45;md">{{ item['goodName'] }}</p>
              <p class="com-text&#45;&#45;bold com-text__height&#45;&#45;md">￥{{ item['price'] | str_money}}</p>
              <p class="com-text&#45;&#45;sm com-text&#45;&#45;light com-text__height&#45;&#45;sm" v-for="(specs,index) in item['specsName'].split(',')">{{  specs }}</p>&lt;!&ndash;
                  <p class="com-text&#45;&#45;sm com-text&#45;&#45;gray com-text__height&#45;&#45;sm">重量：500g</p>&ndash;&gt;
            </div>

            <div class="com-text com-text&#45;&#45;bold" >
              x {{ item['num'] }}
            </div>
          </div>
        </div>

        <div class="" v-if="item.pics && item.pics.length > 1">
          <div class="vi-order__imgs com-flex com-wrap" >
            <div class="vi-img__box vi-img&#45;&#45;order  com-margin&#45;&#45;rt com-margin&#45;&#45;bm" v-for="pic  in item.pics" >
              <img :src="pic" alt="">
              <img src="../../img/logo-error.png" class="vi-img&#45;&#45;error small" alt="">
            </div>
            &lt;!&ndash;<div class="vi-img__box vi-img&#45;&#45;order com-margin&#45;&#45;rt com-margin&#45;&#45;bm">
              <img src="../../img/shopCar.png" alt="">
            </div>&ndash;&gt;
          </div>
        </div>
        <div class=" com-text&#45;&#45;right"><span class="com-text&#45;&#45;light">共{{ item['totalNum']  }}件商品 合计</span> <span class="com-text&#45;&#45;lg com-text&#45;&#45;bold ">￥{{ item['totalPrice'] | str_money }}</span></div>
      </div>
    </div>
  </template>-->
</div>
</template>
<style scoped></style>
