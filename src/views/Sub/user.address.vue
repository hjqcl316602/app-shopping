<script type="text/ecmascript-6">
        import ListStatus  from '../components/list.status.vue'
        import address from '../Mixin/address'

        export default {
                name: "",
                components: { ListStatus },
                mixins:[address],
                beforeRouteEnter (to, from, next) {
                        next(vm=> {
                        })
                },
                beforeRouteLeave(to, from, next){
                  this.$createConfirm().hide();
                        next();
                },
                beforeRouteUpdate (to, from, next) {
                        next();
                },
                beforeCreate(){
                },
                created(){
                },
                beforeMount(){
                },
                mounted(){
                  ( this.address.length == 0 ) && this.$get_address_list(true);
                },
                activated(){
                },
                computed:{
                  address(){
                    return this.$store.state.address.address
                  }
                },
                data(){
                        return {}
                },
                methods: {
                  jump(name){
                    this.$router.push({name:name})
                  },
                  update_address(type,item){
                    if(type == 'edit'){
                      this.$router.push({name:'UserAddressEdit',query:{addressId:item['addressId']}})
                    }
                    else if(type == 'default'){
                      if(item.default == 0){

                        this.$update_address_default(item.addressId).then(()=>{
                          this.$toast('默认地址修改成功！')
                        },()=>{
                          this.$toast('默认地址修改失败！')
                        })

                      }else{
                        this.$toast('该地址已是默认地址！')
                      }

                    }
                    else if(type == 'del'){
                      this.$createConfirm({
                        message: '确定删除该收货地址？',
                        onOk:()=>{
                          this.$delete_address(item.addressId).then(()=>{
                            this.$toast('删除地址成功！')

                            //如果默认地址被删除，则将第一条设为默认地址
                            let bool = this.$arrays.exit(this.address,(item,i)=>{ return item['default'] == 1}) ; // 判断是否存在默认地址
                            if( !bool && this.address.length > 0 ){
                              this.$update_address_default(this.address[0].addressId).then(()=>{
                                this.$toast('默认地址修改成功！')
                              },()=>{
                                this.$toast('默认地址修改失败！')
                              })
                            }
                          },()=>{
                            this.$toast('删除地址失败！')
                          })
                        }
                      }).show()
                    }
                  }
                },
                watch: {/*'': {handler(val, olval){}, deep: true} */},
                destroy(){
                }
        }
</script>
<template>
<div class="vi-address vi-footer__content">
  <div class="vi-address__items" v-if="address.length > 0">
    <div class="vi-address__item com-background  com-margin--bm" v-for="(item,index ) in address">
      <div class="com-padding  ">
        <div class="com-flex com-content--between">
          <span>{{ item.name }}</span><span>{{ item.mobile }}</span>
        </div>
        <div class="com-margin--tp">{{ item.areaName + item.address}}</div>
      </div>
      <div class="com-padding  com-flex com-content--between">
        <div class="" @click="update_address('default',item)">
          <i class="iconfont icon-weibiaoti38 com-text--light com-text--md" v-if=" item.default == 0 "></i>
          <i class="iconfont icon-gouxuan com-text--theme com-text--md" v-if=" item.default == 1 "></i>
          <span class="com-margin__sm--lt com-text--light"  v-if="item.default == 0">设为默认</span>
          <span class="com-margin__sm--lt com-text--theme" v-if="item.default == 1">默认地址</span>
        </div>
        <div class="com-flex">
          <div class="com-margin__lg--lt   com-text--light" @click="update_address('edit',item)"><i class="iconfont icon-edit_icon com-text--md"></i><span class="com-margin--lt">编辑</span></div>
          <div class="com-margin__lg--lt   com-text--light" @click="update_address('del',item)"><i class="iconfont icon-del1 com-text--md"></i><span class="com-margin--lt">删除</span></div>
        </div>
      </div>
    </div>

  </div>
  <div v-else>
    <ListStatus cover content="暂无收货地址，快去添加吧~" ></ListStatus>
  </div>

  <div class="vi-footer">
    <div class="vi-btn__submit vi-btn--theme com-text--bold" @click="jump('UserAddressEdit')">添加新地址</div>
  </div>
</div>
</template>
<style scoped></style>
