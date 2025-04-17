<template>
	<view class="container">
		<view class="header">
			<button class="my-purchase-btn" @click="toMyPurchase">我的购买</button>
		</view>
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<view class="service-list" v-else-if="lists.length > 0">
			<view class="service-item" v-for="(item, index) in lists" :key="index">
				<view class="service-item-title">{{ item.name }}</view>
				<view class="service-item-price">
					<text class="price-symbol">¥</text>
					<text class="price-value">{{ item.price }}</text>
				</view>
				<view class="service-item-desc">{{ item.description }}</view>
				<view class="service-item-features">
					<view class="feature-item" v-for="(feature, fIndex) in item.features" :key="fIndex">
						<u-icon name="checkmark-circle" color="#02ABAB" size="28"></u-icon>
						<text>{{ feature }}</text>
					</view>
				</view>
				<button class="buy-btn" @click="buyService(item)">立即购买</button>
			</view>
			<u-loadmore class="load-more" :status="hasMore ? 'loading' : 'nomore'" :nomoreText="noMore" />
		</view>
		<view class="empty-container" v-else>
			<u-empty text="暂无相关数据" mode="list" />
		</view>
	</view>
</template>

<script>
var _this;
export default {
	data() {
		return {
			form: {
				pageIndex: 1,
				pageSize: 10
			},
			lists: [],
			load: true,
			hasMore: false,
			noMore: '没有更多了'
		}
	},
	onLoad() {
		_this = this;
		_this.getServiceList();
	},
	onReachBottom() {
		if (_this.hasMore) {
			_this.form.pageIndex++;
			_this.getServiceList();
		}
	},
	methods: {
		getServiceList() {
			// 模拟服务包数据
			const mockData = {
				code: 200,
				result: {
					list: [
						{
							id: 1,
							name: '基础服务包',
							price: '299',
							description: '适合个人用户的基础服务套餐',
							features: ['7x24小时客服支持', '基础功能使用', '每月10次咨询']
						},
						{
							id: 2,
							name: '专业服务包',
							price: '599',
							description: '适合小型企业的专业服务套餐',
							features: ['优先客服支持', '高级功能使用', '每月20次咨询', '专属顾问服务']
						},
						{
							id: 3,
							name: '企业服务包',
							price: '999',
							description: '适合中大型企业的全方位服务套餐',
							features: ['24小时专属客服', '全部功能使用', '无限次咨询', '现场技术支持', '定制化解决方案']
						}
					]
				}
			};

			// 模拟分页逻辑
			const startIndex = (_this.form.pageIndex - 1) * _this.form.pageSize;
			const endIndex = startIndex + _this.form.pageSize;
			const pageData = mockData.result.list.slice(startIndex, endIndex);

			_this.lists.push(...pageData);
			_this.hasMore = pageData.length >= _this.form.pageSize;

			if (_this.load) {
				_this.load = false;
			}
		},
		buyService(item) {
			uni.navigateTo({
				url: `/pages/my/servicepay?id=${item.id}&name=${item.name}`
			});
		},
		toMyPurchase() {
			uni.navigateTo({
				url: '/pages/my/servicepay'
			});
		},
	}
}
</script>

<style lang="scss" scoped>
.container {
	padding: 30rpx;
	background-color: #f5f5f5;
	min-height: 100vh;

	.header {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 20rpx;

		.my-purchase-btn {
			background-color: $theme-color;
			color: #fff;
			font-size: 28rpx;
			padding: 10rpx 30rpx;
			border-radius: 30rpx;
			height: auto;
			line-height: 1.8;

			&:active {
				opacity: 0.8;
			}
		}
	}

	.service-list {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 30rpx;
	}

	.service-item {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 40rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);

		&-title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 20rpx;
		}

		&-price {
			margin: 30rpx 0;

			.price-symbol {
				font-size: 32rpx;
				color: $theme-color;
			}

			.price-value {
				font-size: 48rpx;
				font-weight: bold;
				color: $theme-color;
			}
		}

		&-desc {
			font-size: 28rpx;
			color: #666;
			line-height: 1.5;
			margin-bottom: 30rpx;
		}

		&-features {
			margin-bottom: 40rpx;

			.feature-item {
				display: flex;
				align-items: center;
				margin-bottom: 16rpx;

				text {
					font-size: 26rpx;
					color: #666;
					margin-left: 12rpx;
				}
			}
		}

		.buy-btn {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			background-color: $theme-color;
			color: #fff;
			font-size: 28rpx;
			border-radius: 40rpx;
			margin-top: 20rpx;

			&:active {
				opacity: 0.8;
			}
		}
	}
}
</style>