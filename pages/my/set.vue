<template>
	<view class="container">
		<u-loading-page
		:loading="true" 
		v-if="user=='' || user==null"
		fontSize="28rpx" />
		<block v-else>
		<view class="groups">
			<view class="group">
				<view class="group-row">
					<text class="title">账号</text>
					<view class="group-row-right">
						<text class="group-row-right-text">{{user.mobile}}</text>
					</view>
				</view>
				<view class="group-row" @click="call_phone(store_phone)">
					<text class="title">客服电话</text>
					<view class="group-row-right">
						<text class="group-row-right-text theme">{{store_phone}}</text>
					</view>
				</view>
				<view class="group-row" @click="goNext('/port/xieyi_xq?id=2')">
					<text class="title">关于我们</text>
					<view class="group-row-right">
						<u-icon name="arrow-right" color="#959595" size="16" class="arrow-right" />
					</view>
				</view>
			</view>
		</view>
		<view class="logout" @click="logout" v-if="user_id>0">退出登录</view>
		</block>
		
		<u-popup
		:show="logoutShow" 
		@close="logoutShow=false" 
		mode="center" 
		:customStyle="customAlertStyle"
		bgColor="transparent"
		:overlayOpacity="0.4">
			<view class="alert-popup">
				<view class="alert-title">退出登录</view>
				<view class="alert-info">确定退出登录此账号？</view>
				<view class="alert-bot">
					<text @click="logoutShow=false">取消</text>
					<text @click="confirmLogout">确定</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import md5 from '@/components/MD5.js'
	var _this;
	export default {
		data() {
			return {
				logoutShow:false,
				clearShow:false,
				cacheSize:'0B',
				showSave:false,
				head_pic:'',
				store_phone:''
			}
		},
		onLoad(e) {
			_this = this;
			_this.getCache()
		},
		onShow() {
			_this.get_user_info()
		},
		methods: {
			//获取用户信息
			async get_user_info() {
				if (this.user_id > 0) {
					const data = await _this.$post('port/user_info')
					if (data.code == 200) {
						this.user = data.result.user
						this.store_phone = data.result.store_phone
					} else {
						this.$u.toast(data.msg)
					}
				}
			},
			//确定退出
			confirmLogout(){
				this.$u.toast('退出成功')
				setTimeout(() => {
					//清除缓存的token和用户信息
					_this.$u.vuex('user_id', 0)
					_this.$u.vuex('user_token', getApp().globalData.default_token)
					uni.redirectTo({
						url:'/pages/auth/login?is_out=1'
					})
					_this.show = false
					_this.user = {}
				}, 1500)
			},
			//获取缓存大小
			getCache(){
				// #ifdef APP-PLUS
				plus.cache.calculate(function(size) { //size是多少个字节单位是b
						if (size < 1024) {
							_this.cacheSize = size + 'B';
						} else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
							_this.cacheSize = Math.floor(size / 1024 * 100) / 100 + 'KB';
						} else if (size / 1024 / 1024 >= 1) {
							_this.cacheSize = Math.floor(size / 1024 / 1024 * 100) / 100 + 'M';
						}
					});
					return
				// #endif
				_this.cacheSize = '0B'
			},
			//清除缓存
			clearCache(){
				//使用plus.cache.clear 清除应用中的缓存数据
				// #ifdef APP-PLUS
				plus.cache.clear(function() {});
				// #endif
				_this.getCache();
				_this.clearShow=false
			},
			goNext(go_url){
				let url = encodeURIComponent(go_url)
				_this.toNext(`/pages/index/html-detail?title=关于我们&url=${url}`)
			},
			logout(){
				uni.showModal({
					title:'提示',
					content:'确定退出?',
					success(res) {
						if(res.confirm){
							//清除缓存的token和用户信息
							_this.$u.vuex('user_id', 0)
							_this.$u.vuex('user_token', getApp().globalData.default_token)
							uni.reLaunch({
								url:'/auth/login?is_out=1'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.groups{
			padding: 20rpx 20rpx 0 20rpx;
		}
		.group{
			background: #fff;
			border-radius: $border-radius;
		}
		.logout{
			background: $bg-btn;
			min-height: 80rpx;
			border-radius: 50rpx;
			color: #fff;
			font-size: 30rpx;
			@include flex-box(row, center, center);
			margin: 40rpx 20rpx 0 20rpx;
		}
	}
	.take-photo{
		.top{
			.text-red{
				color: $text-red;
			}
		}
	}
</style>
