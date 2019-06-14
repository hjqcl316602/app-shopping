<script type="text/ecmascript-6">
  export default {
    name: "",
    components: {   },
    beforeRouteEnter (to, from, next) {
      next(vm=> {
        //vm.change_route_value(to.name) // 第一次进来需要做首次加载
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

    },
    activated(){
    },
    computed:{
      webMemType(){
        return this.$store.state.base['loginMessage']['webMemType']
      }
    },
    data(){
      return {
        nav:[],
        nav_cur:'index'
      }
    },
    methods: {
      change_route(item){
        window.scrollTo(0,0);
        this.$router.replace({name:item.router})
      },
      change_route_value(route){
        this.nav.forEach((item)=>{
          if(item.router == route){
            //item.class = item.class + ' active';
            item.active = true;
          }else{
            //item.class = item.class.replace('active','');
            item.active = false;
          }
        })
      }
    },
    watch: {
      '$route': {
        handler(val, olval){
          this.change_route_value(val.name)
        },
        deep: true,
        immediate:true
      },
      ['webMemType']:{
        handler(val, olval){
          this.nav = ( val == 2 ) ? [
            { name :'首页',value:'index',class:'index',active:false,router:'Index'},
            { name :'购物车',value:'shop',class:'car',active:false,router:'Shop'},
            { name :'业绩中心',value:'achievement',class:'achievement',active:false,router:'Achievement'},
            { name :'我的',value:'user',class:'user',active:false,router:'User'}
          ] :  [
            { name :'首页',value:'index',class:'index',active:false,router:'Index'},
            { name :'购物车',value:'shop',class:'car',active:false,router:'Shop'},
            { name :'我的',value:'user',class:'user',active:false,router:'User'}
          ];
          this.change_route_value(this.$route.name)
        },
        deep: true,
        immediate:true
      },

    },
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-main vi-footer__content">
    <keep-alive >
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div class="vi-footer">
      <div class="vi-navbar">
        <div class="vi-navbar__item" :class="{'active':item.active}" v-for="(item,index) in nav" @click="change_route(item)">
          <div class="vi-navbar__item--inner" :class="item.class">{{ item.name}}</div>
        </div>
        <!--<div class="vi-navbar__item com-padding&#45;&#45;tp " :class="{'com-text&#45;&#45;theme':item.active ,'com-text&#45;&#45;gray':!item.active }" v-for="(item,index) in nav" @click="change_route(item)">
          <i class="iconfont  com-text&#45;&#45;xl" :class="item.class"></i>
          <p class="com-text__height">{{ item.name }}</p>
        </div>-->
      </div>
    </div>
  </div>
</template>
<style scoped></style>
