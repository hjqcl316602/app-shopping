<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import basic  from '../Mixin/basic'
  import activity  from '../Mixin/activity'
  import QRCode from 'qrcodejs2'
  import PopupShare from '../components/popup.share.vue'
  import wx from 'weixin-js-sdk'
  import { set_wx_share } from '../../js/vue.wx'
  export default {
    name: "",
    components: { QRCode ,PopupShare  },
    mixins:[ basic ,activity],
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
       this.$get_award_list();
    },
    mounted(){

    },
    activated(){
    },
    computed:{
      awardList(){
        return this.$store.state.activity.awardList
      },
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
        },
      }
    },
    methods: {
      _get_code(){

        this.$createLoading().show();
        this.$get_qrcode(  this.userMem ).then((res)=>{
          let url = res['data']['url'];
          this._set_code(url).then(()=>{
            setTimeout(()=>{
              this.code.isSuccess = true;
              if( !this.$route.query['memid']){
                this.popup.show = true ;
              }

              this.$createLoading().hide();
            },200)
          })
        },()=>{
          this.$createLoading().hide();
          this.$toast('获取二维码失败！')
        })
      },
      _set_code(url){
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
      _set_share(){
        let link = `${this.$configs['HTTP_WEB'] }?/SubPage/ActivityQrcode?memid=${this.userMemId}&fromUser=${this.userMem }`;
        let obj = {
          title:'【贝斯特链】平台上线庆典！',
          desc:'您的好友“'+this.userName+'”邀请您参与庆典活动 iphoneX、apple watch免费拿！',
          imgUrl:'http://image.bstchain.com/label.jpg',//http://oq1e8uado.bkt.clouddn.com/run.png',
          link: link ,
        };
        //console.log(link)
        set_wx_share(obj)
      },
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


            this._get_code();

            if(this.fromUserMem){
              this.$get_user_message(this.fromUserMemId).then((data)=>{
                //alert(JSON.stringify(data))
                this.userName = data['data']['nickName'];
                document.title = this.userName + '的二维码';

                this._set_share();
              })
            }else{
              this.userName = val['webNickname'];
              document.title = this.userName  + '的二维码';
              this._set_share();
            }
          }
        },
        deep: true,
        immediate:true
      },
    },
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-area--bg5  com-padding__lg">

    <PopupShare v-model="popup.show"></PopupShare>

    <div class="vi-area--bg4 com-radius--lg com-padding__lg  vi-box-border white vi-box--shadow heavily">
      <div class="vi-area--header vi-area--header--white com-margin--bm">奖品清单 </div>
      <div>

        <div class="com-padding__lg--ud com-flex com-items--center" >
          <div class="vi-img--order vi-img__box vi-img--transparent vi-img--radius">
            <img src="../../img/award-iphone.jpg" alt="">
            <img src="../../img/icon-error.png" class="vi-img--error " alt="">
          </div>
          <div class="com-flex__col--ao com-padding--ad">
            <p class="  com-text--lg com-text--bold com-text--white "  >iPhone X</p>
            <p class="  com-text--md  com-text--white com-text__height--md "  >价值：4000BB币</p>
          </div>
        </div>

        <div class="com-padding__lg--ud com-flex com-items--center" >
          <div class="vi-img--order vi-img__box vi-img--transparent vi-img--radius">
            <img src="../../img/award-watch.jpg" alt="">
            <img src="../../img/icon-error.png" class="vi-img--error " alt="">
          </div>
          <div class="com-flex__col--ao com-padding--ad">
            <p class="  com-text--lg com-text--bold com-text--white "  >Apple Watch </p>
            <p class="  com-text--md  com-text--white com-text__height--md "  >价值：800BB币</p>
          </div>
        </div>

        <div class="com-padding__lg--ud com-flex com-items--center" >
          <div class="vi-img--order vi-img__box vi-img--transparent vi-img--radius">
            <img src="../../img/award-jg.png" alt="">
            <img src="../../img/icon-error.png" class="vi-img--error " alt="">
          </div>
          <div class="com-flex__col--ao com-padding--ad">
            <p class="  com-text--lg com-text--bold com-text--white "  >坚谷早餐 坚果麦片 即食麦片 高饱腹低负担</p>
            <p class="  com-text--md  com-text--white com-text__height--md "  >价值：30BB币</p>
          </div>
        </div>

      </div>
    </div>

    <div class="vi-area--bg4 com-radius--lg com-padding__lg com-margin__lg--tp  vi-box-border white vi-box--shadow heavily">
      <div class="vi-area--header vi-area--header--white com-margin--bm">活动规则 </div>
      <div>
        <p class="com-text--white com-text__height--lg">
          1.每邀请成功一名新用户注册，即可获得5个BB币。
        </p>
        <p class="com-text--white com-text__height--lg">
          2.平台根据直接邀请的用户数进行实时排名，排名前100名的用户可兑换奖品。
          <p class="com-text--white com-text__height--lg  com-margin--ud">第1名获得价值8000元的iphoneX兑奖资格<br>第2~3名获得价值1500元的apple watch兑奖资格<br>第4~100名获得价值60元的坚谷早餐兑奖资格。</p>
        </p>
       <!-- <p class="com-text&#45;&#45;white com-text__height&#45;&#45;lg">
          3. 第一名可以获得兑换iPhone X的资格，第二、三名可以获得兑换iPhone Watch的资格，坚谷早餐。
        </p>-->
        <p class="com-text--white com-text__height--lg">
          3. 排名实时更新，如果邀请人数相同，则按照时间先后进行排名。
        </p>
        <p class="com-text--white com-text__height--lg">
          4.若存在同一微信号、同一设备的，符合任意一项目，均视为同一用户。
        </p>
        <p class="com-text--white com-text__height--lg">
          5.若存在恶意刷奖行为，一经查实，取消获奖资格。
        </p>
      </div>
    </div>

    <div class="vi-ratio com-margin__lg--tp" >
      <div class="vi-ratio__outer" data-ratio="670:614">
        <div class="vi-ratio__inner">
          <div class="vi-bg vi-bg--act-join com-cover com-position--re">
            <div class="code">
              <div class="code-box">
                <div class="code-box--inner "  id="qrcode">
                  <div class="code-img" v-if="code.isSuccess"> <!--v-if="code.isSuccess"-->
                    <img src="../../img/logo.png" alt="">
                  </div>
                </div>
              </div>
            </div>
            <div class="code-message com-text--theme com-text--sm com-text--bold">
              (长按上方二维码识别加入)
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<style scoped>
  .code{ width:180px;height:180px;background-color: #fff;border-radius: 4px;margin-top: 20px;
    position: absolute;left:50%; box-shadow: 0 0 10px rgba(255,76,0,0.6); top: 50%;transform: translate(-50%,-50%);
  }
  .code-message{
    position: absolute; left:50%; top: 50%;transform: translate(-50%,-50%);margin-top: 130px;
  }
  .code-box{
    position: absolute;left:0;top:0;width:100% ;height: 100%;display: flex;justify-content: center;align-items: center;background-color: #fff;padding: 10px;
    border-radius: 4px;
  }
  .code-box--inner{
    width:100%;height: 100%;position: relative;overflow: hidden;
  }

  .code-box--inner .code-img{
    position: absolute;left: 50%;top:50%;width: 40px;height: 40px;transform: translate(-50%, -50%);background-color: #fff;padding: 5px;border-radius: 4px;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
  }
  .code-box--inner .code-img img{ width: 100% ; height: 100%;border-radius: 4px;}

</style>
