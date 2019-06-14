/**
 * Created by 41587 on 2018/7/23.
 */
export default {
  data(){
    return {}
  },
  methods:{
    $get_address_list(loading = false){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.ADDRESSLIST,
          loading:loading,
        }).then((reponse)=>{
          let list = reponse.data.addressList;
          this.$store.commit('address_list',list);
          resovle(reponse)
        },()=>{
          reject()
        })
      })
    },
    $get_address_detail(addressId){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.ADDRESSDETAIL,
          loading:true,
          data:{ addressId }
        }).then((reponse)=>{
          resovle(reponse)
        },()=>{
          this.$toast('获取地址信息失败！')
          reject()
        })
      })
    },

    $insert_address(params){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.ADDADDRESS,
          data:params,
          loading:true
        }).then((reponse)=>{
          this.$get_address_list();
          resovle(reponse)
        },(error)=>{
          reject(error)
        })
      })
    },
    $update_address(params){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.UPDATEADDRESS,
          data:params,
          loading:true
        }).then((reponse)=>{
          this.$get_address_list();
          resovle(reponse)
        },(error)=>{
          reject(error)
        })
      })
    },
    $update_address_default(addressId){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.CHANGEDEFAULTADDRESS,
          data:{addressId},
          loading:true
        }).then((reponse)=>{
          this.$get_address_list();
          resovle(reponse)
        },(error)=>{
          reject(error)
        })
      })
    },
    // 删除数据后 - 不需要进行再次从数据库中获取数据 - 直接本地删除即可
    $delete_address(addressId){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.DELETEADDRESS,
          data:{ addressId },
          loading:true
        }).then((reponse)=>{
          this.$store.commit('address_delete',addressId );
          resovle(reponse)
        },(error)=>{
          reject(error)
        })
      })
    },
    $get_area(){
      return new Promise((resovle,reject)=>{
        this.$request({
          url:this.API.AREALIST,
          loading:true
        }).then((reponse)=>{
          let list = reponse.data;
          this.$store.commit('area_list',list);
          resovle(reponse)
        },(error)=>{
          this.$toast('获取全国地址信息失败！')
          reject(error)
        })
      })
    },
  }
}
