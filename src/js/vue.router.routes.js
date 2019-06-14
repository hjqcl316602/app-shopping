
/*
import Main from '../views/Home/main.vue';
import Index from '../views/Home/index.vue';
import User from '../views/Home/user.vue';
import Shop from '../views/Home/shop.vue';
import Achievement from '../views/Home/achievement.vue';
*/

const Main = r => require.ensure([], () => r(require('../views/Home/main.vue')), 'Main');
const Index = r => require.ensure([], () => r(require('../views/Home/index.vue')), 'Index');
const User = r => require.ensure([], () => r(require('../views/Home/user.vue')), 'User');
const Shop = r => require.ensure([], () => r(require('../views/Home/shop.vue')), 'Shop');
const Achievement = r => require.ensure([], () => r(require('../views/Home/achievement.vue')), 'Achievement');


/*import SubPage from '../views/Sub/sub.vue';
import UserOrder from '../views/Sub/user.order.vue';
import UserAddress from '../views/Sub/user.address.vue';
import UserAddressEdit from '../views/Sub/user.address.edit.vue';
import UserOrderDetail from '../views/Sub/user.order.detail.vue';
import UserOrderEval from '../views/Sub/user.order.eval.vue';
import UserOrderType from '../views/Sub/user.order.type.vue';
import UserMoney from '../views/Sub/user.money.vue';
import UserMoneyMessage from '../views/Sub/user.money.message.vue';
import UserMoneyHistory from '../views/Sub/user.money.history.vue';
import UserMoneyCash from '../views/Sub/user.money.cash.vue';
import UserMoneyExchange from '../views/Sub/user.money.exchange.vue';
import UserAchievementDetail from '../views/Sub/user.achievement.detail.vue';
import UserBankCard from '../views/Sub/user.bank.card.vue';
import UserBankInsert from '../views/Sub/user.bank.insert.vue';
import UserQrcode from '../views/Sub/user.qrcode.vue';
import UserTeamJunior from '../views/Sub/user.team.junior.vue';
import OrderDetail from '../views/Sub/order.detail.vue';
import OrderAddressCheck from '../views/Sub/order.address.check.vue';
import OrderCreate from '../views/Sub/order.create.vue';
import SubmitStatus from '../views/Sub/submit.status.vue';
import ShopEval from '../views/Sub/shop.eval.vue';
import GoodSearch from '../views/Sub/good.search.vue';
import UserAuthen from '../views/Sub/user.authen.vue';
import SubLogin from '../views/Sub/sub.login.vue';*/

const SubPage = r => require.ensure([], () => r(require('../views/Sub/sub.vue')), 'SubPage');
const UserOrder = r => require.ensure([], () => r(require('../views/Sub/user.order.vue')), 'UserOrder');
const UserAddress = r => require.ensure([], () => r(require('../views/Sub/user.address.vue')), 'UserAddress');
const UserAddressEdit = r => require.ensure([], () => r(require('../views/Sub/user.address.edit.vue')), 'UserAddressEdit');
const UserOrderDetail = r => require.ensure([], () => r(require('../views/Sub/user.order.detail.vue')), 'UserOrderDetail');
const UserOrderEval = r => require.ensure([], () => r(require('../views/Sub/user.order.eval.vue')), 'UserOrderEval');
const UserOrderType = r => require.ensure([], () => r(require('../views/Sub/user.order.type.vue')), 'UserOrderType');
const UserMoney = r => require.ensure([], () => r(require('../views/Sub/user.money.vue')), 'UserMoney');
const UserMoneyMessage = r => require.ensure([], () => r(require('../views/Sub/user.money.message.vue')), 'UserMoneyMessage');
const UserMoneyHistory = r => require.ensure([], () => r(require('../views/Sub/user.money.history.vue')), 'UserMoneyHistory');
const UserMoneyCash = r => require.ensure([], () => r(require('../views/Sub/user.money.cash.vue')), 'UserMoneyCash');
const UserMoneyExchange = r => require.ensure([], () => r(require('../views/Sub/user.money.exchange.vue')), 'UserMoneyExchange');
const UserAchievementDetail = r => require.ensure([], () => r(require('../views/Sub/user.achievement.detail.vue')), 'UserAchievementDetail');
const UserBankCard = r => require.ensure([], () => r(require('../views/Sub/user.bank.card.vue')), 'UserBankCard');
const UserBankInsert = r => require.ensure([], () => r(require('../views/Sub/user.bank.insert.vue')), 'UserBankInsert');
const UserQrcode = r => require.ensure([], () => r(require('../views/Sub/user.qrcode.vue')), 'UserQrcode');
const UserTeamJunior = r => require.ensure([], () => r(require('../views/Sub/user.team.junior.vue')), 'UserTeamJunior');
const OrderDetail = r => require.ensure([], () => r(require('../views/Sub/order.detail.vue')), 'OrderDetail');
const OrderAddressCheck = r => require.ensure([], () => r(require('../views/Sub/order.address.check.vue')), 'OrderAddressCheck');
const OrderCreate = r => require.ensure([], () => r(require('../views/Sub/order.create.vue')), 'OrderCreate');
const SubmitStatus = r => require.ensure([], () => r(require('../views/Sub/submit.status.vue')), 'SubmitStatus');
const ShopEval = r => require.ensure([], () => r(require('../views/Sub/shop.eval.vue')), 'ShopEval');
const GoodSearch = r => require.ensure([], () => r(require('../views/Sub/good.search.vue')), 'GoodSearch');
const UserAuthen = r => require.ensure([], () => r(require('../views/Sub/user.authen.vue')), 'UserAuthen');
const SubLogin = r => require.ensure([], () => r(require('../views/Sub/sub.login.vue')), 'SubLogin');


//活动
/*
import Activity from '../views/Sub/activity.vue';
import ActivityExchange from '../views/Sub/activity.exchange.vue';
import ActivityMessage from '../views/Sub/activity.message.vue';
import ActivityStatus from '../views/Sub/activity.status.vue';
import ActivityQrcode from '../views/Sub/activity.qrcode.vue';
import ActivityTeam from '../views/Sub/activity.team.vue';
import ActivityAward from '../views/Sub/activity.award.vue';
import ActivityRanks from '../views/Sub/activity.ranks.vue';
import ActivityChangeIdentity from '../views/Sub/activity.change.identity.vue';
*/


const Activity = r => require.ensure([], () => r(require('../views/Sub/activity.vue')), 'Activity');
const ActivityExchange = r => require.ensure([], () => r(require('../views/Sub/activity.exchange.vue')), 'ActivityExchange');
const ActivityMessage = r => require.ensure([], () => r(require('../views/Sub/activity.message.vue')), 'ActivityMessage');
const ActivityStatus = r => require.ensure([], () => r(require('../views/Sub/activity.status.vue')), 'ActivityStatus');
const ActivityQrcode = r => require.ensure([], () => r(require('../views/Sub/activity.qrcode.vue')), 'ActivityQrcode');
const ActivityTeam = r => require.ensure([], () => r(require('../views/Sub/activity.team.vue')), 'ActivityTeam');
const ActivityAward = r => require.ensure([], () => r(require('../views/Sub/activity.award.vue')), 'ActivityAward');
const ActivityRanks = r => require.ensure([], () => r(require('../views/Sub/activity.ranks.vue')), 'ActivityRanks');
const ActivityChangeIdentity = r => require.ensure([], () => r(require('../views/Sub/activity.change.identity.vue')), 'ActivityChangeIdentity');

export const routes = [
  {path: '*', redirect: '/Main/Index'},
  {path: '/', redirect: '/Main/Index'},
  {
    path: '/Main', name: 'Main', component: Main, meta: {keepAlive: true, isAuth: true},
    children: [
      {
        path: 'Index',
        name: 'Index',
        component: Index,
        meta: { keepAlive: true, isAuth: true, title: '贝斯特链平台', isShare: true, pageNum: 2,belongTo:'Main',isBack:false ,keepAliveToPath:['OrderDetail','Shop','User','Achievement','ActivityChangeIdentity','Activity']}
      },
      {
        path: 'Shop',
        name: 'Shop',
        component: Shop,
        meta: { keepAlive: true, isAuth: true, title: '购物车', pageNum: 2,belongTo:'Main',keepAliveToPath:['OrderDetail','Index','User','Achievement']}
      },
      {
        path: 'User',
        name: 'User',
        component: User,
        meta: { keepAlive: true, isAuth: true, title: '个人中心', pageNum: 2,belongTo:'Main',isBack:false ,keepAliveToPath:['Shop','Index','Achievement']}
      },
      {
        path: 'Achievement',
        name: 'Achievement',
        component: Achievement,
        meta: { keepAlive: true, isAuth: true, title: '我的业绩', pageNum: 2,belongTo:'Main',keepAliveToPath:['UserAchievementDetail']}
      },
    ]
  },
  {
    path: '/SubPage', name: 'SubPage', component: SubPage,
    children: [

      {
        path: 'SubLogin',
        name: 'SubLogin',
        component: SubLogin,
        meta: { keepAlive: true, isAuth: false, title: '登录中...', pageNum: 1,belongTo:'SubPage'} // 保证每个页面到该页面都需要销毁掉，这样回到上个页面即可实现刷新

      },

      {
        path: 'UserOrder',
        name: 'UserOrder',
        component: UserOrder,
        meta: {keepAlive: true, isAuth: true, title: '我的订单', pageNum: 10,belongTo:'SubPage' , keepAliveToPath:['UserOrderDetail'] }
      },

      {
        path: 'UserOrderType',
        name: 'UserOrderType',
        component: UserOrderType,
        meta: {keepAlive: true, isAuth: true, title: '我的订单', pageNum: 14,belongTo:'SubPage' },
      },

      {
        path: 'UserOrderDetail',
        name: 'UserOrderDetail',
        component: UserOrderDetail,
        meta: {keepAlive: true, isAuth: true, title: '我的订单-详情', pageNum: 15,belongTo:'SubPage'},
      },


      {
        path: 'ShopEval',
        name: 'ShopEval',
        component: ShopEval,
        meta: {keepAlive: true, isAuth: true, title: '商品-评价', pageNum: 25,belongTo:'SubPage'}
      },
      {
        path: 'UserOrderEval',
        name: 'UserOrderEval',
        component: UserOrderEval,
        meta: { keepAlive: true, isAuth: true, title: '我的-订单-评价-编辑', pageNum: 25,belongTo:'SubPage'}
      },

      {
        path: 'UserAddress',
        name: 'UserAddress',
        component: UserAddress,
        meta: {keepAlive: true, isAuth: true, title: '我的-地址管理', pageNum: 25,belongTo:'SubPage'}
      },
      {
        path: 'UserAddressEdit',
        name: 'UserAddressEdit',
        component: UserAddressEdit,
        meta: {keepAlive: true, isAuth: true, title: '我的-地址管理-编辑', pageNum: 30,belongTo:'SubPage'}
      },
      {
        path: 'GoodSearch',
        name: 'GoodSearch',
        component: GoodSearch,
        meta: {keepAlive: true, isAuth: true, title: '商品-搜索', pageNum: 5,belongTo:'SubPage' ,keepAliveToPath:['OrderDetail']}
      },
      {
        path: 'OrderDetail',
        name: 'OrderDetail',
        component: OrderDetail,
        meta: {keepAlive: true, isAuth: true, title: '商品-详情', isShare: true, pageNum: 10,belongTo:'SubPage' }
      }, // 该页面 -  我的-订单-详情

      {
        path: 'OrderCreate',
        name: 'OrderCreate',
        component: OrderCreate,
        meta: {keepAlive: true, isAuth: true, title: '我的订单-提交', isShare: true, pageNum: 15,belongTo:'SubPage'}
      }, // 该页面 -  我的-订单-详情

      {
        path: 'SubmitStatus',
        name: 'SubmitStatus',
        component: SubmitStatus,
        meta: { keepAlive: true, isAuth: true, title: '反馈', pageNum: 25,belongTo:'SubPage'}
      },

      {
        path: 'OrderAddressCheck',
        name: 'OrderAddressCheck',
        component: OrderAddressCheck,
        meta: {keepAlive: true, isAuth: true, title: '收货地址-选择', pageNum: 20,belongTo:'SubPage'}
      },

      {
        path: 'UserMoney',
        name: 'UserMoney',
        component: UserMoney,
        meta: {keepAlive: true, isAuth: true, title: '我的钱包', pageNum: 5,belongTo:'SubPage'}
      },

      {
        path: 'UserMoneyMessage',
        name: 'UserMoneyMessage',
        component: UserMoneyMessage,
        meta: {keepAlive: true, isAuth: true, title: '温馨提醒', pageNum: 5,belongTo:'SubPage'}
      },

      {
        path: 'UserAuthen',
        name: 'UserAuthen',
        component: UserAuthen,
        meta: {keepAlive: true, isAuth: true, title: '信息认证', pageNum: 5,belongTo:'SubPage'}
      },

      {
        path: 'UserMoneyHistory',
        name: 'UserMoneyHistory',
        component: UserMoneyHistory,
        meta: {keepAlive: true, isAuth: true, title: '交易记录', pageNum: 10,belongTo:'SubPage'}
      },
      {
        path: 'UserMoneyCash',
        name: 'UserMoneyCash',
        component: UserMoneyCash,
        meta: {keepAlive: true, isAuth: true, title: '我要提现', pageNum: 10,belongTo:'SubPage'}
      },

      {
        path: 'UserMoneyExchange',
        name: 'UserMoneyExchange',
        component: UserMoneyExchange,
        meta: {keepAlive: true, isAuth: true, title: '我要兑换', pageNum: 10,belongTo:'SubPage'}
      },
      {
        path: 'UserAchievementDetail',
        name: 'UserAchievementDetail',
        component: UserAchievementDetail,
        meta: {keepAlive: true, isAuth: true, title: '升级详情', pageNum: 10,belongTo:'SubPage'}
      },

      {
        path: 'UserBankCard',
        name: 'UserBankCard',
        component: UserBankCard,
        meta: {keepAlive: true, isAuth: true, title: '我的银行卡', pageNum: 10,belongTo:'SubPage'}
      },
      {
        path: 'UserBankInsert',
        name: 'UserBankInsert',
        component: UserBankInsert,
        meta: { keepAlive: true, isAuth: true, title: '添加银行卡', pageNum: 25,belongTo:'SubPage'}
      },
      {
        path: 'UserQrcode',
        name: 'UserQrcode',
        component: UserQrcode,
        meta: { keepAlive: true, isAuth: true, title: '二维码',isShare: true, pageNum: 10,belongTo:'SubPage'}
      },
      {
        path: 'UserTeamJunior',
        name: 'UserTeamJunior',
        component: UserTeamJunior,
        meta: { keepAlive: true, isAuth: true, title: '我的团队', pageNum: 15,belongTo:'SubPage'}
      },

      {
        path: 'Activity',
        name: 'Activity',
        component: Activity,
        meta: { keepAlive: true, isAuth: true, title: '分享得大礼', belongTo:'SubPage',keepAliveToPath:['ActivityMessage','ActivityTeam','ActivityAward','ActivityQrcode']}
      },
      {
        path: 'ActivityMessage',
        name: 'ActivityMessage',
        component: ActivityMessage,
        meta: { keepAlive: true, isAuth: true, title: '活动规则', belongTo:'SubPage'}
      },
      {
        path: 'ActivityTeam',
        name: 'ActivityTeam',
        component: ActivityTeam,
        meta: { keepAlive: true, isAuth: true, title: '我的团队', belongTo:'SubPage'}
      },
      {
        path: 'ActivityStatus',
        name: 'ActivityStatus',
        component: ActivityStatus,
        meta: { keepAlive: true, isAuth: true, title: '兑换成功', belongTo:'SubPage'}
      },
      {
        path: 'ActivityQrcode',
        name: 'ActivityQrcode',
        component: ActivityQrcode,
        meta: { keepAlive: true, isAuth: true, title: '我的二维码', belongTo:'SubPage'}
      },
      {
        path: 'ActivityExchange',
        name: 'ActivityExchange',
        component: ActivityExchange,
        meta: { keepAlive: true, isAuth: true, title: '兑换详情', belongTo:'SubPage'}
      },

      {
        path: 'ActivityRanks',
        name: 'ActivityRanks',
        component: ActivityRanks,
        meta: { keepAlive: true, isAuth: true, title: '我的排行榜', belongTo:'SubPage'}
      },

      {
        path: 'ActivityAward',
        name: 'ActivityAward',
        component: ActivityAward,
        meta: { keepAlive: true, isAuth: true, title: '我的奖品详情', belongTo:'SubPage'}
      },

      {
        path: 'ActivityChangeIdentity',
        name: 'ActivityChangeIdentity',
        component: ActivityChangeIdentity,
        meta: { keepAlive: true, isAuth: true, title: '成为代理', belongTo:'SubPage'}
      },

    ]
  }
]
