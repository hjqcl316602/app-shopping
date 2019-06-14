<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
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
                props: [],
                data(){
                        return {}
                },
                methods: {},
                watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
                destroy(){
                }
        }
</script>
<template>
  <div class="vi-user-team-junior">
    <template >
      <div class="com-margin--bm">
        <div class="com-flex com-padding__lg--ad com-padding--ud com-background">
          <span class="com-text com-text--bold" style="width:100px;">推荐人</span>
          <span class="com-flex__col--ao  ">黄军泉</span>
        </div>
        <div class="com-flex com-padding__lg--ad com-padding--ud com-background">
          <span class="com-text com-text--bold" style="width:100px;">姓名</span>
          <span class="com-flex__col--ao  ">颠三倒四</span>
        </div>
        <div class="com-flex com-padding__lg--ad com-padding--ud com-background">
          <span class="com-text com-text--bold" style="width:100px;">电话</span>
          <span class="com-flex__col--ao  ">138975655555</span>
        </div>
      </div>
    </template>

    <template>
      <div class="com-background com-padding__lg">
        <div class="com-text com-text--bold">验证码验证</div>
        <div class="com-padding__lg--ud com-flex com-items--center">
          <div class="com-flex__col--ao com-margin__lg--rt com-padding--ud com-border--bm">
            <van-field></van-field>
          </div>
          <div class="com-text--bold">发送验证码</div>
        </div>
      </div>

    </template>
    <template>
      <div class="com-padding__lg ">
        <div class="vi-btn__submit vi-btn--theme vi-btn--radius" @click="submit">确认保存</div>
      </div>
    </template>
  </div>
</template>
<style scoped></style>
