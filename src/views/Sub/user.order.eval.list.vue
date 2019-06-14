<script type="text/ecmascript-6">
        import SubmitStatus  from './submit.status.vue'
        import UserOrderEval  from './user.order.eval.vue'
        export default {
                name: "",
                components: { SubmitStatus , UserOrderEval},
                beforeRouteEnter (to, from, next) {
                        next(vm=> {
                        })
                },
                beforeRouteLeave(to, from, next){
                  if(this.popup.eval_status ||  this.popup.eval){
                    this.popup.eval_status = false;
                    this.popup.eval = false;
                    next(false);
                  }else{
                    next();
                  }

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
                props: [],
                data(){
                        return {
                          popup:{
                            eval:false,
                            eval_status:false
                          }
                        }
                },
                methods: {
                  operate(type){
                    if(type == 'eval'){
                      this.popup.eval = true;
                    }else if(type == 'check'){
                      this.$router.push({ name : 'ShopEval'})
                    }
                  },
                  submit_status(value){
                    console.log(value)
                    this.popup.eval_status = true;
                  }
                },
                watch: {/*'': {handler(val, olval){}, deep: true} */},
                destroy(){
                }
        }
</script>
<template>
  <div class="vi-user-order-eval-list">
    <div class=" com-background com-padding com-flex com-items--center com-border--bm" v-for="item in 10">
      <div class="vi-order__img ">
        <img src="../../img/shopCar.png" alt="">
      </div>
      <div class="com-flex__col--ao com-padding--ad">
        <p class="com-text--lg com-text__height--md com-text__visible--two">三支书没带手机空间的三支书没带手机空间的三支书没带手机空间的三支书没带手机空间的</p>
        <p class="com-text--theme com-text__height--md">￥12.11</p>
        <p class="com-text--sm com-text--gray com-text__height--sm">口味：烧烤</p>
        <p class="com-text--sm com-text--gray com-text__height--sm">重量：500g</p>
      </div>
      <div class=" ">
        <div class="vi-btn__simple vi-btn--theme" v-if="item % 2 == 1" @click="operate('eval')">添加晒图</div>
        <div class="vi-btn__simple vi-btn--light" v-else @click="operate('check')">查看评论</div>
      </div>
    </div>

    <van-popup v-model="popup.eval"  position="right">
      <UserOrderEval @success="submit_status"></UserOrderEval>
    </van-popup>

    <van-popup v-model="popup.eval_status"  position="right">
      <SubmitStatus></SubmitStatus>
    </van-popup>

  </div>
</template>
<style scoped></style>
