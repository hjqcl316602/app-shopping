<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import activity from '../Mixin/activity';

  export default {
    name: "",
    components: {},
    mixins: [ activity ],
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
      this.$get_direct_number( false,true )
    },
    activated(){
    },
    computed:{
      rankList(){
        return this.$store.state.activity.rankList
      },
      rankUserMessage(){
        return this.$store.state.activity.rankUserMessage
      }
    },
    data(){
      return {

      }
    },
    methods: {

    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div class=" vi-bg vi-bg--act-detail vi-footer__content">
    <div class="side com-flex com-items--center com-background--assist com-padding__sm--ud  com-padding--ad">
      <div class="vi-icon vi-icon--rule"></div>
      <router-link :to="{name:'ActivityMessage'}" tag="div" class="com-text--white com-padding__sm--lt">活动规则</router-link>
    </div>

    <div class="com-padding">
      <div class="com-text--center" style="margin-top: 37%">
        <div class="com-text--center com-text--white-light com-padding--ud com-text--xl">-----  即日起至10月15日  ----- </div>
        <router-link tag="div" :to="{name:'ActivityQrcode'}" class="vi-act-btn">立即分享</router-link>
      </div>
      <div class="com-radius--lg com-background com-padding com-padding__lg--ad com-margin__lg--tp com-items--center com-flex">

        <div class=" vi-img__box vi-img--head--sm ">
          <img :src="rankUserMessage['memPhoto']" alt="">
          <img src="../../img/error-head.png" class="vi-img--error" alt="">
        </div>
        <div class="com-flex__col--ao  com-padding--ad com-border--rt">
          <p class="com-text--lg com-text--bold">{{ rankUserMessage['memName']}}</p>
          <p class=" com-text--light">团队数量：{{ rankUserMessage['followerNum']}}</p>
        </div>
        <div class="  com-text--danger com-text--lg com-text--bold com-padding--lt">
          我的排名：{{ ( rankUserMessage['orderNum'] && rankUserMessage['orderNum']['rowNum']  ) || '暂无' }}
        </div>
      </div>

      <div class="com-radius--lg com-padding com-padding__lg--ad com-background com-margin--tp">
        <div class="com-flex com-items--center com-content--between com-padding--ud">
          <span class="com-text--theme com-text--bold com-text--lg">排行榜前10名</span>
          <router-link :to="{name:'ActivityRanks'}" tag="span"  class="com-text--theme com-text--bold">更多排行 ></router-link>
        </div>
        <div class="com-flex com-margin--tp com-padding--bm com-border--bm">
          <div class="com-flex__col--4 com-text--light com-text--sm">排行</div>
          <div class="com-flex__col--4 com-text--light com-text--sm">头像</div>
          <div class="com-flex__col--10 com-text--light com-text--sm">名称</div>
          <div class="com-flex__col--6  com-text--light com-text--sm com-text--right">团队数量</div>
        </div>

        <div class="com-flex com-padding--ud com-items--center" v-for="(item,index) in rankList">
          <div class="com-flex__col--4 com-text--light">
            <template v-if="index < 3">
              <div class=" vi-img__box vi-img--head--tiny ">
                <img src="../../img/icon-rank-gold.png" alt="" v-if="index== 0">
                <img src="../../img/icon-rank-sliver.png" alt="" v-if="index== 1">
                <img src="../../img/icon-rank-copper.png" alt="" v-if="index== 2">
                <img src="../../img/logo-error.png" class="vi-img--error small" alt="">
              </div>
            </template>
            <template v-else>
              <div class="com-padding--lt" >{{ index + 1}}</div>
            </template>
          </div>
          <div class="com-flex__col--4">
            <div class=" vi-img__box vi-img--head--tiny ">
              <img :src="item.memPhoto" alt="">
              <img src="../../img/error-head.png" class="vi-img--error" alt="">
            </div>
          </div>
          <div class="com-flex__col--10 com-text--light com-text__visible--one">{{ item.memName}}</div>
          <div class="com-flex__col--6  com-text--light com-text--right">{{ item.followerNum }}</div>
        </div>
      </div>

      <div class="com-radius--lg com-padding com-padding__lg--ad com-background com-margin--tp">

        <div class=" ">
          <div class="com-text--bold com-text--lg com-text__height--lg">活动时间</div>
          <div class="com-text--light ">即日起至2018年10月15日23:59结束</div>
        </div>
        <div class="  com-margin--tp">
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
        <div class="com-margin--tp">
          <div class="com-text--bold com-text--lg com-text__height--lg ">奖品发放规则</div>
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
        <div class="com-background  com-margin--tp">
          <div class="com-text--bold com-text--lg com-text__height--md">
            本活动的最终解释权归成都贝斯特链科技有限公司所有。
          </div>
        </div>

      </div>
    </div>

    <div class="vi-footer">
      <div class="com-background--theme com-padding--ud  com-flex">
        <router-link :to="{name:'ActivityTeam'}" tag="div"  class="com-text--bold com-text--white com-padding__sm--ud com-text--lg com-flex__col--12 com-text--center com-border--rt white">我的现有团队</router-link>
        <router-link :to="{name:'ActivityAward'}" tag="div" class="com-text--bold com-text--white com-padding__sm--ud com-text--lg com-flex__col--12 com-text--center" >我的奖品详情</router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .side{ position: absolute ;top:10px ;right:0 ;border-top-left-radius: 50px;border-bottom-left-radius: 50px; }
</style>
