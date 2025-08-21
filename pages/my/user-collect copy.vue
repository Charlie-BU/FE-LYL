<template>
	<view class="container">
		<view class="top-tab">
			<u-tabs
			lineColor="#fff"
			:list="list1" 
			:scrollable="false"
			 :activeStyle="{
				 color: '#fff',
				 fontWeight: '500',
				 transform: 'scale(1.05)'
			 }"
			 :inactiveStyle="{
				 color: '#AEF3F3',
				 transform: 'scale(1)'
			 }"
			@click="clickTab"></u-tabs>
		</view>
		<scroll-view scroll-y="true" class="scroll">
			<view class="items" v-if="current == 0">
				<my-items></my-items>
				<u-loadmore class="load-more" :status="hasMore?'loading':'nomore'" :nomoreText="noMore" />
			</view>
			<view class="items" v-else>
				<my-qy-items></my-qy-items>
				<u-loadmore class="load-more" :status="qyHasMore?'loading':'nomore'" :nomoreText="noMore" />
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
					name: '收藏的职位',
				}, {
					name: '关注的企业',
				}],
				current:0,
				qyHasMore:false
			}
		},
		onLoad(e) {
			_this = this;
		},
		methods: {
			clickTab(item) {
				if (item.index == _this.current) {
					return
				}
				_this.current = item.index
				console.log('item', item);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "static/css/user.scss";
	.container {
		height: 100%;
		overflow: hidden;
		.scroll{
			height: calc(100% - 44px);
			margin-top: -50rpx;
			.items{
				padding: 0 30rpx;
			}
		}
	}
</style>
