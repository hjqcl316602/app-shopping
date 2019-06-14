<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import  { ACTIVITY_DATE  } from '../../js/vue.config';
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
        type:Boolean
      },
    },
    data(){
      return {
        currentValue:false
      }
    },
    methods: {

      _close_popup(){
        this.currentValue = false
      },
      _jump_page(){
        this.currentValue = false;
        this.$router.push( { name :"Activity"})
      }
    },
    watch: {
      'value': {
        handler(val, olval){
          this.currentValue = val
        },
        deep: true ,
        immediate:true
      },
      currentValue(val){
        this.$emit('input',val)
      }
    },
    destroy(){
    }
  }
</script>
<template>
  <div class="van-popup-activity">
    <van-popup v-model="currentValue"  >
      <!--<router-link :to="{name:'Activity'}" tag="div" class="com-text&#45;&#45;theme">参与活动</router-link>
      <button @click="_close_popup">关闭</button>-->
      <div class="vi-activity-entry ">
        <div class="vi-pic vi-icon vi-icon--activity  com-text--center  ">
          <div class="com-text--center com-text--white-light" style="margin-top: 110px;"> ---  即日起至10月15日 --- </div>
          <!--<div class="com-text&#45;&#45;center com-text&#45;&#45;white-light" style="margin-top: 110px;"> -&#45;&#45;  即日起至10月15日 -&#45;&#45; </div>-->
          <div class="vi-act-btn " @click="_jump_page" style="margin-top: 42px;">
            立即参与
          </div>
        </div>
        <div class="com-text--center">
          <div class="vi-close vi-icon vi-icon--close com-margin__xl--tp" @click="_close_popup"></div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<style scoped>
  .van-popup{ background-color: transparent }
  .van-modal{ background-color:rgba(0,0,0,0.4)}
  .vi-activity-entry{ }
  .vi-activity-entry .vi-pic{ width: 225px;height:268px; border-radius: 10px;overflow: hidden;}
</style>
