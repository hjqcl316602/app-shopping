<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        export default {
                name: "",
                components: {},
                beforeRouteEnter (to, from, next) {
                        next(vm=> {
                        })
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

                },
                activated(){
                },
                props: [],
                data(){
                        return {}
                },
                methods: {},
                watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
                destroy(){
                }
        }
</script>
<template>
<div>
  <div class="com-background com-padding__lg">
    <div class="com-text--bold com-text--lg com-text__height--lg">活动时间</div>
    <div class="com-text--light ">即日起至2018年10月15日23:59结束</div>
  </div>
  <div class="com-background com-padding__lg com-margin--tp">
    <div class="com-text--bold com-text--lg com-text__height--lg">参与规则</div>
    <div>
      <ul>
        <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
          每邀请成功一名新用户注册，即可获得5个BB币。
        </li>
        <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
          平台根据直接邀请的用户数进行实时排名，排名前100名的用户可兑换奖品。第1名获得价值8000元的iphoneX兑奖资格、第2~3名获得价值1500元的apple watch兑奖资格、第4~100名获得价值60元的坚谷早餐兑奖资格。
        </li>
        <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
          排名实时更新，如果邀请人数相同，则按照时间先后进行排名。
        </li>
        <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
          若存在同一微信号、同一设备的，符合任意一项目，均视为同一用户。
        </li>
        <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
          若存在恶意刷奖行为，一经查实，取消获奖资格。
        </li>

      </ul>
    </div>
  </div>
  <div class="com-background com-padding__lg com-margin--tp">
    <div class="com-text--bold com-text--lg com-text__height--lg">奖品发放规则</div>
    <div>
      <ul>
        <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
          排名前100名的用户，需采用BB币进行奖品兑换。
        </li>
        <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
          系统根据排名情况，按价值分派相应奖品。设置的奖品有：IPhoneX、Apple watch、坚果早餐等100份实物奖（奖品持续丰富中）。
        </li>
        <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
          兑奖时，进入活动的“我的奖品详情”页面，可查看到有权兑换的奖品。进行奖品兑换时，请填写正确的收货人相关信息。
        </li>
        <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
          活动兑换日期为2018年10月16日至2018年10月18日，兑换日期结束后，如未兑换，则视为放弃该奖品。
        </li>
        <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
          用户个人信息我们将依法保护，未经用户的授权不会向第三方提供！
        </li>
      </ul>
    </div>
  </div>
  <div class="com-background com-padding__lg com-margin--tp">
    <div class="com-text--bold com-text--lg com-text__height--lg">
      本活动的最终解释权归成都贝斯特链科技有限公司所有。
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
