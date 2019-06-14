<script type="text/ecmascript-6">
  import ListStatus  from '../components/list.status.vue'
  import * as objects from '../../js-package/app.object'
  import * as arrays from '../../js-package/app.array'
  import car  from '../Mixin/car'
  export default {
    name: "",
    components: { ListStatus },
    mixins:[ car ],
    beforeRouteEnter (to, from, next) {
      next(vm=> {
      })
    },
    beforeRouteLeave(to, from, next){
      this.$createConfirm().hide();
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
      ( this.carList.length == 0 ) && this.$get_car_list(true)
    },

    data(){
      return {
        car:{
          list:[],
          isAllCheck:false,
          isEdit:false,
          allMoney:0,
          selectLen:0
        }
      }
    },
    computed:{
      carList(){
        return this.$store.state.car.cars
      }
    },
    methods: {

      // 查看是否需要有选择商品
      check_car_pick(){
        for(let  n = 0 ; n < this.carList.length ; n++){
          if(this.carList[n]['active']){
            return true
          }
        }
        return false
      },
      //商品结算
      submit_car (){


        if(this.check_car_pick()){

          let carArr = arrays.filter(this.carList,(item,i) => { return item['active'] });   // 得到选中的商品
          sessionStorage.setItem('orderDetail',JSON.stringify(carArr));                   // 解决下个页面刷新之后不能拿到数据
          setTimeout(()=>{
            this.$router.push({ name:'OrderCreate',query:{ type :'car'}} )
          },100)
          /*this.$createConfirm({
            message: '确定购买商品么？',
            onOk:()=>{



            }
          }).show();*/
        }else{
          this.$toast('请选择要购买的商品！')
        }

      },
      // 删除购物车
      delete_car(index){
        this.$createConfirm({
          message:'确定删除该商品？',
          onOk:()=>{
            let arr = [];
            for(let n = 0 ; n < this.carList.length ; n++){
              if(index != n){
                let obj = objects.copy_prev( { goodId:0, specsName:'', num:0 },this.carList[n]);
                arr.push(obj);
              }
            }
            this.$insert_car(arr).then(()=>{
              this.$toast('删除商品成功！')
            },()=>{
              this.$toast('删除商品失败！')
            })
          },
        }).show()
      },

      //勾选购物车
      pick_car(type,index){
        if(type == 'all'){
          this.car.isAllCheck  = !this.car.isAllCheck;
          this.$store.commit('pick_car',{ type,index ,isCheck : this.car.isAllCheck })
        }else{
          this.$store.commit('pick_car',{ type,index })
        }
      },
      // 改变购物车数量
      car_change_num(type,index){
        this.$store.commit('change_car_num',{ type,index })
      },

    },
    watch: {
      ['carList']:{
        handler(val, olval){
          this.car.allMoney = 0;
          this.car.selectLen = 0 ;
          val.forEach((item)=>{
            if(item.active){
              this.car.allMoney += item['originPrice'] * item['num'];
              this.car.selectLen += 1
            }
          });
          if(val.length == 0 ) {
            return this.car.isAllCheck = false
          }
          for(let n = 0 ; n < val.length ; n++){
            if(!val[n]['active']){
              return this.car.isAllCheck = false;
            }
          }
          return this.car.isAllCheck = true;
        },
        deep:true,
        immediate:true
      },
    },
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-shop " >
    <template v-if="carList.length > 0">
      <div style=" height:calc(100vh - 100px )" class="com-background" >
        <!--<div class="vi-header">
          <div @click="change_edit_status(true)" v-if="!car.isEdit" class="   com-background&#45;&#45;gray com-border&#45;&#45;bm com-text com-text&#45;&#45;theme  com-text&#45;&#45;lg com-text&#45;&#45;right   com-padding">编辑</div>
          <div @click="change_edit_status(false)" v-else class="   com-background&#45;&#45;gray com-border&#45;&#45;bm com-text com-text&#45;&#45;theme  com-text&#45;&#45;lg com-text&#45;&#45;right   com-padding">取消</div>
        </div>-->
        <div class="com-padding--ud">
          <van-cell-swipe :right-width="100" v-for="(item,index) in carList" :key="index"  >
            <div class="com-flex com-items--center com-background com-padding__lg--ad com-padding--ud " >



              <div class="com-flex__col--fx  com-margin--rt " @click="pick_car('alone',index)">
                <div class="vi-icon vi-icon__select" :class="{'vi-icon__selected':item.active }"></div>
              </div>

              <div class="com-flex__col--ao com-flex"  >

                <router-link tag="div" class="vi-img__box vi-img--order" :to="{ name : 'OrderDetail',query:{ goodid:item.goodId } }">
                  <img :src="item.goodPicture" alt="">
                  <img src="../../img/icon-error.png" class="vi-img--error" alt="">
                </router-link>
                <div class="com-flex__col--ao com-padding--ad">
                  <p class="com-text--bold com-text__height--md com-text__visible--one">{{ item['goodName']  }}</p>
                  <p class="com-text--theme com-text--bold  com-text__height--lg ">￥{{ item['originPrice'] | str_money }}</p>
                  <p class="com-text--sm com-text--light com-text__height--md" v-for="item in item.specsName.split(',')">{{ item }}</p>
                </div>
              </div>
              <div class="com-text--right com-margin--lt"   >
                <MySteppe :num="item.num" :min="1"   @minus="car_change_num('minus',index)" @plus="car_change_num('plus',index)" ></MySteppe>
              </div>
            </div>
            <div slot="right" style="width: 100px" class="vi-cell-btn" @click="delete_car(index)">
              <span class="com-text--white com-text--bold com-text--lg">删除</span>
            </div>
          </van-cell-swipe>

        </div>
        <div class="vi-footer vi-shop__submit">
          <div class=" com-background com-flex ">
            <div class="com-flex com-items--center com-content--between com-flex__col--16 com-padding__lg--ad">
              <div @click="pick_car('all')" class="com-flex com-items--center">
                <span class="vi-icon  com-margin--rt" :class="{'vi-icon__select':!car.isAllCheck,'vi-icon__selected':car.isAllCheck }"></span>
                <span class="com-text com-text--light" >全选</span>
              </div>
              <span class="com-text" v-if="!car.isEdit">合计：<span class="com-text com-text--lg com-text--theme">{{ car.allMoney | str_money}}</span></span>
            </div>
            <div class=" com-flex__col--8">
              <!--<div class=" vi-btn__submit vi-btn&#45;&#45;theme" v-if="car.isEdit" @click="operate_order_btn('del')">删除</div>-->
              <div class=" vi-btn__submit vi-btn--theme com-text--bold" @click="submit_car">结算({{ car.selectLen }})</div>
              <!-- <div class=" vi-btn__submit vi-btn&#45;&#45;theme">结算</div>-->
            </div>
          </div>
        </div>
      </div>
    </template>

    <div  v-else>
      <ListStatus cover status = 'car' title="购物车空空如也" content="好货多多，赶快下单啰～～"></ListStatus>
    </div>

  </div>
</template>
<style scoped>

</style>
