<script type="text/ecmascript-6">
  //import Header  from './components/navbar.vue'
  import good  from '../Mixin/good'
  import { set_wx_share } from '../../js/vue.wx';
  import PopupActivity from '../components/popup.activity.vue'
  import   ListStatus  from '../components/list.status.vue'
  ///import Swipe from 'vant/lib/swipe'
  //import SwipeItem from 'vant/lib/swipe-item'

  export default {
    name: "",
    components: {
      ['popup-activity']:PopupActivity,
      ListStatus
    },
    mixins:[ good ],

    beforeRouteEnter (to, from, next) {
      next(vm=> {
        vm._init_page_tab(from);
        vm.$doms.onScroll(vm.scroll_change)
      })
    },
    beforeRouteLeave(to, from, next){
      this.$doms.offScroll();
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
      this._init_page();
      this._init_page_set();
    },
    activated(){
    },
    computed:{
      loginMessage(){
        return this.$store.state.base['loginMessage'];
      },
      bannerList(){
        return this.$store.state.good['bannerList'];
      },
      goodCategoryList(){
        return this.$store.state.good['goodCategoryList'];
      },
      goodCategoryActive(){
        return this.$store.state.good['goodCategoryActive'];
      },
      goodList(){
        return this.$store.state.good['goodList'];
      },
    },
    data(){
      return {

        good:{
          list:[],
          total:0,
          categoryid:'',
          pagesize:20,
          pagenum:1,
          loading:false
        },
        pull:{
          loading:false
        },
        push:{
          loading:false,
          finished:true
        },
        tab:{
          top_show:false,
          active:'',
          list:[],
          header:null,
          headerIndex:0,
          center:null,
          centerIndex:0
        },
        popup:{
          activity:false
        }
      }
    },
    methods: {

      async _init_page(){

        await this.$get_banner_list();
        await this.$get_good_category_list();
        this.set_good_category();
        await this.$get_good_list(false,false);
        //let good_list = await this.get_food_list(false);

      },
      //下拉刷新
      async _reload_page(){
        await this.$get_banner_list();
        await this.$get_good_list(false,false);
      },

      // 不需要通过刷新功能
      _init_page_set(){
        this._init_set_share()
      },



      // 初始化是否显示顶部商品类目
      _init_page_tab(from){
        if(from && from.meta.belongTo && from.meta.belongTo == 'Main'){
          this.tab.top_show = false ;
        }
      },

      // 初始化分享 设置
      _init_set_share(){
        let share_obj = {
          title:'贝斯特链平台',
          desc: '关注贝斯特链，赢取收益',
          imgUrl:'',
          link:`${this.$configs['HTTP_WEB'] }?/Main/Index&fromUser=${this.$cookies.get('fromUser')}`
          //window.location.href.split('#')[0]+'?/Main/Index' + '&fromUser='+ this.$cookies.get('fromUser')
        };
        set_wx_share(share_obj)
      },

      // 切换商品类目
      _change_tab(index){
        this.$store.commit('update_good_category_active',index);
        this.tab.center.slideTo(index);
        this.tab.header.slideTo(index);
        this.$get_good_list(false,false)

      },
      // 下拉刷新
      pull_load() {
        this._reload_page();
        setTimeout(() => {
          this.pull.loading = false;
        }, 1000);
      },

      // 滚动事件
      scroll_change(){
        var t =document.documentElement.scrollTop||document.body.scrollTop;
        var winWidth =  this.$doms.getWindowOffset().winWidth;
        var height = winWidth * 9 / 16 + 30;
        if(height <= t){
          this.tab.top_show = true ;
        }else{
          this.tab.top_show = false ;
        }
      },

      //设置tab
      set_good_category(){
        this.tab.header = null;
        this.tab.center = null;
        this.$nextTick(()=>{
          let that = this;

          this.tab.center = new Swiper('.vi-swiper-tab--center', {
            slidesPerView: 4,
            spaceBetween: 0,
            freeMode: false,
            centeredSlides: false,
            pagination: {
              clickable: true,
            },
            on:{
              slideChange:function(){
                that.tab.centerIndex = this.realIndex ;
              }
            },
          });


          this.tab.header = new Swiper('.vi-swiper-tab--header', {
            slidesPerView: 4,
            spaceBetween: 0,
            freeMode: false,
            centeredSlides: false,
            pagination: {
              clickable: true,
            },
            on:{
              slideChange:function(){
                that.tab.headerIndex = this.realIndex ;
              }
            },
          });
          setTimeout(()=>{

            this.tab.center.slideTo(0);
            this.tab.header.slideTo(0);
          },200)

        })
      },

      // 选择图片banner
      _select_banner(item){
        if(item['toPath'] && this.loginMessage['webMemType'] == 2 ){
          this.$router.push({ name : item['toPath'] })
        }
      }

    },
    watch: {
      ['tab.headerIndex'](val){
        this.tab.center.slideTo(val);
        this.tab.header.slideTo(val);
      },
      ['tab.centerIndex'](val){
        this.tab.center.slideTo(val);
        this.tab.header.slideTo(val);
      },
      ['loginMessage']: {
        handler(val, olval){
          if( val['webMemType'] == 2 && !sessionStorage.getItem('isShowActivity')){
            // 判断用户类型，进行弹框显示

            this.popup.activity = true;
            sessionStorage.setItem( 'isShowActivity',true)
          }
          if(val['webMemType'] == 1 && !sessionStorage.getItem( 'isShowPay')){
            setTimeout(()=>{
              sessionStorage.setItem( 'isShowPay',true );
              this.$router.push({ name :"ActivityChangeIdentity"})
            },2000)
          }
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
  <div class="vi-index">
    <popup-activity v-model="popup.activity "></popup-activity>


    <div class="vi-header vi-index__header " :class="{ 'is-hide':!tab.top_show}" >
      <div class="com-background com-shadow--bottom">
        <div class="vi-index__tab is-header com-padding__lg--ad">
          <!--<van-tabs v-model="tab.active" :swipe-threshold="4" swipeable @click="change_tab">
            <van-tab :title="item.categoryName" :value="item.categoryId" v-for="(item,index) in tab.list" :key="index"></van-tab>
          </van-tabs>-->
          <div class="vi-swiper-tab  vi-swiper-tab--header swiper-container">
            <div class="swiper-wrapper">
              <div class="vi-swiper-tab--item swiper-slide" v-for="(item,index) in goodCategoryList" @click="_change_tab(index)">
                <span class="vi-swiper-tab--text van-ellipsis" :class="{'active' :item.active }">{{ item.categoryName }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="pull.loading" @refresh="pull_load">
      <van-list  v-model="good.push.loading"
                 :finished="good.push.finished"
                 @load="$get_good_list(true,false)">
        <div class="com-background ">
          <div class="vi-swipe" >
            <div class="vi-swipe__content">

              <mt-swipe :auto="3000">
                <mt-swipe-item v-for="(item ,index ) in bannerList" :key="index" @click.native="_select_banner(item)">
                  <div class="vi-ratio" >
                    <div class="vi-ratio__outer" data-ratio="16:9">
                      <div class="vi-ratio__inner vi-img__box com-background--gray">
                        <img  alt="" :src="item.resUrl" class="vi-img">
                        <img src="../../img/logo-error.png" class="vi-img--error small" alt="">
                      </div>
                    </div>
                  </div>
                </mt-swipe-item>
              </mt-swipe>

            </div>
            <div class="vi-index__search">

              <router-link :to="{ name :'GoodSearch'}" tag="div" class="vi-index__search--inner com-padding__lg--lt com-flex com-items--center">
                <div class="vi-icon vi-icon__scale-big"></div>
                <!-- <span class="com-text iconfont icon-sousuo1x com-text&#45;&#45;gray"></span>-->
                <span class="com-text com-text--gray com-margin__sm--lt com-text--bold">搜索商品，搜索好物</span>
              </router-link>

            </div>
          </div>
          <div class="  vi-index__tab com-padding__lg--ad">
            <div class="vi-swiper-tab vi-swiper-tab--center swiper-container">
              <div class="swiper-wrapper">
                <div class="vi-swiper-tab--item swiper-slide" v-for="(item,index) in goodCategoryList" @click="_change_tab(index)">
                  <span class="vi-swiper-tab--text van-ellipsis" :class="{'active' :item.active }">{{ item.categoryName }}</span></div>
              </div>
            </div>
            <!--<van-tabs v-model="tab.active" :swipe-threshold="4" swipeable @click="change_tab">
              <van-tab :title="item.categoryName" :value="item.categoryId" v-for="(item,index) in tab.list" :key="index"></van-tab>
            </van-tabs>-->
          </div>
          <div class="com-background vi-goods">
            <template v-if="goodList.length > 0">
              <div class="vi-goods--area">
                <router-link tag="div" class="vi-good__item" :to="{ name : 'OrderDetail',query:{ goodid:item['goodId'] } }" v-for="(item,index) in goodList" :key="index">
                  <div class=" vi-good__item--inner  ">
                    <div class="vi-ratio">
                      <div class="vi-ratio__outer" data-ratio="9:8">
                        <div class="vi-ratio__inner">
                            <div class="vi-img__box">
                              <img  :src="item.goodPicture" alt="">
                              <img src="../../img/icon-error.png" class="vi-img--error" alt="">
                            </div>
                        </div>
                      </div>
                    </div>

                    <!--<div class="vi-good__content ">
                      <div class="vi-good__img vi-img__box">
                        <img :src="item.goodPicture" alt="">
                        <img src="../../img/logo-error.png" class="vi-img&#45;&#45;error small" alt="">
                      </div>
                    </div>-->
                    <div class="com-padding">
                      <p class=" com-text__height--sm  com-text--bold com-text__visible--two">{{ item['goodName']  }}</p>
                      <p class="com-text com-text--theme com-margin__sm--tp com-text--bold">￥{{ item['price']   | str_money}}</p>
                    </div>
                  </div>
                </router-link>
              </div>
            </template>

            <template v-else>
              <div class="" style="padding-top: 60px">
                <ListStatus content="~~正在积极的上架中...~~" title="无商品数据"></ListStatus>
              </div>
            </template>

            <div v-if="good.push.finished && goodList.length > good.pageSize" class="com-text--light com-text--center com-padding__lg--ud"> ~没有更多商品了~</div>
          </div>
        </div>
      </van-list>

    </van-pull-refresh>
  </div>

</template>
<style scoped>

</style>
