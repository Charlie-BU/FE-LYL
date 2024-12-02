<template>
	<view v-if="item_chats.length !== 0" class="container">
		<view class="top">
			沟通中：<span class="count">{{item_chats.length}}</span>
		</view>

		<!-- 列表循环 -->
		<view v-for="(chat, index) in item_chats" :key="index" class="list-item">
			<view class="header" @click="changeMode(index)">
				<view>
					<!-- <text class="masked">{{chat.elite_name.slice(0,2) + '*'.repeat(chat.elite_name.length - 2)}}</text> -->
					<text class="masked">{{chat.elite_name}}</text>
				</view>
				<text class="arrow">{{item_chats[index].mode ? '∧' : '∨'}}</text>
			</view>

			<view v-if="item_chats[index].mode" class="details">
				<view class="detail-item">
					<text class="detail-label">沟通时间：</text>
					<text class="detail-value">{{chat.update_time}}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">用户评分：</text>
					<text class="detail-value">{{chat.elite_star}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item_chats: [],
			};
		},
		created() {
			this.get_lists();
		},
		methods: {
			get_lists() {
				this.item_chats = uni.getStorageSync("item_chats");
				uni.removeStorageSync("item_chats");
			},
			changeMode(index) {
				this.item_chats[index].mode = !this.item_chats[index].mode;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx;
		background-color: #f9f9f9;
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
		border-radius: 10rpx;
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
		justify-content: space-between;
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
</style>