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
  <div class="vi-user-bank-card">
    <template>
      <div class="com-background com-padding__lg  com-flex com-content--between "  >
        <div class="com-text  com-text--bold">中国民生银行</div>
        <div class="com-text com-text--light">尾号8989储蓄卡</div>
      </div>
    </template>

    <template>
      <div class="com-background  com-padding__lg  com-flex--center   "  >
        <div class="com-text  com-text--bold com-text--theme " @click="$router.push({ name:'UserBankInsert'})">  + 添加银行卡</div>
      </div>
    </template>
  </div>
</template>
<style scoped></style>
