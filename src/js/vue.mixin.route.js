/**
 * Created by 41587 on 2018/9/9.
 */

import Vue from 'vue'

Vue.mixin( {
  beforeRouteLeave(to,from,next){
    // 商品详情页会通过分享，所以返回键就直接退出项目了，需要在meta信息中设置 back ，回到哪个页面
    //debugger

    if(this.popup && this.popup.show){    // 由于子页面的该事件会后执行，所以目前只能通过在这里执行弹出框的显示和隐藏
      this.popup.show = false ;
      next(false)
    }else{
      let fromNum = from.meta.pageNum;
      let toNum = to.meta.pageNum;
      //debugger
      /*if( fromNum && toNum && fromNum > toNum ){
       this.$destroy()
       }*/
      let keepAliveToPath = from.meta.keepAliveToPath || [] ;
      let toName = to.name ;
      if(keepAliveToPath.indexOf(toName) == -1 ){

        this.$destroy()
      }
      next()
    }
  }
});


