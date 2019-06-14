

<script type="text/ecmascript-6">
  //import Header  from './components/navbar.vue'
  import base  from '../Mixin/basic'
  import order  from '../Mixin/order'
  export default {
    name: "",
    components: {},
    mixins:[ base,order ],
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
      console.log(this.$configs)
    },
    activated(){
        this._init_page();
    },
    computed:{
      userMessage(){
        let userMessage = this.$store.state.base.userMessage;
        return userMessage
      },
      loginMessage(){
        return this.$store.state.base['loginMessage']
      },
      orderNum(){
        return this.$store.state.order.orderNum;
      }
    },
    data(){
      return {
        user:{
          head:''
        },
        customer:''
      }
    },
    methods: {
      async _init_page(){
        await this.$get_user_message();
        await this.$get_order_num();
        let customer = await this.$get_customer();
        this.customer = customer['data']
      },
      _jump_page(route,status){
        this.$router.push({ name :route,query:{ status:status }})
      },
      _get_admin_phone(){
        window.location.href = `tel://${this.customer}`;
      },
      _clear_cookies(){
        let fromUserOld = this.$cookies.get('fromUser');
        this.$createConfirm({
          message:'确定删除用户'+ fromUserOld +'？',
          onOk:_=>{
            this.$cookies.remove('fromUser');
            if(!this.$cookies.get('fromUser')){
              this.$toast('成功删除用户！');
              setTimeout(()=>{
                sessionStorage.setItem('redirect',this.$route.fullPath);
                this.$router.push({ path: '/SubPage/SubLogin' });
              },1000)
            }
          }
        }).show();

      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true} */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-user">
    <template>
      <div class=" com-flex com-content--between com-items--center com-background com-padding__lg--ad " style="height:150px;">
        <div class="com-flex com-items--center">

          <div class="vi-img__box vi-img--head">
            <img :src="loginMessage['webHeadimgurl']" alt="">
            <img class='vi-img--error'src="../../img/error-head.png" alt="">
          </div>

          <div class="com-padding--lt">
            <p class="com-text__height--lg com-text--lg com-text--bold">{{ userMessage.realName || userMessage.nickName || '暂无' }}</p>
            <p class="com-text--sm com-text--light">{{ userMessage.mobile }}</p>
          </div>
        </div>
        <div>
          <!--<div class="vi-btn__simple vi-btn&#45;&#45;white"  @click="jump_page('UserMessageEdit')">编辑</div>-->
        </div>
      </div>
    </template>
    <template>
      <div class="com-margin--tp  com-background">
        <div class="com-padding__lg--ad ">
          <div class="vi-user__cell vi-row--lg    com-flex  com-content--between" @click="_jump_page('UserOrder',0)">
            <div class="com-flex com-items--center">

              <span class="com-text title  com-text--bold">我的订单</span>
            </div>
            <div class="com-flex com-items--center">
              <span class="com-text  com-margin--rt com-text--gray">全部订单</span>
              <span class="com-text link iconfont icon-iconfontjiantou2 com-text--gray com-text--md"></span>
            </div>
          </div>
        </div>
        <div class="com-padding com-background vi-user__order ">
          <div class="vi-user__order--item pay" @click="_jump_page('UserOrder',1)">
            <div class="com-text--center">
              <div class="icon com-flex--center">
                <span class="badge com-text com-text--mi-sm com-text--center" style="line-height: 18px;" v-if="orderNum.payNum != 0">
                  {{ orderNum.payNum }}
                </span>
              </div>
            </div>
            <span class="com-text__height--lg com-text--sm">待付款</span>
          </div>
          <div class="vi-user__order--item delivery" @click="_jump_page('UserOrder',2)">
            <div class="com-text--center">
              <div class="icon com-flex--center">
                <span class="badge com-text com-text--mi-sm com-text--center" style="line-height: 18px;" v-if="orderNum.deliveryNum != 0">
                  {{ orderNum.deliveryNum }}
                </span>
              </div>
            </div>
            <span class="com-text__height--lg com-text--sm">待发货</span>
          </div>
          <div class="vi-user__order--item collect" @click="_jump_page('UserOrder',3)">
            <div class="com-text--center">
              <div class="icon com-flex--center">
                <span class="badge com-text com-text--mi-sm com-text--center" style="line-height: 18px;" v-if="orderNum.collectNum != 0">
                  {{ orderNum.collectNum }}
                </span>
              </div>
            </div>
            <span class="com-text__height--lg com-text--sm">待收货</span>
          </div>
          <div class="vi-user__order--item evaluation" @click="_jump_page('UserOrder',4)">
            <div class="com-text--center">
              <div class="icon com-flex--center">
                <span class="badge com-text com-text--mi-sm com-text--center" style="line-height: 18px;" v-if="orderNum.evaluationNum != 0">
                  {{ orderNum.evaluationNum }}
                </span>
              </div>
            </div>
            <span class="com-text__height--lg com-text--sm">待评价</span>
          </div>
        </div>
      </div>
    </template>


    <template>
      <div class="com-margin--tp  com-padding__lg--ad com-background">

        <div class="vi-user__cell vi-row--lg    com-flex  com-content--between" @click="_jump_page('UserMoney')">

          <div class="com-flex com-items--center">
            <div class="vi-icon-label vi-icon__money"></div>
            <span class="com-text title com-padding--lt com-text--bold">我的钱包</span>
          </div>
          <div class="com-flex com-items--center">
            <span class="link iconfont icon-iconfontjiantou2 com-text--gray com-text--md"></span>
          </div>
        </div>

        <template v-if="  loginMessage['webMemType']  == 2 ">
          <div class="vi-user__cell vi-row--lg    com-flex  com-content--between" @click="_jump_page('UserTeamJunior')">
            <div class="com-flex com-items--center">
              <div class="vi-icon-label vi-icon__team"></div>
              <span class="com-text title com-padding--lt com-text--bold">我的团队</span>
            </div>
            <div class="com-flex com-items--center">
              <span class="link iconfont icon-iconfontjiantou2 com-text--gray com-text--md"></span>
            </div>
          </div>
        </template>

        <template v-if="  loginMessage['webMemType']  == 2 "> <!---->
          <div class="vi-user__cell vi-row--lg    com-flex  com-content--between" @click="_jump_page('UserQrcode')">
            <div class="com-flex com-items--center">
              <div class="vi-icon-label vi-icon__code"></div>
              <span class="com-text title com-padding--lt com-text--bold">我的二维码</span>
            </div>
            <div class="com-flex com-items--center">
              <span class="link iconfont icon-iconfontjiantou2 com-text--gray com-text--md"></span>
            </div>
          </div>
        </template>

      </div>
    </template>

    <template>
      <div class="com-margin--tp  com-background com-padding__lg--ad">
        <div class="vi-user__cell vi-row--lg    com-flex  com-content--between" @click="_jump_page('UserAuthen')">
          <div class="com-flex com-items--center">
            <div class="vi-icon-label vi-icon__card"></div>
            <span class="com-text title com-padding--lt com-text--bold">信息认证</span>
          </div>
          <div class="com-flex com-items--center">

            <template v-if=" (userMessage.mobile && userMessage.cardNo)">
              <span class="com-text--gray com-padding--rt" >已认证</span>
            </template>
            <template v-else>
              <span class="com-text--theme com-padding--rt com-text--bold">去认证</span>
            </template>

            <span class="link iconfont icon-iconfontjiantou2 com-text--gray com-text--md"></span>
          </div>
        </div>



        <div class="vi-user__cell vi-row--lg    com-flex  com-content--between" @click="_jump_page('UserAddress')">
          <div class="com-flex com-items--center">
            <div class="vi-icon-label vi-icon__address"></div>
            <span class="com-text title com-padding--lt com-text--bold">收货地址</span>
          </div>
          <div class="com-flex com-items--center">
            <span class="link iconfont icon-iconfontjiantou2 com-text--gray com-text--md"></span>
          </div>
        </div>

        <div class="vi-user__cell vi-row--lg    com-flex  com-content--between" @click="_get_admin_phone">
          <div class="com-flex com-items--center">
            <div class="vi-icon-label vi-icon__phone"></div>
            <span class="com-text title com-padding--lt com-text--bold" >客服电话</span>
          </div>
          <div class="com-flex com-items--center">
            <span class="com-text com-text--gray com-margin--rt">{{  customer}}</span>
            <span class="link iconfont icon-iconfontjiantou2 com-text--gray com-text--md"></span>
          </div>
        </div>
        <div class="vi-user__cell vi-row--lg    com-flex  com-content--between" @click="_clear_cookies" v-if="$configs['HTTP_LOCATION'] ==  'localhost' || $configs['HTTP_LOCATION'] ==  'dev' " >
          <div class="com-flex com-items--center">
            <div class="vi-icon-label vi-icon__phone"></div>
            <span class="com-text title com-padding--lt com-text--bold" >清除缓存</span>
          </div>
          <div class="com-flex com-items--center">
            <span class="link iconfont icon-iconfontjiantou2 com-text--gray com-text--md"></span>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>
<style scoped></style>
