<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        export default {
                name: "search",
                props: {
                  value:{
                    type:String
                  },
                },
                data(){
                        return {
                          currentValue:'',

                        }
                },
                methods: {
                  search(){
                    this.$emit('search',this.currentValue  )
                  },

                },
                watch: {
                  'value': {
                    handler(val, olval){
                        this.currentValue = val
                    },
                    deep: true ,
                    immediate:true
                  } ,
                  currentValue(val){
                    this.$emit('input',val)
                  }
                },

        }
</script>
<template>
  <div class="my-search ">
     <div class="my-search--inner">
       <span class="iconfont icon-sousuo1x my-search--icon"></span>
       <van-field v-model="currentValue" @keyup.native.enter="search" clearable></van-field>
     </div>

      <div class="my-search--message" @click="search">搜索</div>
  </div>
</template>
<style scoped></style>
