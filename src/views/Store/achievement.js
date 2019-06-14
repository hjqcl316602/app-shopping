/**
 * Created by 41587 on 2018/8/15.
 */

import * as arrays from '../../js-package/app.array'
export default {
  state:{
    detail:{}
  },

  mutations:{
    ['get_achievement_info'](state,detail){
      state.detail = detail
    },
  }
}
