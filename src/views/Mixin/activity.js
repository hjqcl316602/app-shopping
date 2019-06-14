/**
 * Created by 41587 on 2018/7/23.
 */
export default {
  data(){
    return {
      rank:{
        pageSize:10,
        pageNum:1,
        loading:false,
        push:{
          finished:true,
          loading:false
        }
      },
      team:{
        pageSize:10,
        pageNum:1,
        loading:false,
        push:{
          finished:true,
          loading:false
        }
      }
    }
  },
  methods:{
    // 得到排行榜数据 和我的排行榜
    $get_direct_number( more = false , loading = false){ // more 用于加载更多 Loading 判断是否在加载中
      if(this.rank.loading) return;
      this.rank.loading = true;
      return new Promise((resovle,reject)=>{
        if(more){
          this.rank.pageNum++ ;
        }else{
          this.rank.pageNum = 1 ;
          this.rank.push.finished = true;
        }
        this.$request({
          url:this.API.DIRECTNUMBER,
          data:{
            pageSize:this.rank.pageSize,
            pageNum:this.rank.pageNum,
          },
          loading:loading
        }).then((res)=>{
          let list = res.data['list'];
          this.rank.loading = false;
          this.rank.push.loading = false;

          this.$store.commit('rank_list',{ list,more });      // 得到我的排行榜数据列表
          this.$store.commit('rank_user_message',res.data['myInfo']); // 得到我的排行榜信息

          if( list.length < this.rank.pageSize){  // 判断得到的数据长度不够页长，说明没有数据可加载
            this.rank.push.finished = true;
          }else{
            this.rank.push.finished = false;
          }
          resovle()
        },()=>{
          this.rank.pageNum--;
          this.rank.loading = false;
          this.rank.push.loading = false;
          this.$toast('获取排行榜信息失败！')
          reject();
        })
      })
    },

    // 获得奖品清单
    $get_award_list(){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.GETAWARDLIST,
          loading:true
        }).then((reponse)=>{
          let list = reponse.data;
          this.$store.commit('award_list',list);
          resovle(reponse)
        },(error)=>{
          this.$toast('获取奖品清单失败！');
          reject()
        })
      })
    },
    // 得到我的团队
    $get_team_list( more = false , loading = false){ // more 用于加载更多 Loading 判断是否在加载中
      if(this.team.loading) return;
      this.team.loading = true;
      return new Promise((resovle,reject)=>{
        if(more){
          this.team.pageNum++ ;
        }else{
          this.team.pageNum = 1 ;
          this.team.push.finished = true;
        }
        this.$request({
          url:this.API.GETMYTEAM,
          data:{
            pageSize:this.team.pageSize,
            pageNum:this.team.pageNum,
          },
          loading:loading
        }).then((res)=>{
          let list = res.data;
          this.team.loading = false;
          this.team.push.loading = false;

          this.$store.commit('team_list',{ list,more });      // 得到我的排行榜数据列表

          if( list.length < this.team.pageSize){  // 判断得到的数据长度不够页长，说明没有数据可加载
            this.team.push.finished = true;
          }else{
            this.team.push.finished = false;
          }
          resovle()
        },()=>{
          this.team.pageNum--;
          this.team.loading = false;
          this.team.push.loading = false;
          this.$toast('获取团队成员失败！')
          reject();
        })
      })
    },

    // 支付10个BB 币 成为代理
    $set_pay_agency(){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.PAYAGENCY,
          loading:true
        }).then((reponse)=>{
          let list = reponse.data;
          resovle(reponse)
        },(error)=>{
          this.$toast('支付失败！');
          reject()
        })
      })
    }

  }
}
