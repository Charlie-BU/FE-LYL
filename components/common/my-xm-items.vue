<template>
	<view class="items-container">
		<view class="zp-item" v-for="(item, index) in datas" :key="index" @click="itemClick(6, item, index)">
			<view class="zp-item-title">
				<view class="left">
					<text>{{ item.title }}</text>
				</view>
				<view class="center"></view>
				<view class="right">{{ item.salary + item.salary_unit }}</view>
			</view>
			<view class="zp-item-tab">
				<view class="tab-item" v-for="(item2, index2) in item.arr" :key="index2">{{ item2 }}</view>
			</view>
			<view class="zp-item-status" v-if="item.status == -1">
				<image src="https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/index/check-wait.png" mode="widthFix"
					class="icon" />
				<text class="blue-text">审核中</text>
			</view>
			<view class="zp-item-status" v-if="item.status == 2">
				<image src="https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/index/jg-red.png" mode="widthFix"
					class="icon" />
				<text class="red-text">已驳回：{{ item.reason }}</text>
			</view>
			<view class="zp-item-status" v-if="item.status == 3">
				<image src="@/static/my/qiyong.png" mode="widthFix" class="icon" />
				<text class="success-text">启用中</text>
			</view>
			<view class="zp-item-status" v-if="item.status == 4">
				<image src="https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/index/yitingyong.png" mode="widthFix"
					class="icon" />
				<text class="yellow-text">已停用</text>
			</view>
			<view class="zp-item-bot">
				<button size="mini" class="theme-btn" @click.stop="itemClick(1, item, index)">
					<image src="@/static/my/bianji-btn.png" mode="widthFix" class="right-icon" />
					<text>编辑</text>
				</button>
				<button size="mini" class="qy-btn" @click.stop="itemClick(2, item, index)"
					v-if="item.status == 1 || item.status == 4">
					<image src="https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/index/qy-icon.png" mode="widthFix"
						class="right-icon" />
					<text>启用</text>
				</button>
				<block v-if="item.status == 3">
					<button size="mini" class="sx-btn" @click.stop="itemClick(3, item, index)">
						<image src="@/static/my/shuaxin.png" mode="widthFix" class="right-icon" />
						<text>刷新</text>
					</button>
					<button size="mini" class="ty-btn" @click.stop="itemClick(4, item, index)">
						<image src="@/static/my/ty-btn.png" mode="widthFix" class="right-icon" />
						<text>停用</text>
					</button>
				</block>
				<button size="mini" class="del-btn" @click.stop="itemClick(5, item, index)">
					<image src="https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/index/del-red.png" mode="widthFix"
						class="right-icon" />
					<text>删除</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "my-xm-items",
	props: {
		datas: {
			type: Array,
			default: () => []
		},
	},
	data() {
		return {

		};
	},
	methods: {
		itemClick(type, item, index) {
			let param = {
				type,
				index,
				item: item
			}
			this.$emit('itemClick', param)
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

			.left {
				text {
					font-size: 34rpx;
					font-weight: 500;

					&:not(:last-child) {
						margin-right: 10rpx;
					}
				}
			}

			.center {
				width: 160rpx;
			}

			.right {
				color: #02ABAB;
				font-size: 30rpx;
				font-weight: bold;
				flex-shrink: 0;
			}
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

		&-status {
			display: flex;
			align-items: center;

			.icon {
				width: 32rpx;
			}

			text {
				font-size: 26rpx;
				margin-left: 8rpx;

				&.blue-text {
					color: #2F94FF;
				}

				&.success-text {
					color: #12A70B;
				}

				&.theme-text {
					color: #02AAAB;
				}

				&.red-text {
					color: #E92129;
				}

				&.yellow-text {
					color: #FF9900;
				}
			}
		}

		&-bot {
			align-items: center;
			justify-content: flex-end;

			button {
				display: inline-flex;
				align-items: center;
				height: 52rpx;
				line-height: 52rpx;
				padding: 0 20rpx;
				border-radius: 8rpx;

				&:not(:last-child) {
					margin-right: 14rpx;
				}

				&.theme-btn {
					background: #02AAAB;
					color: #fff;
				}

				&.del-btn {
					background: #FFF6F6;
					color: #F03D37;
					border: 2rpx solid #F03D37;
				}

				&.qy-btn {
					background: #F5FFF5;
					color: #12A70B;
					border: 2rpx solid #12A70B;
				}

				&.ty-btn {
					background: #fff9f1;
					color: #FF9900;
					border: 2rpx solid #FF9900;
				}

				&.sx-btn {
					background: #DEF4F4;
					color: #02AAAB;
					border: 2rpx solid #02AAAB;
				}

				.right-icon {
					width: 32rpx;
					margin-right: 8rpx;
				}
			}
		}
	}
}
</style>