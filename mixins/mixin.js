module.exports = {
	data() {
		return {
			customAlertStyle: {
				'width': '80%'
			},
			emptyIcon:'/static/common/empty.png',
			noMore:'没有更多了~',
			load: true,
			hasMore: true,
			lists: [],
			detail: {},
			user: '',
		}
	},
	methods: {
		call_phone(phone) {
			uni.makePhoneCall({
				phoneNumber: phone
			})
		},
		lookImage(e) {
			var imgurl = e.currentTarget.dataset.url
			var imgurls = e.currentTarget.dataset.urls
			if (!imgurls) imgurls = imgurl;
			if (typeof(imgurls) == 'string') imgurls = imgurls.split(',');
			uni.previewImage({
				current: imgurl,
				urls: imgurls
			})
		},
		toNext(url, isRedirect = false) {
			if (isRedirect) {
				uni.redirectTo({
					url
				})
			} else {
				uni.navigateTo({
					url
				})
			}
		},
		//关闭当前页面
		finish() {
			uni.navigateBack()
		},
		//跳转到协议详情页面
		goXieyi(gid, oid) {
			this.$u.route({
				url: '/pages/index/html-detail',
				params: {
					title: '认养协议',
					url: encodeURIComponent(`/api/ry_xieyi_xq?gid=${gid}&oid=${oid}`)
				}
			})
		},
		goIndex() {
			uni.switchTab({
				url: '/pages/index/index'
			})
		},
		getFullUrl(url){
			if(url.indexOf('http://')!=-1 || url.indexOf('https://')!=-1){
				return url;
			}
			return `${this.baseUrl}/${url}`;
		},
		//获取身份前缀
		get_prefix(){
			let prefix = ''
			switch (this.identity){
				case 1:
				prefix = 'user_'
					break;
				case 2:
				prefix = 'qy_'
					break;
				default:
				prefix = 'kf_'
					break;
			}
			return prefix
		},
	},
	computed:{
		//判断是不是微信浏览器
		is_wx:{
			cache: false,
			get() {
				// #ifndef H5
				return false
				// #endif
				let ua = window.navigator.userAgent.toLowerCase()
				return ua.match(/MicroMessenger/i) == 'micromessenger'
			}
		}
	}
}