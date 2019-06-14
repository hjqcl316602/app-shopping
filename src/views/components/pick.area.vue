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
      this.$nextTick(()=>{

      })
      setTimeout(()=>{
        this.get_address_list();
      },1000)

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
        areaList:{},
        columns: [
          {
            values:[],className:"column1"
          },{
            values:[],className:"column2"
          },{
            values:[],className:"column3"
          }
        ]
      }
    },
    methods: {

      object_format(obj){
        let arr = []
        Object.keys(obj).forEach(key => {
          let newObj = {
            value:key,
            text:obj[key]
          };
          arr.push(newObj)
        });
        return arr;
      },
      init_address_list(){
        let province =this.areaList['0'];
        let province_format = this.object_format(province) ;
        console.log(province_format)
        let city_format = this.object_format(this.areaList['0,'+province_format[0]['value']]) ;
        console.log(city_format)
        let county_format = this.object_format(this.areaList['0,'+province_format[0]['value']+','+ city_format[0]['value']]) ;
        console.log(county_format)
        this.columns['0'] = {
          values:province_format,
          className: 'column1'
        };
        this.columns['1'] = {
          values:city_format,
          className: 'column2'
        };
        this.columns['2'] = {
          values:county_format,
          className: 'column3'
        };
        console.log(this.columns)
      },

      get_address_list(){
        this.$request({
          url:this.API.AREALIST
        }).then((reponse)=>{
          this.areaList =  reponse.data;
          this.init_address_list();
        });


      },
      select_confirm(){

      },
      save_user_address(){

      },
      change_select_address(pick,values,index){
        console.log(pick)
        console.log(values)
        console.log(index)
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
  <div class="v-pick-area">
    <van-popup v-model="currentValue" position="bottom">
      <van-picker  show-toolbar title="所在地选择"  @cancel="currentValue = false" @confirm="select_confirm" :columns="columns" @change="change_select_address"  ref="pick" text/>
    </van-popup>
  </div>
</template>
<style scoped></style>
