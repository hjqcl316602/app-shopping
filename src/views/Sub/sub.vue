<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        export default {
                name: "pageSub",
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
                watch: {/*'': {handler(val, olval){}, deep: true} */},
                destroy(){
                }
        }
</script>
<template>
  <div class="com-cover">
    <keep-alive>
      <router-view ></router-view>
    </keep-alive>

  </div>
</template>
<style scoped></style>
