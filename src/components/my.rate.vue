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
                props: {
                  value:{
                    type:Number,
                    default:0
                  }
                },
                data(){
                        return {
                           rate:[1,1,1,1,1]
                        }
                },
                methods: {

                },
                watch: {/*'': {handler(val, olval){}, deep: true} */},
                destroy(){
                }
        }
</script>
<template>
  <div class="my-rate">
    <span class="iconfont icon-xingxing1 " v-for="(item ,index) in rate" :class="{'icon-xingxing1': item == 0 ,'icon-xingxing': item == 1  }"></span>
  </div>
</template>
<style scoped></style>
