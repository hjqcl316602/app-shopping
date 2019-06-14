<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import activity from '../Mixin/activity';
  import   ListStatus  from '../components/list.status.vue'
  export default {
    name: "",
    components: { ListStatus },
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
    computed:{
      rankList(){
        return this.$store.state.activity.rankList
      }
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

    data(){
      return {}
    },
    methods: {
      _push_load_more(){
        this.$get_direct_number( true,false )
      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div class="com-padding--ad com-padding--bm  vi-bg vi-bg--act-list " style="min-height:100vh">

    <div class="com-text--white com-padding--ud">
      温馨提示：本活动仅直接发展的成员有效
    </div>


    <div class="com-radius--lg com-padding com-padding__lg--ad com-background">
      <div class="com-padding">
        <div class="vi-area--header vi-area--header--theme ">排行榜</div>
      </div>
      <div class="com-flex com-margin--tp com-padding--bm com-border--bm">
        <div class="com-flex__col--4 com-text--light com-text--sm">排行</div>
        <div class="com-flex__col--4 com-text--light com-text--sm">头像</div>
        <div class="com-flex__col--10 com-text--light com-text--sm">名称</div>
        <div class="com-flex__col--6  com-text--light com-text--sm com-text--right">团队数量</div>
      </div>

      <template v-if=" rankList.length > 0 ">
        <van-list v-model="rank.push.loading"
                  :finished="rank.push.finished"
                  @load="_push_load_more"
                  :offset="30"
        >
          <div class="com-flex com-padding--ud com-items--center" v-for="(item , index) in rankList"  >
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
                <div class="com-padding--lt">{{ index + 1}}</div>
              </template>
            </div>
            <div class="com-flex__col--4">
              <div class=" vi-img__box vi-img--head--tiny ">
                <img :src="item.memPhoto" alt="">
                <img src="../../img/error-head.png" class="vi-img--error" alt="">
              </div>
            </div>
            <div class="com-flex__col--10 com-text--light com-text__visible--one">{{ item.memName}}</div>
            <div class="com-flex__col--6  com-text--light com-text--right">{{ item.followerNum}}</div>
          </div>
        </van-list>

        <div v-if="rank.push.finished && rankList.length > rank.pageSize" class="com-text--light com-text--center com-padding__lg--ud"> ~没有更多排行信息了~</div>

      </template>

      <template v-else>
        <div class="com-padding__lg--tp">
          <ListStatus content="~~敬请期待排行榜更新哦~~" title="无排行榜数据"></ListStatus>
        </div>
      </template>

    </div>
  </div>
</template>
<style scoped>
/*  .vi-content--list{ height:calc(100% - 70px) ; }*/
</style>
