<template>
	<view class="items-container">
		<view class="zp-item" v-for="(item, index) in datas" :key="index">
			<view class="zp-item-title">
				<view class="left">
					<text>发票抬头：{{ item.name }}</text>
				</view>
				<view class="right" v-if="item.status == '审核通过'">
					<image src="@/static/my/qiyong.png" mode="widthFix" class="left-icon" />
					<text class="success-text">审核通过</text>
				</view>
				<view class="right" v-if="item.status == '待审核'">
					<image src="https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/index/check-wait.png"
						mode="widthFix" class="left-icon" />
					<text class="blue-text">待审核</text>
				</view>
				<view class="right" v-if="item.status == '审核失败'">
					<image src="https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/index/bohui.png" mode="widthFix"
						class="left-icon" />
					<text class="red-text">审核失败</text>
				</view>
				<!-- <view class="right">{{item.status}}</view> -->
			</view>
			<view class="zp-item-title">
				<view class="left">
					<text>纳税人识别号：{{ item.number }}</text>
				</view>
				<block v-if="item.status == '审核通过'">
					<view class="right" v-if="item.kp_status == '待开票'">
						<image src="https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/index/check-wait.png"
							mode="widthFix" class="left-icon" />
						<text class="blue-text">待开票</text>
					</view>
					<view class="right" v-if="item.kp_status == '已开票'">
						<image src="@/static/my/qiyong.png" mode="widthFix" class="left-icon" />
						<text class="success-text">已开票</text>
					</view>
				</block>
			</view>
			<view class="zp-item-title">
				<view class="left">
					<text>邮箱：{{ item.email }}</text>
				</view>
				<view class="right">{{ item.money }}</view>
			</view>
			<view class="zp-item-title">
				<view class="left">
					<text>开票金额：{{ item.price }}</text>
				</view>
				<view class="center"></view>
			</view>
			<view class="zp-item-title" v-if="item.status != '审核通过' && item.status != '待审核'">
				<view class="left">
					<text>失败原因：{{ item.reason }}</text>
				</view>
				<view class="center"></view>
			</view>


		</view>
	</view>
</template>

<script>
export default {
	name: "my-invoice",
	props: {
		datas: {
			type: Array,
			default: () => []
		},
		showBot: {
			type: Boolean,
			default: false
		},
		showTime: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {

		};
	},
	methods: {
		itemClick(item, type, index) {
			let param = {
				type,
				index,
				item
			}
			this.$emit('itemClick', param)
		},
		previewImage(index) {
			console.log(index)
			uni.previewImage({
				current: index, // 当前显示图片索引
				urls: [index] // 需要预览的图片http链接列表
			});
		},
		getFullUrl(url) {
			if (url.indexOf('http://') != -1 || url.indexOf('https://') != -1) {
				return url;
			}
			return `${this.baseUrl}/${url}`;
		}
	}
}
</script>

<style lang="scss" scoped>
.items-container {
	.zp-item {
		padding: 30rpx 22rpx;
		margin-bottom: 16rpx;
		background: #fff;
		border-radius: 16rpx;

		>view {
			&:not(:first-child) {
				display: flex;
				flex-wrap: wrap;
				margin-top: 20rpx;
			}
		}

		&-title {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				display: flex;
				align-items: center;

				.left-img {
					width: 63rpx;
					height: 63rpx;
					border-radius: 50%;
					margin-right: 12rpx;
				}

				text {
					font-size: 34rpx;
					font-weight: 500;
				}
			}

			.center {
				width: 160rpx;
			}

			.right {
				display: flex;
				align-items: center;

				.left-icon {
					width: 32rpx;
					margin-right: 10rpx;
				}

				.blue-text {
					color: #2F94FF;
				}

				.success-text {
					color: #12A70B;
				}

				.theme-text {
					color: #02AAAB;
				}

				.red-text {
					color: #E92129;
				}

				.yellow-text {
					color: #FF9900;
				}
			}

			// .right{
			// 	color: #02ABAB;
			// 	font-size: 30rpx;
			// 	font-weight: bold;
			// 	flex-shrink: 0;
			// }
		}

		&-tab {
			.tab-item {
				background: #EFEFEF;
				color: #5E5E5E;
				padding: 4rpx 12rpx;
				border-radius: 6rpx;
				font-size: 24rpx;

				&:not(:first-child) {
					margin-left: 10rpx;
				}
			}
		}

		&-bot {
			align-items: center;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.name-title {
					color: #292929;
				}
			}

			.right {
				text {
					color: #7A7A7A;
					font-size: 26rpx;

					&:not(:last-child) {
						margin-right: 6rpx;
					}
				}

				.time-text {}
			}
		}

		&-bot-btns {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.left-icon {
					width: 32rpx;
					margin-right: 10rpx;
				}

				text {
					font-size: 26rpx;
				}
			}

			.blue-text {
				color: #2F94FF;
			}

			.success-text {
				color: #12A70B;
			}

			.theme-text {
				color: #02AAAB;
			}

			.red-text {
				color: #E92129;
			}

			.yellow-text {
				color: #FF9900;
			}

			.right {
				display: flex;

				button {
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 8rpx;
					width: 116rpx;
					padding: 0;
					line-height: 52rpx;

					&:not(:last-child) {
						margin-right: 14rpx;
					}

					&.theme-btn {
						background: #02AAAB;
						color: #fff;
					}

					&.red-btn {
						background: #FFF6F6;
						border: 2rpx solid #F03D37;
						color: #F03D37;
					}

					&.ty-btn {
						background: #FFF9F1;
						border: 2rpx solid #FF9900;
						color: #FF9900;
					}

					&.qy-btn {
						background: #F5FFF5;
						color: #12A70B;
						border: 2rpx solid #12A70B;
					}

					.btn-icon {
						width: 32rpx;
						margin-right: 6rpx;
					}

					text {
						font-size: 26rpx;
					}
				}
			}
		}
	}
}
</style>