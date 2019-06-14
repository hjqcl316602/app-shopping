<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        import basic  from '../Mixin/basic'
        import SwipeTab  from '../components/swipe.tab.vue'
        export default {
                name: "",
                components: { SwipeTab },
                mixins: [basic] ,
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
                  this._init_page()
                },
                mounted(){

                },
                activated(){
                },
                computed:{
                  userMessage(){
                    let userMessage = this.$store.state.base['userMessage'] ;
                    return userMessage
                  },
                  userMoney(){
                    let userMoney = this.$store.state.base['userMoney'] ;
                    return userMoney
                  },
                  tokenList(){
                    let tokenList = this.$store.state.base['tokenList'] ;
                    return tokenList
                  },
                  jdList(){
                    let jdList = this.$store.state.base['jdList'] ;
                    return jdList
                  }


                },
                data(){
                        return {
                          popup:{
                            show:false
                          },

                          tab:{
                            active:'0',
                            options:[{ name:'我的积点',value:'money'},{ name:'我的通证',value:'token'}]
                          },
                          groupBtnActive:'1'
                        }
                },
                methods: {
                  async _init_page(){
                    await this.$get_wallet_info();
                    await this.$get_jd_list(false,true);
                    await this.$get_user_message();
                  },
                  _exchange_money( ){
                    console.log(this.userMessage)
                    // 还要进行积点数的判断

                    if( !this.userMessage.mobile ||  !this.userMessage.cardNo){
                      this.$createConfirm({
                        message:'您还未进行手机号和银行卡绑定！去绑定？',
                        onOk:_=>{
                          setTimeout(()=>{
                            this.$router.push( { name : 'UserAuthen' })
                          },100)

                        }
                      }).show();
                    }else{
                      this.popup.show = true ;
                    }

                  },
                  _change_exchange_type(index){
                    this.groupBtnActive = index;
                  },
                  _sure_exchange_money(){
                    this.popup.show = false ;
                    if(this.groupBtnActive == '1'){
                      this.$router.push({ name :'UserMoneyCash' })
                    }else if(this.groupBtnActive== '2'){
                      this.$router.push({ name :'UserMoneyExchange' })
                    }
                  },
                  _push_load_more(type){
                    if(type =='token'){
                      this.$get_token_list(true,false);
                    }else if(type =='money'){
                      this.$get_jd_list(true,false);
                    }
                  }
                },
                watch: {
                  ['tab.active'](val){
                    if(val == '1'){
                      this.$get_token_list(false,false);
                    }else if(val == '2'){
                      this.$get_jd_list(false,false);
                    }

                  }
                },
                destroy(){
                }
        }
</script>
<template>
  <div class="vi-user-money vi-header__content">
    <div class="vi-order__header vi-header com-background vi-box--shadow">
      <SwipeTab :options="tab.options" v-model="tab.active" :tab-num="2"></SwipeTab>
    </div>

    <template>
      <my-tip title="请选择兑换种类" ok-text="确认" v-model="popup.show">
        <div slot="content" class="com-padding com-flex com-content--center com-padding__lg--bm">
          <div class="vi-btn__group vi-btn--normal com-margin--rt" :class="{'vi-btn--active': groupBtnActive == 1 }" @click="_change_exchange_type('1')">现金</div>
          <div class="vi-btn__group vi-btn--normal"  :class="{'vi-btn--active': groupBtnActive ==  2 }" @click="_change_exchange_type('2')">BB币</div>
        </div>
        <div slot="btn" class=" com-text--center com-text__height--lg com-padding--ud com-text--bold com-text--theme com-border--tp" @click="_sure_exchange_money"> 确定</div>
      </my-tip>
    </template>

    <template v-if="tab.active == '0'">
      <div>
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
                       <router-link :to="{ name:'UserMoneyMessage' }" tag="div" class="aside  vi-icon__outer "  >
                         <i class="vi-icon vi-icon--rule "></i>
                         <span class="com-text com-text--md com-text--white com-padding__sm--lt">温馨提醒</span>
                       </router-link>
                       <!--<div class="aside com-text&#45;&#45;white" >注意事项</div>-->
                       <div>
                         <div class="com-text--xl-xxx com-text--white com-text--bold ">{{ userMoney['totalJd'] || '0.0000' | str_money}}</div>
                         <div class="com-text--white">数量（个）</div>
                       </div>
                       <div>
                         <div class="vi-btn__refer vi-btn--warning" @click="_exchange_money('UserMoneyExchange')">兑现</div>
                       </div>
                     </div>
                  </div>

                </div>


              </div>

            </div>

          </div>
        </div>

        <div>
          <div class="com-text com-text--lg com-text--bold  com-padding__lg--ad com-padding--bm">交易明细</div>
          <template v-if="jdList.length > 0">
            <van-list v-model="jd.push.loading"
                      :finished="jd.push.finished"
                      @load="_push_load_more('money')"
                      :offset="30"
            >
              <div class="com-background com-padding__lg com-margin--bm vi-item "  v-for="(item,index) in jdList " >

                <div class="com-flex com-content--between com-items--center com-margin__lg--bm">
                  <span class="com-text  com-text--bold">{{ item['remark']}}</span>
                  <span class="com-text com-text--gray com-text--sm">{{ item['time'] }}</span>
                </div>

                <div class="com-flex com-content--between com-items--center">
                  <span class="com-text ">余额：{{ item['leftJd'] }} 个积点</span>
                  <span class="com-text ">{{ item['jd'] }} 个积点</span>
                </div>
              </div>
            </van-list>
            <div v-if="token.push.finished && jdList.length > token.pageSize" class="com-text--light com-text--center com-padding__lg--ud"> ~没有更多兑换信息了~</div>
          </template>
          <template v-else>
            <div class="com-padding__lg--tp">
              <ListStatus content="~~无交易明细数据~~" title="无交易数据"></ListStatus>
            </div>
          </template>
        </div>
      </div>
    </template>

    <template v-if="tab.active == '1'">
      <div>
        <div class="com-padding__lg">

          <div class="vi-ratio">
            <div class="vi-ratio__outer" data-ratio="67:36">
              <div class="vi-ratio__inner ">
                <div class="com-cover com-position--re">
                  <div class="com-cover com-position--ae">
                    <div class="com-cover vi-img__box bg-border-shadow__box">
                      <img src="../../img/icon-top-bg.png" alt="" class="cover">
                    </div>
                  </div>

                  <div class="com-cover com-position--ae ">
                    <div class="com-cover com-flex com-content--between com-items--center com-padding__lg">

                      <!--<div class="aside com-text&#45;&#45;white" >注意事项</div>-->
                      <div>
                        <div class="com-text--xl-xxx com-text--white com-text--bold  ">{{ userMoney['totalToken'] || '0' }}</div>
                        <div class="com-text--white">通证（BB币）</div>
                      </div>

                    </div>
                  </div>

                </div>


              </div>

            </div>

          </div>
          <!--<div class="panel">
            <div class="panel&#45;&#45;inner  com-flex com-content&#45;&#45;between com-items&#45;&#45;center com-padding__lg">
              &lt;!&ndash;<router-link :to="{ name:'UserMoneyMessage' }" tag="div" class="aside com-text&#45;&#45;white"  >注意事项</router-link>&ndash;&gt;
              &lt;!&ndash;<div class="aside com-text&#45;&#45;white" >注意事项</div>&ndash;&gt;
              <div>
                <div class="com-text&#45;&#45;xl-xxx com-text&#45;&#45;white">{{  userMoney['totalToken'] || 0 }}</div>
                <div class="com-text&#45;&#45;white">通证（BB币）</div>
              </div>
              &lt;!&ndash;<div>
                <div class="vi-btn vi-btn&#45;&#45;orange" @click="_exchange_money('UserMoneyCash')">提现</div>
              </div>&ndash;&gt;
            </div>
          </div>-->
        </div>
        <div>
          <div class="com-text com-text--lg com-text--bold com-padding__lg--ad com-padding--bm">交易明细</div>
          <template v-if="tokenList.length > 0">
            <van-list v-model="token.push.loading"
                      :finished="token.push.finished"
                      @load="_push_load_more('token')"
                      :offset="30"
            >
              <div class="com-background com-padding__lg com-margin--bm vi-item "  v-for="(item,index) in tokenList " >

                <div class="com-flex com-content--between com-items--center com-margin__lg--bm">
                  <span class="com-text  com-text--bold">{{ item['type']}}</span>
                  <span class="com-text com-text--gray com-text--sm">{{ item['time'] }}</span>
                </div>

                <div class="com-flex com-content--between com-items--center">
                  <span class="com-text ">余额：{{ item['leftToken']}} BB币</span>
                  <span class="com-text ">{{ item['token'] }} BB币</span>
                </div>
              </div>
            </van-list>
            <div v-if="token.push.finished && tokenList.length > token.pageSize" class="com-text--light com-text--center com-padding__lg--ud"> ~没有更多兑换信息了~</div>
          </template>
          <template v-else>
            <div class="com-padding__lg--tp">
              <ListStatus content="~~无交易明细数据~~" title="无交易数据"></ListStatus>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
<style scoped>

</style>
