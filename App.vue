<script>
export default {
	globalData: {
		default_token: '3b065b75ca0778f5ff4a1fbcbd39d5da',
		sign_prefix: 'zhangdada',
		//腾讯地图web端key https://lbs.qq.com/dev/console/application/mine
		tx_map_key: 'FJKBZ-GNNWQ-4KP5Q-2R5FR-HLMC7-TVB3F',
	},
	onLaunch() {
		// console.log('App Launch')
		// #ifdef MP-WEIXIN
		if (uni.getSystemInfoSync().platform == "ios") {
			uni.setInnerAudioOption({
				obeyMuteSwitch: false
			});
		}
		// #endif
	},
	onShow(op) {
		console.log('App Show', op)
	},
	onHide() {
		// console.log('App Hide')
	},
	onPageNotFound() {
		console.log('onPageNotFound');
	}
}
</script>

<style lang="scss">
@import '@/static/iconfont/iconfont.css';
@import "uview-ui/index.scss";
@import "static/css/common.scss";

/*每个页面公共css */
//确认对话框
.alert-popup {
	background: #fff;
	border-radius: 16rpx;

	.alert-title {
		height: 80rpx;
		@include flex-box(row, center, center);
		font-size: 30rpx;
		font-weight: bold;
	}

	.alert-info {
		padding: 40rpx 20rpx 60rpx 20rpx;
		text-align: center;
		font-size: 30rpx;
	}

	.alert-bot {
		height: 100rpx;
		@include flex-box();
		border-top: $global-border;

		text {
			flex: 1;
			@include flex-box(row, center, center);
			font-size: 28rpx;
			font-weight: bold;
			box-sizing: border-box;

			&:first-child {
				border-right: $global-border;
			}

			&:last-child {
				color: $text-red;
			}
		}
	}
}

//设置项
.group {
	padding: 0 20rpx;

	.group-row {
		@include flex-box(row, space-between, center);
		min-height: 106rpx;
		padding: 20rpx 0;
		box-sizing: border-box;

		&:not(:last-child) {
			border-bottom: $global-border;
		}

		.title {
			.group-row-left-img {
				width: 90rpx;
				height: 90rpx;
			}
		}

		.group-row-right {
			@include flex-box(row, null, center);

			.group-row-right-img {
				width: 90rpx;
				height: 90rpx;
			}

			.group-row-right-more {
				width: 20rpx;
				margin-left: 10rpx;
			}

			.arrow-right {
				margin-left: 10rpx;
			}

			.group-row-right-text {
				color: $text-595959;
			}

			.theme {
				color: $text-theme;
			}

			.grey {
				color: $text-grey;
			}
		}
	}
}

//微信登录
.weixin-login {
	position: relative;

	.weixin-login-info {
		margin-left: 10%;
		width: 80%;
		border-radius: 20rpx;
		height: 600rpx;
		background: url('https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/chushi.png') center/100% 100% no-repeat;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		padding-bottom: 60rpx;
		box-sizing: border-box;

		.text {
			margin-bottom: 20rpx;
			font-size: 30rpx;
			font-weight: 600;
		}

		.weixin-login-btn {
			width: 80%;
			height: 86rpx;
			line-height: 86rpx;
			font-size: 28rpx;
			border-radius: 16rpx;
			background: #02AAAB;
		}

		.weixin-login-btn[disabled] {
			background: rgba(#02AAAB, 0.5) !important;
		}
	}

	.weixin-login-bot {
		text-align: center;
		margin-top: 40rpx;

		image {
			width: 57rpx;
		}
	}
}

//分享
.share-container {
	@include flex-box(row);

	.item {
		flex: 1;
		text-align: center;
		padding: 30rpx 0;

		.fx-img {
			width: 100rpx;
		}

		.title {
			font-weight: 500;
			font-size: 28rpx;
			margin-top: 10rpx;
		}
	}
}

//弹窗输入交易密码
.paypwd-container {
	position: relative;

	.close-img {
		width: 36rpx;
		position: absolute;
		right: 20rpx;
		top: 20rpx;
	}

	.title {
		@include flex-box(row, center, center);
		height: 80rpx;
		font-weight: 500;
		font-size: 28rpx;
	}

	.form-rows {
		padding: 0 30rpx;

		.row-input {
			min-height: 100rpx;
			border-bottom: $global-border;
		}
	}

	.btn-container {
		padding: 30rpx 30rpx 30rpx 30rpx;

		.con-btn {
			background: $theme-color;
			margin: 0 auto;
			border-radius: 40rpx;
			color: #fff;
			font-size: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-weight: 500;
			border-radius: 50rpx;

			&[disabled] {
				background: rgba($color: $theme-color, $alpha: 0.5);
				color: #fff;
			}
		}
	}
}

//拍照||从相册中选择
.take-photo {
	background: #fff;
	border-radius: 20rpx 20rpx 0 0;

	.top {
		.take-photo-item {
			border-bottom: $global-border;
		}
	}

	.take-photo-item {
		height: 100rpx;
		font-size: 30rpx;
		box-sizing: border-box;
		@include flex-box(row, center, center);
	}

	.cancel-text {
		color: #ABABAB;
	}
}

.take-photo-two {
	padding: 0 18rpx 28rpx 18rpx;

	.top-images {
		border-radius: 36rpx;
		background: #fff;
		padding: 0 20rpx;
		margin-bottom: 20rpx;
		padding-bottom: 35rpx;

		.top-title {
			@include flex-box();

			text {
				line-height: 100rpx;
			}

			.cancel-text {
				color: #B8B8B8;
			}

			.center-text {
				font-size: 30rpx;
				font-weight: bold;
				flex: 1;
				text-align: center;
			}

			.confirm-text {
				color: #02AAAB;
			}
		}

		.images {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-gap: 30rpx 0;
			margin-top: 10rpx;

			.img-item {
				text-align: center;

				.img-con {
					position: relative;
					display: inline-block;

					.info-img {
						width: 90rpx;
						border-radius: 10rpx;
					}

					.sel-img {
						width: 30rpx;
						position: absolute;
						right: 0;
						top: 0;
					}
				}
			}
		}
	}

	.bot {
		background: #fff;
		border-radius: 36rpx;

		.take-photo-item {
			&:not(:last-child) {
				border-bottom: $global-border;
			}

			height: 92rpx;
			font-size: 30rpx;
			box-sizing: border-box;
			@include flex-box(row, center, center);
		}

		.cancel-text {
			color: #ABABAB;
		}
	}
}

//顶部间距
.top-border {
	height: 20rpx;
	background: $bg-color;
}

//占位文字大小
::v-deep .placeholder28 {
	font-size: 28rpx;
}

::v-deep .placeholder30 {
	font-size: 30rpx;
}
</style>
