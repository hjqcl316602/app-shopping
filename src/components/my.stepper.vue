<!--步进器-->
<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  export default {
    name: "stepper",
    props: {
      min:{
        type:Number,
        default:0
      },
      max:{
        type:Number,
      },
      disabled:{
        type:Boolean,
        default:false
      },
      value:{
        type:Number
      },
    },
    data(){
      return {
        currentValue:0
      }
    },
    methods: {
      operate(type){
        if(this.disabled) return;


        if(type == 'increase'){
          if(this.max){
            this.currentValue = Math.min( ++this.currentValue,this.max);
          }else{
            this.currentValue++;
          }
        }else{
          this.currentValue = Math.max( --this.currentValue,this.min);
        }
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
  }
</script>
<template>
  <div class="my-stepper">
    <div class="com-flex com-items--center">
      <span class=" vi-icon vi-icon__minus" :class="{'vi-icon__minus--disabled':disabled || ( currentValue == min ) }" @click="operate('decrease')"></span>
      <span class="com-text com-text--lg com-padding--ad"  >{{  currentValue  }}</span>
      <span class="vi-icon vi-icon__add" :class="{'vi-icon__add--disabled':disabled || ( max && currentValue == max ) }" @click="operate('increase')"></span>
    </div>

  </div>
</template>
<style scoped></style>
