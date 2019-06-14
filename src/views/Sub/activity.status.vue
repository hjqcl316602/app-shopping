<script type="text/ecmascript-6">
  export default {
    name: "activityStatus",
    computed:{
      goodLikeList(){
        return this.$store.state.good.goodLikeList
      },
    },
    methods:{

    }
  }
</script>
<template>
  <div class="vi-footer__content">
    <div style="height:100px" class="vi-background-gradient com-padding__lg--ad com-flex com-content--between com-items--center">
      <div class="">
        <p class="com-text--lg com-text--bold com-text--white">兑换成功</p>
        <p class="com-text--white-gray com-text__height--md">我们会尽快安排为您发货</p>
      </div>
      <div class="vi-user-order-label">
        <div class="vi-user-order-label--inner">
          <div class="vi-user-order-icon vi-icon vi-icon__order-status vi-icon__ok"></div>
        </div>
      </div>
    </div>

    <template>
      <div class="com-background com-padding__lg">
        <div class="vi-area--header vi-area--header--light com-margin--bm">猜你喜欢的商品</div>
        <template v-if="goodLikeList.length > 0">
          <router-link :to="{ name :'OrderDetail',query:{ goodid:item['goodId']} }" class="com-padding__lg--ud com-flex com-items--center" v-for="(item,index) in goodLikeList" :key="index">
            <div class="vi-img--order vi-img__box ">
              <img :src="item['goodPicture']" alt="">
              <img src="../../img/icon-error.png" class="vi-img--error " alt="">
            </div>
            <div class="com-flex__col--ao com-padding--ad">
              <div class="com-text__visible--two com-text--lg com-text--bold com-text--dark"  >{{ item['goodName']}}</div>
              <p class="com-text__height--md com-text--bold com-text--lg com-text--theme">￥{{item['price'] | str_money}}</p>
            </div>
            <div   class=" vi-btn__simple vi-btn--submit com-text__wrap--nowrap">购买</div>
          </router-link>
        </template>
        <template v-else>
          <div class="com-margin__xl--tp">
            <ListStatus  content="~~暂时没有匹配到您喜欢的商品~~" ></ListStatus>
          </div>

        </template>
      </div>
    </template>
    <template>
      <div class="vi-footer">
<!--        <div class="vi-btn__submit com-background com-text&#45;&#45;bold com-text&#45;&#45;theme com-text&#45;&#45;lg" @click="_jump_page('Index')">
          返回首页
        </div>-->
        <router-link tag="div" :to="{ name :'Index'  }" class="vi-btn__submit com-background com-text--bold com-text--theme com-text--lg">返回首页</router-link>
      </div>
    </template>

  </div>
</template>
<style scoped></style>
