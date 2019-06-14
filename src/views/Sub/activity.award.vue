<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import activity  from '../Mixin/activity'
  import basic  from '../Mixin/basic'
  export default {
    name: "",
    components: {   },
    mixins:[  activity ,basic ],
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
      this._init_page();
    },
    mounted(){
    },
    activated(){
    },
    computed:{
      awardList(){
        return this.$store.state.activity.awardList
      },
      userMoney(){
        let userMoney = this.$store.state.base['userMoney'] ;
        return userMoney
      },
    },
    data(){
      return {}
    },
    methods: {
      async _init_page(){
        await this.$get_wallet_info();
        await this.$get_award_list();
      },
      _jump_page(item,name){
        sessionStorage.setItem('actGood',JSON.stringify(item));
        this.$router.push( { name : name })
      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-activity-award">
    <div class="com-padding__lg">

      <div class="vi-ratio">
        <div class="vi-ratio__outer" data-ratio="67:36">
          <div class="vi-ratio__inner ">
            <div class="com-cover com-position--re">
              <div class="com-cover com-position--ae">
                <div class="com-cover vi-img__box bg-border-shadow__box">
                  <img src="../../img/icon-top-bg2.png" alt="" class="cover">
                </div>
              </div>

              <div class="com-cover com-position--ae ">
                <div class="com-cover com-flex com-content--between com-items--center com-padding__lg">

                  <!--<div class="aside com-text&#45;&#45;white" >注意事项</div>-->
                  <div>
                    <div class="com-text--xl-xxx com-text--white">{{ userMoney['totalToken'] || 0  }}</div>
                    <div class="com-text--white">我的通证（BB币）</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--<div class="panel">
        <div class="panel&#45;&#45;inner  panel&#45;&#45;inner-orange com-flex com-content&#45;&#45;between com-items&#45;&#45;center com-padding__lg">
          <div>
            <div class="com-text&#45;&#45;xl-xxx com-text&#45;&#45;white">{{ userMoney['totalToken'] || 0  }}</div>
            <div class="com-text&#45;&#45;white">我的通证（BB币）</div>
          </div>
        </div>
      </div>-->
    </div>
    <template>
      <div class="com-background com-padding__lg">
        <div class="vi-area--header vi-area--header--light com-margin--bm">您可以兑换以下商品</div>



        <template v-if=" awardList.length > 0 ">
          <div class="com-padding__lg--ud com-flex com-items--center" v-for="(item,index) in awardList">
            <div class="vi-img--upload vi-img__box ">
              <img :src="item['pic']" alt="">
              <img src="../../img/icon-error.png" class="vi-img--error" alt="">
            </div>
            <div class="com-flex__col--ao com-padding--ad">
              <p class="com-text__visible--two com-text--lg com-text__height--md com-text--bold"  >{{ item['actGoodName']}} </p>
              <p class="com-text__visible--two com-text__height--md"  >{{ item['specName']}} </p>
              <p class="com-text__height--md com-text--bold com-text__height--md">{{ item['price'] || '0' }} BB币兑换</p>
            </div>
            <div class="vi-btn__simple vi-btn--submit com-text__wrap--nowrap" @click="_jump_page(item,'ActivityExchange')">立即兑换</div>

          </div>
        </template>

        <template v-else>
          <div class="com-margin__xl--tp">
            <ListStatus  content="~~您暂时还没有可兑换的商品，继续加油哦~~" title="无商品"></ListStatus>
          </div>
        </template>

      </div>
    </template>

    <!--暂时没有数据-->
    <!--<template  >
      <div class="com-background com-padding__lg com-margin&#45;&#45;tp">

        <div class="vi-area&#45;&#45;header vi-area&#45;&#45;header&#45;&#45;light com-margin&#45;&#45;bm">兑换记录</div>

        <div class="  com-border&#45;&#45;bm com-padding__lg&#45;&#45;ud"  v-for="(item,index) in 3 ">
          <div class="com-flex com-content&#45;&#45;between com-items&#45;&#45;center ">
            <span class="com-text  com-text&#45;&#45;bold">兑换现金</span>
            <span class="com-text com-text&#45;&#45;gray com-text&#45;&#45;sm">2012-04-18</span>
          </div>
          <div class="com-flex com-content&#45;&#45;end com-margin&#45;&#45;tp">
            <span class="">(消耗88BB币)</span>
          </div>
          <div class="com-flex com-content&#45;&#45;between com-items&#45;&#45;center">
            <span class="com-text ">余额：100 BB币</span>
            <span class="com-text ">iphoneX 256G</span>
          </div>
        </div>
      </div>
    </template>-->

  </div>
</template>
<style scoped></style>
