<template>
	<!--我要找活-->
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<block v-else>
			<template v-if="identity == 3">
				<u-sticky>
					<view class="kefu-top">
						<view class="kefu-tabs" :class="{'border':form.type != ''}">
							<u-tabs lineColor="#15B3B4" :list="list1" :scrollable="false" :activeStyle="{
							 color: '#000000',
							 fontWeight: 'bold',
							 transform: 'scale(1.05)',
							 fontSize:'28rpx'
						 }" :inactiveStyle="{
							 color: '#5B5B5B',
							 transform: 'scale(1)',
							 fontSize:'28rpx'
						 }" @click="clickTab"></u-tabs>
						</view>
						<view class="kefu-search" v-if="form.type != ''">
							<u-search bgColor="#EFEFEF" placeholder="请输入要搜索的内容" @search="search"
								@custom="search" :showAction="false" :actionStyle="{
							'color':'#02AAAB'
						}" v-model="form.keyword" />
							<view class="search-right"
								@click.stop="goNext(`/pages/index/filter-list?from=1&is_filter=1&kf_type=${form.type}`)">
								<image src="@/static/index/shaixuan-black.png" mode="widthFix" />
								<text>筛选</text>
							</view>
						</view>
					</view>
				</u-sticky>
				<view scroll-y="true" class="kefu-scroll">
					<view class="items">
						<my-items @itemClick="itemKfClick" :datas="lists" :showBot="true"></my-items>
					</view>
					<u-loadmore class="load-more" :status="hasMore?'loading':'nomore'" :nomoreText="noMore" />
					<view style="height: 100rpx;"></view>
				</view>
			</template>
			<template v-else>
				<view class="top-search" :style="{'backgroundImage':`url(${baseUrl}/uni/index-bg.png)`}">
					<view class="search" @click="goNext('/pages/index/search')">
						<u-search placeholder="请输入要搜索的内容" disabled bgColor="#fff" :showAction="false" />
						<view class="search-right"
							@click.stop="goNext('/pages/index/filter-list?from=1&is_filter=1')">
							<image src="@/static/index/shaixuan.png" mode="widthFix" />
							<text>筛选</text>
						</view>
					</view>
					<view class="banner" v-if="identity == 1">
						<u-swiper :list="banner1" interval="5000" circular indicator indicatorMode="dot"
							height="180" :autoplay="true" indicatorActiveColor="#fff"
							indicatorInactiveColor="rgba(255, 255, 255, 0.3)" radius="5" @click="clickAd"
							keyName="image" />
					</view>
					<view class="banner" v-else>
						<u-swiper :list="banner2" interval="5000" circular indicator indicatorMode="dot"
							height="180" :autoplay="true" indicatorActiveColor="#fff"
							indicatorInactiveColor="rgba(255, 255, 255, 0.3)" radius="5" @click="clickAd"
							keyName="image" />
					</view>
				</view>
				<view class="info">
					<view class="items">
						<my-items :datas="lists" @itemClick="itemClick"></my-items>
					</view>
					<u-loadmore class="load-more" :status="hasMore?'loading':'nomore'" :nomoreText="noMore" />
				</view>
				<view style="height: 110rpx;"></view>
			</template>
		</block>
		<u-back-top v-if="false" :scroll-top="scrollTop" :customStyle="{'background':'#02ABAB'}"
			:iconStyle="{'color':'#fff'}" />
		<wxLogin ref="wx_login" @loginAfter="loginAfter"></wxLogin>

		<u-popup :show="showReason" @close="showReason=false" mode="center" :customStyle="customAlertStyle"
			bgColor="transparent" :overlayOpacity="0.4">
			<view class="reason-popup">
				<view class="reason-title">驳回原因</view>
				<view class="reason-input">
					<u-input placeholder="请输入驳回原因" border="none" type="text" placeholderClass="placeholder28"
						v-model="reason" clearable />
				</view>
				<view class="reason-bot">
					<view class="left-text" @click="showReason=false">取消</view>
					<view class="right-text" @click="confirmReason">确定</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import wxLogin from "@/components/wx-login/wx-login.vue"
	var _this;
	const GoEasy = uni.$GoEasy;
	export default {
		data() {
			return {
				//导航栏高度
				navBarHeight: 44,
				statusbarH: 10,
				navRight: 15,
				store_full_logo: '',
				banner1: [],
				banner2: [],
				notice_list: [],
				city: '',
				loginDisabled: false,
				loginShow: false,
				scrollTop: 0,
				playId: '',
				list1: [{
					name: '全部',
					type: ''
				}, {
					name: '项目审核',
					type: 1
				}, {
					name: '简历审核',
					type: 2
				}],
				canGoTop: false,
				form: {
					pageIndex: 1,
					pageSize: 20,
					type: 1,
					status: 3,
					filters: [],
					keyword: ''
				},
				showReason: false,
				reason: '',
				tempId: '',
				tempIndex: ''
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
			//设置右上角文本
			// uni.setTabBarBadge({
			// 	index:1,
			// 	text:'4',
			// 	success(res) {
			// 		console.log('设置右上角文本 success: ',res);
			// 	}
			// })
			//显示 tabBar 某一项的右上角的红点
			// uni.showTabBarRedDot({
			// 	index:2,
			// 	success(res) {
			// 		console.log('右上角的红点 success: ',res);
			// 	}
			// })
			uni.$on('chooseTag', res => {
				if (res.from == 1) {
					let arr = res.arr
					_this.form.filters = arr
					_this.form.pageIndex = 1
					_this.lists = []
					_this.get_items_list()
				}
			})
			switch (this.identity) {
				case 1:
					this.get_items_list()
					break;
				case 2:
					this.form.type = 2
					this.get_items_list()
					break;
				case 3:
					this.form.status = ''
					this.form.type = ''
					this.get_items_list()
					break;
				default:
					break;
			}
		},
		onReachBottom() {
			if (_this.hasMore) {
				_this.form.pageIndex++
				_this.get_items_list()
			}
		},
		onShareAppMessage() {
			return {
				title: '利易联',
				path: '/pages/index/index',
				// imageUrl:_this.detail.goods_img
			}
		},
		components: {
			wxLogin
		},
		onPullDownRefresh() {
			_this.get_index_data()
			_this.form.pageIndex = 1
			_this.lists = []
			_this.get_items_list()
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
					text: '首页',
					selectedIconPath: 'static/tabbar/index_s.png'
				})
			}
			// console.log('监听页面滚动: ',e);
		},
		// onTabItemTap(e) {
		// 	console.log('监听tabbar点击: ',e);
		// 	if (_this.canGoTop) {
		// 		uni.pageScrollTo({
		// 			scrollTop:0,
		// 			duration:100
		// 		})
		// 	}
		// },
		onShow() {
			this.get_user_info()
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
		onUnload() {
			uni.$off('chooseTag')
		},
		beforeDestroy() {
			GoEasy.im.off(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.renderConversations);
		},
		methods: {
			//获取用户信息
			async get_user_info() {
				if (_this.user_id > 0) {
					const data = await _this.$post('port/user_info')
					if (data.code == 200) {
						//存入用户信息
						this.$u.vuex('current_user', data.result.user)
						if (GoEasy.getConnectionStatus() === 'disconnected') {
							this.connectGoEasy(); //连接goeasy
							// this.subscribeGroup(); //建立连接后，就应该订阅群聊消息，避免漏掉
						}
					} else {
						this.$u.toast(data.msg)
					}
				}
			},
			connectGoEasy() {
				console.log('connectGoEasy', this.get_prefix() + this.user_id);
				GoEasy.connect({
					id: this.get_prefix() + this.user_id,
					data: {
						user_id: this.current_user.user_id,
						qy_name: this.current_user.qy_name,
						user_name: this.current_user.user_name,
						is_kf: this.current_user.is_kf,
						head_pic: this.current_user.head_pic,
						identity: this.identity
					},
					onSuccess: () => {
						console.log('GoEasy connect successfully.')
						GoEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this
							.setUnreadNumber);
					},
					onFailed: (error) => {
						console.log('Failed to connect GoEasy, code:' + error.code +
							',error:' + error.content);
					},
					onProgress: (attempts) => {
						console.log('GoEasy is connecting', attempts);
					}
				});
			},
			setUnreadNumber(content) {
				console.log('setUnreadNumber', content);
				let unreadTotal = content.unreadTotal;
				if (unreadTotal > 0) {
					uni.setTabBarBadge({
						index: 1,
						text: unreadTotal.toString(),
						success(res) {
							console.log('setTabBarBadge success', res);
						},
						fail(fail) {
							console.log('setTabBarBadge fail', fail);
						}
					});
				} else {
					uni.removeTabBarBadge({
						index: 1,
						success(res) {
							console.log('removeTabBarBadge success', res);
						},
						fail(fail) {
							console.log('removeTabBarBadge fail', fail);
						}
					});
				}
			},
			renderConversations(content) {
				console.log(content);
				// this.conversations = content.conversations;
			},
			//客服顶部tab点击
			clickTab(item) {
				if (_this.form.type != item.type) {
					if (item.type != '') {
						_this.form.status = -1
					} else {
						_this.form.status = ''
					}
					_this.form.type = item.type
					_this.form.filters = []
					_this.form.pageIndex = 1
					_this.lists = []
					_this.get_items_list()
				}
			},
			//项目点击
			itemClick(res) {
				let item  = res.item;
				if (item.type == 1) {
					_this.toNext(`/pages/index/detail?id=${item.id}`)
				} else {
					_this.toNext(`/pages/talents/detail?id=${item.id}`)
				}
			},
			//项目点击
			itemKfClick(res) {
				let {
					type,
					index,
					item
				} = res
				switch (type) {
					case 1: //点击了整个item
						if (item.type == 1) {
							_this.toNext(`/pages/index/detail?id=${item.id}`)
						} else {
							_this.toNext(`/pages/talents/detail?id=${item.id}`)
						}
						break;
					case 2: //通过
						uni.showModal({
							title: '提示',
							content: '您确定要通过吗?',
							cancelColor: '#B8B8B8',
							confirmColor: '#02AAAB',
							success(res) {
								if (res.confirm) {
									_this.tempId = item.id
									_this.do_item(1, index, 1)
								} else {
									console.log('点击了取消');
								}
							}
						})
						break;
					case 3: //驳回
						_this.showReason = true
						_this.tempId = item.id
						_this.tempIndex = index
						break;
					case 4: //启用
						_this.tempId = item.id
						_this.do_item(3, index, 3)
						break;
					case 5: //停用
						uni.showModal({
							title: '提示',
							content: '您确定要停用吗?',
							cancelColor: '#B8B8B8',
							confirmColor: '#02AAAB',
							success(res) {
								if (res.confirm) {
									_this.tempId = item.id
									_this.do_item(4, index, 4)
								} else {
									console.log('点击了取消');
								}
							}
						})
						break;
					default:
						break;
				}
				return
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
				if (GoEasy.getConnectionStatus() === 'disconnected') {
					this.connectGoEasy(); //连接goeasy
					// this.subscribeGroup(); //建立连接后，就应该订阅群聊消息，避免漏掉
				}
			},
			async wx_login(code) {
				let res = {
					'code': code
				}
				const data = await _this.$post('port/get_wx_xcx_data', res)
				if (data.code == 200) {
					let unionid = data.result.unionid
					let xcx_openid = data.result.xcx_openid
					let session_key = data.result.session_key
					if (unionid) {
						uni.setStorageSync('unionid', unionid)
					}
					uni.setStorageSync('xcx_openid', xcx_openid)
					uni.setStorageSync('session_key', session_key)
				}
			},
			goNext(page) {
				if (_this.user_id == 0) {
					// this.$refs.wx_login.loginShow = true
					uni.navigateTo({
						url: '/pages/index/login'
					});
					return
				}
				_this.toNext(page)
			},
			clickAd(index) {
				let item = _this.banner_info[index]
				_this.jump(item)
				console.log(item);
			},
			jump(item) {
				if (item.ad_link == '#') {
					return
				}
				let arr = ['/pages/index/index', '/pages/message/message', '/pages/my/my']
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
				_this.banner1 = data.result.banner1
				_this.banner2 = data.result.banner2
				if (_this.load) {
					_this.load = false
				}
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 1000)
			},
			getMore() {
				if (_this.hasMore) {
					_this.form.pageIndex++
					_this.get_items_list()
				}
			},
			async get_items_list() {
				const data = await _this.$post('port/get_items_list', _this.form)
				if (data.code == 200) {
					_this.lists.push(...data.result.list)
					_this.hasMore = data.result.list.length >= _this.form.pageSize
				} else {
					_this.hasMore = false
				}
			},
			confirmReason() {
				if (_this.reason == '') {
					this.$u.toast('请输入驳回原因')
					return
				}
				_this.do_item(2, _this.tempIndex, 2)
			},
			async do_item(type, index = '', status = '') {
				let params = {
					id: _this.tempId,
					type
				}
				if (type == 2) {
					params.reason = _this.reason
				}
				const data = await _this.$post('port/kf_handle_item', params)
				if (data.code == 200) {
					this.$u.toast(data.msg)
					if (index !== '' && status != '') {
						this.lists[index]['status'] = status
					}
					if (type == 2) {
						_this.reason = ''
						_this.showReason = false
					}
				} else {
					this.$u.toast(data.msg)
				}
			},
			search(value) {
				_this.form.pageIndex = 1
				_this.lists = []
				_this.get_items_list()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.container {
		position: relative;

		&.kefu {
			// height: 100%;
			// overflow: hidden;
		}

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

		.kefu-top {
			background: #fff;

			.kefu-tabs {
				height: 88rpx;
				box-sizing: border-box;

				&.border {
					border-bottom: $global-border;
				}
			}

			.kefu-search {
				padding: 10rpx 40rpx 10rpx 30rpx;
				@include flex-box();

				.search-right {
					align-self: center;
					@include flex-box(column, center, center);
					margin-left: 15rpx;

					image {
						width: 47rpx;
					}

					text {
						font-size: 22rpx;
						color: #141414;
					}
				}
			}
		}

		.kefu-scroll {
			padding: 15rpx 15rpx 0 15rpx;

			.items {}
		}

		.reason-popup {
			background: #fff;
			border-radius: 16rpx;

			.reason-title {
				line-height: 100rpx;
				font-size: 32rpx;
				font-weight: bold;
				text-align: center;
			}

			.reason-input {
				margin: 0 36rpx;
				height: 66rpx;
				@include flex-box(row, null, center);
				border-radius: 10rpx;
				padding: 0 20rpx;
				background: #EFEFEF;
			}

			.reason-bot {
				@include flex-box();
				border-top: $global-border;
				margin-top: 30rpx;

				>view {
					line-height: 94rpx;
					flex: 1;
					text-align: center;
				}

				.left-text {
					color: #B8B8B8;
					border-right: $global-border;
				}

				.right-text {
					color: #02AAAB;
				}
			}
		}
	}
</style>