<script type="text/ecmascript-6">
  import car  from '../Mixin/car'
  import order  from '../Mixin/order'
  import good  from '../Mixin/good'
  import wx from 'weixin-js-sdk'
  import PopupShare from '../components/popup.share.vue'
  import { set_wx_share } from '../../js/vue.wx'
  import Swipe from 'vant/lib/swipe'
  import SwipeItem from 'vant/lib/swipe-item'
  export default {
    name: "OrderDetail",
    components: {
      PopupShare,
      ['van-swipe']:Swipe,
      ['van-swipe-item']:SwipeItem
    },
    mixins:[ car,order ,good ],
    beforeRouteEnter (to, from, next) {
      next(vm=> {
        vm.init_route(from)
      })
    },

    mounted(){
      this._init_page()
    },
    data(){
      return {
        good:{
          id:'',
          detail:{},
          options:[],
          value:'',
          select:null,
          total:0,
          num:0,
          isStock:true,
          specNameOptions:[]
        },
        popup:{
          show:false,
          show2:false,
          type:'car',
        },
        index:{
          isBtn:false
        },
        tab:{
          value:'1'
        },

      }
    },
    computed:{
      carList(){
        return this.$store.state.car.cars
      },
      webMemType(){
        return this.$store.state.base['loginMessage']['webMemType']
      }
    },
    methods: {

      async _init_page(){
        this.good.id = this.$route.query.goodid ;

        await  this.get_order_detail(); // 得到商品的详情

        await  this.$get_car_list(true); // 得到购物车清单

        await  this.$do_good_click(this.good.id);  // 触发商品被单击记录

      },

      // 进入页面 - 判断是否是没有从其他页面进来 - 没有的话就显示进入首页按钮
      init_route(from){
        if(!from.name || from.name == 'SubLogin'){
          this.index.isBtn = true
        }else{
          this.index.isBtn = false
        }
      },
      get_order_detail(){
        return new Promise((resolve,reject)=>{
          this.$request({
            url:this.API.GOODINFO,
            data:{
              goodId:this.good.id
            }
          }).then((res)=>{

            let spec = res['data']['detail']; // 规格类数据格式处理
            let newSpec = [];
            for(var i in spec){
              newSpec.push(spec[i]);
            }
            // 处理规格选项
            let specList = res['data']['specList'];
            /*let specList = [
             { name:'尺寸',list:[ { name :"39"},{ name :"40"}]},
             { name:'颜色',list:[ { name :"红色"},{ name :"黑色"}]},
             { name:'重量',list:[ { name :"200"},{ name :"300"},{ name :"500"},{ name :"2000"},{ name :"5000"}]}
             ];*/

            let newSpecList = [];
            specList.forEach((item,i) =>{
              let newSpecChildList = [];
              item.list.forEach((list,li)=>{
                let obj = {name:list.name,active:false };
                newSpecChildList.push(obj) ;
              });
              let obj = { name:item.name,list:newSpecChildList};
              newSpecList.push(obj)
            });

            this.good.detail = res['data'];
            this.good.detail.spec = newSpec;
            this.good.detail.specList = newSpecList;


            let details = res['data']['detail'];
            let options = [];
            let index = 1;
            for(let i in details){
              let obj = Object.assign({
                value:index++,
                name:details[i]['specsName']
              },details[i]);
              options.push(obj)
            }
            this.good.options = options;

            // 转化规格为数组
            this.good.specNameOptions = this.get_spec_array();
            // 初始化选择中一条有库存的商品
            this.init_select_good();

            this.set_share();

            resolve()
          })
        })


      },


      // 初始化选择中一条有库存的商品
      init_select_good(){
        this.good.select = this.get_stock_good();

        this.good.num = 1;
        let newGoodSpecName = this.cancel_specs_name(this.good.select['specsName']);
        //console.log(newGoodSpecName)
        newGoodSpecName.forEach((aa,a)=>{
          this.good.detail.specList.forEach((bb,b)=>{
            if(aa.name == bb.name){
              bb.list.forEach((cc,c)=>{
                if(aa.value == cc.name){
                  cc.active = true
                }else{
                  cc.active = false
                }
              })
            }
          })
        });

      },

      // 处理规格 颜色:白色,尺寸:L - > [{ name:'颜色',value:'白色'},{ name:'尺寸',value:'L'}]
      cancel_specs_name(specsName){
        let newGoodSpecName = [];
        let goodSpecName = specsName.split(',');
        goodSpecName.forEach((child,child_i)=>{
          let childs = child.split(':');
          let obj = {
            name:childs[0],
            value:childs[1]
          };
          newGoodSpecName.push(obj)
        });
        return newGoodSpecName;
      },

      // 初始检验库存 - 有库存及返回
      //得到有库存的第一条数据
      get_stock_good(){
        for( let n = 0 ; n < this.good.options.length;n++ ){
          let item = this.good.options[n];
          if(item['stock'] && item['stock'] > 0){
            return item;
          }
        }
        return [];
      },

      // 转化规格为数组
      get_spec_array(){
        //console.log(this.good.options)
        let specsNameArr = [];
        this.good.options.forEach((aa,a)=>{
          if(aa.stock && aa.stock > 0 ){
            specsNameArr.push(this.cancel_specs_name(aa['specsName']));
          }
        });
        return specsNameArr;
      },


      //选择对应的商品规格
      select_spec(index,i){
        console.log()
        this.good.select = null;
        this.good.num = 0;

        //console.table(this.good.detail.specList)
        //console.table(this.good.specNameOptions)


        this.good.detail.specList[index].list.forEach((item,item_i)=>{
          if(i == item_i){
            item.active = !item.active;
          }else{
            item.active = false ;
          }
        });
        let specStr = [];
        this.good.detail.specList.forEach((parent,parent_i)=>{
          parent.list.forEach((child,child_i)=>{
            if(child.active){
              let str =  `${parent.name}:${child.name}`;
              specStr.push(str)
            }
          })
        });
        this.good.detail.spec.forEach((specItem,specItemIndex)=>{
          if(specItem.specsName == specStr.join(',')){
            this.good.select = specItem;
            this.good.num = 1;
          }
        })

      },
      // 存储购物车 - 本地存储 - 废弃
      save_car_good_old(){
        // 本地存储

        let save_success = () =>{
          this.good.num = 0 ;
          this.popup.show = false; // 成功加入后关闭弹框
          this.$toast('加入购物车成功！');
        };

        let car_good_local = JSON.parse( localStorage.getItem('carGoods') ) || [] ;
        for(let n = 0 ; n < car_good_local.length;n++){
          if(car_good_local[n]['goodId'] == this.good.id && car_good_local[n]['specsName'] == this.good.select['specsName'] ){
            car_good_local[n]['num'] = car_good_local[n]['num'] + this.good.num;
            save_success()
            return localStorage.setItem('carGoods',JSON.stringify(car_good_local));
          }
        }
        let car_good = {
          goodId:this.good.id,
          specsName:this.good.select['specsName'],
          num:this.good.num,
          price:this.good.select.price,
          goodName:this.good.detail.goodName,
          goodPicture:this.good.detail.goodPicture,
          stock:this.good.select['stock'],
          active:false, // 用于选择
          buy:false, // 用于创建订单
        };
        car_good_local.push(car_good);
        localStorage.setItem('carGoods',JSON.stringify(car_good_local));
        save_success()
        /*return new Promise((resolve,reject)=>{
         let car_good = [{
         goodId:this.good.id,
         specsName:this.good.select['specsName'],
         num:this.good.num
         }];
         this.$request({
         url:this.API.UPDATESHOPCAR,
         data:{
         orderDetail:JSON.stringify(car_good)
         }
         }).then((reponse)=>{
         this.good.num = 0 ;
         this.popup.order_detail = false; // 成功加入后关闭弹框
         this.$toast('加入购物车成功！');
         resolve()
         },()=>{
         this.$toast('加入购物车失败！');
         reject()
         })
         });*/
      },
      // 存储购物车前进行是否已存在的商品
      check_car_exit(){
        //debugger
        for(let n = 0 ; n < this.carList.length ;n++){
          let item  = this.carList[n];
          if(item['goodId'] == this.good.id && item['specsName'] == this.good.select['specsName'] ){
            return true
          }
        }
        return false
      },
      // 存储购物车 - 本地存储
      save_car_good(){
        let newArr = [];
        let newObj = {
          goodId:this.good.id,
          specsName:this.good.select['specsName'],
          num:this.good.num
        };

        if( this.check_car_exit() ){
          this.carList.forEach((item,i)=>{
            let obj = {
              goodId:item['goodId'],specsName:item['specsName'],num:0
            };
            if( item['goodId'] == newObj['goodId']  &&  item['specsName'] ==  newObj['specsName'] ){
              obj['num'] = item['num'] + newObj['num'];
              newArr.unshift(obj)
            }else{
              obj['num'] = item['num'];
              newArr.push(obj)
            }
          });
        }else{
          for(let n = 0 ; n < this.carList.length ; n++){
            let obj =  this.$objects.copy_prev( { goodId:0, specsName:'', num:0 },this.carList[n]);
            newArr.push(obj);
          }
          newArr.unshift(newObj)
        }
        this.$insert_car(newArr).then(()=>{
          this.$toast('添加购物车成功！');
          this.popup.show = false;
        },()=>{
          this.$toast('添加购物车失败！')
        })
      },

      operate(type){
        if(type== 'submit'){
          if(this.good.num > 0 && (this.good.select && this.good.select.price ) ){
            // 保存到购物车
            if(this.popup.type=='car'){
              this.save_car_good()
            }else{
              let detail = [{
                goodId:this.good.id,
                goodName:this.good.detail['goodName'],
                goodPicture:this.good.detail['goodPicture'],
                originPrice:this.good.select.price,
                specsName:this.good.select.specsName,
                num:this.good.num,
              }];
              this.popup.show = false;
              sessionStorage.setItem('orderDetail',JSON.stringify(detail));
              this.$router.push({name:'OrderCreate',query:{ type:'good'}})
            }

          }else{
            this.$toast('请选择商品参数！')
          }
        }else if(type== 'car'){
          this.popup.show = true ;
          this.popup.type = type;
        }else if(type== 'buy'){
          this.popup.show = true ;
          this.popup.type = type;
        }else if(type == 'shop'){
          this.$router.push( { name:'Shop' } )
        }else if(type == 'index'){
          this.$router.replace({ name :'Index'})
        }

      },
      // 页面跳转 - 头部按钮（ ->首页）
      jump_page(name){
        this.$router.push({ name :name })
      },

      push_load(){
        this.$get_comment_list(true,false);
      },
      // 图片预览
      show_picture(pics,pic){
        let arrPics = [];
        pics.forEach((item,i)=>{
          arrPics.push( item.url)
        });

        wx.previewImage({
          current: pic,       // 当前显示图片的http链接
          urls: arrPics          // 需要预览的图片http链接列表
        });
      },

      //分享
      set_share(){

        // 微信分享

        let obj = {
          title:'【贝斯特链】'+this.good.detail['goodName'],
          desc:this.good.detail['goodName'],
          imgUrl:this.good.detail['goodPicture'],
          link:`${this.$configs['HTTP_WEB'] }?/SubPage/OrderDetail?goodid=${this.good.detail['goodId'] }&fromUser=${this.$cookies.get('fromUser')}`
        };
        console.log(obj)
        set_wx_share(obj).then(()=>{
          this.popup.show2 = false
        });
      },

      open_share_popup(){
        this.popup.show2 = true;
      }
    },
    watch: {
      ['tab.value'](val){
        if(val == 2 ){
          this.$get_comment_list()
        }
      },
      ['good.select'](val){
        console.log(val)
      }
    },
    destroy(){
    }
  }
</script>
<template>
  <div class="vi-order-detail vi-footer__content ">

    <!--分享-->
    <template v-if=" webMemType  == 2 ">
      <div class="vi-side" @click="open_share_popup">
        <div class="vi-side--inner com-flex--center">
          <div class=" vi-icon vi-icon__share"></div>
        </div>
      </div>
    </template>

    <template>
      <PopupShare v-model="popup.show2"></PopupShare>
    </template>

    <div class="vi-swipe" >
      <div class="vi-swipe__content">
        <van-swipe :autoplay="0" >
          <van-swipe-item  v-for="(item ,index ) in good.detail.pictures && good.detail.pictures.split(',')" :key="index">
            <div class="vi-ratio" >
              <div class="vi-ratio__outer" data-ratio="9:8">
                <div class="vi-ratio__inner vi-img__box">
                  <img :src="item" alt="" class="vi-img">
                  <img src="../../img/icon-error.png" class="vi-img--error " alt="">
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>

      </div>
    </div>
    <!--商品介绍-->
    <div class=" com-padding__lg com-background">
      <div class="com-text__height--sm com-text--xl com-text--bold   com-text__visible--two">{{ good.detail.goodName }}</div>
      <div class="com-flex com-content--between ">
        <span class="com-text com-text__height--md com-text--xl-x com-text--theme " v-if="good.detail.lowPrice == good.detail.highPrice">￥{{ good.detail.lowPrice | str_money }}</span>
        <span class="com-text com-text__height--md com-text--xl-x com-text--theme " v-else>￥{{ good.detail.lowPrice | str_money}} ~ {{ good.detail.highPrice | str_money }}</span>
      </div>
      <div class="com-padding--bm">
        <p class="com-text--aux" v-for="(item,index) in good.detail.lvlList">
          {{item}}
        </p>
      </div>
      <div>
        <span class="com-text com-text--light com-text--sm">运费：免费</span>
      </div>
    </div>
    <div class="com-background com-padding com-margin--tp">
      <div class=" com-flex ">
        <div class="com-flex__col--ao com-flex--center   " @click="tab.value = '1'">
          <span class="com-text com-text--bold com-text__height" :class="{'com-text--theme':tab.value == '1'}">图文详情</span>
        </div>
        <div class="com-flex__col--ao com-flex--center " @click="tab.value = '2'">
          <span class="com-text com-text--bold com-text__height " :class="{'com-text--theme':tab.value == '2'}">客户评论</span>
        </div>
      </div>
    </div>
    <!--图文详情-->
    <div class="content">
      <template class="" v-if="tab.value == '1'">
        <div class="com-background good-content" v-html="good.detail.content" v-if="good.detail.content"></div>
        <div class="com-padding__lg com-text--center com-text--gray" v-else>暂无商品详情</div>
      </template>
      <!--客户评论-->
      <template class="" v-if="tab.value == '2'">
        <van-list v-model="comment_push.loading"
                  :finished="comment_push.finished"
                  @load="push_load"
                  :offset="30"
        >
          <div class="com-background com-padding com-flex " v-for="(item,index) in  comment.data ">
            <div class="vi-img__box vi-img--user">
              <img :src="item.photo" alt="" onerror = " this.src = '' ">
              <img src="../../img/error-head.png" class="vi-img--error" alt="">
            </div>
            <div class="com-flex__col--ao com-padding">
              <div class="com-flex com-content--between">
                <div class="com-text com-text--bold">{{ item.memName }}</div>
                <div class="com-text com-text--light">
                  {{ item.commentTime }}
                </div>
              </div>
              <div class="com-flex com-margin__sm--tp">
                <span class=" com-margin__sm--rt com-text--light">评分</span>
                <span><van-rate :size="14" :value="item.grade" /></span>
              </div>
              <div class="com-margin__sm--tp com-padding--ud">
                <span class=" com-text__height ">{{ item.content }}</span>
              </div>

              <div class="com-margin__sm--tp com-flex com-wrap">
                <div class="vi-img__box vi-img--eval com-margin--rt com-margin--bm " v-for="(pic,i) in item['pictures']">
                  <img :src="pic.url" alt="" @click="show_picture(item['pictures'],pic.url)" onerror = " this.src = '' "  >
                  <img src="../../img/icon-error.png" class="vi-img--error" alt="" @click="show_picture(item['pictures'],pic.url)">
                </div>
              </div>

              <div>
                <span class="com-text--light">{{ item.specsName }}</span>
              </div>
            </div>
          </div>
          <div class="com-padding__lg com-text--center com-text--gray" v-if="comment.data.length == 0 ">暂无商品评价</div>
        </van-list>
      </template>
    </div>

    <!-- 底部按钮 -->

    <template>
      <div class="vi-footer">
        <div class="com-flex com-background com-border--tp">
          <div class="com-flex__col--ao  com-flex com-content--around" >
            <div class="com-flex com-direction--column com-content--center com-items--center" @click="operate('index')" v-if="index.isBtn">
              <div class="vi-icon vi-icon__index"></div>
              <div class="com-text--sm com-text--light">首页</div>
            </div>
            <div class="com-flex com-direction--column com-content--center com-items--center " @click="operate('shop')">
              <div class="vi-icon vi-icon__car good-car">
                <span class="good-car--badge com-background--theme com-text--white com-text--sm com-text--center">{{ carList.length  |  str_number_large  }}</span>
              </div>
              <div class="com-text--sm com-text--light">购物车</div>
            </div>

            <!--<div class="vi-navbar">
              <div class="vi-navbar__item " >
                <div class="vi-navbar__item&#45;&#45;inner index">首页</div>
              </div>
              <div class="vi-navbar__item good-car" @click="operate('shop')">
                <span class="good-car&#45;&#45;badge com-background&#45;&#45;theme com-text&#45;&#45;white com-text&#45;&#45;sm com-text&#45;&#45;center">{{ carList.length  |  str_number_large  }}</span>
                <div class="vi-navbar__item&#45;&#45;inner car">购物车</div>
              </div>
            </div>-->
          </div>
          <div class="com-flex__col--ao">
            <div class="vi-btn__submit vi-btn--warning" @click="operate('car')">加入购物车</div>
          </div>
          <div class="com-flex__col--ao">
            <div class="vi-btn__submit vi-btn--warning-theme" @click="operate('buy')">立即购买</div>
          </div>
        </div>
      </div>
    </template>

    <template>
      <!-- 弹出层，选择商品-->
      <van-popup v-model="popup.show"  position="bottom">
        <div class="vi-footer__content">
          <div class=" com-padding__lg--ad com-padding__lg--tp com-flex com-items--center">
            <div class="vi-img__box vi-img--order">
              <img :src="good.detail.goodPicture" alt="">
              <img src="../../img/icon-error.png" class="vi-img--error " alt="">
            </div>
            <div class="com-flex__col--ao com-padding--ad ">
              <p class="com-text--bold com-text--lg com-text__height--md com-text__visible--two">{{ good.detail.goodName }}</p>
              <p class="com-text--theme com-text__height--md " v-if="good.select">￥{{ good.select.price  | str_money}}</p>
              <p class="com-text--theme com-text__height--md " v-else>
                <span class="com-text  com-text--theme com-text__height--md" v-if="good.detail.lowPrice == good.detail.highPrice">￥{{ good.detail.lowPrice | str_money }}</span>
                <span class="com-text  com-text--theme com-text__height--md" v-else>￥{{ good.detail.lowPrice | str_money}} ~ {{ good.detail.highPrice | str_money }}</span>
              </p>

              <p class="com-text--sm com-text--light com-text__height--sm">
                请选择规格：[ <span class="com-margin__sm--lt" v-for="(item,index) in good.detail.specList ">{{ item.name }}</span> ]
              </p>
            </div>
          </div>
          <div class="vi-spec  com-padding__lg--ad com-padding__lg--tp">
            <div class="">
              <div>
                <span class="com-text com-text--bold com-text--lg   com-text__height--md " >规格</span>
              </div>
              <div class="">
                <div class="" v-for="(item ,index) in good.detail.specList">
                  <p class="com-text com-text__height--lg com-margin__lg--lt com-text--light ">{{ item.name }}</p>
                  <div class="my-radio com-margin__lg--lt">
                    <div class="item " :class="{'active':list.active }" v-for="(list,i) in item.list" @click="select_spec(index,i)">{{ list.name }}</div>
                  </div>
                </div>
                <!--<MyRadioBtn :options="good.options" v-model="good.value"></MyRadioBtn>-->
              </div>

            </div>
            <div class="com-margin--tp">
              <div>
                <span class="com-text com-text--bold com-text--lg  com-text__height--md" >数量</span>
              </div>
              <div class="com-padding--ud com-padding__lg--lt">
                <MyStepper v-model="good.num" :max="good.select && good.select.stock" :disabled="!good.select || good.select.stock == 0"> </MyStepper>
              </div>
            </div>
          </div>
          <div class="vi-footer">
            <div class="com-flex ">
              <div class="com-flex__col--ao com-padding__lg--lt com-flex com-items--center">
                <span class="com-text com-text--light com-margin--rt ">合计</span><span class="com-text--theme com-text--bold com-text--xl">￥{{ good.num * (good.select ? good.select.price : 0 )| str_money}}</span>
              </div>
              <div class="com-flex__col--8 vi-btn__submit vi-btn--theme " @click="operate('submit')">确认</div>
            </div>
          </div>
        </div>
      </van-popup>
    </template>


  </div>
</template>
<style scoped>

</style>
