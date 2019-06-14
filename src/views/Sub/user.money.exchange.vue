<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import basic  from '../Mixin/basic'
  import SendCode from '../components/send.code.vue'
  export default {
    name: "",
    components: { SendCode },
    mixins:[ basic ],
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
      userMessage(){
        let userMessage = this.$store.state.base.userMessage;
        return userMessage
      },
      tokenRate(){
        let tokenRate = this.$store.state.base['tokenRate'] ;
        return tokenRate
      },
      userMoney(){
        let userMoney = this.$store.state.base.userMoney;
        return userMoney
      }
    },
    data(){
      return {
        money:{
          show:false,
          active:''
        },
        params:{
          money:'',code:''
        }
      }
    },
    methods: {
      async _init_page(){
        await this.$get_user_message();
        await this.$get_wallet_info();
        await this.$get_wallet_bb_info();
      },
      input_keyboard(value){
        this.params.money += value ;
        this.params.money = this.params.money.replace(/[^\d\.]|^\./g, '').replace(/\.{2}/g, '.').replace(/^([1-9]\d*|0)(\.\d{1,2})(\.|\d{1})?$/, '$1$2').replace(/^0\d{1}/g, '0');
      },
      delete_keyboard(){
        this.params.money = this.params.money.substring(0,this.params.money.length - 1 )
      },

      _valid_params(param){

        if(!param.money || param.money == ''){
          return '请输入兑换的积点数！'
        }else{
          if( ( param.money*100 ) > this.userMoney['totalJd'] ){
            return '您的积点数不足！'
          }

          if(!this.$valids.number100(param.money)){
            return '请输入整百的兑换积点数！'
          }
        }

        if(!param.code || param.code == ''){
          return '验证码不能为空！'
        }else{
          if(!this.$valids.code_fixed_len(param.code,4)){
            return '请输入4位长度的验证码！'
          }
        }

        return 'yes'
      },

      _submit(){


        let message = this._valid_params(this.params);
        if(message=='yes'){
          this.$createConfirm({
            message:'确定兑换'+this.params.money+' 个积点？',
            onOk:_=>{
              this.$insert_wallet_bb_change(this.params).then((res)=>{
                setTimeout(()=>{
                  this.$router.replace({ name :'SubmitStatus',query:{ type :'achievement',status:'success',back:1,time:3}})
                },1000)
              },(err)=>{
                //this.$router.replace({ name :'SubmitStatus',query:{ type :'achievement',status:'success',back:1,time:3}})
                this.$toast(err['msg']);
              })
            }
          }).show();
        }else{
          this.$toast(message)
        }

        //this.$router.replace({ name :'SubmitStatus',query:{ type :'achievement',status:'success',back:1,time:20}})
      }
    },
    watch: {
      ['params.money'](val){
        this.money.active = ( Number(val) / this.tokenRate['value'] ).toFixed(4)
      }
    },
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-user-money-exchange">
    <template>
      <div class="com-background com-padding__lg com-margin--bm">
        <div class="com-text--bold  com-text--light">通证兑换比例</div>
        <div class="com-text--bold com-padding__lg com-text--xl-xx com-text--center">
          1个BB币 = {{ tokenRate['value'] || '0.0000' | str_token }}个积点
        </div>
      </div>
    </template>

    <div class="com-background com-padding__lg com-margin--bm">
      <div class="com-text com-text--bold com-text--light">积点数量<span class="com-text--light">(当前拥有 {{ userMoney['totalJd'] || 0 | str_money }}个积点)</span></div>
      <div class="com-padding__lg--ud  com-border--bm com-flex">
        <div class="com-flex__col--ao com-flex com-items--center" @click="money.show = true " style="height:30px;">
          <span class="  com-padding--lt com-text--xl-xxx" >{{ params.money }}</span>
          <span class="com-text--gray" v-if="!params.money"> 请输入整百积点数值</span>
        </div>

      </div>
      <div class="com-text com-text--theme com-margin--tp" v-if="!!params.money">预计可获得 {{ money.active || '0.0000' }} 个BB币</div>
    </div>
    <div class="com-margin--tp">

      <SendCode v-model="params.code" :mobile="userMessage.mobile" :send-type="3"></SendCode>
      <!--<div class="com-text com-text&#45;&#45;bold">验证码验证</div>
      <div class="com-padding__lg&#45;&#45;tp com-flex com-items&#45;&#45;center">
         <div class="com-flex__col&#45;&#45;ao com-margin__lg&#45;&#45;rt com-padding&#45;&#45;ud com-border&#45;&#45;bm">
            <van-field></van-field>
         </div>
        <div class="com-text&#45;&#45;bold">验证码发送</div>
      </div>
      <div class="com-text com-text&#45;&#45;theme com-padding&#45;&#45;ud">验证码已发送到13980464237，请注意查收</div>-->
    </div>
    <div class="com-padding__lg ">
      <div class="vi-btn__submit vi-btn--theme vi-btn--radius" @click="_submit">确认兑换</div>
    </div>

    <van-number-keyboard
      :show="money.show"
      extra-key=""
      close-button-text="完成"
      @blur="money.show = false"
      @input="input_keyboard"
      @delete="delete_keyboard"
      ref="money"
    />

  </div>
</template>
<style scoped></style>
