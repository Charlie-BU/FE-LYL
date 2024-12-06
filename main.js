import App from './App'
import store from '@/store';
import mixin from '@/mixins/mixin.js';
import GoEasy from '@/uni_modules/GOEASY-IM/js_sdk/goeasy-2.11.1.esm.min.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

import uView from "uview-ui";
import {
	VueJsonp
} from 'vue-jsonp';
Vue.use(uView);
Vue.use(VueJsonp);
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

Vue.mixin(mixin)
GoEasy.init({
	host: "hangzhou.goeasy.io", //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
	// appkey:"BC-1e51a630d41e49ab893b0fd4ab57c298",// common key
	appkey: "BC-9457bcdf45c441ed9008da57a7b3da8d", // 客户common key
	modules: ['im'],
	// true表示支持通知栏提醒，false则表示不需要通知栏提醒
	allowNotification: true //仅有效于app,小程序和H5将会被自动忽略
});
// GoEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, setUnreadNumber);
function setUnreadNumber(content) {
	let unreadTotal = content.unreadTotal;
	if (unreadTotal > 0) {
		uni.setTabBarBadge({
			index: 2,
			text: unreadTotal.toString()
		});
	} else {
		uni.removeTabBarBadge({
			index: 2
		});
	}
}
uni.$GoEasy = GoEasy;
// import store from './store'
// //把vuex定义成全局组件
// Vue.prototype.$store = store
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		store,
		app
	}
}
// #endif

// 引入请求封装，将app参数传递到配置中
require('@/config/request.js')(app)

//挂载全局异步请求方法
import * as api from './config/api.js'
for (let key in api) {
	Vue.prototype[key] = api[key]
	uni[key] = api[key]
}