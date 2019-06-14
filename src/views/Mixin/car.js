/**
 * Created by 41587 on 2018/7/23.
 */
export default {
  beforeRouteLeave(to, from, next){
    this.$createConfirm().hide();
    next();
  },

  methods:{
    $get_car_list(loading = false){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.GETSHOPCAR,
          loading:loading
        }).then((reponse)=>{
          let carList = reponse['data']['carList'];
          carList.forEach((item,i)=>{
            item.active = true ;
          });
          this.$store.commit('car_list',carList);
          resovle(reponse)
        },(error)=>{
          reject(error)
        })
      })
    },
    //新增
    $insert_car(carArr){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.UPDATESHOPCAR,
          data:{
            orderDetail:JSON.stringify(carArr)
          },
          loading:true
        }).then((reponse)=>{
          this.$get_car_list();
          resovle(reponse)
        },(error)=>{
          reject(error)
        })
      })
    },
    //检查购物车是否超过库存 - 暂时不考虑 复杂
    $check_car(carArr){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.CHECKSTOCK,
          data:{
            orderDetail:JSON.stringify(carArr)
          },
          loading:true
        }).then((reponse)=>{
          resovle(reponse)
        },(error)=>{
          reject(error)
        })
      })
    }

  }
}
