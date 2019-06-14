
import * as arrays from '../../js-package/app.array'
export default {
  state:{
    address:[],
    area:[]
  },

  mutations:{
    ['address_list'](state,list){
      let newList = [];
      for(let n = 0 ; n < list.length;n++){
        // 添加一个字段 标识是否被选中
        list[n]['selected'] = false ;
        if(list[n]['default'] == 1){
          newList.unshift(list[n])
        }else{
          newList.push(list[n])
        }
      }
      state.address = newList
    },
    // 改变选中
    ['address_select'](state,index){

      for(let n = 0 ; n < state.address.length ; n++){
        if(n == index){
          state.address[n]['selected'] = true
        }else{
          state.address[n]['selected'] = false
        }
      }
    },

    //删除本地地址数据即可
    ['address_delete'](state,addressId){
        state.address = arrays.remove(state.address,(item,i)=>{ return item['addressId'] == addressId })
    }
    ,
    ['area_list'](state,list){
      state.area = list
    },

  }
}
