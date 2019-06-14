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
  <div class="vi-user-history">
    <div class="">
      <div class="item com-background com-padding__lg   com-margin--bm  " v-for="item in 20">
        <div class="com-flex com-content--between">
          <div class="com-text   com-text--bold">兑换到金额</div>
          <div class="com-text com-text--gray com-text--sm">2016-04-12 16:11</div>
        </div>
        <div class="com-text--md com-text--bold com-text--right com-margin--tp">-100BB币</div>

        <div class="com-flex com-content--between">
          <div class="com-text  com-text--sm com-text--right">余额：200BB币</div>
          <div class="com-text   com-text--bold com-text--right">(获得1400人民币)</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
