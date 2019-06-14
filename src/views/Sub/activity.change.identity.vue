<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        import activity  from '../Mixin/activity'
        import basic  from '../Mixin/basic'
        export default {
                name: "",
                components: {},
                mixins:[ activity , basic ],
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
                  this.$get_wallet_info();
                },
                mounted(){

                },
                activated(){
                },
                computed:{
                  userMoney(){
                    return this.$store.state.base['userMoney']
                  },
                },
                data(){
                        return {
                          logo:"即可开始赚钱"
                        }
                },
                methods: {
                  _set_pay_agency(){
                    this.$set_pay_agency().then((res)=>{
                      this.$toast('支付成功！恭喜您成为黑铁会员！')
                      sessionStorage.setItem('redirect', '/Main/Index');
                      this.$router.replace({ path: '/SubPage/SubLogin' });
                    },()=>{
                      this.$toast('支付失败！')
                    })
                  }
                },
                watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
                destroy(){
                }
        }
</script>
<template>
<div class="com-fluid com-background--assist com-flex--center vi-bg vi-bg--act-change">
  <div class="com-flex com-direction--column">
    <div class="com-text--white com-text--bold com-text--xl-x  com-border--bm white com-text__height--xl">支付10个BB币成为黑铁会员</div>
    <div class="com-flex com-content--between ">
      <p v-for="(item,index) in logo.split('')" class="com-text--aux--yellow com-text--xl-x com-text__height--xl">{{ item }}</p>
    </div>
    <div class="vi-btn__submit com-background--aux-yellow com-text--bold com-text--info com-text--lg com-radius" style="margin-top: 80px" @click="_set_pay_agency">立即支付</div>
    <div class="com-text--white com-text--center com-text--bold com-padding--tp">账户余额：{{ userMoney['totalToken'] || 0 }}BB币</div>
  </div>
</div>
</template>
<style scoped></style>
