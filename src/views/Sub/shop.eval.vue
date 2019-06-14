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
      return {
        data_list: 0,
        loading: false,
        finished: false,
        isLoading:false
      }
    },
    methods: {
      onLoad() {


      },
      onRefresh() {

      }
    },
    watch: {/*'': {handler(val, olval){}, deep: true} */
      isLoading(val){
        //console.log(val)
      }
    },
    destroy(){
    }
  }
</script>


<template>
  <div class="vi-shop-eval">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list  v-model="loading"
                 :finished="finished"
                 @load="onLoad">
        <div class="com-background com-padding com-flex com-border--bm" v-for="item in data_list">
          <div class="vi-img__box vi-img--user">
            <img src="../../img/shopCarActive.png" alt="">
          </div>
          <div class="com-flex__col--ao com-padding">
            <div class="com-flex com-content--between">
              <div class="com-text com-text--lg">18315251521</div>
              <div class="com-text com-text--gray">
                2017-12-11 12:12
              </div>
            </div>
            <div class="com-flex com-margin__sm--tp">
              <span class=" com-margin__sm--rt com-text--gray">评分</span><span><van-rate :size="14" :value="2" /></span>
            </div>
            <div class="com-margin__sm--tp">
              <span class="com-text--gray com-text__height ">十点多就开始大开杀戒坚实的紧身裤十点多就开始大开杀戒坚实的紧身裤十点多就开始大开杀戒坚实的紧身裤十点多就开始大开杀戒坚实的紧身裤</span>
            </div>

            <div class="com-margin__sm--tp com-flex com-wrap">
              <div class="vi-img__box vi-img--eval com-margin--rt com-margin--bm " v-for="item in 1">
                <img src="../../img/shopCarActive.png" alt="">
              </div>
            </div>

            <div>
              <span class="com-text--gray">食品口味：核桃味道</span>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<style scoped></style>
