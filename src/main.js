import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element-ui
import ElementUI from 'element-ui';
//引入elment-ui css
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入jquery
import $ from 'jquery';
//引入leaflet
import L from 'leaflet';
import '@supermap/iclient-leaflet';
//引入海量marker插件
import './assets/plugins/leaflet.canvas-markers.js';

import 'leaflet-velocity';
import 'leaflet/dist/leaflet.css';
//加载自定义脚本
import './assets/plugins/leaflet.ChineseTmsProviders.js';
//引入wmts引入插件
import './assets/plugins/leaflet-tilelayer-wmts-src.js'
//引入axios
import axios from 'axios';
// import axios from './assets/plugins/request.js';
//引入cesium
import Cesium from 'cesium/Cesium';
import 'cesium/Widgets/widgets.css'
//引入字体图标
import './assets/fonts/fonts.css';
//引入自定义全局样式
import './assets/less/style.css';
//引入turf
import * as turf from '@turf/turf';
// 引入全屏插件
import screenfull from 'screenfull'
//引入leaflet地图全屏插件
import './assets/plugins/Leaflet.fullscreen.js'
//引入自定义通用方法脚本
import myCommon from './assets/plugins/common.js'
//引入md5
import md5 from "md5";
//引入时间格式插件
import moment from 'moment';
//引入天地图数据解析插件
import x2js from 'x2js';



// 默认的超时时间
// axios.defaults.timeout = 5000;
Vue.prototype.axios = axios;
Vue.prototype.Cesium=Cesium;
Vue.prototype.turf = turf;
Vue.prototype.screenfull = screenfull;
Vue.prototype.myCommon = myCommon;
Vue.prototype.md5 = md5;
Vue.prototype.moment = moment;
Vue.prototype.$x2js = new x2js(
	{
		//转换完的数据格式 （默认的是带 _ 的）
		attributePrefix: '' 
	}
)

Vue.prototype.$UUID = function () {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }

    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
