
<!--// 使用v-if 才能有离开动画 v-show没有离开动画-->
<template>

  <van-popup v-model="isShow">
    <div class="my-dialog">
      <div class="my-dialog__header" v-if="!!title">{{ title }}</div>
      <div class="my-dialog__content">
        <div class="my-dialog__message " :class="{'my-dialog__message--has-title':title}">{{ message}}</div>
      </div>
      <div class=" my-dialog__footer my-dialog__footer--buttons com-border--tp">
        <button class="my-button my-button--default my-button--large my-dialog__confirm " @click="ok"><!---->
          <span class="my-button__text">
        {{ okText }}
      </span>
        </button>
      </div>
    </div>
  </van-popup>

</template>

<script type="text/ecmascript-6">
  export default {
    name:"notice",
    components: {},
    beforeRouteEnter (to, from, next) {
      //document.title = '搜索结果';
      next(vm=> {
        //console.log(vm);
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

      okText:{
        type:String,
        default:'确认'
      },
      title:{
        type:String,
      },
      message:{
        type:String,
        default:''
      }
    },
    data(){
      return {
        isShow:false
      }
    },
    methods: {
      hide(){
        this.isShow = false;
      },
      show(){
        this.isShow = true;
      },

      ok(){
        this.$emit('ok');
        this.hide();

      }
    },
    watch: {

    }
  }
</script>

<style scoped>
  .van-popup{ background-color: transparent }
</style>
