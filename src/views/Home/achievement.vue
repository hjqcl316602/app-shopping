<script type="text/ecmascript-6">
        //import Header  from './components/header.vue'
        import base  from '../Mixin/basic'
        import achievement  from '../Mixin/achievement'
        export default {
                name: "",
                components: {},
                mixins:[ base,achievement ],
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

                   //this.$get_user_message();

                },
                mounted(){
                  this.$get_achievement_info();
                },
                activated(){

                },
                computed:{
                  achievementDetail(){
                    let achievementDetail = this.$store.state.achievement.detail;
                    return achievementDetail
                  }
                },
                data(){
                        return {
                          user:{
                            head:''
                          },
                        }
                },
                methods: {
                  jump(name){
                    this.$router.push({ name : name  })
                  }
                },
                watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
                destroy(){
                }
        }
</script>
<template>
  <div class="vi-achievement">
    <template>
      <div class="com-padding__lg ">
        <div class="vi-ratio">
          <div class="vi-ratio__outer vi-achievement__header" data-ratio="67:36">
            <div class="vi-ratio__inner bg-border-shadow__box vi-img__box">
              <!--:class="{
              'bg&#45;&#45;normal':achievementDetail.lvl == '普通会员',
              'bg&#45;&#45;iron':achievementDetail.lvl == '铁牌会员',
              'bg&#45;&#45;copper':achievementDetail.lvl == '铜牌会员',
              'bg&#45;&#45;sliver':achievementDetail.lvl == '银牌会员',
              'bg&#45;&#45;gold':achievementDetail.lvl == '黄金会员',
              'bg&#45;&#45;platinum':achievementDetail.lvl == '铂金会员',
              'bg&#45;&#45;diamonds':achievementDetail.lvl == '钻石会员',
              'bg&#45;&#45;crown':achievementDetail.lvl == '皇冠会员',

              }"-->
              <img src="../../img/ach-iron.png" alt="" class="cover" v-if="achievementDetail.lvl == '黑铁会员'">
              <img src="../../img/ach-copper.png" alt="" class="cover" v-if="achievementDetail.lvl == '黄铜会员'">
              <img src="../../img/ach-sliver.png" alt="" class="cover" v-if="achievementDetail.lvl == '白银会员'">
              <img src="../../img/ach-gold.png" alt="" class="cover" v-if="achievementDetail.lvl == '黄金会员'">
              <img src="../../img/ach-platinum.png" alt="" class="cover" v-if="achievementDetail.lvl == '铂金会员'">
              <img src="../../img/ach-diamonds.png" alt="" class="cover" v-if="achievementDetail.lvl == '钻石会员'">
              <img src="../../img/ach-crown.png" alt="" class="cover" v-if="achievementDetail.lvl == '皇冠会员'">


            </div>

            <div class="inner--footer" @click="jump('UserAchievementDetail')">
              <div class="com-flex com-content--between">
                <div class=" com-text com-text--white com-text--bold com-padding--rt">升级规则详情</div>
                <div>
                  <div class="com-flex__col--ao com-flex com-items--center">
                    <span class="com-text  com-margin__sm--rt com-text--white-light com-text--sm">{{ achievementDetail.lvlDetailStr}}</span>
                    <span class="com-text link iconfont icon-iconfontjiantou2 com-text--white-light com-text--md"></span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </template>

    <template>
      <div class="com-padding__lg--ad com-padding__lg--bm">
        <div class="com-row com-margin--bm">
          <div class="com-col--24 ">
            <div class="com-background com-flex--center com-radius" style="height:100px">
              <div class="">
                <div class="com-text--dark com-text--xl-xxx com-text--center com-text--bold">{{ achievementDetail.bonus | str_money | str_money_thousand }}</div>
                <div class="com-text--light com-text--center com-text--sm">当前预计收益（积点数）</div>
              </div>
            </div>
          </div>
        </div>

        <div class="com-row com-margin--bm" data-gutter="10">
          <div class="com-col--12 ">
            <div class=" com-background  com-flex--center com-radius" style="height:100px">
              <div class="">
                <div class="com-text--dark com-text--xl-xxx com-text--center com-text--bold">{{ achievementDetail.totalAmount | str_money | str_money_thousand_integer}}</div>
                <div class="com-text--light com-text--center com-text--sm">本月团队销售额（元）</div>
              </div>
            </div>
          </div>
          <div class="com-col--12 ">
            <div class=" com-background  com-flex--center com-radius" style="height:100px">
              <div class="">
                <div class="com-text--dark com-text--xl-xxx com-text--center com-text--bold">{{ achievementDetail.todayAmount | str_money | str_money_thousand_integer}}</div>
                <div class="com-text--light com-text--center com-text--sm">今日新增销售额（元）</div>
              </div>
            </div>
          </div>
        </div>

        <div class="com-row com-margin--bm" data-gutter="10">
          <div class="com-col--12 ">
            <div class=" com-background  com-flex--center com-radius" style="height:100px">
              <div class="">
                <div class="com-text--dark com-text--xl-xxx com-text--center com-text--bold">{{ achievementDetail.monthOrder }}</div>
                <div class="com-text--light com-text--center com-text--sm">本月团队订单（笔）</div>
              </div>
            </div>
          </div>
          <div class="com-col--12 ">
            <div class=" com-background  com-flex--center com-radius" style="height:100px">
              <div class="">
                <div class="com-text--dark com-text--xl-xxx com-text--center com-text--bold">{{ achievementDetail.todayOrder }}</div>
                <div class="com-text--light com-text--center com-text--sm">今日订单数（笔）</div>
              </div>
            </div>
          </div>
        </div>

        <div class="com-row " data-gutter="10">
          <div class="com-col--12 ">
            <div class=" com-background  com-flex--center com-radius" style="height:100px">
              <div class="">
                <div class="com-text--dark com-text--xl-xxx com-text--center com-text--bold">{{ achievementDetail.followerNum }}</div>
                <div class="com-text--light com-text--center com-text--sm">团队总数（人）</div>
              </div>
            </div>
          </div>
          <div class="com-col--12 ">
            <div class=" com-background  com-flex--center com-radius" style="height:100px">
              <div class="">
                <div class="com-text--dark com-text--xl-xxx com-text--center com-text--bold">{{ achievementDetail.todayAddFollowerNum }}</div>
                <div class="com-text--light com-text--center com-text--sm">今日团队新增人数（人）</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>
<style scoped>

</style>
