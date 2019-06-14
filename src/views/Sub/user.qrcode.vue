<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import basic  from '../Mixin/basic'
  import QRCode from 'qrcodejs2'
  import PopupShare from '../components/popup.share.vue'
  import wx from 'weixin-js-sdk'
  import { set_wx_share } from '../../js/vue.wx'
  export default {
    name: "",
    components: { QRCode ,PopupShare  },
    mixins:[ basic ],
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

      //this.set_share();
    },
    activated(){
    },
    computed:{
      loginMessage(){
        let loginMessage = this.$store.state.base.loginMessage;
        return loginMessage
      },
    },

    data(){
      return {

        fromUserMem:'',
        fromUserMemId:'',
        fromUserName:'',
        userMem:'',
        userMemId:'',
        userName:'',
        popup:{
          show:false
        },
        code:{
          isSuccess:false
        }


      }
    },
    methods: {
      get_qrcode(){

        this.$createLoading().show()
        this.$get_qrcode(  this.userMem ).then((res)=>{
          let url = res['data']['url'];
          this.set_qrcode(url).then(()=>{
            setTimeout(()=>{
              this.code.isSuccess = true;

              if(!this.fromUserMem){
                this.popup.show = true;
              }

              this.$createLoading().hide();
            },100)
          })
        },()=>{
          this.$createLoading().hide()
          this.$toast('获取二维码失败！')
        })
      },
      set_qrcode(url){
        return new Promise((resolve,reject)=>{
          let offsetHeight = document.getElementById('qrcode').offsetHeight;
          let offsetWidth = document.getElementById('qrcode').offsetWidth;

          let qrcode = new QRCode('qrcode', {
            width: offsetWidth,     // 设置宽度
            height: offsetHeight,   // 设置高度
            text: url,
          });
          resolve()
        });
      },

      set_share(){
        let link = `${this.$configs['HTTP_WEB'] }?/SubPage/UserQrcode?memid=${this.userMemId}&fromUser=${this.userMem }`;
        let obj = {
          title:'【贝斯特链】百万团购助力活动',
          desc:this.userName+'邀请您加入团购活动，比拼更方便！',
          imgUrl:'http://image.bstchain.com/label.jpg',
          link: link ,
           //${ configs.HTTP_WEB }?/SubPage/OrderDetail?goodid=295&fromUser=12121212121
          //link:`${configs.HTTP_WEB }?/SubPage/OrderDetail?goodid=${this.good.detail['goodId'] }&fromUser=${this.$cookies.get('fromUser')}`
          //configs.HTTP_WEB + '?/SubPage/UserQrcode?fromUserId='+ this.fromUserId + '&fromUserName=' + this.fromUserName,
          //'扫描二维码，加入“' + this.fromUserName+'”的团队，推广、购买，都是投资，享受平台红利！'
        };
        set_wx_share(obj)
      },
      open_share_popup(){
        this.popup.show = true;
        this.set_share();
      }
    },
    watch: {
      'loginMessage': {
        handler(val, olval){

          if(!!val['fromUser']){ // 当拿到用户id时才继续
            /*let fromUserMessage = this.$route.query['message'] && this.$route.query['message'].split('user');//将拼装的参数拆开
            this.fromUser =  fromUserMessage && fromUserMessage[0] ;      // 用于判断是否是分享过来的用户
            this.fromUserId = this.fromUser || val['fromUser'];
            this.fromUserName = ( fromUserMessage && unescape(fromUserMessage[1]) ) || val['webNickname'];
            document.title = this.fromUserName + '的二维码';*/

            this.fromUserMem =  this.$route.query['fromUser'];      // 用于判断是否是分享过来的用户
            this.fromUserMemId =  this.$route.query['memid'];

            this.userMem = this.fromUserMem || val['fromUser'];
            this.userMemId = this.fromUserMemId || val['webMemId'];


            this.get_qrcode();

            if(this.fromUserMem){
              this.$get_user_message(this.fromUserMemId).then((data)=>{
                //alert(JSON.stringify(data))
                this.userName = data['data']['nickName'];
                document.title = this.userName + '的二维码';
                this.set_share();
              })
            }else{
              this.userName = val['webNickname'];
              document.title = this.userName  + '的二维码';
              this.set_share();
            }
          }
        },
        deep: true,
        immediate:true
      },
    },
    destroy(){
      //http://wx.gsb01.com/sc/index.html?/SubPage/UserQrcode?fromUserId=76F1BE7DF322B355&fromUserName=hjq&from=single
    }
  }
</script>
<template>

  <div class="vi-transition__hide" :class="{'vi-transition__show':code.isSuccess}"> <!--:class="{'vi-transition__show':code.isSuccess}"-->
    <div class="vi-qrcode  vi-qrcode-share" >

      <div class="vi-qrcode-inner">
        <div class="vi-ratio ">
          <div class="vi-ratio__outer" data-ratio="436:414">
            <div class="vi-ratio__inner com-padding__lg">
              <div class="com-cover com-padding vi-qrcode-box">
                <div class="vi-qrcode-content" id="qrcode">
                  <div class="vi-qrcode-img"><img src="../../img/logo.png" alt=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vi-qrcode-footer" v-if="fromUserMem">
        <div class="com-cover com-background vi-qrcode-footer--inner">
            <p class="com-text--danger">参与方式：长按识别二维码加入 [{{ userName }}] 的团队，参与平台的团购活动</p>
        </div>
      </div>
    </div>
    <PopupShare v-model="popup.show"></PopupShare>
    <!--<div class="  com-flex&#45;&#45;center  vi-user-qrcode " :class="{ 'vi-user-qrcode&#45;&#45;to':fromUserMem,'vi-user-qrcode&#45;&#45;from':!fromUserMem}">
      <div class="content">
        <div class="code">
          <div class="code-box">
            <div class="code-box&#45;&#45;inner"  id="qrcode">
              <div class="code-img" v-if="code.isSuccess">
                <img src="../../img/logo.png" alt="">
              </div>
            </div>
          </div>
        </div>

        <div class="code-share-btn" @click="open_share_popup" v-if="!fromUserMem"></div>
        <div class="com-flex&#45;&#45;center com-margin__lg&#45;&#45;tp" v-if="fromUserMem">
          <div class="com-flex com-items&#45;&#45;center">
            <div class="vi-icon vi-icon__notice com-margin&#45;&#45;rt"></div>
            <div class="com-flex__col&#45;&#45;ao">
              <div class="com-text&#45;&#45;theme ">长按识别二维码</div>
              <div class="com-text&#45;&#45;theme ">加入{{ userName }}的团队，参与平台团购活动</div>
            </div>
          </div>
        </div>
      </div>

      <PopupShare v-model="popup.show"></PopupShare>
    </div>-->
  </div>



</template>
<style scoped>
  .vi-user-qrcode{ height:100vh;}
  .vi-user-qrcode .content{
    width: 45vw;padding-top: 100px;
  }
  .vi-user-qrcode .code{
    padding-top: 100%;position: relative;
  }
  .vi-user-qrcode .code-box{
    position: absolute;left:0;top:0;width:100% ;height: 100%;display: flex;justify-content: center;align-items: center;background-color: #fff;padding: 15px;
    border-radius: 4px;
  }
  .code-box--inner{
    width:100%;height: 100%;position: relative;overflow: hidden;
  }

  .code-box--inner .code-img{
    position: absolute;left: 50%;top:50%;width: 40px;height: 40px;transform: translate(-50%, -50%);background-color: #fff;padding: 5px;border-radius: 4px;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
  }
  .code-box--inner .code-img img{ width: 100% ; height: 100%;border-radius: 4px;}

  .code-share-btn{
    position: fixed;bottom: 0;left:0;right:0;height:150px;width: 100%;
  }
</style>
