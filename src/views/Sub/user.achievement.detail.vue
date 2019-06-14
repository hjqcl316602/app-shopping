<script type="text/ecmascript-6">
  //import Header  from './components/header.vue'
  import achievement  from '../Mixin/achievement'

  export default {
    name: "",
    components: {},
    mixins:[ achievement ],
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

      this.init_page();

    },
    mounted(){
      //this.move_rule_pos()
      //this._set_ach_swiper()
    },
    computed:{
      achievementDetail(){
        let achievementDetail = this.$store.state.achievement.detail;
        return achievementDetail
      }
    },
    data(){
      return {
        grade:{
          list:[],
          cur:'',
          active:''
        },
        inner:{
          width:''
        },
        rule:{
          left:'0px'
        },
      }
    },
    methods: {
      async init_page(){
        this.$createLoading().show();
        let info = await this.$get_achievement_info(false);
        let detail = await this.$get_achievement_detail(false);
        this.$createLoading().hide();

        //let list = detail['data']['memPercentList'];
        let grades = [
          { text:'黑铁会员',min:0, range:'1K以下',className:'vi-progress--iron', },
          { text:'黄铜会员',min:1000, range:'1K-5K',className:'vi-progress--copper', },
          { text:'白银会员',min:5000, range:'5K-1W',className:'vi-progress--sliver', },
          { text:'黄金会员',min:10000, range:'1W-2W',className:'vi-progress--gold', },
          { text:'铂金会员',min:20000, range:'2W-5W',className:'vi-progress--platinum', },
          { text:'钻石会员',min:50000, range:'5W-10W',className:'vi-progress--diamonds', },
          { text:'皇冠会员',min:100000, range:'10W以上',className:'vi-progress--crown'}
        ];

        let totalAmount =   this.achievementDetail.totalAmount / 100;
        // 获得当前等级位置
        let index = this.get_grade_pos(grades, totalAmount );

        this.grade.active = index;
        console.log(this.grade.active)
        this.grade.cur = grades[index]['text'];

        grades.forEach((item,i)=>{
          if(i < index){
            item['className']  += ' light';
          }else if(i == index){
            item['className']  += ' aux';
          }else{
            item['className']  +=  ' gray';
          }
        });

        this.grade.list = grades;
        // 进度条的宽度计算

        let exceed  = 0.3; // 当index 大于6的时候 使用，默认有点进度就行
        let percent = 0 ;

        if(index < 6){
          exceed = (totalAmount - this.grade.list[index]['min'] )  / ( this.grade.list[index+1]['min'] - this.grade.list[index]['min'] );
        }else{
          exceed = .3 ;
        }
        percent = ( exceed / 7 ) * 100  + ( ( 100 / 7 ) * ( index ) );
        this.inner.width = ( exceed / 7 ) * 100  + ( ( 100 / 7 ) * ( index) ) + '%';

        this.move_rule_pos(percent);
        this._set_ach_swiper(index);

      },
      // 获得当前等级位置
      get_grade_pos(list,value){
        for(let i = 0 ; i < list.length;i++){
          if(value >= list[i]['min'] && (!list[i+1]  ||  value < list[i+1]['min'] ) ){
            return i;
          }
        }
        return -1;
      },
      // 移动滑块的位置
      move_rule_pos(percent){
        ///debugger
        this.$nextTick(()=>{
          let winWidth = this.$doms.getOffset(this.$refs['progress']).width; //this.$doms.getWindowOffset().winWidth - 21 ;
          //console.log(winWidth)
          let progressInnerWidth = winWidth * ( percent / 100 ) ;
          let domWidth = this.$doms.getOffset(this.$refs['rule']).width;

          let leftStyle = progressInnerWidth - ( domWidth / 2 ) ;
          leftStyle = Math.min( Math.max(0,leftStyle) , winWidth - domWidth- 5  ) ;

          this.rule.left = leftStyle + 'px';
          //console.log(this.rule.left)
        });
      },
      _set_ach_swiper(index){
        this.$nextTick(()=>{
          var swiper = new Swiper('.swiper-container',{
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
          });
          swiper.slideTo(index)
        })
      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-user-achievement-detail  com-overflow--hn">

    <div class="com-padding ">
      <div class=" swiper-container">
        <div class="swiper-wrapper">
          <div class=" swiper-slide" style="padding: 10px;">
            <div class="vi-ratio">
              <div class="vi-ratio__outer" data-ratio="67:36">
                <div class="vi-ratio__inner vi-img__box bg-border-shadow__box" :class="{'active':grade.active == 0}">
                  <div class="aside vi-icon__outer">
                    <div class=" vi-icon vi-icon__grade"></div>
                    <div class="com-padding--lt  com-text--white com-text--bold">当前等级</div>
                  </div>
                  <img src="../../img/ach-iron.png" alt="" class="cover">

                </div>
              </div>
            </div>
          </div>

          <div class=" swiper-slide" style="padding: 10px;">
            <div class="vi-ratio">
              <div class="vi-ratio__outer" data-ratio="67:36">
                <div class="vi-ratio__inner vi-img__box bg-border-shadow__box" :class="{'active':grade.active == 1}">
                  <div class="aside vi-icon__outer">
                    <div class=" vi-icon vi-icon__grade"></div>
                    <div class="com-padding--lt  com-text--white com-text--bold">当前等级</div>
                  </div>
                  <img src="../../img/ach-copper.png" alt="" class="cover">
                </div>
              </div>
            </div>
          </div>

          <div class=" swiper-slide" style="padding: 10px;">
            <div class="vi-ratio">
              <div class="vi-ratio__outer" data-ratio="67:36">
                <div class="vi-ratio__inner vi-img__box bg-border-shadow__box" :class="{'active':grade.active == 2}">
                  <div class="aside vi-icon__outer">
                    <div class=" vi-icon vi-icon__grade"></div>
                    <div class="com-padding--lt  com-text--white com-text--bold">当前等级</div>
                  </div>
                  <img src="../../img/ach-sliver.png" alt="" class="cover">
                </div>
              </div>
            </div>
          </div>

          <div class=" swiper-slide" style="padding: 10px;">
            <div class="vi-ratio">
              <div class="vi-ratio__outer" data-ratio="67:36">
                <div class="vi-ratio__inner vi-img__box bg-border-shadow__box" :class="{'active':grade.active == 3}">
                  <div class="aside vi-icon__outer">
                    <div class=" vi-icon vi-icon__grade"></div>
                    <div class="com-padding--lt  com-text--white com-text--bold">当前等级</div>
                  </div>
                  <img src="../../img/ach-gold.png" alt="" class="cover">
                </div>
              </div>
            </div>
          </div>

          <div class=" swiper-slide" style="padding: 10px;">
            <div class="vi-ratio">
              <div class="vi-ratio__outer" data-ratio="67:36">
                <div class="vi-ratio__inner vi-img__box bg-border-shadow__box" :class="{'active':grade.active == 4}">
                  <div class="aside vi-icon__outer">
                    <div class=" vi-icon vi-icon__grade"></div>
                    <div class="com-padding--lt  com-text--white com-text--bold">当前等级</div>
                  </div>
                  <img src="../../img/ach-platinum.png" alt="" class="cover">
                </div>
              </div>
            </div>
          </div>

          <div class=" swiper-slide" style="padding: 10px;">
            <div class="vi-ratio">
              <div class="vi-ratio__outer" data-ratio="67:36">
                <div class="vi-ratio__inner vi-img__box bg-border-shadow__box" :class="{'active':grade.active == 5}">
                  <div class="aside vi-icon__outer">
                    <div class=" vi-icon vi-icon__grade"></div>
                    <div class="com-padding--lt  com-text--white com-text--bold">当前等级</div>
                  </div>
                  <img src="../../img/ach-diamonds.png" alt="" class="cover">
                </div>
              </div>
            </div>
          </div>

          <div class=" swiper-slide" style="padding: 10px;">
            <div class="vi-ratio">
              <div class="vi-ratio__outer" data-ratio="67:36">
                <div class="vi-ratio__inner vi-img__box bg-border-shadow__box" :class="{'active':grade.active == 6}">
                  <div class="aside vi-icon__outer">
                    <div class=" vi-icon vi-icon__grade"></div>
                    <div class="com-padding--lt  com-text--white com-text--bold">当前等级</div>
                  </div>
                  <img src="../../img/ach-crown.png" alt="" class="cover">
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="swiper-pagination"></div>
      </div>

    </div>


    <div class="com-background">
      <div class="com-text--lg com-padding__lg com-text--bold">{{ achievementDetail.lvlDetailStr }}</div>
      <div class="com-padding__lg--lt">
        <div class="vi-progress" ref="progress">
          <div class="vi-btn " ref="rule" :style="{ left:rule.left }">本月已完成 <span class="com-text--aux">{{ achievementDetail.totalAmount | str_money }}</span>元销售额</div>
          <div class="vi-progress__strip">
            <div class="vi-progress__strip--inner" :style="{width:inner.width}"></div>


            <div class="vi-progress__item light"  :class="item.className" v-for="(item,index) in grade.list">
              <i class="label"></i>
              <div class="content">
                <div class="text">{{ item['text'].slice(0,2)}}</div>
                <div class="text">￥{{ item['min']   | str_money_format}}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="com-background com-padding__lg com-margin--tp">
      <div class="com-text--bold com-text--lg">升级规则</div>
      <div class="com-padding--ud">
        <ul>
          <li class="com-text--light com-text__height">
            按月统计销售额，按照销售额对应会员等级
          </li>
          <li class="com-text--light com-text__height">
            每月最后一天结算单月销售额，按照对应等级进行 返佣
          </li>
          <li class="com-text--light com-text__height">
            每月月底自动清空，重新根据以后的销售额匹配等 级及其返佣
          </li>
        </ul>
      </div>
      <div class="com-table">

        <div class="com-table--tr">
          <div class="com-table--th">
            <span class="com-text--white  ">会员等级</span>
          </div>
          <div class="com-table--th">
            <span class="com-text--white  ">销售额</span>
          </div>
        </div>
        <div class="com-table--tr" v-for="(item,index) in grade.list">
          <div class="com-table--td">
            <span class="com-text--light  ">{{ item.text }}</span>
          </div>
          <div class="com-table--td">
            <span class="com-text--light  ">{{ item.range }}</span>
          </div>
        </div>

        <!--<div class="com-table&#45;&#45;tr">
          <div class="com-table&#45;&#45;td">
            <span class="com-text&#45;&#45;light com-text&#45;&#45;lg">铁牌会员</span>
          </div>
          <div class="com-table&#45;&#45;td">
            <span class="com-text&#45;&#45;light com-text&#45;&#45;lg">0~2000</span>
          </div>
        </div>-->

      </div>
    </div>


  </div>
</template>
<style scoped>
  li{
    list-style:  disc inside ;
  }
  .vi-img__box{
      overflow: hidden;

  }
  .vi-img__box.active .aside{
    display: flex;align-items: center;
  }
  .vi-img__box .aside{
    display: none;
    position: absolute;left:0px;top:0px;
    background-color:rgba(0,0,0,0.5) ;
    font-size: 14px;font-weight: 800;color: #fff; padding: 5px 10px;
    border-bottom-right-radius: 10px;
  }
  .vi-img__box .aside img{
    border: 1px solid #fff;
  }
  .swiper-pagination-bullet-active{
    background: #333 !important;
  }
</style>
<!--

<div class="vi-progress__item vi-progress&#45;&#45;copper light">
  <i class="label"></i>
  <div class="content">
    <div class="text">铜牌</div>
    <div class="text">￥10</div>
  </div>
</div>

<div class="vi-progress__item vi-progress&#45;&#45;sliver light">
  <i class="label"></i>
  <div class="content">
    <div class="text">银牌</div>
    <div class="text">￥10</div>
  </div>
</div>


<div class="vi-progress__item vi-progress&#45;&#45;gold light">
  <i class="label"></i>
  <div class="content">
    <div class="text">金牌</div>
    <div class="text">￥10</div>
  </div>
</div>

<div class="vi-progress__item vi-progress&#45;&#45;platinum aux">
  <i class="label"></i>
  <div class="content">
    <div class="text">铂金</div>
    <div class="text">￥10</div>
  </div>
</div>

<div class="vi-progress__item vi-progress&#45;&#45;diamonds gray">
  <i class="label"></i>
  <div class="content">
    <div class="text">钻石</div>
    <div class="text">￥10</div>
  </div>
</div>

<div class="vi-progress__item vi-progress&#45;&#45;crown gray">
  <i class="label"></i>
  <div class="content">
    <div class="text">皇冠</div>
    <div class="text">￥10</div>
  </div>
</div>
-->


