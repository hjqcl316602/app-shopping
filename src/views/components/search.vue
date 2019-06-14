<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  export default {
    name: "search",
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
        type:String
      },
    },
    data(){
      return {
        currentValue:''
      }
    },
    methods: {
      search(){
        if(this.currentValue){
          this.$emit('search',this.currentValue)
        }else{
          this.$toast('请您输入搜索关键词');
        }

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
  <div class="co-search">
    <div class="co-search--input">
      <div class="vi-icon vi-icon__scale-big com-padding--ad com-margin--lt"></div>
      <input type="text" v-model="currentValue" placeholder="搜索" @keyup.enter="search">
      <span class="co-search--icon com-text iconfont icon-delete com-text--lg" v-if="currentValue" @click=" currentValue = '' "></span>
    </div>
    <div class="co-search--message">
      <span class="" @click="search"  >搜索</span>
    </div>
  </div>
</template>
<style scoped>
  .co-search input[type=text]::placeholder{
    font-weight: 800;
    color: #cecece;
  }
</style>
