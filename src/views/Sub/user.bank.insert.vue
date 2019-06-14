<script type="text/ecmascript-6">
  import base  from '../Mixin/basic'
  export default {
    name: "",
    components: {},
    mixins:[ base ],
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
      this.get_bank_detail('62305204600336974 ')
    },
    activated(){
    },
    props: [],
    data(){
      return {
        sms:"",
        show:false,
        address:'',
        columns: [
          {text:'中国民生银行',value:'1'},{text:'华夏银行',value:'2'},{text:'中国光大银行',value:'3'},{text:'中信实业银行',value:'4'},
          {text:'中国银行',value:'5'},{text:'中国建设银行',value:'6'},{text:'恒丰银行',value:'7'},{text:'上海浦东发展银行',value:'8'},
          {text:'交通银行',value:'9'},{text:'浙商银行',value:'10'},{text:'兴业银行',value:'11'},{text:'深圳发展银行',value:'12'},
          {text:'招商银行',value:'13'},{text:'广东发展银行',value:'14'},{text:'中国工商银行',value:'15'},{text:'中国农业银行',value:'16'},
          {text:'邮政储蓄银行',value:'17'},
        ],
        cropper:{
          img:''
        },
        params:{
          name:"",
          card:'',
          type:''
        }
      }
    },
    methods: {

      submit(){
        let message = this.valid_params(this.params);
        this.$toast(message)
        //this.$router.replace({ name :'SubmitStatus',query:{ type :'bank',status:'success',back:1,time:20}})
      },
      select_card(value){
        console.log(value)
        this.params.type = value.value;
        this.params.typeValue = value.text;
        this.show = false ;
      },
      get_bank_detail(cardNo){
        console.log('11')
        this.$get_bank_detail(cardNo).then((data)=>{
            this.params.type = data['data']['bankName']
        },(error)=>{
          console.log(error)
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
        if(!param.name || param.name == ''){
          return '请输入姓名！'
        }
        if(!param.card || param.card == ''){
          return '请输入卡号！'
        }else{
          if(!this.$valids.numbers(param.card)){
            return '银行卡号格式错误！'
          }
        }
        if(!param.typeValue || param.typeValue == ''){
          return '请选择银行类型！'
        }
        return 'yes';
      },
    },
    watch: {/*'': {handler(val, olval){}, deep: true} */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-user-bank-insert">

    <div class="com-padding__lg--ad com-padding--ud" >
      <span class="com-text--light">请绑定持卡人本人的银行卡</span>
    </div>

    <div class="com-padding__lg--ad  vi-row--lg    com-background com-flex com-items--center">
      <div class=" com-text com-text--bold" style="width:100px">姓名</div>
      <div class="com-flex__col--ao">
        <van-field type="text" v-model="params.name" clearable placeholder="请输入姓名"></van-field>
      </div>

    </div>

    <div class="com-padding__lg--ad vi-row--lg    com-background com-flex com-items--center">
      <div class=" com-text com-text--bold" style="width:100px">银行卡号</div>
      <div class="com-flex__col--ao">
        <van-field type="tel" v-model="params.card" clearable placeholder="请输入卡号" @blur="get_bank_detail(params.card)"></van-field>
      </div>
    </div>

    <div class="com-padding__lg--ad vi-row--lg    com-background com-flex com-items--center com-content--between">
      <div class=" com-text com-text--bold" style="width:100px">开户行</div>
      <div class="com-flex__col--ao com-flex com-content--between com-items--center" >
        <span class="com-text com-text--bold">{{ params.type}}</span>
        <!--<span class="com-text&#45;&#45;lg">
          <span class="com-text com-text&#45;&#45;gray">请选择</span>
          <span class="link iconfont icon-iconfontjiantou2 com-text&#45;&#45;gray com-text&#45;&#45;md"></span>
        </span>-->
      </div>
    </div>

    <div class="com-padding__lg ">
      <div class="vi-btn__submit vi-btn--theme vi-btn--radius com-text--bold" @click="submit">确认保存</div>
    </div>

    <van-popup v-model="show" position="bottom">
      <van-picker  show-toolbar title="银行类型选择"  @cancel="show = false" @confirm="select_card" :columns="columns"   ref="pick" text/>
    </van-popup>
  </div>
</template>
<style scoped></style>
