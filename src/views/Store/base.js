/**
 * Created by 41587 on 2018/8/10.
 */
export default {
  state:{
    isAuth:false,
    fullPath:'',
    loginMessage:{},
    userMessage:{},
    userMoney:{},
    tokenRate:'', // 当前token值
    tokenList:[],
    jdList:[]
  },
  mutations:{
    ['get_full_path'](state,value){  // 得到第一次进入项目的url，刷新会改变
      state.fullPath = value;
    },
    ['auth_message'](state,obj){
      state.isAuth = obj;
    },
    ['login_message'](state,obj){
      state.loginMessage = Object.assign({},obj);
    },
    ['user_message'](state,obj){
      state.userMessage = Object.assign({},obj);
    },
    ['user_money'](state,obj){
      state.userMoney = Object.assign({},obj);
    },

    ['get_token_rate'](state,obj){
      state.tokenRate =  obj ;
    },

    ['get_token_list'](state,{list,more}){
      if(!more){
        state.tokenList = [];
      }
      state.tokenList = state.tokenList.concat(list)
    },
    ['get_jd_list'](state,{list,more}){
      if(!more){
        state.jdList = [];
      }
      state.jdList = state.jdList.concat(list)
    }
  }
}
