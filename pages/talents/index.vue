<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<block v-else>
			<view class="top-search" :style="{'backgroundImage':`url(${baseUrl}/uni/index-bg.png)`}">
				<view class="search" @click="goNext('/pages/index/search')">
					<u-search placeholder="请输入要搜索的内容" disabled bgColor="#fff" :showAction="false" />
					<view class="search-right">
						<image src="@/static/index/shaixuan.png" mode="widthFix" />
						<text>筛选</text>
					</view>
				</view>
				<view class="banner">
					<u-swiper :list="banner_info" interval="5000" circular indicator indicatorMode="dot" height="180"
						:autoplay="true" indicatorActiveColor="#fff" indicatorInactiveColor="rgba(255, 255, 255, 0.3)"
						radius="5" keyName="image" />
				</view>
			</view>
			<view class="info">
				<view class="items">
					<my-items @itemClick="itemClick"></my-items>
				</view>
				<u-loadmore class="load-more" :status="hasMore?'loading':'nomore'" :nomoreText="noMore" />
			</view>
			<view style="height: 110rpx;"></view>
		</block>
		<u-back-top v-if="false" :scroll-top="scrollTop" :customStyle="{'background':'#02ABAB'}"
			:iconStyle="{'color':'#fff'}" />
		<wxLogin ref="wx_login" @loginAfter="loginAfter"></wxLogin>
	</view>
</template>

<script>
	import wxLogin from "@/components/wx-login/wx-login.vue"
	var _this;
	export default {
		data() {
			return {
				//导航栏高度
				navBarHeight: 44,
				statusbarH: 10,
				navRight: 15,
				store_full_logo: '',
				banner_info: [],
				banner2: [],
				notice_list: [],
				hot_cates: [],
				page: 1,
				pageNum: 10,
				city: '菏泽市',
				loginDisabled: false,
				loginShow: false,
				scrollTop: 0,
				playId: '',
				list1: [{
					name: '最新',
				}, {
					name: '紧急',
				}, {
					name: '推荐'
				}, {
					name: '附近'
				}],
				canGoTop: false
			}
		},
		onLoad(e) {
			_this = this
			if (e.reid) {
				uni.setStorageSync('reid', e.reid)
			}
			if (e.scene) {
				let scene = decodeURIComponent(e.scene);
				let res = scene.split('=')
				uni.setStorageSync('reid', res[1])
			}
			//存入用户信息
			// _this.$u.vuex('user_id', 1)
			// _this.$u.vuex('user_token', '59b32d0d2db428029154137876cd8e77')
			let sysInfo = uni.getSystemInfoSync();
			_this.statusbarH = sysInfo.statusBarHeight
			// #ifdef MP-WEIXIN
			// 胶囊信息
			let menu = uni.getMenuButtonBoundingClientRect();
			// 导航栏高度
			let navBarHeight = menu.height + 10;
			this.navBarHeight = navBarHeight
			_this.navRight = menu.width
			_this.login()
			// #endif
			_this.get_index_data()
			_this.hasMore = false
			_this.get_index_goods()
			//设置右上角文本
			uni.setTabBarBadge({
				index: 2,
				text: '4',
				success(res) {
					console.log('设置右上角文本 success: ', res);
				}
			})
			//显示 tabBar 某一项的右上角的红点
			uni.showTabBarRedDot({
				index: 2,
				success(res) {
					console.log('右上角的红点 success: ', res);
				}
			})
		},
		onReachBottom() {
			if (_this.hasMore) {
				_this.page++
				_this.get_index_goods()
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		components: {
			wxLogin
		},
		onPullDownRefresh() {
			_this.get_index_data()
		},
		onPageScroll(e) {
			let scrollTop = e.scrollTop
			_this.canGoTop = scrollTop > 225
			if (scrollTop > 225) {
				uni.setTabBarItem({
					index: 0,
					text: '回顶部',
					selectedIconPath: 'static/tabbar/back-top.png'
				})
			} else {
				uni.setTabBarItem({
					index: 0,
					text: '有活',
					selectedIconPath: 'static/tabbar/index_s.png'
				})
			}
			// console.log('监听页面滚动: ',e);
		},
		onTabItemTap(e) {
			console.log('监听tabbar点击: ', e);
			if (_this.canGoTop) {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100
				})
			}
		},
		onShow() {
			// console.log('有活界面显示');
		},
		onHide() {
			console.log('有活界面隐藏');
			// uni.setTabBarItem({
			// 	index:0,
			// 	text:'有活',
			// 	selectedIconPath:'static/tabbar/index_s.png'
			// })
			_this.canGoTop = false
		},
		methods: {
			//项目点击
			itemClick(item, type) {
				console.log(item, type);
				_this.toNext(`/pages/talents/detail?id=${item.id || 1}`)
			},
			videoPlay(id) {
				if (this.playId != '') {
					let videoContext = uni.createVideoContext(`video${_this.playId}`)
					videoContext.pause()
				}
				_this.playId = id
			},
			async login() {
				uni.login({
					provider: 'weixin',
					onlyAuthorize: true,
					success(loginRes) {
						_this.wx_login(loginRes.code)
					},
					fail(fail) {
						console.log(fail)
					}
				});
			},
			loginAfter(result) {
				console.log('loginAfter', result);
			},
			async wx_login(code) {
				let res = {
					'code': code
				}
				const data = await _this.$post('port/get_wx_xcx_data', res)
				if (data.code == 200) {
					let unionid = data.result.unionid
					let openid = data.result.xcx_openid
					let sessionKey = data.result.sessionKey
					if (unionid) {
						uni.setStorageSync('unionid', unionid)
					}
					uni.setStorageSync('openid', openid)
					uni.setStorageSync('sessionKey', sessionKey)
				}
			},
			goNext(page) {
				if (_this.user_id == 0) {
					this.$refs.wx_login.loginShow = true
					return
				}
				_this.toNext(page)
			},
			jump(item) {
				if (item.ad_link == '#') {
					return
				}
				let arr = ['/pages/index/index', '/pages/classify/classify', , '/pages/cart/cart', '/pages/my/my']
				if (arr.indexOf(item.ad_link) != -1) {
					uni.switchTab({
						url: item.ad_link
					})
				} else {
					_this.toNext(item.ad_link)
				}
			},
			toSearch() {
				console.log('toSearch');
			},
			//获取首页数据
			async get_index_data() {
				const data = await _this.$post('port/request_index_data')
				_this.notice_list = data.result.notice
				_this.banner_info = data.result.banner
				_this.banner2 = data.result.banner2
				_this.hot_cates = data.result.hot_cates
				if (_this.load) {
					_this.load = false
				}
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 1000)
			},
			async get_index_goods() {
				const params = {
					'pageIndex': _this.page,
					'pageSize': _this.pageNum,
					'is_index': 1,
					'sales_sum': 1,
				}
				const data = await _this.$post('port/request_index_goods', params)
				if (data.code == 200) {
					_this.lists.push(...data.result.list)
					_this.hasMore = false
				} else {
					_this.hasMore = false
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.container {
		position: relative;

		.top-search {
			background: left top/100% 300rpx no-repeat;
			box-sizing: border-box;
			padding: 0 15rpx;

			.search {
				padding: 15rpx;
				@include flex-box();

				.search-right {
					align-self: center;
					@include flex-box(column, center, center);
					color: #fff;
					margin-left: 15rpx;

					image {
						width: 47rpx;
					}

					text {
						font-size: 22rpx;
					}
				}
			}

			.banner {}
		}

		.info {
			padding: 0 15rpx 0 15rpx;

			>view {
				margin-top: 15rpx;

				&:not(.banner):not(.index-tabs):not(.sticky) {
					background: #fff;
					border-radius: $border-radius;
				}
			}

			.items {
				background: none !important;
			}
		}
	}
</style>