<template>
  <div id="app" class="com-cover">
    <keep-alive >
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">

  import * as configs from './js/vue.config';
  export default {
    name: 'app',
  }
</script>
<style>
/*  !*@import 'css/merge.css';*!*/
</style>
