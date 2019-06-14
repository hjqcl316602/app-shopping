/**
 * Created by 41587 on 2018/8/8.
 */
/**
 * Created by 41587 on 2018/7/23.
 */

import { filter } from '../../js-package/app.array'

export default {
  data(){
    return {
      good:{
        pageSize:20,
        pageNum:1,
        loading:false,
        push:{
          finished:true,
          loading:false
        }
      },
      goodSearch:{
        pageSize:20,
        pageNum:1,
        loading:false,
        push:{
          finished:true,
          loading:false
        }
      }
    }
  }
  ,

  methods:{
    // 添加商品的访问量
    $do_good_click(goodId){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.GOODCLICK,
          data:{
            goodId:goodId
          },
          loading:false
        }).then((reponse)=>{
          resovle()
        })
      })
    },

    // 获得首页的banner图
    $get_banner_list(){
      return new Promise((resolve,reject)=>{
        this.$request({
          url:this.API.IMGLIST,
        }).then((res)=>{
          let list = res.data['adInfo']['adContent'];
          this.$store.commit('get_banner_list',list);
          resolve()
        },()=>{
          this.$toast('获取图片列表失败！');
          resolve('fail')
        })
      })
    },

    // 获得商品类目
    $get_good_category_list(){

      this.$store.commit('get_good_category_list',[] );

      return new Promise((resolve,reject) =>{
        this.$request({
          url:this.API.GOODINDEX,
          data:{
            pageSize:1,  //单独获得商品的类型，所以设置一个最小的长度
            pageNum:1,
          }
        }).then((res)=>{
          let list = res.data['categoryList'];
          list.forEach((item,i)=>{
            item['active'] = ( i == 0 ) ? true : false ;
          });
          this.$store.commit('get_good_category_list',list);
          this.$store.commit('update_good_category_active',0);

          resolve()
        },()=>{
          this.$toast('获取商品类目失败！');
          resolve('fail')
        })
      })
    },

    // 获得商品列表
    $get_good_list(more=false,loading=false){

      let categoryId = filter(this.$store.state.good['goodCategoryList'], function (item) {
        return item.active == true ;
      })[0]['categoryId']; // 得到当前所选商品id
      console.log(categoryId)

      return new Promise((resolve,reject)=>{
        if(this.good.loading) return
        this.good.loading = true;

        if(more){
          this.good.pageNum++ ;
        }else{
          this.good.pageNum = 1 ;
          this.push.finished = true;
        }

        let url = '';
        let params = {};
        if( categoryId == '' || categoryId == 0 ){
          url = this.API.GOODINDEX;
          params = {
            pageSize:this.good.pageSize,
            pageNum:this.good.pageNum,
          }
        }else{
          url = this.API.GOODLIST;
          params = {
            categoryId:categoryId ,
            pageSize:this.good.pageSize,
            pageNum:this.good.pageNum,
          }
        }

        this.$request({
          url:url,
          data:params,
          loading:loading
        }).then((reponse)=>{
          this.good.loading = false;
          this.good.push.loading = false;

          let list = reponse.data['goodList'];
          this.$store.commit('get_good_list',{ list,more });
          if( list.length < this.good.pageSize ){
            this.good.push.finished = true;
          }else{
            this.good.push.finished = false;
          }
          resolve()
        },()=>{
          this.good.pageNum --;
          this.good.loading = false;
          this.good.push.loading = false;
          this.$toast('获取商品列表失败！');
          reject('fail')
        })
      })
    },

    //获得搜索商品
    $get_good_search_list(search,more=false,loading=false ){
      if(this.goodSearch.loading) return
      this.goodSearch.loading = true;
      return new Promise((resovle,reject)=> {

        if (more) {
          this.goodSearch.pageNum++;
        } else {
          this.goodSearch.pageNum = 1;
          this.goodSearch.push.finished = true;
        }
        this.$request({
          url: this.API.SEARCH,
          data: {
            condition: search,
            pageSize: this.goodSearch.pageSize,
            pageNum: this.goodSearch.pageNum,
          }
        }).then((res)=> {
          this.goodSearch.loading = false;
          this.goodSearch.push.loading = false;
          let list = res.data.goodList;
          this.$store.commit('get_good_search_list', {list, more});

          if (list.length < this.goodSearch.pageSize) {
            this.goodSearch.push.finished = true;
          } else {
            this.goodSearch.push.finished = false;
          }
          resovle()
        }, ()=> {
          this.goodSearch.pageNum --;
          this.goodSearch.loading = false;
          this.goodSearch.push.loading = false;
          this.$toast('获取商品列表失败！');
          reject('fail')
        })
      })
    },

    // 兑换数据
    $save_win_good(params){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.GETBBORDER,
          data:{
            actGoodId:params.actGoodId,
            addressId:params.addressId
          },
          loading:true
        }).then((reponse)=>{
          resovle(reponse)
        },(error)=>{
          if(error['code'] == '002'){
            this.$toast(error['msg']);
          }else{
            this.$toast('奖品兑换失败！');
          }
        })
      })
    }

  }
}
