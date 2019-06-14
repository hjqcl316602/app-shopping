
export default {
  state:{
    bannerList:[],
    goodCategoryList:[],
    goodList:[],
    goodSearchList:[],
    goodLikeList:[]
  },

  mutations:{
    // 首页banner 图
    ['get_banner_list'](state,list){
      state.bannerList = list
    },
    // 商品类目
    ['get_good_category_list'](state,list){
      state.goodCategoryList = list
    },
     // 激活的商品类目
    ['update_good_category_active'](state,index){

      state.goodCategoryList.forEach((item,i)=>{
        item.active = (i == index) ? true : false
      })

    },
    // 得到商品 的列表
    ['get_good_list'](state,{ list,more}){
      if(!more){
        state.goodList = [];
      }
      state.goodList = state.goodList.concat(list)
    },

    // 得到商品 的列表
    ['get_good_search_list'](state,{ list,more}){
      if(!more){
        state.goodSearchList = [];
      }
      state.goodSearchList = state.goodSearchList.concat(list)
    },

    // 得到喜欢的商品 - 兑换成功后
    ['get_good_like_list'](state,list){
      state.goodLikeList = list
    },
  }
}
