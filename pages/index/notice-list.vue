<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<block v-else>
		<view class="items" v-if="lists.length>0">
			<view style="height: 20rpx;"></view>
			<view class="item" v-for="(item,index) in lists" :key="index" @click="goDetail(item)">
				<view class="top">
					<text class="tit">{{item.title}}</text>
					<text class="time">{{item.add_time_str}}</text>
				</view>
				<view class="bot">{{item.description}}</view>
			</view>
			<u-loadmore class="load-more" :status="hasMore?'loading':'nomore'" :nomoreText="noMore" />
		</view>
		<view class="empty-container" v-else>
			<u-empty text="暂无公告" :icon="emptyIcon" />
		</view>
		</block>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				form: {
					pageIndex:1,
					pageSize:20,
				},
			}
		},
		onLoad(e) {
			_this = this;
			_this.get_gonggao_list()
		},
		onReachBottom() {
			if(_this.hasMore){
				_this.form.pageIndex++
				_this.get_gonggao_list()
			}
		},
		methods: {
			async get_gonggao_list() {
				const data = await _this.$post('port/get_gonggao_list', _this.form)
				if (data.code == 200) {
					_this.lists.push(...data.result.list)
					_this.hasMore = data.result.list.length >= _this.form.pageSize
				} else {
					_this.hasMore = false
				}
				if (_this.load) {
					_this.load = false
				}
			},
			goDetail(item){
				let url = encodeURIComponent(`/port/gonggao_xq?id=${item.id}`)
				_this.toNext(`/pages/index/html-detail?title=公告详情&url=${url}`)
			}
		},
	}
</script>
<style lang="scss" scoped>
	.container {
		height: 100%;
		.items{
			padding: 0 30rpx;
			.item{
				padding: 20rpx 20rpx;
				background: #fff;
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				.top{
					@include flex-box(null,space-between,center);
					.tit{
						font-weight: 500;
						font-size: 30rpx;
					}
					.time{
						color: $text-353535;
					}
				}
				.bot{
					margin-top: 10rpx;
					color: $text-2D2D2D;
				}
			}
		}
	}
</style>
