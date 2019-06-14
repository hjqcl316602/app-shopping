<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        export default {
                name: "",
                components: {},
                beforeRouteEnter (to, from, next) {
                    next(vm=> {
                      vm.change_title()
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

                  this.status = this.$route.query.status;
                  this.type = this.$route.query.type;
                  this.back = this.$route.query.back;
                  this.time = this.$route.query.time;
                  if(this.back == 1){
                    this.auto_jump();
                  }
                },
                activated(){
                },
                props: [],
                data(){
                        return {
                           time:3,
                           status:'',
                           type:'',
                        }
                },
                methods: {
                  auto_jump(){
                    var timer = setInterval(()=>{
                      if(this.time == 0){
                          clearInterval(timer);
                          this.$router.go(-1)
                      }else{
                        this.time --;
                      }
                    },1000);
                  },
                  change_title(to){
                    if(this.type == 'authen'){
                      document.title = '信息添加成功'
                    }else if(this.type == 'pay'){
                      document.title = '支付成功'
                    }

                  }
                },
                watch: {/*'': {handler(val, olval){}, deep: true} */},
                destroy(){
                }
        }
</script>
<template>
  <div class="vi-submit-status  com-background">
    <div class="vi-cover com-flex com-items--center com-content--center ">

      <template v-if="  type == 'pay' &&  status == 'success'">
        <div class="com-flex__col--8">
          <div class="com-text iconfont icon-gouxuan com-text--theme com-text--center" style="font-size: 70px;"></div>
          <div class="com-text com-text--xl com-text--theme com-margin--tp com-text--center">支付成功</div>
          <div class="com-text com-text__height--md com-text--gray com-text--center com-margin--tp">
            您的订单已生成可在订单中查看详情
          </div>
          <div class="com-text--lg com-text--center com-text--bold" style="margin-top: 60px;"><span class="com-text com-text--theme com-text--bold">{{ time }}s</span>后自动跳转</div>
        </div>
      </template>
      <template v-if="  type == 'pay' &&  status == 'fail'">
        <div class="com-flex__col--8">
          <div class="com-text iconfont icon-quxiao com-text--danger com-text--center" style="font-size: 70px;"></div>
          <div class="com-text com-text--xl com-text--danger com-margin--tp com-text--center">支付失败</div>
          <div class="com-text com-text__height--md com-text--gray com-text--center com-margin--tp">
            请检查网络，重新支付~
          </div>
        </div>
      </template>

      <template v-if="  type == 'achievement' &&  status == 'success'">
        <div class="">
          <div class="com-text iconfont icon-gouxuan com-text--theme com-text--center" style="font-size: 70px;"></div>
          <div class="com-text com-text--xl com-text--theme com-margin--tp com-text--center com-text--lg ">信息已提交</div>
          <div class="com-text com-text__height--md com-text--gray com-text--center com-margin--tp">
            信息提交成功<br>我们会在1~3个工作日审核
          </div>
          <div class="com-text--lg com-text--center com-text--bold" style="margin-top: 60px;"><span class="com-text com-text--theme com-text--bold">{{ time }}s</span>后自动跳转</div>
        </div>
      </template>
      <template v-if="  type == 'achievement' &&  status == 'fail'">
        <div class="">
          <div class="com-text iconfont icon-quxiao com-text--danger com-text--center" style="font-size: 70px;"></div>
          <div class="com-text com-text--xl com-text--danger com-margin--tp com-text--center">支付失败</div>
          <div class="com-text com-text__height--md com-text--gray com-text--center com-margin--tp">
            请检查网络，重新支付~
          </div>
        </div>
      </template>

      <template v-if="  type == 'authen' ">
        <template v-if="status == 'success'">
          <div class="">
            <div class="com-text iconfont icon-gouxuan com-text--theme com-text--center" style="font-size: 70px;"></div>
            <div class="com-text com-text--xl com-text--theme com-margin--tp com-text--center com-text--lg ">信息添加成功</div>
          <!--  <div class="com-text com-text__height&#45;&#45;md com-text&#45;&#45;gray com-text&#45;&#45;center com-margin&#45;&#45;tp">
              信息提交成功<br>我们会在1~3个工作日审核
            </div>-->
            <div class="com-text--lg com-text--center com-text--bold" style="margin-top: 60px;"><span class="com-text com-text--theme com-text--bold">{{ time }}s</span>后自动跳转</div>
          </div>
        </template>
        <template v-if="status == 'fail'">
          <div class="">
            <div class="com-text iconfont icon-quxiao com-text--danger com-text--center" style="font-size: 70px;"></div>
            <div class="com-text com-text--xl com-text--danger com-margin--tp com-text--center">信息添加失败</div>
            <div class="com-text com-text__height--md com-text--gray com-text--center com-margin--tp">
              请检查网络，重新提交~
            </div>
          </div>
        </template>
      </template>

    </div>
  </div>
</template>
<style scoped></style>
