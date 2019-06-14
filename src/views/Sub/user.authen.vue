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
       this.$get_user_message();
    },
    mounted(){
    },
    activated(){
    },
    computed:{
      userMessage(){
        let userMessage = this.$store.state.base.userMessage;
        return userMessage
      }
    },
    data(){
      return {

        popup:{
          show:false
        },
        params:{
          realName:"",
          mobile:'',
          cardNo:'',
          bank:'',
          bankName:'',
          randCode:'',
        },
        code:{
          active:false
        }
      }
    },
    methods: {
      popup_ok(){
        this.$save_user_message(this.params).then((res)=>{

          if(res['data'] == true){
            this.$router.replace({ name :'SubmitStatus',query:{ status:'success',type:'authen',time:3 ,back: 1 }})
          }else{
            this.$toast('确保验证码输入正确！')
          }
        },()=>{
          this.$toast('保存失败！')
        })
      },
      submit(){
        let message = this.valid_params(this.params);

        if(message == 'yes'){
          this.popup.show = true ;
        }else{
          this.$toast(message)
        }
        //this.$router.replace({ name :'SubmitStatus',query:{ type :'bank',status:'success',back:1,time:20}})
      },
      get_bank_detail(cardNo){
        this.params.bank = '';
        this.params.bankName = '';
        this.$get_bank_detail(cardNo).then((data)=>{
          this.params.bankName = data['data']['bankName'];
          this.params.bank = data['data']['bank'];

        },(error)=>{
          if(error['code'] == '002'){
            this.$toast('银行卡非法！')
          }else if(error['code'] == '003'){
            this.$toast('银行卡位数必须在12至25位之间！')
          }else{
            this.$toast('银行卡格式有误！')
          }
        })
      },


      valid_params(param){
        if(!param.realName || param.realName == ''){
          return '请输入姓名！'
        }else{
          if(!this.$valids.code_special(param.realName)){
            return '姓名不能包含特殊字符！'
          }
        }

        if(!param.mobile || param.mobile == ''){
          return '请输入电话号码！'
        }else{
          if(!this.$valids.mobile(param.mobile)){
            return '电话号码格式错误！'
          }
        }

        if(!param.randCode || param.randCode == ''){
          return '验证码不能为空！'
        }else{
          if(!this.$valids.code_fixed_len(param.randCode,4)){
            return '请输入4位长度的验证码！'
          }
        }

        if(!param.cardNo || param.cardNo == ''){
          return '请输入卡号！'
        }else{
          if(!this.$valids.numbers(param.cardNo)){
            return '银行卡号格式错误！'
          }
        }

        if(!param.bank || param.bank == ''){
          return '开户行获取失败！'
        }
        return 'yes';
      },

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div>
    <template v-if="(userMessage.mobile && userMessage.cardNo)"> <!--v-if="!(userMessage.mobile && userMessage.cardNo)"-->
      <div class="com-background com-fluid">
        <div class="com-padding__lg--ad  vi-row--lg     com-flex com-items--center">
          <div class=" com-text com-text--light" style="width:100px">姓名</div>
          <div class="com-flex__col--ao">
            <span class="com-text com-text--bold">{{ userMessage.realName}}</span>
          </div>
        </div>
        <div class="com-padding__lg--ad  vi-row--lg     com-flex com-items--center">
          <div class=" com-text com-text--light" style="width:100px">电话号码</div>
          <div class="com-flex__col--ao">
            <span class="com-text com-text--bold">{{ userMessage.mobile }}</span>
          </div>
        </div>
        <div class="com-padding__lg--ad  vi-row--lg     com-flex com-items--center">
          <div class=" com-text com-text--light" style="width:100px">银行卡号</div>
          <div class="com-flex__col--ao">
            <span class="com-text com-text--bold">{{ userMessage.cardNo }}</span>
          </div>
        </div>
        <div class="com-padding__lg--ad  vi-row--lg     com-flex com-items--center">
          <div class=" com-text com-text--light" style="width:100px">开户行</div>
          <div class="com-flex__col--ao">
            <span class="com-text com-text--bold">{{ userMessage.bankName }}</span>
          </div>
        </div>
      </div>

    </template>
    <template  v-else>
      <template>
        <my-tip v-model="popup.show"  title="请仔细确认您的信息！" @ok="popup_ok">
          <div slot="content">
            <div class="com-padding--ad com-padding--bm">
              <div class=" com-flex com-text com-text__height--lg"><div style="width: 80px" class="com-text--right com-padding--rt com-text--light">姓名</div><div class="com-flex__col--ao">{{ params.realName }}</div></div>
              <div class=" com-flex com-text com-text__height--lg"><div style="width: 80px" class="com-text--right com-padding--rt com-text--light">手机号码</div><div class="com-flex__col--ao">{{ params.mobile }}</div></div>
              <div class=" com-flex com-text com-text__height--lg"><div style="width: 80px" class="com-text--right com-padding--rt com-text--light">卡号</div><div class="com-flex__col--ao">{{ params.cardNo }}</div></div>
              <div class=" com-flex com-text com-text__height--lg"><div style="width: 80px" class="com-text--right com-padding--rt com-text--light">开户行</div><div class="com-flex__col--ao">{{ params.bankName }}</div></div>
            </div>
            <span class=""></span>
          </div>
        </my-tip>
      </template>

      <div class="com-padding__lg--ad  vi-row--lg    com-background com-flex com-items--center">
        <div class=" com-text com-text--bold com-text--light" style="width:100px">姓名</div>
        <div class="com-flex__col--ao">
          <van-field type="text" v-model="params.realName" clearable placeholder="请输入姓名"></van-field>
        </div>
      </div>

      <div class="com-padding__lg--ad  vi-row--lg    com-background com-flex com-items--center">
        <div class=" com-text com-text--bold com-text--light" style="width:100px">电话号码</div>
        <div class="com-flex__col--ao">
          <van-field type="tel" v-model="params.mobile" clearable placeholder="请输入电话号码"></van-field>
        </div>
      </div>
      <template>
        <div class="com-margin--tp">
          <SendCode v-model="params.randCode" :mobile="params.mobile" :send-type="1"></SendCode>
        </div>
      </template>



      <div class="com-padding__lg--ad vi-row--lg    com-background com-flex com-items--center">
        <div class=" com-text com-text--bold com-text--light" style="width:100px">银行卡号</div>
        <div class="com-flex__col--ao">
          <van-field type="tel" v-model="params.cardNo" clearable placeholder="请输入卡号" @blur="get_bank_detail(params.cardNo)"></van-field>
        </div>
      </div>

      <div class="com-padding__lg--ad vi-row--lg    com-background com-flex com-items--center com-content--between">
        <div class=" com-text com-text--bold com-text--light" style="width:100px">开户行</div>
        <div class="com-flex__col--ao com-flex com-content--between com-items--center" >
          <span class="com-text com-text--bold">{{ params.bankName }}</span>
          <!--<span class="com-text&#45;&#45;lg">
            <span class="com-text com-text&#45;&#45;gray">请选择</span>
            <span class="link iconfont icon-iconfontjiantou2 com-text&#45;&#45;gray com-text&#45;&#45;md"></span>
          </span>-->
        </div>
      </div>

      <div class="com-padding__lg--ad com-padding--ud" >
        <span class="com-text--light">请填写真实的姓名和银行卡号,以便于系统为您打款</span>
      </div>

      <div class="com-padding__lg ">
        <div class="vi-btn__submit vi-btn--theme vi-btn--radius" @click="submit">确认保存</div>
      </div>

    </template>
  </div>
</template>
<style scoped></style>
