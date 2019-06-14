
export default {
  state:{
    orders:[],
    tab:{
      active:''
    },
    orderNum:{
      payNum:0,deliveryNum:0,collectNum:0,evaluationNum:0
    }
  },

  mutations:{
    ['order_list'](state,{list,more}){
      if(!more){
        state.orders = [];
      }
      state.orders = state.orders.concat(list)
    },
    ['order_tab_active'](state,value){
      state.tab.active = value ;
    },
    ['order_num'](state,value){
      state.orderNum = Object.assign(state.orderNum,value)
    }
  }
}
