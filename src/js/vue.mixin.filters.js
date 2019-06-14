
import { _is_number_express,_get_format_thousand,} from '../js-package/app.number'
import Vue from 'vue'
Vue.mixin( {
  filters:{
    str_name:value =>{
      return value + '123456'
    },
    str_money:value=>{
      if(value){
        return (value / 100).toFixed(2) ;
      } else{
        return '0.00'
      }
    },
    str_token:value=>{
      if(value){
        return (Number(value)).toFixed(4) ;
      } else{
        return '0.0000'
      }
    },

    str_money_format:(value)=>{
      if(value > 9999){
        return value / 10000 + '万'
      }
      if(value > 999){
        return value / 1000 + '千'
      }
      if(value > 99){
        return value / 100 + '百'
      }
      return value;
    },
    // 数据格式化 - 转化为千分位
    str_money_thousand:value=>{
      if(!_is_number_express(value)){
        return '0.00'
      }
      return _get_format_thousand(value)
    },
    // 数据格式化 - 转化为千分位,并且当大于10000时，去掉小数部分
    str_money_thousand_integer:value=>{
      if(!_is_number_express(value)){
        return '0.00'
      }

      return value > 9999 ?    _get_format_thousand(  value  ).split('.')[0] : _get_format_thousand(value)
    },



    // 当数量超过多少时显示...
    str_number_large:value=>{
      return ( value > 99 ) ? '...' : value
    },



    str_grade :value =>{
      let str = ['非常差','差','一般','好','非常好'];
      if(value){
        return str[value-1]
      }else{
        return '无评论'
      }
    },
    //电话号码 138-1234-1234
    str_mobile :value =>{
      if(value){
        let str = value.substring(0,3) + '-' + value.substring(3) ;
        let str2 = str.substring(0,8) + '-' + str.substring(8);
        return str2
      }else{
        return ''
      }
    },

  }
});
