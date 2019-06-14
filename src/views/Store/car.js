
export default {
  state:{
    cars:[],

  },


  mutations:{
    ['car_list'](state,list){
      state.cars = list
    },
    ['change_car_num'](state,{ type,index }){
      if( type == 'plus'){
        state.cars[index]['num'] ++
      }else{
        state.cars[index]['num'] = Math.max( --state.cars[index]['num'],1);

        /*// 当切换数量的时候，数量变为0，则需要修改勾选状态
        if(state.cars[index]['num'] == 0 ){
          state.cars[index]['active'] = false;
        }*/
      }
    },
    ['pick_car'](state,{ type = 'alone',index ,isCheck=false}){ // tyye = alone 、all   isCheck - 表示全部勾选还是全部取消
      if(type == 'all'){
        state.cars.forEach((item)=>{
          item['active'] = isCheck;
        })
      }else{
        state.cars[index]['active'] =   !state.cars[index]['active'];
      }

      /*// 当数量等于0 ，是不能进行勾选
      if(state.cars[index]['num'] == 0){
        state.cars[index]['active'] = false;
      }else{

      }*/
    }
  }
}

/*let a  = [{
  goodId:this.good.id,
  specsName:this.good.select['specsName'],
  num:this.good.num,
  price:this.good.select.price,
  goodName:this.good.detail.goodName,
  goodPicture:this.good.detail.goodPicture,
  stock:this.good.select['stock'],
  active:false, // 用于选择
  buy:false, // 用于创建订单
}];*/
