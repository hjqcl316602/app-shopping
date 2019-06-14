<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
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

                },
                activated(){
                },
                props: [],
                data(){
                        return {
                           tabs:[
                             { name:'价格',value:'0',active:true,order:true,orders:true },
                             { name:'销量',value:'1',active:false,order:false,},
                             { name:'佣金',value:'2',active:false,order:false,},
                           ]
                        }
                },
                methods: {
                  change_tab(item,index){
                    this.tabs.forEach((list,l)=>{
                      if(index == l){
                        list.active = true
                      }else{
                        list.active = false
                      }
                    });
                    if(index == 0) {
                      this.tabs[0].orders = !this.tabs[0].orders;
                      this.tabs[0].order = true ;
                    }else{
                      this.tabs[0].order = false  ;
                      this.tabs[0].orders = false ;
                    }
                  }
                },
                watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
                destroy(){
                }
        }
</script>
<template>
  <div class="vi-commission vi-header__content  ">
    <div class="vi-header com-background ">
      <div class="vi-tabs com-border--bm">
        <div class="vi-tab" v-for="(item,index) in tabs" @click="change_tab(item,index)">
           <div class="vi-tab__inner " :class="{'vi-tab__inner--active':item.active }">{{ item.name }}</div>

          <template v-if="item.order">
              <div class="com-flex com-items--center com-margin__sm--lt">
                <div class="vi-icon vi-icon__arrow" :class="{ 'vi-icon__arrow--active':item.orders}"></div>
                <!--<div class="com-text iconfont icon-triangle-top " :class="{'com-text&#45;&#45;theme':item.orders ,'com-text&#45;&#45;theme-light':!item.orders }"></div>
                <div class="com-text iconfont icon-triangle-bottom  " :class="{ 'com-text&#45;&#45;theme':!item.orders ,'com-text&#45;&#45;theme-light':item.orders   }"></div>
             --> </div>
            </template>

        </div>
      </div>
    </div>

    <template>
      <div class="vi-commission__body com-padding__lg--ad  com-padding--ud com-background" >
        <div class="com-padding--ud" v-for="item in 10">
          <div class="com-flex com-items--center "  >

            <div class="vi-img__box vi-img--order ">
              <img  src="../../img/good-test.png" alt="">
            </div>
            <div class="com-flex__col--ao com-padding--ad">
              <p class="com-text--lg  com-text--bold com-text__height--md com-text__visible--one">NIKE乐享生态跑步鞋最新款NIKE乐享生态跑步鞋</p>
              <p class="com-text--lg com-text--theme  com-text--bold com-text__height--md">￥18.8</p>
               <span class="vi-btn__simple vi-btn--aux com-margin__sm--tp">佣金：18BB币</span>
            </div>
            <div class="com-text" >
              <div class=" vi-btn__simple vi-btn--submit">我要分销</div>
            </div>
          </div>
        </div>
      </div>
    </template>


  </div>
</template>
<style scoped>
  .icon-triangle-top{ font-size: 12px;}
  .icon-triangle-bottom{ font-size: 12px;}
</style>
