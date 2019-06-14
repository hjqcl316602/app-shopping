<script type="text/ecmascript-6">
  import wx from 'weixin-js-sdk'
  import axios from 'axios'
  import order from '../Mixin/order'
  export default {
    name: "userOrderEval",
    components: {   },
    mixins:[ order ],
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
      this.init_page();
    },
    activated(){
    },
    props: [],
    data(){
      return {
        evals:[],
        querys:{
          sn:'',businessOrderNum:'',come:''
        },
        good:{
          list:[]
        },
        imgLenMax:5,
      }
    },
    methods: {
      init_page(){
        this.querys = Object.assign(this.querys,this.$route.query);

        this.$get_order_detail({sn:this.querys.sn,businessOrderNum:this.querys.businessOrderNum}).then((response)=>{
          let list  = response.data['detailList'] || [];

          // 添加参数 分数 描述 是否匿名 图片组
           list.forEach((item,i)=>{
             item = Object.assign(item,{ grade:5,content:'',pics:[],isAnonymous:1,showPics:[] })
           })
          this.good.list = list;
        },()=>{
          this.$toast('获取订单详情失败！')
        })

        //this.$set_wx_api(['uploadImage','chooseImage','getLocalImgData','previewImage']);
      },

      //保存
      save_comment(){
        let params = [];
        this.good.list.forEach((item,i)=>{
          let obj = {
            grade:item.grade,content:item.content,pics:item.pics.join(','),isAnonymous:item.isAnonymous,orderDetailId:item.orderDetailId
          };
          params.push(obj)
        });
        this.$insert_comment(params).then(()=>{
          setTimeout(()=>{
            this.$router.go(-1);
          },200);
          this.$toast('评价成功！');
        },()=>{
          this.$toast('评价失败！');
        })

      },
      //删除图片
      del_pic(index,index_child){
        this.good.list[index].pics.splice(index_child,1);
        this.good.list[index].showPics.splice(index_child,1);
      },
      // 选择图片
      sel_pic(index) {
        let _this = this;
        wx.chooseImage({
          count:  (this.imgLenMax - this.good.list[index]['showPics'].length), // 默认9
          sizeType: ['original', 'compressed'],   // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],        // 可以指定来源是相册还是相机，默认二者都有
          success:  (res)=> {
            let localIds = res.localIds;            // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            //alert(JSON.stringify(localIds))
            this.upload_img(localIds,index);
          },
          fail:(res)=>{
           this.$toast('图片选择失败！')
          }
        });
      },
      upload_img(localIds,index){
        let _this = this;
        let localId = localIds.pop(); // 得到数组的最后一条
        this.$createLoading().show();
        wx.uploadImage({
          localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 0, // 默认为1，显示进度提示
          success:  (res) =>{
            let serverId = res.serverId; // 返回图片的服务器端ID
            this.good.list[index].pics.push(serverId);
            //兼容ios
            if(navigator.userAgent.indexOf('iPhone') > -1){
              this.get_img_iphone(localId,index).then((url)=>{
                this.good.list[index].showPics.push(url)
              },()=>{})
            }else{
              this.good.list[index].showPics.push(localId);
            }

            if(localIds.length > 0){
              this.upload_img(localIds,index);
            }else{
              this.$createLoading().hide();
            }
          },
          fail:()=>{
            this.$toast('上传图片失败！')
          }
        });
      },
      get_img_iphone(localId) {
        return new Promise((resovle,reject)=>{
          wx.getLocalImgData({
            localId: localId,
            success: (res)=> {
              //alert(JSON.stringify(res));
              var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
              localData = localData.replace('image/jgp', 'image/jpeg');
              resovle(localData);
            },
            fail:()=>{
              this.$toast('上传图片失败！')
              reject()
            }
          });
        })
      },
      change_anonymous(index){
        this.good.list[index].isAnonymous = Math.abs(this.good.list[index].isAnonymous - 1);
      }
    },
    watch: {
      'imgList': {handler(val, olval){
        //alert(JSON.stringify(val))
      }, deep: true }
    },
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-user-order-eval   vi-footer__content">
    <div class="com-background" v-for="(item,index) in good.list" :key="index">
      <div class=" com-background com-padding com-flex com-items--center com-border--bm"  >
        <div class="vi-img__box vi-img--order">
          <img :src="item.pic" alt="">
          <img src="../../img/icon-error.png" class="vi-img--error" alt="">
        </div>
        <div class="com-flex__col--ao com-padding--ad">
          <p class="com-text--lg com-text__height--md com-text__visible--two">{{ item['goodName']}}</p>
          <p class="com-text--theme com-text__height--md">￥{{ item['price'] | str_money}}</p>
          <p class="com-text--sm com-text--gray com-text__height--sm">{{ item.specsName}}</p>
        </div>
      </div>
      <div class="com-background com-padding com-flex com-items--center ">
        <div class="com-text com-text--gray com-text--lg">餐品评分：</div>
        <div class="">
          <van-rate v-model="item.grade" :size="24"></van-rate>
        </div>
        <span class="com-text com-text--gray com-text--lg com-padding--lt">{{ item.grade | str_grade }}</span>
      </div>
      <div class="com-background com-padding ">
        <van-field v-model="item.content"
                   type="textarea"
                   placeholder="餐品满足您的期待么？说说你的用餐感受，分享给想买的他们吧"
                   rows="7"
                   autosize>

        </van-field>
      </div>
      <div class="com-background com-padding  com-flex com-wrap">
        <div class="vi-img__box vi-img--upload com-margin--rt com-margin--bm com-position--re" v-for="(pic,pic_index) in item.showPics">
          <div class="vi-upload__del" @click="del_pic(index,pic_index)">
            <span class="iconfont icon-delete com-text--xl"></span>
          </div>
          <img :src="pic" alt="">
        </div>
        <div class="vi-upload com-flex--center" @click="sel_pic(index)" v-if="item.showPics.length < imgLenMax">
          <span class="iconfont icon-iconfontadd com-text--gray-border com-text--xl-xx"></span>
        </div>
      </div>
      <div class="com-background com-padding  vi-row--lg com-flex com-content--between com-items--center">
        <div  @click="change_anonymous(index)">
          <span class="com-text  iconfont icon-gouxuan com-margin--rt  com-text--lg" :class="{ ' com-text--gray ' : item.isAnonymous == 1 ,'com-text--theme':item.isAnonymous == 0}"></span>
          <span class="com-text com-text--dark com-text--lg">匿名</span>
        </div>
        <div class="com-text com-text--gray com-text--lg">你写的评价会以匿名的形式展现 </div>
      </div>

    </div>


    <div class="vi-footer">
      <div class="vi-btn__submit vi-btn--theme com-text--bold" @click="save_comment">发布</div>
    </div>
  </div>
</template>
<style scoped></style>
