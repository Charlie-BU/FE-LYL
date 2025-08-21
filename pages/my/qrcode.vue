<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<block v-else>
			<view class="inner" :style="{'backgroundImage':`url(${baseUrl}/uni/fx-bg.png)`}">
				<view class="inner-info">
					<view class="head">
						<image :src="user.head_pic" mode="scaleToFill" class="head-img"/>
						<view class="text">推荐码：{{user.rekey}}</view>
					</view>
					<image :src="full_image" class="qrcode-img" mode="widthFix"/>
					<button class="save-btn" @click="saveImg">保存图片</button>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import downloadImg from '@/components/downloadImg.js'
	var _this;
	export default {
		data() {
			return {
				full_image:'',
			}
		},
		onLoad(e) {
			_this = this;
			_this.get_dp_qrcode()
		},
		methods: {
			async get_dp_qrcode(){
				let params = {
					is_xcx:0
				}
				// #ifdef MP-WEIXIN
				params.is_xcx = 1
				// #endif
				const data = await _this.$post('port/qr_code',params)
				if(data.code==200){
					_this.user=data.result.user
					_this.full_image = data.result.img
					if (_this.load) {
						_this.load = false
					}
				}else{
					this.$u.toast(data.msg,()=>{
						_this.finish()
					})
				}
			},
			saveImg(){
				// #ifdef H5
				uni.$u.toast('请长按二维码保存')
				return
				// #endif
				downloadImg(this.full_image)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		overflow: hidden;
		.inner{
			height: 100%;
			background: left top/100% 100% no-repeat;
			position: relative;
			.inner-info{
				@include flex-box(column,space-evenly);
				position: absolute;
				width: 80%;
				height: 60%;
				left: 10%;
				top: 28%;
				background: url('/static/my/fx-center-bg.png') left top/100% 100% no-repeat;
				.head{
					text-align: center;
					.head-img{
						width: 130rpx;
						height: 130rpx;
						border-radius: 50%;
						box-sizing: border-box;
					}
					.text{
						margin-top: 5rpx;
					}
				}
				.qrcode-img{
					width: 290rpx;
					align-self: center;
				}
				.save-btn{
					background: $bg-btn;
					color: #fff;
					font-size: 30rpx;
					height: 80rpx;
					line-height: 80rpx;
					border-radius: 50rpx;
					width: 70%;
					align-self: center;
				}
			}
		}
	}
</style>
