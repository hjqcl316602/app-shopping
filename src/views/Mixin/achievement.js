
export default {

  methods:{
    // 获得业绩中心数据
    $get_achievement_info(loading=true){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.GETACHIECMENTINFO,
          loading:loading
        }).then((reponse)=>{
          this.$store.commit('get_achievement_info',reponse['data']);
          resovle(reponse)
        },(error)=>{
          this.$toast('获取业绩中心数据失败！');
          reject(error)
        })
      })
    },
    //得到升级详情
    $get_achievement_detail(loading=true){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.GETACHIECMENTDETAIL,
          loading:loading
        }).then((reponse)=>{
          resovle(reponse)
        },(error)=>{
          this.$toast('获取业绩详情数据失败！');
          reject(error)
        })
      })
    }

  }
}
