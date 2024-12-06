<template>
	<view class="container">
		<view class="configs">
			{{config.kf_desc}}
		</view>
		
		<view class="form" style=""  v-for="(item,index) in data" :key="index"  >
			<view class="form" @click="copyText(item.weixin)">
				<u-input placeholder="客服微信" border="none" type="number" placeholderClass="placeholder28"
					v-model="item.weixin" clearable disabled disabledColor="#fff">
					<u--text text="客服微信" slot="prefix" margin="0 60rpx 0 0" type="tips"></u--text>
				</u-input>
			</view>
			<view class="upload">
					<view class="uploadImg">
						<image show-menu-by-longpress="true"  @click="previewImage(getFullUrl(item.kf_img))" :src="getFullUrl(item.kf_img)"  mode="widthFix">
						</image>
					</view>
			</view>
		</view>
		
		
		
	
	</view>
</template>

<script>
	var _this;
		import md5 from '@/components/MD5.js'
		var validate = require("@/components/validate/validate.js");
	export default {
		data() {
			return {
				
				data:[],
				config:[],
				identitys:0
			}
		},
		onLoad(e) {
			console.log(e)
			_this = this
			_this.kfList();
			_this.identitys=e.identity
		},
		methods: {
			 copyText(weixin) {
			        uni.setClipboardData({
			          data: weixin,
			          success: function () {
			            uni.showToast({
			              title: '复制成功',
			              icon: 'success',
			              duration: 2000
			            });
			          }
			        });
			      },
			previewImage(src) {
			     uni.previewImage({
			       current: src, // 当前显示图片索引
			       urls: [src] // 需要预览的图片http链接列表
			     });
			   },
			
			async kfList(){
				const data = await _this.$post('port/kfList')
				_this.data=data.result.list;
				_this.config=data.result.config;
				
			},
			
		
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.configs{
			    display: flex;
			    align-items: center;
			    padding: 30rpx;
			    background: #FFF;
			    border-radius: 20rpx;
			    margin-bottom: 20rpx;
				    justify-content: center;
		}
		::v-deep .u-input__content__field-wrapper__field{
			    height:auto !important;
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
			button{
				padding: 0;
				width: 124rpx;
				height: 58rpx;
				line-height: 58rpx;
				border-radius: 30rpx;
				color: #fff;
				background: $theme-color;
				font-size: 24rpx;
			}
		}
		padding: 20rpx 30rpx;

		.form {
			display: flex;align-items: center;
			padding: 30rpx;
			background: #FFF;
			border-radius: 20rpx;
			margin-bottom: 20rpx;

			::v-deep .u-textarea {
				padding: 0 !important;
			}

			::v-deep .u-text__value {
				color: #121212 !important;
				font-size: 28rpx !important;
				font-weight: 500 !important;
			}

			.upload {
				.uploadImg {
					width: 150rpx;
					height: 150rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.btn {
			margin-top: 40rpx;

			button {
				color: #fff;
				font-size: 32rpx;
				letter-spacing: 1rpx;
				border-radius: 100rpx;
				background-color: #02ABAB;
			}
		}
	}
</style>