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
<div class="vi-user-team">
  <template>
    <div class="com-margin--tp com-background com-padding__lg--ad com-border--ud">
      <div class="vi-user__cell vi-row--lg com-border--bm   com-flex  com-content--between com-items--center"
           @click="$router.push({ name :'UserTeamJunior' })"
      >
        <span class="com-text  com-text--bold">下级代理</span>
        <span class="link iconfont icon-arrow com-text--gray com-text--md"></span>
      </div>

      <div class="vi-user__cell vi-row--lg com-border--bm   com-flex  com-content--between com-items--center"
           @click="$router.push({ name :'UserTeamJuniorInsert' })"
      >
        <span class="com-text  com-text--bold">添加代理</span>
        <span class="link iconfont icon-arrow com-text--gray com-text--md"></span>
      </div>

      <div class="vi-user__cell vi-row--lg com-flex  com-content--between com-items--center"
           @click="$router.push({ name :'UserTeamExamine' })"
      >
        <span class="com-text  com-text--bold">代理审核</span>
        <span class="link iconfont icon-arrow com-text--gray com-text--md"></span>
      </div>
    </div>
  </template>
</div>
</template>
<style scoped></style>
