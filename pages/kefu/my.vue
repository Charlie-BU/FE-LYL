<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<block v-else>
			<view class="user-top">
				<view class="nav-title">
					<view :style="{'height':statusbarH+'px'}"></view>
					<view class="nav-title-inner">我的</view>
				</view>
				<view class="my-top" v-if="user_id > 0">
					<view class="left" @click="toNext('/pages/my/user-personal')">
						<image src="@/my/static/kefu.png" mode="aspectFill" class="head-img"/>
					</view>
					<view class="center">
						<view class="center-nickname">
							<text class="nickname-text">{{user.nickname}}</text>
						</view>
					</view>
					<view class="right">
						<view class="right-item" @click="goNext('/my/change-identity?is_kf=1')">
							<image src="@/static/my/change-identity.png" mode="widthFix"></image>
							<text>切换身份</text>
						</view>
					</view>
				</view>
				<view class="my-top" v-else @click="goNext('')">
					<view class="left">
						<image src="@/static/touxiang.png" mode="scaleToFill" class="head-img"/>
					</view>
					<view class="center">
						<view class="center-nickname">
							<text class="nickname-text">点击登录</text>
						</view>
					</view>
				</view>
				<view class="user-top-items">
					<view class="user-top-item" @click="goNext('/pages/kefu/link-up')">
						<text class="num-text">74</text>
						<text class="sub-text">沟通过</text>
					</view>
					<view class="user-top-item" @click="goNext('/pages/kefu/online')">
						<text class="num-text">2</text>
						<text class="sub-text">在线</text>
					</view>
					<view class="user-top-item" @click="goNext('/pages/kefu/online?is_lx=1')">
						<text class="num-text">2</text>
						<text class="sub-text">离线</text>
					</view>
				</view>
				<view class="user-top-bot">
					<image src="@/static/my/zaixian.png" mode="widthFix"/>
					<view class="user-top-bot-center">
						<view class="tit">在线状态</view>
						<view class="sub-tit">千万求职者/招聘者的选择</view>
					</view>
					<view class="switch">
						<u-switch 
						asyncChange
						v-model="online"
						 :inactiveValue="0"
						 :activeValue="1"
						 size="20"
						 :loading="switchLoad"
						 :disabled="switchLoad"
						activeColor="#03AAAB"
						@change="switchChange"/>
					</view>
				</view>
			</view>
		<view class="info">
			<view class="info-title">我的沟通</view>
			<view class="tabs-info">
				<u-tabs
				lineColor="#15B3B4"
				:list="list1" 
				:scrollable="false"
				 :activeStyle="{
					 color: '#000000',
					 fontWeight: 'bold',
					 transform: 'scale(1.05)',
					 fontSize:'28rpx'
				 }"
				 :inactiveStyle="{
					 color: '#5B5B5B',
					 transform: 'scale(1)',
					 fontSize:'28rpx'
				 }"
				@click="clickTab"></u-tabs>
			</view>
			<view class="items">
				<my-items @itemClick="itemClick" :showTime="true"></my-items>
			</view>
		</view>
		<view style="height: 120rpx;"></view>
		</block>
		
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
				statusbarH:10,
				navRight:0,
				loginDisabled:false,
				online:1,
				switchLoad:false,
				list1: [{
					name: '项目沟通',
				}, {
					name: '人才沟通',
				}]
			}
		},
		onLoad(e) {
			_this = this;
			let sysInfo = uni.getSystemInfoSync();
			_this.statusbarH=sysInfo.statusBarHeight
			// #ifdef MP-WEIXIN
			// 胶囊信息
			let menu = uni.getMenuButtonBoundingClientRect();
			// 导航栏高度
			// let navBarHeight = menu.height;
			// this.navBarHeight = navBarHeight
			_this.navRight = menu.width
			// #endif
			// #ifdef H5
			// _this.$u.vuex('user_id', 1)
			// _this.$u.vuex('user_token', '59b32d0d2db428029154137876cd8e77')
			// #endif
			// uni.hideTabBar({
			// 	animation:false,
			// 	success() {
			// 		console.log('隐藏tabbar成功');
			// 	}
			// })
		},
		onShow() {
			_this.get_user_info()
		},
		computed:{
			phone:{
				cache:false,
				get() {
					if(this.user=='' || this.user.mobile=='' || this.user.mobile==undefined){
						return '****'
					}
					let phone= this.user.mobile
					let result = phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
					return result;
				}
			}
		},
		components:{
			wxLogin
		},
		onPullDownRefresh() {
			_this.get_user_info()
		},
		methods: {
			switchChange(value){
				_this.switchLoad = true
				//后台提交数据
				setTimeout(()=>{
					_this.online = value
					_this.switchLoad = false
				},1000)
			},
			clickTab(item) {
				console.log('item', item);
			},
			itemClick(res){
				switch (res.type){
					case 1:
						break;
					case 2:
						break;
					case 3:
						break;
					case 4:
					uni.showModal({
						title:'停用简历',
						content:'您确定要停用简历吗？停用后招聘者将无法查看到您的简历。请您谨慎操作！',
						cancelColor:'#B8B8B8',
						confirmColor:'#02AAAB',
						success(res) {
							if (res.confirm) {
								console.log('点击了确定');
							}else{
								console.log('点击了取消');
							}
						}
					})
						break;
					default:
						break;
				}
				console.log(res);
			},
			async sys(){
				// #ifdef H5
				this.$u.toast('请在非H5端使用')
				return
				// #endif
				// #ifdef APP-PLUS
				let status = await this.checkPermission();
				if (status !== 1) {
					return;
				}
				// #endif
				uni.scanCode({
					success: (res) => {
						if(res.result){
							let url = _this.baseUrl + '/port/dp_fukuan';
							let i = res.result.indexOf(url)
							if (i!=-1) {
								let arr=res.result.split('?')
								if(arr[1]){
									let brr=arr[1].split('=')
									if(brr[1]){
										uni.navigateTo({
											url:`/pages/order/pay-store?store_id=${brr[1]}`
										})
									}else{
										this.$u.toast('没有扫码到内容')
									}
								}else{
									this.$u.toast('没有扫码到内容')
								}
							}else{
								this.$u.toast('没有扫码到内容')
							}
						}else{
							this.$u.toast('扫码失败')
						}
					},
					fail: (err) => {
						// 需要注意的是小程序扫码不需要申请相机权限
						console.log(err);
						this.$u.toast('扫码失败')
					}
				});
			},
			async checkPermission(code) {
				let status = permision.isIOS ? await permision.requestIOS('camera') :
					await permision.requestAndroid('android.permission.CAMERA');
			
				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "需要相机权限",
						confirmText: "设置",
						success(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
				return status;
			},
			loginAfter(result){
				console.log('loginAfter',result);
				_this.get_user_info()
			},
			copy(){
				uni.setClipboardData({
					data: _this.user.re_key,
					success: function () {
						uni.$u.toast('复制成功');
					}
				});
			},
			goNext(page){
				if (_this.user_id == 0) {
					_this.$refs.wx_login.loginShow = true
					return
				}
				_this.toNext(page)
			},
			//获取用户信息
			async get_user_info() {
				if (_this.user_id > 0) {
					const data = await _this.$post('port/user_info')
					if (data.code == 200) {
						this.user = data.result.user
					} else {
						this.$u.toast(data.msg)
					}
				}
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 500)
				if (_this.load) {
					_this.load = false
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	@import "static/css/user.scss";
	.container{
		position: relative;
		.user-top{
			background:linear-gradient(0deg,#efefef 0%, #f6f6f6 25%, #1abfc0 100%);
			box-sizing: border-box;
			.nav-title{
				.nav-title-inner{
					height: 44px;
					color: #fff;
					font-size: 32rpx;
					font-weight: bold;
					@include flex-box(row,center,center);
				}
			}
			.my-top {
				padding: 0 30rpx;
				display: flex;
				position: relative;
				.left{
					margin-right: 20rpx;
					.head-img{
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						box-sizing: border-box;
					}
				}
				.center{
					color: #050200;
					align-self: center;
					flex: 1;
					.center-nickname{
						@include flex-box();
						.nickname-text{
							font-size: 38rpx;
							font-weight: bold;
							color: #050200;
						}
					}
					.center-bot{
						margin-top: 10rpx;
						color: #415556;
						display: inline-flex;
						align-items: center;
						image{
							width: 28rpx;
							margin-left: 10rpx;
						}
					}
				}
				.right{
					position: absolute;
					right: 28rpx;
					top: 0;
					@include flex-box();
					.right-item{
						@include flex-box(column,center,center);
						background: none;
						line-height: unset;
						margin: 0;
						padding: 0;
						&:not(:last-child){
							margin-right: 20rpx;
						}
						image{
							width: 38rpx;
						}
						text{
							font-size: 24rpx;
							color: #141414;
						}
					}
				}
			}
			.user-top-items{
				@include flex-box();
				margin-top: 20rpx;
				.user-top-item{
					flex: 1;
					@include flex-box(column,center,center);
					.num-text{
						font-size: 36rpx;
						font-weight: bold;
						color: #171717;
					}
					.sub-text{
						margin-top: 10rpx;
						color: #555555;
						font-size: 24rpx;
					}
				}
			}
			.user-top-bot{
				border-radius: 16rpx;
				padding: 20rpx 30rpx;
				background: #fff;
				@include flex-box(row,null,center);
				margin: 20rpx 15rpx 0 15rpx;
				image{
					width: 60rpx;
				}
				.user-top-bot-center{
					flex: 1;
					margin-left: 20rpx;
					.tit{
						font-size: 30rpx;
						color: #141414;
						font-weight: 600;
					}
					.sub-tit{
						font-size: 24rpx;
						color: #757575;
					}
				}
			}
		}
		.info{
			// background: #fff;
			border-radius: $border-radius;
			.info-title{
				line-height: 76rpx;
				font-size: 30rpx;
				color: #141414;
				font-weight: bold;
				padding: 0 15rpx;
			}
			.tabs-info{
				background: #fff;
				height: 88rpx;
			}
			.items{
				padding: 15rpx 15rpx 0 15rpx;
			}
		}
	}
</style>
