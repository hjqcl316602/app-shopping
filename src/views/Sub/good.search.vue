<script type="text/ecmascript-6">
  import ComSearch  from '../components/search.vue'
  import ListStatus  from '../components/list.status.vue'
  import PopupShare from '../components/popup.share.vue'
  import { set_wx_share,hide_all_menus } from '../../js/vue.wx'
  import good  from '../Mixin/good'
  export default {
    name: "",
    components: { ComSearch,ListStatus,PopupShare },
    mixins:[ good ],
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
      this.get_search_history();

    },
    activated(){
    },
    props: [],
    computed:{
      loginMessage(){
        return this.$store.state.base['loginMessage']
      },
      goodSearchList(){
        return this.$store.state.good['goodSearchList']
      },
    },
    data(){
      return {
        search:'',
        isSearch:false,
        search_history:[],

        popup:{
          show:false
        }

      }
    },
    methods: {
      get_search_history(){
        this.search_history = JSON.parse( localStorage.getItem('search_history')   ) || [] ;
      },
      del_search_history(){
        this.search_history = [];
        localStorage.setItem('search_history',JSON.stringify(this.search_history))
      },
      select_search_history(value){
        this.isSearch = true;
        this.search = value ;
        this.$get_good_search_list(this.search,false)
      },
      save_search_history(val){

        if(val && this.search_history.indexOf(val) == -1  ){
          this.search_history.unshift(val);
        }
        localStorage.setItem('search_history',JSON.stringify(this.search_history))
      },

      search_good(){
        // 隐藏全部的菜单类按钮
        hide_all_menus();
        this.isSearch = true;
        this.save_search_history(this.search);
        this.$get_good_search_list(this.search,false)
      },

      push_load(){
        this.$get_good_search_list(this.search,true)
      },

      // 分享商品
      share_good(item){
        this.popup.show = true;

        let obj = {
          title:item['goodName'],
          desc:item['goodName'],
          imgUrl:item['goodPicture'],
          link:`${this.$configs['HTTP_WEB'] }?/SubPage/OrderDetail?goodid=${item['goodId'] }&fromUser=${this.$cookies.get('fromUser')}`,
          //window.location.href.split('#')[0]+'?/SubPage/OrderDetail?goodid='+ item['goodId']+ '&fromUser='+ this.$cookies.get('fromUser')
        };
        set_wx_share(obj).then(()=>{
          this.popup.show = false
        });
      }
    },
    watch: {
      ['search'](val,oldval){
        if(!val){
          this.isSearch = false;
        }
      }
    },
    destroy(){

    }
  }
</script>
<template>
  <div class="vi-good-search vi-header__content">
    <div class="vi-header ">
      <div class="com-background  com-padding__lg--ad ">
        <ComSearch v-model="search" @search="search_good"></ComSearch>
      </div>
    </div>
    <template v-if="!isSearch">
      <div class="com-background vi-cover__height--footer" >
        <div class="com-flex com-content--between com-padding--ud com-padding__lg--ad ">
          <span class="com-text com-text--bold  ">历史搜索</span>
          <div class="vi-icon vi-icon__del "  @click="del_search_history"></div>
          <!-- <span class="com-text iconfont icon-del1 com-text&#45;&#45;gray"></span>-->
        </div>
        <div class="com-padding__lg--ad history-items">
          <div class="history-item com-text--light" v-for="item in search_history" @click="select_search_history(item)"> {{ item }}</div>
          <!--<div class="com-padding&#45;&#45;ud " v-for="item in search_history" @click="select_search_history(item)"><span class="com-text com-text&#45;&#45;light com-text&#45;&#45;bold">{{ item }}</span></div>-->
        </div>
      </div>
    </template>
    <template v-else>

      <template v-if="goodSearchList.length > 0">

        <van-list v-model="goodSearch.push.loading"
                  :finished="goodSearch.push.finished"
                  @load="push_load"
                  :offset="30">
          <template v-if="loginMessage['webMemType'] == 2">
            <div class="vi-commission__body com-padding__lg--ad  com-padding--ud com-background" >
              <router-link tag='div' class="com-padding--ud " :to="{ name :'OrderDetail',query:{ goodid:item['goodId'] }}" v-for="(item,index) in goodSearchList" :key="index">
                <div class="com-flex com-items--center "  >
                  <div class="vi-img__box vi-img--order ">
                    <img :src="item.goodPicture" alt="">
                    <img src="../../img/icon-error.png" class="vi-img--error" alt="">
                  </div>
                  <div class="com-flex__col--ao com-padding--lt">
                    <div class="com-flex com-content--between com-items--center">
                      <div class="com-flex__col--ao">
                        <div class="">
                          <p class="com-text--lg  com-text--bold com-text__height--md com-text__visible--one">{{ item.goodName }}</p>
                        </div>

                        <p class="com-text--lg com-text--theme  com-text--bold com-text__height--md">￥{{ item.price / 100 }}</p>
                      </div>
                      <div class="" >
                        <div class=" vi-btn__simple vi-btn--submit com-text__wrap--nowrap" @click.stop="share_good(item)">我要分销</div>
                      </div>
                    </div>
                    <span class="com-text com-margin__sm--tp">佣金：<span class="com-text--aux">{{ item['lowBonus'] |  str_money}}~{{ item['highBonus'] | str_money  }}元</span></span>
                  </div>
                </div>
              </router-link>
            </div>
          </template>

          <template v-if="loginMessage['webMemType'] == 1">
            <div class="com-background vi-goods">
              <div class="vi-goods--area">
                <router-link tag='div' class="vi-good__item " :to="{ name :'OrderDetail',query:{ goodid:item['goodId'] }}" v-for="(item,index) in goodSearchList" :key="index">
                  <div class="vi-good__item--inner">
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
                    <div class="com-padding">
                      <p class="com-text__height--sm com-text--lg com-margin--tp com-text--bold com-text__visible--two">{{ item.goodName}}</p>
                      <p class="com-text com-text--theme com-margin__sm--tp com-text--bold">￥{{ item.price / 100 }}</p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </template>

        </van-list>

        <div v-if="goodSearch.push.finished && goodSearchList.length > goodSearch.pageSize" class="com-text--light com-text--center com-padding__lg--ud"> ~没有更多商品了~</div>
      </template>

      <template v-else>
        <ListStatus cover  ></ListStatus>
      </template>
    </template>

    <template>
      <PopupShare v-model="popup.show"></PopupShare>
    </template>

  </div>
</template>
<style scoped>
  .history-items{ overflow: hidden ;background-color: #fff }
  .history-item{
    float: left;
    height:auto;padding: 5px 20px; line-height: 24px;background-color: rgba(0,0,0,0.02);margin: 10px;border-radius: 24px;;
  }
</style>
