

export default {
  data(){
    return {
      token:{
        pageSize:9,
        pageNum:1,
        loading:false,
        push:{
          finished:true,
          loading:false
        }
      },
      jd:{
        pageSize:9,
        pageNum:1,
        loading:false,
        push:{
          finished:true,
          loading:false
        }
      },
    }
  },
  methods:{
    // 获二维码信息
    $get_qrcode(fromUser,loading=false){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.GETQRCODE,
          loading:loading,
          data:{
            fromUser:fromUser
          }
        }).then((reponse)=>{

          resovle(reponse)
        },(error)=>{
          reject(error)
        })
      })
    },
    // 根据银行卡号获取银行信息
    $get_bank_detail(cardNo){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.GETBANKDETAIL,
          data:{ cardNo },
          loading:true
        }).then((reponse)=>{
          resovle(reponse)
        },(error)=>{
          this.$toast('获取银行信息失败！');
          reject(error)
        })
      })
    },
    // 获取用户的团队
    $get_user_team(){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.GETFOLLOWER,
          loading:true
        }).then((reponse)=>{
          resovle(reponse)
        },(error)=>{
          this.$toast('获取我的团队信息失败！');
          reject(error)
        })
      })
    },
    // 获得验证码 type 1 信息认证 2 提现  3 兑现   当type = 1 时才传mobile
    $get_phone_code(type,mobile){
      let obj = { type:type };
      if(type == 1){
        obj['mobile'] = mobile;
      }
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.GETRANDCODE,
          loading:false,
          data: obj
        }).then((reponse)=>{
          resovle(reponse)
        },(error)=>{
          this.$toast('获取验证码信息失败');
          reject(error)
        })
      })

    },
    // 获取用户信息
    $get_user_message(memId){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.GETDETAIL,
          loading:false,
          data:{ memId }
        }).then((reponse)=>{
          if(!memId){
            this.$store.commit('user_message',reponse['data']); // 当传入了用户的id，则单独获取用户的名称，在二维码页面使用
          }
          resovle(reponse)
        },(error)=>{
          this.$toast('获取用户信息失败！');
          reject(error)
        })
      })
    },
    // 获得登录信息
    $get_login_message(webMemId,fromUser,loading=false){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.GETMEMACTIVE,
          loading:loading,
          data:{
            webMemId:webMemId,
            fromUser:fromUser
          }
        }).then((reponse)=>{
          this.$store.commit('login_message',reponse['data']);
          resovle(reponse)
        },(error)=>{
          this.$toast('获取登录信息失败！');
          if(error.code == '007'){
            reject(error)
          }
        })
      })
    },

    // 更新用户信息
    $save_user_message(params){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.INSERTDETAIL,
          loading:true,
          data:{
            realName:params.realName,
            mobile:params.mobile,
            cardNo:params.cardNo,
            bank:params.bank,
            bankName:params.bankName,
            randCode:params.randCode,
          }
        }).then((reponse)=>{
          this.$get_user_message();
          resovle(reponse)
        },(error)=>{
          this.$toast('保存信息失败！');
          reject(error)
        })
      })
    },
    //  获得客服电话
    $get_customer(){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.GETCUSTOMER,
          loading:false,
        }).then((reponse)=>{
          resovle(reponse)
        },(error)=>{
          this.$toast('获取客服电话失败！');
          reject(error)
        })
      })
    },

    //  获得钱包数据
    $get_wallet_info(){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.GETWALLETINFO,
          loading:false,
        }).then((reponse)=>{
          this.$store.commit('user_money',reponse['data']);
          resovle(reponse)
        },(error)=>{
          this.$toast('获取钱包数据失败！');
          reject(error)
        })
      })
    },

    //  获得钱包 - 通证列表
    $get_token_list( more = false , loading = false){ // more 用于加载更多 Loading 判断是否在加载中
      if(this.token.loading) return;
      this.token.loading = true;
      return new Promise((resovle,reject)=>{
        if(more){
          this.token.pageNum++ ;
        }else{
          this.token.pageNum = 1 ;
          this.token.push.finished = true;
        }
        this.$request({
          url:this.API.GETWALLETTOKENHIS,
          data:{
            pageSize:this.token.pageSize,
            pageNum:this.token.pageNum,
          },
          loading:loading
        }).then((res)=>{
          //debugger
          let list = res.data;
          this.token.loading = false;
          this.token.push.loading = false;

          this.$store.commit('get_token_list',{ list,more });      // 得到我的排行榜数据列表

          if( list.length < this.token.pageSize){  // 判断得到的数据长度不够页长，说明没有数据可加载
            this.token.push.finished = true;
          }else{
            this.token.push.finished = false;
          }
          resovle()
        },()=>{
          this.token.pageNum--;
          this.token.loading = false;
          this.token.push.loading = false;
          this.$toast('获取通证列表失败！')
          reject();
        })
      })
    },
//  获得钱包 - 积点列表
    $get_jd_list( more = false , loading = false){ // more 用于加载更多 Loading 判断是否在加载中
      if(this.jd.loading) return;
      this.jd.loading = true;
      return new Promise((resovle,reject)=>{
        if(more){
          this.jd.pageNum++ ;
        }else{
          this.jd.pageNum = 1 ;
          this.jd.push.finished = true;
        }
        this.$request({
          url:this.API.GETWALLETAMOUNTHIS,
          data:{
            pageSize:this.jd.pageSize,
            pageNum:this.jd.pageNum,
          },
          loading:loading
        }).then((res)=>{
          //debugger
          let list = res.data;
          this.jd.loading = false;
          this.jd.push.loading = false;

          this.$store.commit('get_jd_list',{ list,more });      // 得到我的排行榜数据列表

          if( list.length < this.jd.pageSize){  // 判断得到的数据长度不够页长，说明没有数据可加载
            this.jd.push.finished = true;
          }else{
            this.jd.push.finished = false;
          }
          resovle()
        },()=>{
          this.jd.pageNum--;
          this.jd.loading = false;
          this.jd.push.loading = false;
          this.$toast('获取列表失败！')
          reject();
        })
      })
    },

    // 获得当前bb的兑换积点的兑换率
    $get_wallet_bb_info(){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.GETWALLETBBINFO,
          loading:true,
        }).then((reponse)=>{
          this.$store.commit('get_token_rate',reponse['data']);
          resovle(reponse)
        },(error)=>{
          this.$toast('获取当前通证汇率失败！');
          reject(error)
        })
      })
    },
    // 兑换BB币
    $insert_wallet_bb_change(params){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.INSERTWALLETCHANGEBB,
          loading:true,
          data:{
            randCode:params.code,jdNum:params.money
          }
        }).then((reponse)=>{
          resovle(reponse)
        },(error)=>{
          this.$toast('兑换现金失败！');
          reject(error)
        })
      })
    },
    // 兑换BB币
    $insert_wallet_money_change(params){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.INSERTWALLETCASH,
          loading:true,
          data:{
            randCode:params.code,jdNum:params.money
          }
        }).then((reponse)=>{
          resovle(reponse)
        },(error)=>{
          this.$toast('兑换通证失败！');
          reject(error)
        })
      })
    }

  }

}
