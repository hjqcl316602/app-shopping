<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        export default {
                name: "myTip",
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
                    type:Boolean,
                    default:false
                  },
                  okText:{
                    type:String,
                    default:'确认'
                  },
                  title:{
                    type:String,
                  },
                  content:{
                    type:String,
                    default:''
                  },
                  btn:{
                    type:Boolean,
                    default:true
                  }
                },
                data(){
                        return {
                          currentValue:false
                        }
                },
                methods: {
                  ok(){
                    this.currentValue = false;
                    this.$emit('ok')
                  }
                },
                watch: {
                  'value': {
                    handler(val, olval){
                      this.currentValue = val;
                    },
                    deep: true,
                    immediate:true
                  },
                  currentValue(val){
                    this.$emit('input',val)
                  },
                },
                destroy(){
                }
        }
</script>
<template>
   <div class="my-tip">
     <van-popup v-model="currentValue" @click-overlay="currentValue = false "  >
         <div class="my-tip__panel" >
           <slot name="title" >
             <div class="my-tip__title" v-if="title">{{ title }}</div>
           </slot>
           <div class="my-tip__body">
             <slot name="content" >
               <div class="my-tip__content" v-if="content">{{ content }}</div>
             </slot>
           </div>
           <slot name="btn" >
             <div class="my-tip__btn"  @click="ok" v-if="btn">{{ okText }}</div>
           </slot>
         </div>
     </van-popup>
   </div>
</template>
<style scoped>
  .van-popup{ background-color: transparent ;}
</style>
