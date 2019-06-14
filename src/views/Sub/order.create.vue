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
      ( this.address.length == 0 ) && this.$get_address_list(true);
      this.init_page();
    },
    mounted(){

    },
    activated(){

    },
    computed:{
      address(){
        return this.$store.state.address.address
      },
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
        this.order.type = this.$route.query['type'];
        this.order.detail = JSON.parse( sessionStorage.getItem('orderDetail') ) || [] ;
        console.log(this.order.detail)
      },
      jump_page(name){
        this.$router.push({name:name})
      },

      // 返回上一页  - 库存不足提醒  - 返回修改
      jump_back(){
        this.$router.go( -1 )
      },
      // 创建订单 -
      create_order(){
        if(this.selectedAddress.length > 0  && this.selectedAddress[0]['addressId']){
          if(this.order.type == 'car'){

            let  newArr = [] ; // 创建订单的列表数据 - 需要重新组装 - 去掉无用的字段
            for(let n = 0 ; n < this.order.detail.length ; n++){
              let item = this.order.detail[n];
              let obj =  this.$objects.copy_prev( { goodId:0, specsName:'', num:0 },item);
              newArr.push(obj);
            }
            // 检查购物的数量是否还有足够的库存
            this.$check_car(newArr).then(()=>{

              let params = {
                addressId:this.selectedAddress[0]['addressId'],
                orderDetail:newArr
              };

              let newCarList = [];
              this.carList.forEach((item,i)=>{
                let bool = this.$arrays.exit(newArr,(list,l)=>{
                  return list['goodId'] == item['goodId'] && list['specsName'] == item['specsName'] ;
                });
                if(!bool){
                  newCarList.push(item)
                }
              });

              // 提交成功后 ， 是购物车过来的需要将购物车中删除掉
              this.$insert_car(newCarList).then(()=>{})

              this.$create_order(params).then((data)=>{
                let sn = data['sn'];
                this.order_pay(sn);
              },()=>{
                this.$toast('提交订单失败！');
              })

            },(data)=>{
              let  notice = JSON.parse(data.data);
              let newNotice = [];
              notice.forEach((item,i)=>{
                let obj = {};
                this.carList.forEach((list,l)=>{
                  if(item['goodId'] == list['goodId'] && item['specsName'] == list['specsName'] ){
                    obj['stock'] = item['stock'];
                    obj['goodName'] = list['goodName'];
                    obj['specsName'] = list['specsName'];
                    obj['num'] = list['num'];
                    newNotice.push(obj);
                  }
                })
              });
              this.good_stock.options = newNotice;
              this.good_stock.show = true;
            })

            //this.$create_order()
          } else if(this.order.type == 'good'){
            let obj =  this.$objects.copy_prev( { goodId:0, specsName:'', num:0 },this.order.detail[0]);
            let params = {
              addressId:this.selectedAddress[0]['addressId'],
              orderDetail:[obj]
            };
            this.$create_order(params).then((data)=>{
              let sn = data['sn'];
              this.order_pay(sn);
            },(error)=>{
              if(error.code =='006'){
                this.$toast('库存不足！');
              }else{
                this.$toast('提交订单失败！');
              }

            })
          }
        }else{
          this.$toast('请选择地址！');
        }
      },
      // 支付
      order_pay(sn){
        this.$order_pay(sn).then((message)=>{
          if(message == 'success'){
            this.$router.replace({ name :'UserOrderType',query:{ sn :sn ,type:'delivery'}});
          }else if( message == 'cancel') {
            this.$router.replace({name: 'UserOrderDetail', query: {sn: sn}}) ; // 取消的话则进入详情 - 待付款的详情 ，成功，则会进入订单列表页 - 待收货的列表页面
          }
        })
      },

    },
    watch: {/*'': {handler(val, olval){}, deep: true} */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-user-order-detail vi-footer__content">

    <template>

      <div class="  vi-order__address com-background  com-padding__lg--ad com-padding--ud   com-margin--bm">
        <div class=" com-flex com-background com-content--between com-items--center">
          <div class="com-text com-text--bold">送货地址</div>
          <div >
            <span class="com-text com-text--theme" v-if="selectedAddress.length == 0 " @click="jump_page('UserAddressEdit')">+添加地址</span>
            <span class="com-text com-text--gray" v-else @click="jump_page('OrderAddressCheck')">更换地址<i class="com-text iconfont icon-iconfontjiantou2 com-text--gray"></i></span>

          </div>
        </div>
        <div class="com-padding--ud  " v-if="selectedAddress.length > 0 ">
          <div class="com-flex com-content--between">
            <span class="com-text--light">{{ selectedAddress[0].name }}</span><span class="com-text--light">{{ selectedAddress[0].mobile}}</span>
          </div>
          <div class="com-margin--tp com-text--light">{{ selectedAddress[0].areaName + selectedAddress[0].address }}</div>
        </div>
      </div>

      <template >
        <div class="com-padding__lg--ad com-background com-padding--ud com-margin__bm " v-for="(item,index) in  order.detail">
          <div class=" com-flex com-items--start">
            <div class="vi-img__box vi-img--order ">
              <img :src="item.goodPicture" alt="">
              <img src="../../img/icon-error.png" class="vi-img--error" alt="">
            </div>
            <div class="com-flex__col--ao com-padding--ad">
              <p class="  com-text__height--md com-text__visible--two com-text--bold">{{ item.goodName}}</p>
              <p class="com-text--bold com-text__height--md">￥{{ item.originPrice | str_money }}</p>
              <p class="com-text--sm com-text--light com-text__height--sm" v-for="spec in item.specsName.split(',')">{{ spec }}</p>
            </div>
            <div class="com-text com-text--bold" >
              x {{ item.num }}
            </div>
          </div>

        </div>
      </template>

      <div class="vi-footer ">
        <div  class="com-background vi-row--lg com-flex com-content--between com-items--center " >
          <span class="com-padding__lg--lt ">实际付款：<span class="com-text--theme com-text--bold com-text--xl">￥{{ totalAmount  | str_money  }}</span></span>
          <div class="com-flex__col--8 vi-btn__submit vi-btn--theme com-text--bold"  @click="create_order">提交订单</div>
        </div>

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
