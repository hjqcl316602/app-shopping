<script type="text/ecmascript-6">
        import basic from '../Mixin/basic'
        export default {
                name: "",
                components: {},
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

                },
                mounted(){
                  //alert('mounted')
                },
                activated(){
                  //alert('activated')
                  this.login()
                },
                props: [],
                data(){
                        return {}
                },
                methods: {
                  login(){

                    let type = this.$route.query['type']; // 用于判断是否需要重定向

                    if( this.$configs['HTTP_LOCATION'] == 'localhost' ){
                      this.$cookies.set('webMemId',3);
                      this.$cookies.set('fromUser','76F1BE7DF322B355');
                    }else{

                    }

                    //来自 - 接口出现004（登录失效） 、 cookies中formUser不存在或cookies失效

                    // 若当前存在用户 - 则静默登录（调用一个接口即可）
                    // 若当前不存在用户 - 则重定向登录

                    let fromUser = this.$cookies.get('fromUser'),webMemId = this.$cookies.get('webMemId');
                    //alert(fromUser)
                    if( !!fromUser && !!webMemId ){
                      this.$get_login_message(webMemId,fromUser,true).then((data)=>{

                        this.$store.commit('auth_message',true);
                        //let jumpPath = this.$route.query['redirect'] ? this.$route.query['redirect'] : '/Main/Index';
                        //alert(jumpPath)
                        let jumpPath = sessionStorage.getItem('redirect') || '/Main/Index';
                        this.$router.replace({ path:jumpPath })
                      },(data)=>{
                        setTimeout(()=>{
                          this.redirect_login()
                        },1000)

                      })
                    }else{
                      this.redirect_login()
                    }
                  },
                  redirect_login(){
                    window.location.href = this.$configs['HTTP_REQUEST_SC'] + '/wxAuth/redirect.do?returnUrl=' + this.$route.fullPath + '&fromUser=' + sessionStorage.getItem('fromUser')  ;
                  }
                },
                watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
                destroy(){
                }
        }
</script>
<template>
  <div class="com-cover com-flex--center">
    <div class="com-text--xl-xxx com-text--gray" @click="">登录中...</div>
  </div>
</template>
<style scoped></style>
