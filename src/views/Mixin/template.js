/**
 * Created by 41587 on 2018/7/23.
 */
export default {
  data(){
    return {
      rank:{
        pageSize:10,
        pageNum:1,
        total:0,
        loading:false,
        list:[],
        push:{
          finished:true,
          loading:false
        }
      }
    }
  },
  methods:{
    //  分页
    $get_direct_number( more = false , loading = false){ // more 用于加载更多 Loading 判断是否在加载中
      if(this.rank.loading) return;
      this.rank.loading = true;
      return new Promise((resovle,reject)=>{
        if(more){
          this.rank.pageNum++ ;
        }else{
          this.rank.pageNum = 1 ;
          this.rank.list = [];
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

          this.$store.commit('rank_list',{ list,more })

          if( list.length < this.rank.pagesize){  // 判断得到的数据长度不够页长，说明没有数据可加载
            this.rank.push.finished = true;
          }else{
            this.rank.finished = false;
          }
          resovle()
        },()=>{
          this.rank.loading = false;
          this.rank.push.loading = false;
        })
      })
    },
  }
}
