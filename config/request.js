import md5 from '@/components/MD5.js'
// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.baseURL = vm.baseUrl; /* 根域名 */
		//java必须要加这一行？
		// config.header['content-type']='application/x-www-form-urlencoded'
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		// config.data = config.data || {}
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		let token = vm.user_token==''?getApp().globalData.default_token : vm.user_token;
		let user_id = vm.user_id;
		// if(config?.custom?.auth) {
		// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
		// config.token = vm.vuex_token
		if(token){
			config.header.token = token
		}
		let sign_prefix=getApp().globalData.sign_prefix
		if (config.data == undefined || Object.keys(config.data).length<=0) {
			var data = {}
			if(user_id>0){
				// data['user_id']=user_id
				data['sign'] = md5.hax_md5(sign_prefix + token + sign_prefix).toLocaleLowerCase()
			}else{
				data['sign'] = md5.hax_md5(sign_prefix + token + sign_prefix).toLocaleLowerCase()
			}
			config.data = data
		} else {
			let arys=config.data
			let keys=Object.keys(arys)
			// if(keys.indexOf('user_id')==-1 && user_id>0){
			// 	arys['user_id']=user_id
			// }
			let newkey = Object.keys(arys).sort();
			let str_data = '';
			let md5_mi = ''
			for (let i = 0; i < newkey.length; i++) {
				// if(arys[newkey[i]]!='' && newkey[i]!='sign'&& typeof arys[newkey[i]] !='object' && arys[newkey[i]]!=undefined){
				if(arys[newkey[i]]!=='' && newkey[i]!='sign' && typeof arys[newkey[i]] !='object'){
					let val = arys[newkey[i]]
					str_data += newkey[i] + val
				}
			}
			let sign=encodeURIComponent(str_data + sign_prefix + token + sign_prefix).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A')
			md5_mi = md5.hax_md5(sign).toLocaleLowerCase()
			config.data['sign'] = md5_mi
		}
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data
		// 自定义参数
		const custom = response.config?.custom
		if(data.code==401){
			uni.showModal({
				title:'提示信息',
				content:data.msg,
				showCancel:false,
				success(res) {
					if (res.confirm) {
						uni.$u.vuex('user_id', 0)
						uni.$u.vuex('user_token', getApp().globalData.default_token)
						uni.$u.vuex('identity', 1)
						uni.reLaunch({
							url:'/pages/index/login'
						})
					}
				}
			})
			return new Promise(() => {})
		}
		return data ? data : {}
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
}
