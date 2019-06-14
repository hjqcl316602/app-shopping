<script type="text/ecmascript-6">
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
     this._init_page()
    },
    mounted(){

    },
    activated(){
    },
    computed: {
      userMessage(){
        let userMessage = this.$store.state.base.userMessage;
        return userMessage
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
          value:''
        },
        params:{
          card:'',
          money:'',
          code:''
        },
        tipMessage:{
          show:false
        }
      }
    },
    methods: {

      async _init_page(){
        await this.$get_user_message();
        await this.$get_wallet_info();
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
              this.$insert_wallet_money_change(this.params).then((res)=>{
                setTimeout(()=>{
                  this.$router.replace({ name :'SubmitStatus',query:{ type :'achievement',status:'success',back:1,time:3}})
                },1000)
              },(err)=>{
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
      ['params.code'](val){
        console.log(val)
        this.params.code = val.replace(/[^0-9]/g, '');
      }
      /*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-user-cash">



    <!--<template>
      <div class="com-background  com-padding__lg  com-flex&#45;&#45;center   "  >
        <div class="com-text  com-text&#45;&#45;bold com-text&#45;&#45;theme " @click="$router.push({ name:'UserBankInsert'})">  + 添加银行卡</div>
      </div>
    </template>-->
    <template>
      <div class="com-background com-padding__lg com-margin--bm">
        <div class="com-text--bold  com-text--light">现金兑换比例</div>
        <div class="com-text--bold com-padding__lg com-text--xl-xx com-text--center">
          1人民币 = 1个积点
        </div>
      </div>

    </template>

    <template>
      <div class="com-background com-padding__lg com-margin--bm">
        <div class="com-text com-text--bold com-text--light">积点数量<span class="com-text--light"> (当前拥有 {{ userMoney['totalJd'] || 0 | str_money }}个积点)</span></div>
        <div class="com-padding__lg--ud  com-border--bm com-flex">
          <div class="com-flex__col--ao com-flex com-items--center" @click="money.show = true " style="height:30px;">
            <span class="com-padding--lt com-text--xl-xxx" >{{ params.money }}</span>
            <span class="com-text--gray" v-if="!params.money"> 请输入整百积点数值</span>
          </div>
        </div>
        <div class="com-text  com-margin--tp com-text--theme" v-if="!!params.money">可兑换 {{ params.money || '0' }} 元现金</div>
      </div>
    </template>

    <template>
      <div class="com-background com-padding__lg  com-margin--bm"  >
        <div class="com-text  com-text--bold com-text--light">银行卡</div>
        <div class="com-text com-text--bold com-padding com-text__height--lg">
          {{ userMessage['bankName'] || 'xxxx'}}(尾号 {{ userMessage['cardNo'] && userMessage['cardNo'].substring( userMessage['cardNo'].length -4 ) || 'xxxx' }} 储蓄卡)
          <div class="com-text--gray">1~3个工作日内到账</div>
        </div>

      </div>
    </template>

    <template>
      <div class=" com-margin--tp   ">
        <SendCode v-model="params.code" :mobile="userMessage.mobile" :send-type="2"></SendCode>

        <!--<div class="com-text com-text&#45;&#45;bold">验证码验证</div>
        <div class="com-padding__lg&#45;&#45;ud com-flex com-items&#45;&#45;center">
          <div class="com-flex__col&#45;&#45;ao com-margin__lg&#45;&#45;rt com-padding&#45;&#45;ud com-border&#45;&#45;bm">
            <van-field type="tel" v-model="params.code"></van-field>
          </div>
          <div class="com-text&#45;&#45;bold"><my-code></my-code></div>
        </div>
        <div class="com-text&#45;&#45;danger com-text&#45;&#45;sm">验证码已发送到您的手机13980764585，请注意查收</div>-->
      </div>
    </template>

    <template>
      <div class="com-padding__lg ">
        <div class="vi-btn__submit vi-btn--theme vi-btn--radius" @click="_submit">确认提现</div>
      </div>
    </template>


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
<style scoped>
  .num-box{
    border: 1px solid #dedede ;display: block;height:30px;width: 30px;margin-right: 5px;;
  }
</style>
