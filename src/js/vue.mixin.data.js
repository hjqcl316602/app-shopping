
import Vue from 'vue'

Vue.mixin( {
  data(){
    return　{
      API : {
        // home
        IMGLIST: '/ad/getAd.do', //首页轮播图
        GOODINDEX:'/good/index.do', // 首页推荐商品
        GOODLIST: '/good/list.do', //商品列表 // 暂时没有用
        GOODINFO: '/good/goodInfo.do', //获取商品信息
        EVALUATIONLIST: '/comment/list.do', //获取商品评价
        SEARCH: '/good/search.do',    //搜索商品
        GOODCLICK:'/good/click.do ',  // 单击商品 - 获取访问量

        //address
        GETDEFAULTADDRESS: '/address/getDefaultAddress.do', //获取默认地址
        ADDRESSLIST: '/address/getAddressList.do', //获取地址列表
        DELETEADDRESS: '/address/delAddress.do', //删除地址
        CHANGEDEFAULTADDRESS: '/address/changeDefaultAddress.do', //改变默认地址
        ADDRESSDETAIL: '/address/getAddress.do', //获取地址详情
        AREALIST: '/address/getAreaList.do', //获取全国地址
        ADDADDRESS: '/address/addAddress.do', //添加地址
        UPDATEADDRESS: '/address/updateAddress.do', // 更新地址

        // order
        CREATEORDER: '/order/createOrder.do',  //创建订单
        GETORDERNUM: '/order/orderNum.do', //查询各类订单数量
        ORDERLIST: '/order/orderInfo.do', //查询订单列表
        ORDERDETAIL: '/order/detail.do', //订单详情
        ORDERCONFIRM:'order/confirm.do',  // 确认收货
        ORDERDETSIL: '/order/orderDet.do', //查询单个订单信息
        DETAILINFO: '/order/orderDetailInfo.do',  //查询订单中的商品
        CANCELORDER: '/order/cellOrder.do',       //取消订单
        EVALUATION: '/comment/add.do',            //添加评价
        GETEVALUATIONINFO: '/comment/getComment.do', //查看评价信息
        PAY: '/order/pay.do',   //支付接口
        GETDELIVERY:'/order/delivery.do', //  获取物流信息

        // 购物车
        GETSHOPCAR: '/car/getCar.do',     //获取购物车信息
        UPDATESHOPCAR: '/car/addCar.do',  //添加购物车
        CHECKSTOCK:'/order/checkStock.do', // //检查购物车数据是否超过库存

        //基础功能
        GETQRCODE:'/qrcode/get.do',       // 获取二维码
        GETBANKDETAIL:'/agency/bank.do',   //获取银行信息 { cardNo }
        GETFOLLOWER:'/agency/follower.do', // 获得下级代理
        GETRANDCODE:'/agency/randCode.do ', // 获得手机验证码
        INSERTDETAIL:'/agency/insertDetail.do',  // 更新会员信息
        GETDETAIL:'/agency/detail.do',  // 获取会员信息
        GETCUSTOMER:'/feed/getCustomer.do', // 获得客服电话
        GETMEMACTIVE:'/mem/active.do',  // 获得登录信息

        // 业绩中心
        GETACHIECMENTINFO:'/statistics/info.do', //用户的业绩
        GETACHIECMENTDETAIL:'/statistics/memPercent.do', //获得会员等级

        //钱包
        GETWALLETINFO:'/wallet/info.do',// 得到通证和钱
        GETWALLETTOKENHIS:'/wallet/tokenHis.do' ,       // 通证兑换记录
        GETWALLETAMOUNTHIS:'/wallet/jdHis.do',          // 积点兑换记录
        GETWALLETBBINFO:'/wallet/bbInfo.do',              //获得当前bb的兑换积点的兑换率
        INSERTWALLETCASH:'/wallet/cash.do',               //提现
        INSERTWALLETCHANGEBB:'/wallet/exchangeBB.do',     // 兑换bb 通证
        // 活动
        DIRECTNUMBER:'/team/directNumOrder.do' ,  // 得到排行榜数据
        GETAWARDLIST:'/wallet/winAward.do' ,  // 奖品清单
        GETBBORDER:'/wallet/bbOrder.do',        // 可兑换的商品
        PAYAGENCY:'/wallet/payAgency.do',      // 支付成为代理
        GETMYTEAM:'/team/myTeam.do' ,           // 我的现有团队
      },
    }
  },
});


