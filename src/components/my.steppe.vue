<!--步进器-->
<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  export default {
    name: "steppe",
    props: {
      num:{
        type:Number
      },
      min:{
        type:Number,
        default:0
      },
      max:{
        type:Number
      },
      disabledPlus:{
        type:Boolean,
        default:false
      },
      disabledMinus:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {}
    },
    methods: {
      operate(type){
        if(type == 'increase'){
          this.$emit('plus')
        }else{
          this.$emit('minus')
        }
      }
    },
    watch: {},
  }
</script>
<template>
  <div class="my-stepper ">
    <div class="com-flex com-items--center">
      <span class="vi-icon vi-icon__minus" :class="{'vi-icon__minus--disabled': disabledMinus || num == min }" @click="operate('decrease')"></span>
      <span class="com-text com-text--lg com-padding--ad "  >{{ num }}</span>
      <span class="vi-icon vi-icon__add" :class="{'vi-icon__add--disabled': disabledPlus || num == max }" @click="operate('increase')"></span>
    </div>

  </div>
</template>
<style scoped></style>
