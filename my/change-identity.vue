<template>
	<view class="container">
		<view class="top">
			<view class="title-text">请选择您的身份</view>
			<view class="sub-title-text">方便我们为您提供更准确的服务</view>
		</view>
		<view class="center">
			<view class="center-items">
				<view class="center-item" @click="changeIndex(1)">
					<image :src="index == 1 ? 'https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/radio-s.png' : 'https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/radio.png'" mode="widthFix" class="left-icon"/>
					<image src="static/zhaohuo.png" mode="widthFix" class="center-icon"/>
					<text>我要找活</text>
				</view>
				<view class="center-item" @click="changeIndex(2)">
					<image :src="index == 2 ? 'https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/radio-s.png' : 'https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/radio.png'" mode="widthFix" class="left-icon"/>
					<image src="static/fahuo.png" mode="widthFix" class="center-icon"/>
					<text>我要发活</text>
				</view>
				<view class="center-item" @click="changeIndex(3)" v-if="is_kf == 1">
					<image :src="index == 3 ? 'https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/radio-s.png' : 'https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/radio.png'" mode="widthFix" class="left-icon"/>
					<image src="static/kefu.png" mode="widthFix" class="center-icon"/>
					<text>我是客服</text>
				</view>
			</view>
			<button class="center-btn" @click="goNext()">进入</button>
		</view>
		<view class="bot" @click="toNext('/auth/kefu-login',true)" v-if="is_kf == 0">让工作 · 更自由</view>
	</view>
</template>

<script>
	import { fetch_data } from "../utils/ajax_request";
	var _this;
	const GoEasy = uni.$GoEasy;
	export default {
		data() {
			return {
				index:1,
				is_kf:0,
			}
		},
		onLoad(e) {
			_this = this;
			if (e.is_kf) {
				_this.is_kf = e.is_kf
			}
			this.index = this.identity
			// _this.get_user_info()
		},
		methods: {
			changeIndex(index){
				if (_this.index != index) {
					_this.index = index
				}
			},
			goNext(){
				// 计算用户得分（临时）
				fetch_data("POST", "calc_star_as_elite", {"user_id": this.user_id}, "user");
				this.$u.vuex('identity', _this.index)
				uni.reLaunch({
					url:'/pages/index/index'
				})
				if (GoEasy.getConnectionStatus() !== 'disconnected') {
					//断开连接
					GoEasy.disconnect({
						onSuccess: function(){
							console.log("GoEasy disconnect successfully.")
						},
						onFailed: function(error){
							console.log("Failed to disconnect GoEasy, code:"+error.code+ ",error:"+error.content);
						}
					});
				}
				if (_this.index == 1) {
					
				} else if (_this.index == 2) {
					
				} else{
					
				}
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
				if (_this.load) {
					_this.load = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		background: #fff;
		@include flex-box(column,space-around);
		.top {
			padding: 0 0 0 44rpx;
		
			.title-text {
				font-size: 52rpx;
				font-weight: bold;
			}
		
			.sub-title-text {
				margin-top: 10rpx;
				font-size: 28rpx;
				color: #7A7A7A;
			}
		}
		.center{
			padding: 0 75rpx;
			.center-items{
				.center-item{
					@include flex-box(row,null,center);
					border-radius: 16rpx;
					border: 2rpx solid #F8F8F8;
					padding:43rpx 0 43rpx 77rpx;
					&:not(:last-child){
						margin-bottom: 40rpx;
					}
					.left-icon{
						width: 44rpx;
					}
					.center-icon{
						width: 114rpx;
						margin: 0 43rpx 0 75rpx;
					}
					text{
						
					}
				}
			}
			.center-btn{
				background: $theme-color;
				width: 360rpx;
				line-height: 88rpx;
				color:#fff;
				font-size: 28rpx;
				margin: 150rpx auto 0;
			}
		}
		.bot{
			align-self: center;
			color: $theme-color;
		}
	}
</style>
