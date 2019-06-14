<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  //import basic  from '../Mixin/basic'

  export default {
    name: "",
    components: {},
    mixins: [],
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
      this._init_page()
    },
    activated(){
    },
    props: {
      options:{
        type:Array,
        default:_=>{

          return []
        }
      },
      value:{
        type:String,
        default:''
      },
      tabNum:{
        type:Number,
        default:4
      }
    },
    computed:{
      tabItems(){
        let options = [];

        this.options.forEach((item,i)=>{
          let obj = ( i == this.currentValue)  ? Object.assign(item,{active:true }) : Object.assign(item,{active:false});
          options.push(obj)
        });
        return options;
      }
    },
    data(){
      return {
        swipe:null,
        currentValue:'',
        items:[]
      }
    },
    methods: {
      _init_page(){

        this._set_order_type();
      },
      _init_options(){

      },

      _set_order_type(){

        this.$nextTick(()=>{
          let that = this;
          this.swiper = new Swiper('.swiper-container', {
            slidesPerView: that.tabNum,
            spaceBetween: 0,
            freeMode: false,
            centeredSlides: false,
            pagination: {
              clickable: true,
            },
            on:{
              slideChange:function(){
                //that.tab.centerIndex = this.realIndex ;
              }
            },
          });
        })
      },
      _change_swipe_tab(index){
        this.currentValue = index ;
        this.$emit('change',index)
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
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="vi-swiper-tab--item swiper-slide"  v-for="(item,index ) in tabItems" @click="_change_swipe_tab(index)">
        <span class="vi-swiper-tab--text van-ellipsis " :class="{'active':item.active}"> {{ item['name']}}</span>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
