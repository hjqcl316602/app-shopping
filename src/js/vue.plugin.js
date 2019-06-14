/**
 * Created by 41587 on 2018/9/9.
 */
import Vue from 'vue'
import createPlugin from '../js-utils/create.api.js';
import { MyConfirm ,MyLoading , MyNotice ,MyPickerDateTime  } from '../components'
createPlugin(Vue, MyConfirm, ['cancel', 'ok'], true);
createPlugin(Vue, MyNotice, [ 'ok'], true);
createPlugin(Vue, MyLoading, ['click'], true); // this.$createLoading().show()
/*使用方法
 this.$createConfirm({
 title:'',
 message:'sdsd',
 onOk:()=>{
 console.log('ok')
 }
 }).show();*/
