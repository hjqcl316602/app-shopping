<script type="text/ecmascript-6">
  import address from '../Mixin/address'
  export default {
    name: "",
    mixins:[address],
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
      this.addressId = this.$route.query.addressId;
      if(this.addressId){
        this.get_address_detail()
      }
      this.$get_area().then(()=>{
        this.init_address_list();
      });
    },
    activated(){
    },
    computed:{
      areaList(){
        return this.$store.state.address.area
      }
    },
    data(){
      return {

        areaShow:false,
        addressId:'',
        params:{
          name:'',
          mobile:'',
          address:'',
          area:'',
          areaName:'',
          def:true
        },
        columns: [],
      }

    },
    methods: {

      get_address_detail(){
        this.$get_address_detail(this.addressId).then((response)=>{
          let address = response.data.address;
          this.params.name = address.name;
          this.params.mobile = address.mobile;
          this.params.address = address.address;
          this.params.area = address.area;
          this.params.areaName = address.areaName;
          this.params.def = ( address.default == 0 ) ? false :true ;
        })
      },


      valid_params(param){
        if(!param.name || param.name == ''){
          return '请填写收货人！'
        }else{
          if(!this.$valids.code_special(param.name)){
            return '收货人不能包含特殊字符！'
          }
        }

        if(!param.mobile || param.mobile == ''){
          return '请填写手机号码！'
        }else{
          if(!this.$valids.mobile(param.mobile)){
            return '手机号码格式不正确！'
          }
        }
        if(!param.areaName || param.areaName == ''){
          return '请选择所在地！'
        }
        if(!param.address || param.address == ''){
          return '请填写详细地址！'
        }else{
          if(this.$valids.code_len(param.address,4)){
            return '详细地址不少于5字！'
          }
          if(!this.$valids.code_special(param.address)){
            return '详细地址不能包含特殊字符！'
          }
        }
        return 'yes';

      },
      save_user_address(){
        let params = Object.assign({},this.params);
        params.def = this.params.def ? 1 : 0;
        let res = this.valid_params(params) ;
        if(res == 'yes'){
          if(this.addressId){
            params.addressId = this.addressId;
            params = this.$objects.remove(params,(item,i)=>{return  i == 'def'});
            this.$update_address(params).then(()=>{
              this.$toast('地址修改成功！');
              setTimeout(()=>{

                this.$router.go(-1);
              },500)
            },()=>{
              this.$toast('地址修改失败！')
            })
          }else{
            this.$insert_address(params).then(()=>{
              this.$toast('地址新增成功！');
              setTimeout(()=>{
                this.$router.go(-1);
              },500)
            },()=>{
              this.$toast('地址新增失败！')
            })
          }
        }else{
          this.$toast(res)
        }
      },

      // 地址数据的格式化
      object_format(obj){
        let arr = [];
        Object.keys(obj).forEach(key => {
          let newObj = {
            value:key,
            text:obj[key]
          };
          arr.push(newObj)
        });
        return arr;
      },

      //地址确认按钮
      select_confirm(value){
        this.areaShow = false;
        this.params.areaName = value[0]['text'] + value[1]['text'] + value[2]['text'];
        this.params.area = value[2]['value']  ;
      },


      //初始化地址数据
      init_address_list(){
        let province =this.areaList['0'];
        let new_province = this.object_format(province) ;
        let new_city = this.object_format(this.areaList['0,'+new_province[0]['value']]) ;
        let new_county  = this.object_format(this.areaList['0,'+new_province[0]['value']+','+  new_city[0]['value']]) ;

        this.columns['0'] = {
          values:new_province,
          className: 'column1'
        };
        this.columns['1'] = {
          values:new_city,
          className: 'column2'
        };
        this.columns['2'] = {
          values:new_county,
          className: 'column3'
        };
      },

      change_select_address(pick,values,index,ii){

        if(index == 0){
          let provinceValue= values[0]['value'];
          let city = this.object_format(this.areaList['0,'+ provinceValue] );
          let county = this.object_format(this.areaList['0,'+ provinceValue+','+city[0]['value']] );
          pick.setColumnValues(1, city );
          pick.setColumnValues(2, county );
        }else if(index == 1 ){
          let provinceValue= values[0]['value'];
          let cityValue = values[1]['value'];
          let county = this.object_format(this.areaList['0,'+ provinceValue + ','+ cityValue ] );
          pick.setColumnValues(2, county );
        }
      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true} */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-user-address-edit">


    <div class="com-margin--bm">
      <div class="vi-row--lg com-background com-flex  com-items--center com-padding__lg--ad">
        <div class="com-text--bold com-text   " style="width: 100px;">收货人</div>
        <div class="value">
          <van-field v-model="params.name" clearable placeholder="请输入收货人姓名"></van-field>
        </div>
      </div>
      <div class="vi-row--lg com-background    com-flex  com-items--center com-padding__lg--ad ">
        <div class="com-text--bold com-text "  style="width: 100px;">联系电话</div>
        <div class="value">
          <van-field v-model="params.mobile" clearable placeholder="请输入收货人联系电话"></van-field>
        </div>
      </div>
    </div>


    <div class="vi-row--lg com-background com-flex  com-items--center com-padding__lg--ad" >
      <div class="com-text--bold com-text "  style="width: 100px;">所在地</div>
      <div class=" com-flex__col--ao com-flex com-content--between com-items--center" @click="areaShow = true ">
        <span class="com-text  com-text--bold  van-ellipsis">{{ params.areaName }}</span>
        <span  class="com-text--lg com-flex com-items--center" >
          <span class="com-text com-text--gray " v-if="!params.areaName">请选择地区</span>
          <span class="com-text com-text--gray iconfont icon-iconfontjiantou2 "></span>
        </span>
      </div>
    </div>
    <!--<div class="vi-row&#45;&#45;lg com-background com-border&#45;&#45;bm vi-message__item">
      <div class="com-text&#45;&#45;lg com-text title">街道</div>
      <div class="value com-flex com-content&#45;&#45;between com-items&#45;&#45;center" @click="show = true ">
        <span class="com-text com-text&#45;&#45;lg com-text&#45;&#45;gray">{{ address }}</span>
        <span class="com-text&#45;&#45;lg">
          <span class="com-text com-text&#45;&#45;gray" v-if="!address">请选择街道</span>
          <span class="com-text  iconfont icon-arrow com-text&#45;&#45;gray"></span>
        </span>

      </div>
    </div>-->
    <div class="vi-row--lg com-background  com-padding__lg">
      <van-field v-model="params.address"
                 type="textarea"
                 placeholder="请填写详细地址，不少于5字"
                 rows="7"
                 autosize>

      </van-field>
    </div>

    <div class="vi-row--lg com-background  com-margin--tp com-content--between com-flex  com-items--center com-padding__lg--ad" v-if="!addressId">
      <div class="com-text--bold com-text ">设为默认</div>
      <van-switch v-model="params.def" />
    </div>
    <div class="com-padding__lg">
      <div class="vi-btn__submit vi-btn--theme vi-btn--radius com-text--bold" @click="save_user_address">保存</div>
    </div>

    <van-popup v-model="areaShow" position="bottom">
      <!--<div class="com-flex com-content&#45;&#45;between com-padding com-border&#45;&#45;bm">
        <div class="com-text com-text&#45;&#45;lg com-text&#45;&#45;gray" @click="show = false">取消</div>
        <div class="com-text com-text&#45;&#45;lg com-text&#45;&#45;theme" @click="popup_ok">完成</div>
      </div>-->
      <van-picker  show-toolbar title="所在地选择"  @cancel="show = false" @confirm="select_confirm" :columns="columns" @change="change_select_address"  ref="pick" text/>
    </van-popup>
  </div>
</template>
<style scoped></style>
