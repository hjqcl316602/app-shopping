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
                  options:{
                    type:Array,
                    default:()=>{
                      return []
                    }
                  },
                  value:{
                    type:String
                  },
                },
                data(){
                        return {
                          currentValue:''
                        }
                },
                methods: {
                  change_tab(item){
                    this.currentValue = item.value
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
  <div class="my-tab">
    <div class="my-tab__item " :class="{'my-tab__item--active':item.value == currentValue }" v-for="(item,index) in options" @click="change_tab(item)">
      <span class="my-tab__item--content">{{ item.text }}</span>
    </div>
  </div>
</template>
<style scoped>

</style>
