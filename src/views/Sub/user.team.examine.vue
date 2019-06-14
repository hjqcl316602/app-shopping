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
                          message:''
                        }
                },
                methods: {},
                watch: {/*'': {handler(val, olval){}, deep: true ,immediate:true}  */},
                destroy(){
                }
        }
</script>
<template>
  <div class="vi-user-team-examine">
    <template >
      <div class="com-margin--bm com-background">
        <div class="com-flex com-padding__lg--ad com-padding--ud com-background">
          <span class="com-text com-text--bold" style="width:100px;">姓名</span>
          <span class="com-flex__col--ao  ">黄军泉</span>
        </div>
        <div class="com-flex com-padding__lg--ad com-padding--ud com-background">
          <span class="com-text com-text--bold" style="width:100px;">电话</span>
          <span class="com-flex__col--ao  ">13980464237</span>
        </div>
        <div class="com-padding__lg">
          <van-field
            v-model="message"
            type="textarea"
            placeholder="如果拒绝，请填写拒绝原因！"
            rows="5"
          />
        </div>
      </div>
    </template>
    <template>
      <div class="com-padding__lg--ad  com-padding--ud">
        <div class="vi-btn__submit vi-btn--theme vi-btn--radius" @click="submit">通过</div>
      </div>
    </template>
    <template>
      <div class="com-padding__lg--ad com-padding--ud">
        <div class="vi-btn__submit vi-btn--theme-border vi-btn--radius" @click="submit">拒绝</div>
      </div>
    </template>

  </div>
</template>
<style scoped></style>
