<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        import {  mobile  } from '../js-package/app.valid'
        //import base  from '../Views/Mixin/base'
        export default {
                name: "",
                components: {},
                //mixins:[ base ],
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
                  }
                },
                data(){
                        return {
                          message:'发送验证码',
                          time:60,
                          active:true
                        }
                },
                methods: {

                },
                watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
                destroy(){
                }
        }
</script>
<template>
  <span class="com-text--bold" @click="send">{{ message }}</span>
</template>
<style scoped></style>
