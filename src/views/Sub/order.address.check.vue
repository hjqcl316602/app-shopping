<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import ListStatus  from '../components/list.status.vue'
  import address from '../Mixin/address'
  export default {
    name: "OrderAddressCheck",
    components: {ListStatus},
    mixins:[address],
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
      (this.address.length  == 0 ) && this.$get_address_list(true);
    },
    activated(){
    },
    computed:{
      address(){
        return this.$store.state.address.address
      }
    },
    data(){
      return {}
    },
    methods: {
      jump_page(name){
        this.$router.push({ name:name })
      },
      select_address(index){
        this.$store.commit('address_select',index);
        this.$router.go(-1);
      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true} */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-order-address-check ">
    <div class="vi-address__item com-background  com-margin--bm" v-for="(item,index) in address" v-if="address.length > 0" @click="select_address(index)">
      <div class="com-padding  ">
        <div class="com-flex com-content--between">
          <span>{{ item['name']}}</span><span>{{ item['mobile']}}</span>
        </div>
        <div class="com-margin--tp ">
          <span class="com-text--theme com-padding--rt" v-if="item['default'] == 1">[默认地址]</span>
          {{ item['areaName'] + item['address'] }}
        </div>
      </div>
    </div>
    <ListStatus cover content="暂无收货地址，快去添加吧~" v-if="address.length == 0"></ListStatus>

    <div class="vi-footer">
      <div class="vi-btn__submit vi-btn--theme com-text--bold" @click="jump_page('UserAddress')">管理地址</div>
    </div>

  </div>
</template>
<style scoped></style>
