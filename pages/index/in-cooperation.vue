<template>
	<view class="container">
		<view v-if="cooperator_id">
			<view class="top">意向合作</view>
			<view class="details">
				<view class="detail-item">
					<text class="detail-label">合作者：</text>
					<text class="detail-value">{{cooperator.name}}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">用户评分：</text>
					<text class="detail-value">{{cooperator.star}}</text>
				</view>
				<view v-if="user_id === item_owner_id" class="detail-item" style="justify-content: flex-end;">
					<button @click="terminateCooperation" class="terminate-button">解除合作</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { fetch_data } from '../../utils/ajax_request.js'
	import * as utils from '../../utils/utils.js'
	export default {
		data() {
			return {
				cooperator: {
					"id": "",
					"name": "",
					"star": "",
				},
			};
		},
		props: {
			cooperator_id: {
				type: Number,
				required: false,
			},
			item_id: {
				type: Number,
				required: false,
			},
			item_owner_id: {
				type: Number,
				required: false,
			},
		},
		created() {
			if (this.cooperator_id) {
				fetch_data("POST", "get_user_star", {"user_id": this.cooperator_id}, "user", (res) => {
					this.cooperator.id = res.data.user_id;
					this.cooperator.name = res.data.username;
					this.cooperator.star = utils.show_stars(res.data.star_as_elite)[0];
				});
			}
		},
		methods: {
			terminateCooperation() {
				wx.showModal({
					title: '解除合作',
					content: '确认与该用户解除合作？',
					success: res => {
						if (res.confirm) {
							wx.showToast({
								title: "加载中...",
								icon: "loading",
								duration: 10000,
							});
							const data = {
								"item_id": this.item_id,
								"cooperator_id": this.cooperator.id,
								"item_owner_id": this.user_id,
							}
							fetch_data("POST", "item_terminate_cooperate", data, "application", res => {
								if (res.data.status === 200) {
									wx.showToast({
										title: "合作解除成功",
										icon: "none",
										duration: 1000,
									});
								} else {
									wx.showToast({
										title: res.data.message,
										icon: "none",
										duration: 1000,
									});
									return;
								}
							})
						}
					}
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx;
		background-color: #d4f1f0;
	}

	/* 顶部标题样式 */
	.top {
		color: #333;
		border-bottom: 2rpx solid #03A9F4;
		padding-bottom: 10rpx;
		margin-bottom: 20rpx;
	}

	.count {
		color: #7668f4;
	}

	/* 列表项样式 */
	.list-item {
		background-color: #ffffff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		padding: 20rpx;
		box-shadow: 0 4rpx 6rpx rgba(0, 0, 0, 0.1);
	}

	/* 标题区域 */
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
		margin-left: 20rpx;
	}

	.label {
		color: #666;
	}

	.masked {
		color: #000;
	}

	.arrow {
		color: #03A9F4;
		cursor: pointer;
		margin-right: 13rpx;
	}

	/* 折叠区域 */
	.details {
		margin-top: 20rpx;
		padding-top: 10rpx;
		border-top: 1rpx dashed #ddd;
	}

	.detail-item {
		display: flex;
		padding: 10rpx 0;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.detail-label {
		color: #999;
	}

	.detail-value {
		color: #333;
	}

	.terminate-button {
		background-color: #f44336;
		color: #fff;
		padding: 5rpx 10rpx;
		border: none;
		border-radius: 10rpx;
		cursor: pointer;
		margin-top: -110rpx;
		height: 90rpx;
	}
</style>