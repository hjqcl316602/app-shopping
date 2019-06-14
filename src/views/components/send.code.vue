<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        import { mobile } from '../../js-package/app.valid'
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
                props: {
                  mobile:{
                    type:String
                  },
                  value:{
                    type:String
                  },
                  sendType:{
                    type:Number
                  }
                },
                data(){
                  return {
                    currentValue:'',
                    message:'发送验证码',
                    time:60,
                    active:true, // 用于判断是否需要再次发送验证码
                    status:false    // 用于message提示显示
                  }
                },
                methods: {
                  valid_mobile(val){
                    if(!val || val == ''){
                      return '请输入电话号码！'
                    }else{
                      if(!mobile(val)){
                        return '电话号码格式错误！'
                      }
                    }
                    return 'yes'
                  },
                  send(){
                    let message = this.valid_mobile(this.mobile) ;
                    if(message == 'yes' || this.sendType != 1){

                      let obj = { type:this.sendType };
                      if(this.sendType == 1){
                        obj['mobile'] = this.mobile;
                      }

                      if(this.active){
                        this.active = false;
                        this.status = false ;

                        this.$request({
                          url:this.API.GETRANDCODE,
                          loading:false,
                          data:obj
                        }).then((reponse)=>{
                          this.status = true

                          this.message = this.time + 's后发送';
                          let timer = setInterval(()=>{
                            if(this.time == 0){
                              this.message = '发送验证码';
                              this.time = 60;
                              clearInterval(timer);
                              this.active = true;
                            }else{
                              this.time --;
                              this.message = this.time + 's后发送';
                            }
                          },1000)

                        },(error)=>{
                          this.active = true;
                          this.$toast('获取验证码信息失败');
                        })
                      }
                    } else{
                      this.$toast(message)
                    }
                  }
                },
                watch: {
                  'value': {
                    handler(val, olval){
                      this.currentValue = val;
                    },
                    deep: true,
                    immediate:true
                  },
                  currentValue(val){
                    this.$emit('input',val)
                  },
                },
                destroy(){
                }
        }
</script>
<template>
  <div class="com-background com-padding__lg">
    <div class="com-text com-text--bold com-text--light">验证码验证</div>
    <div class="com-padding__lg--ud com-flex com-items--center">
      <div class="com-flex__col--ao com-margin__lg--rt com-padding--ud com-border--bm">
        <van-field type="tel" v-model="currentValue" clearable placeholder="请输入验证码"></van-field>
      </div>
      <div class="com-text--bold" @click="send">{{ message }}</div>
    </div>
    <div class="com-text--danger com-text--sm" v-if="status">验证码已发送到您的手机{{ mobile }}，请注意查收</div>
  </div>
</template>
<style scoped></style>
