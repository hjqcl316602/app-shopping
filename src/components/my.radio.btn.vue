<script type="text/ecmascript-6">
  export default {
    name:'radio-btn',
    props: {
      options:{
        type:Array,
        default:_=>{
          return []
        }
      },
      value:{}
    },
    data(){
      return {
        currentValue:''
      }
    },
    methods: {
      operate(item){
        this.currentValue = item.value ;
      }
    },
    watch: {
      'value': {
        handler(val, olval){
          console.log(val==0)
          this.currentValue = val;
        },
        deep: true,
        immediate:true
      },
      currentValue(val){
        this.$emit('input',val)
      },
    },
  }
</script>
<template>
  <div class="my-radio">
    <div class="item" :class="{ 'active':item.value ==  currentValue }" v-for="item in options" @click="operate(item)">{{ item.name }}</div>
  </div>
</template>
<style scoped></style>
