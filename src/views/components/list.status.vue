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
                  cover:{
                    type:Boolean,
                    default:false
                  },
                  title:{
                    type:String,
                    default:"暂无数据"
                  },
                  content:{
                    type:String,
                    default:"什么也没有找到哦~~"
                  },
                  status:{
                    type:String,
                    default:"normal"
                  }
                },
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
  <div class="vi-list-status" :class="{'cover':cover}">
    <div class="inner">
      <div class="com-text--center" style="padding-bottom: 50px">
        <div class="vi-icon vi-icon__empty "
             :class="{'vi-icon--car':status =='car','vi-icon--order':status=='order','vi-icon--normal':status == 'normal'}"
        ></div>
        <div class="com-text--lg com-text--bold com-text__height--lg">{{ title }}</div>
        <div class=" com-text--light">“{{ content }}”</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
