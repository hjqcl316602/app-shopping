
import Vue from 'vue'
import  $cookies from 'js-cookie'
import  * as $configs from './vue.config'
import * as $arrays from '../js-package/app.array'
import * as $doms from '../js-package/app.dom'
import * as $https from '../js-package/app.http'
import * as $browers from '../js-package/app.brower'
import * as $numbers from '../js-package/app.number'
import * as $objects from '../js-package/app.object'
import * as $valids from '../js-package/app.valid'
import * as $strings from '../js-package/app.string'

Vue.use({
  install: function (Vue) {
    Object.defineProperty( Vue.prototype,'$configs', { value : $configs } );
    Object.defineProperty( Vue.prototype,'$cookies', { value : $cookies } );
    Object.defineProperty( Vue.prototype,'$arrays', { value : $arrays } );
    Object.defineProperty( Vue.prototype,'$doms', { value : $doms } );
    Object.defineProperty( Vue.prototype,'$https', { value : $https } );
    Object.defineProperty( Vue.prototype,'$browers', { value : $browers } );
    Object.defineProperty( Vue.prototype,'$numbers', { value : $numbers } );
    Object.defineProperty( Vue.prototype,'$objects', { value : $objects } );
    Object.defineProperty( Vue.prototype,'$valids', { value : $valids } );
    Object.defineProperty( Vue.prototype,'$strings', { value : $strings } );
  }
})
