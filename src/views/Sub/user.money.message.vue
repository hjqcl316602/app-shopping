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
<div class="com-fluid com-background com-padding__lg">

  <div class="com-text--bold com-padding--ud com-padding--lt">审核提示：</div>

  <div class="">
    <ul>
      <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
        提现时，用户姓名和银行卡开户名一致才能通过审核
      </li>
    </ul>
  </div>

  <div class="com-text--bold com-padding--ud com-padding--lt">关于兑现：</div>
  <div class="">
    <ul>
      <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
        每个自然月同一用户（相同手机号、银行卡视为同一用户）最多只能提现一次，
        用户提现后我们会进行审核，审核通过后会在一至三个工作日内打款，具体到账时间决定于各个银行到账时间。
      </li>
      <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
        用户只能兑现整百金额的人民币
      </li>
    </ul>
  </div>

  <div class="com-text--bold com-padding--ud com-padding--lt">关于兑币：</div>
  <div class="">
    <ul>
      <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
        用户可使用账户内积点兑换BB币，兑换比例由当前币值决定，兑换后立即生效。
      </li>
      <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
        用户只能使用整百积点数兑换BB币
      </li>
      <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
        兑换次数不限，满足兑换条件均可兑换
      </li>
    </ul>
  </div>

  <div class="com-text--bold com-padding--ud com-padding--lt">关于积点：</div>
  <div class="">
    <ul>
      <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
        积点结算时间为每个月15日，15日前完成的订单于15日结算，15日（含15日）后完成的订单于下月结算
      </li>
      <li class="com-text--light com-text__height--md com-list-style--disc com-margin__sm--bm">
        当用户出现退款时，所产生的积点会在下个月结算时扣除相应的数量
      </li>
    </ul>
  </div>
</div>
</template>
<style scoped></style>
