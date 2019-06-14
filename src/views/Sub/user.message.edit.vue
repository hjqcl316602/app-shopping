<script type="text/ecmascript-6">
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
                props: [],
                data(){
                        return {
                          sms:"",
                          show:false,
                          address:'',
                          columns: [
                            {text:'111',value:'111'},{text:'222',value:'222'},{text:'333',value:'333'},{text:'444',value:'444'}
                          ],
                          cropper:{
                            img:''
                          },
                          params:{
                            head:''
                          }
                        }
                },
                methods: {
                  onChange(picker, value, index) {
                    //this.$toast(`当前值：${value}, 当前索引：${index}`);

                  },
                  onConfirm(value){
                    this.show = false;
                    console.log(value)
                  },
                  save_user_message(){
                    this.$dialog.confirm({
                      message: '弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容'
                    }).then(() => {
                      // on confirm
                    }).catch(() => {
                      // on cancel
                    });
                  },
                  change_file(e){
                    this.cropper.img = this.$getImageBlob(e.target.files[0]);
                    this.$refs.cropper.show();
                    e.target.value = '';
                  },
                  get_cropper_img(data){
                    this.params.head = data
                  }
                },
                watch: {/*'': {handler(val, olval){}, deep: true} */},
                destroy(){
                }
        }
</script>
<template>
  <div class="vi-user-message-edit">
    <div class="vi-row--lg com-border--bm vi-message__item com-padding--ud com-margin--bm">
      <div class="com-text--lg com-text title">头像</div>
      <div class="value com-flex com-content--end com-items--center">
        <label for="input" class="vi-img__box vi-img--head">
          <img :src="params.head" alt="">
          <input type="file" id="input" style="display: none" @change="change_file" accept="image/*">
        </label>
        <!--<span class="com-text  iconfont icon-arrow com-text&#45;&#45;gray"></span>-->
      </div>
    </div>

    <div class="vi-row--lg com-border--bm vi-message__item">
      <div class="com-text--lg com-text title ">姓名</div>
      <div class="value">
         <van-field></van-field>
      </div>
    </div>
    <div class="vi-row--lg com-border--bm vi-message__item" >
      <div class="com-text--lg com-text title">开户银行</div>
      <div class="value com-flex com-content--between com-items--center" @click="show = true ">
        <span class="com-text com-text--lg com-text--gray">中国银行</span>
        <span class="com-text--lg">
          <span class="com-text com-text--gray">请选择银行类型</span>
          <span class="com-text  iconfont icon-arrow com-text--gray"></span>
        </span>
      </div>
    </div>
    <div class="vi-row--lg com-border--bm vi-message__item com-margin--bm">
      <div class="com-text--lg com-text title">银行卡号</div>
      <div class="value">
        <van-field></van-field>
      </div>
    </div>

    <div class="vi-row--lg com-border--bm vi-message__item">
      <div class="com-text--lg com-text title">真实姓名</div>
      <div class="value">
        <van-field></van-field>
      </div>
    </div>
    <div class="vi-row--lg com-border--bm vi-message__item">
      <div class="com-text--lg com-text title">微信号码</div>
      <div class="value">
        <van-field v-model="sms" clearable></van-field>
      </div>
    </div>

    <div class="vi-btn__submit vi-btn--theme com-margin__lg--tp" @click="save_user_message">保存</div>

    <van-popup v-model="show" position="bottom">
      <!--<div class="com-flex com-content&#45;&#45;between com-padding com-border&#45;&#45;bm">
        <div class="com-text com-text&#45;&#45;lg com-text&#45;&#45;gray" @click="show = false">取消</div>
        <div class="com-text com-text&#45;&#45;lg com-text&#45;&#45;theme" @click="popup_ok">完成</div>
      </div>-->
      <van-picker  show-toolbar title="银行类型选择"  @cancel="show = false" @confirm="onConfirm" :columns="columns"   ref="pick" text/>
    </van-popup>

    <MyCropper ref="cropper" :img="cropper.img" @ok="get_cropper_img"></MyCropper>
  </div>
</template>
<style scoped></style>
