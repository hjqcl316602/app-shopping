export default {
  state:{
    rankList:[],
    rankUserMessage:{},
    awardList:[],
    teamList:[]
  },

  mutations:{
    ['rank_list'](state,{list,more}){
      if(!more){
        state.rankList = [];
      }
      state.rankList = state.rankList.concat(list)
    },

    ['team_list'](state,{list,more}){
      if(!more){
        state.teamList = [];
      }
      state.teamList = state.teamList.concat(list)
    },

    ['rank_user_message'](state,message){
      Object.assign(state.rankUserMessage , message )
    },

    ['award_list'](state,list){

      state.awardList = list

    },

  }
}
