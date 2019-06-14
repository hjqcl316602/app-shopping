<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import   ListStatus  from '../components/list.status.vue'
  import activity from '../Mixin/activity';
  export default {
    name: "",
    components: {  ListStatus },
    mixins: [ activity ],
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
      this.$get_team_list( false,true )
    },
    mounted(){

    },
    activated(){
    },
    computed:{
      teamList(){
        return this.$store.state.activity.teamList
      }
    },
    data(){
      return {}
    },
    methods: {
      _push_load_more(){
        this.$get_team_list( true,false )
      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div class=" com-padding--ad com-padding--bm vi-bg vi-bg--act-list" style="min-height:100vh">
    <div class="com-text--white com-padding--ud"  >
      温馨提示：本活动仅直接发展的成员有效
    </div>
    <div class="com-radius--lg com-background  com-padding__lg--ad com-padding--ud">

      <div class="com-flex com-margin--tp com-padding--bm com-border--bm">
        <div class="com-flex__col--4 com-text--light com-text--sm">头像</div>
        <div class="com-flex__col--12 com-text--light com-text--sm">名称</div>
        <div class="com-flex__col--8  com-text--light com-text--sm com-text--right">加入时间</div>
      </div>

      <template v-if="teamList.length > 0 ">
        <van-list v-model="team.push.loading"
                  :finished="team.push.finished"
                  @load="_push_load_more"
                  :offset="30"
        >
          <div class="com-flex com-padding--ud com-items--center" v-for="(item,index) in teamList">
            <div class="com-flex__col--4  ">
              <div class=" vi-img__box vi-img--head--tiny ">
                <img :src="item['photo']" alt="">
                <img src="../../img/error-head.png" class="vi-img--error" alt="">
              </div>
            </div>
            <div class="com-flex__col--12 com-text--light com-text__visible--one ">{{ item['name']}}</div>
            <div class="com-flex__col--8  com-text--light com-text--mi   com-text--right">{{ item['joinTeamTime']}}</div>
          </div>
        </van-list>
        <div v-if="team.push.finished && teamList.length > team.pageSize" class="com-text--light com-text--center com-padding__lg--ud"> ~没有更多团队信息了~</div>
      </template>

      <template v-else>
        <div class="com-padding__lg--tp">
          <ListStatus content="~~分享二维码，加入你的团队~~" title="无团队数据"></ListStatus>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>

</style>
