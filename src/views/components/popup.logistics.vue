<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import Clipboard from 'clipboard';
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
        currentValue:false,
        order:'12456787878787'
      }
    },
    methods: {
      copy(){
        let clipboard = new Clipboard('.copy-btn')
        clipboard.on('success', e => {
          this.$toast('复制成功！')
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          this.$toast('复制失败！')
          clipboard.destroy()
        })
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
  <div class="van-popup-logistics">
    <van-popup v-model="currentValue"  >
        <div class="my-dialog">
            <div class="my-dialog__header com-text com-text--lg com-text--left com-padding--lt com-text--bold" > 物流信息</div>
            <div class="my-dialog__content">
              <div class="item com-flex com-content--between com-items--center com-padding" v-for="item in 3">
                  <div class="">
                    <div class="com-text com-text__height--lg">韵达快递单号</div>
                    <div class="">1245755454545</div>
                  </div>
                <div class="">
                  <button class="copy-btn vi-btn__simple vi-btn--theme2"
                          :data-clipboard-text = "order"
                          @click="copy"
                  >复制单号</button></div>
              </div>
            </div>
        </div>
    </van-popup>
  </div>
</template>
<style scoped>
  .van-popup{ background-color: transparent }
  .my-dialog { width:  90vw ; max-width: 90vw ; }
</style>
