<template>
	<view class="container">
		<view class="top">
			<u-tabs lineColor="#15B3B4" :list="list1" :scrollable="false" :activeStyle="{
				 color: '#000000',
				 fontWeight: 'bold',
				 transform: 'scale(1.05)',
				 fontSize:'28rpx'
			 }" :inactiveStyle="{
				 color: '#5B5B5B',
				 transform: 'scale(1)',
				 fontSize:'28rpx'
			 }" @click="clickTab"></u-tabs>
		</view>
		<scroll-view scroll-y="true" class="scroll">
			<view class="info">
				<view class="items">
					<my-items @itemClick="itemClick" :showBot="true"></my-items>
				</view>
				<u-loadmore class="load-more" :status="hasMore?'loading':'nomore'" :nomoreText="noMore" />
			</view>
		</scroll-view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				list1: [{
					name: '全部',
				}, {
					name: '项目审核',
				}, {
					name: '简历审核'
				}]
			}
		},
		onLoad(e) {
			_this = this;
		},
		methods: {
			clickTab(item) {
				console.log('item', item);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		overflow: hidden;

		.top {
			background: #fff;
			height: 88rpx;
		}

		.scroll {
			height: calc(100% - 88rpx);

			.info {
				padding: 15rpx 15rpx 0 15rpx;
			}
		}
	}
</style>