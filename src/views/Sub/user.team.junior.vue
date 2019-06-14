<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        import base from '../Mixin/basic'
        import ListStatus  from '../components/list.status.vue'
        export default {
                name: "",
                components: { ListStatus },
                mixins:[ base ],
                beforeRouteEnter (to, from, next) {
                        next(vm=> {})
                },
                beforeRouteLeave(to, from, next){
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
                  this.get_user_team()
                },
                activated(){
                },
                props: [],
                data(){
                        return {
                          team:{
                            list:[]
                          }
                        }
                },
                methods: {
                  get_user_team(){
                    this.$get_user_team().then((response)=>{
                      this.team.list = response['data']
                    })
                  },
                },
                watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
                destroy(){
                }
        }
</script>
<template>
  <div class="vi-user-team-junior">
      <template v-for="(item,index) in team.list" v-if="team.list.length > 0 ">
        <div class="com-margin--bm item com-padding--ud com-background">
          <div class="label"></div>
          <div class="com-flex com-padding__lg--ad  com-padding--ud com-items--center">
            <span class="com-text com-text--light" style="width:100px;">头像</span>
            <div class="vi-img__box vi-img--user">
              <img :src="item.photo" alt="">
              <img class='vi-img--error'src="../../img/error-head.png" alt="">
            </div>
          </div>

          <div class="com-flex com-padding__lg--ad  com-padding--ud com-items--center">
            <span class="com-text com-text--light" style="width:100px;">姓名</span>
            <span class="com-text com-flex__col--ao  com-text--bold">{{ item.name }}</span>
          </div>
          <!--<div class="com-flex com-padding__lg&#45;&#45;ad com-padding&#45;&#45;ud com-items&#45;&#45;center">
            <span class="com-text   com-text&#45;&#45;light" style="width:100px;">电话</span>
            <span class="com-text com-flex__col&#45;&#45;ao  com-text&#45;&#45;bold">13980464237</span>
          </div>-->
          <div class="com-flex com-padding__lg--ad com-padding--ud com-items--center">
            <span class="com-text  com-text--light" style="width:100px;">团队人数</span>
            <span class="com-text com-flex__col--ao  com-text--bold">{{ item.followerNum }}人</span>
          </div>
          <div class="com-flex com-padding__lg--ad com-padding--ud com-items--center">
            <span class="com-text  com-text--light" style="width:100px;">团队销量</span>
            <span class="com-text com-flex__col--ao  com-text--bold">{{ item.totalAmount | str_money }}元</span>
          </div>
          <div class="com-flex com-padding__lg--ad com-padding--ud com-items--center">
            <span class="com-text  com-text--light" style="width:100px;">月团奖金</span>
            <span class="com-text com-flex__col--ao com-text--bold ">{{ item.totalBonus | str_money }}元</span>
          </div>
        </div>

      </template>
      <template v-if="team.list.length == 0 ">
        <ListStatus cover content="我的团队空无一人，去邀请好友吧~" ></ListStatus>
      </template>
  </div>
</template>
<style scoped>
  .vi-user-team-junior .item{ position: relative  }
  .vi-user-team-junior .label{
    display:block;
    width:0;
    height:0;
    border-width:0 20px 20px 20px;
    border-style:solid;
    border-color:transparent transparent transparent #ff4c00;/*透明 透明  黄*/
    position:absolute;
    top:0px;
    left:0px
  }
</style>
