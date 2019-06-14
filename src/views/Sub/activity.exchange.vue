<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        import address from '../Mixin/address'
        import good from '../Mixin/good'
        export default {
                name: "",
                components: {},
                mixins:[address,good],
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
                  this._init_page();
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
                },
                data(){
                        return {
                          goodDetail:{}
                        }
                },
                methods: {
                  _init_page(){
                    this.goodDetail = JSON.parse(sessionStorage.getItem('actGood') ) ;
                  },

                  _save_exchange(){

                    let params = {
                      actGoodId: this.goodDetail.actGoodId,
                      addressId:  this.selectedAddress[0].addressId
                    };
                    this.$save_win_good(params).then((res)=>{
                      this.$store.commit('get_good_like_list',res['data']);
                      this.$router.replace({ name :'ActivityStatus'})
                    })

                  }
                },
                watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
                destroy(){
                }
        }
</script>
<template>
<div>
  <div class="com-background">
    <div class="com-padding__lg com-flex com-items--center" >
      <div class="vi-img--upload vi-img__box ">
        <img :src="goodDetail['pic']" alt="">
        <img src="../../img/icon-error.png" class="vi-img--error " alt="">
      </div>
      <div class="com-flex__col--ao com-padding--ad">
        <p class="com-text__visible--two com-text--lg com-text--bold"  >{{ goodDetail['actGoodName']}}</p>
        <p class="com-text__visible--two"  >{{ goodDetail['specName']}}</p>
      </div>
    </div>
  </div>

  <div class="com-background com-margin--tp com-flex com-content--between com-padding--ud com-padding__lg--ad">
    <span class="com-text--lg com-text--bold">需消耗BB币</span>
    <span class="com-text--lg com-text--bold">{{ goodDetail['price'] }}</span>
  </div>

  <div class="com-background">
    <div class=" com-padding__lg--ad com-padding--ud com-margin--tp  com-margin--bm">
      <div class=" com-flex com-background com-content--between com-items--center">
        <div class="com-text com-text--bold">送货地址</div>
        <div >
          <router-link  tag='span' :to="{name:'UserAddressEdit'}" v-if="selectedAddress.length == 0 " class="com-text com-text--theme">+添加地址</router-link>
          <router-link tag="span" :to="{ name :'OrderAddressCheck' }"  v-else class="com-text com-text--gray">更换地址<i class="com-text iconfont icon-iconfontjiantou2 com-text--gray"></i></router-link>
<!--
                    <span class="com-text com-text&#45;&#45;theme" v-if="selectedAddress.length == 0 " @click="jump_page('UserAddressEdit')"></span>
                    <span class="com-text com-text&#45;&#45;gray" v-else @click="jump_page('OrderAddressCheck')">更换地址</span>
          -->

        </div>
      </div>
      <div class="com-padding--ud  " v-if="selectedAddress.length > 0 ">
        <div class="com-flex com-content--between">
          <span class="com-text--light">{{ selectedAddress[0].name }}</span><span class="com-text--light">{{ selectedAddress[0].mobile}}</span>
        </div>
        <div class="com-margin--tp com-text--light">{{ selectedAddress[0].areaName + selectedAddress[0].address }}</div>
      </div>
    </div>
  </div>

  <div class="com-padding__lg">
    <div class="vi-btn__submit vi-btn--theme vi-btn--radius com-text--bold" @click="_save_exchange">确认兑换</div>
  </div>
</div>
</template>
<style scoped></style>
