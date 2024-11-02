<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<view class="items" v-else-if="lists.length > 0">
			<view class="item" v-for="(item,index) in lists" :key="index">
				<image :src="item.is_online == 0 ? '/my/static/kefu-lx.png' : '/my/static/kefu.png'" mode="widthFix" class="item-img"/>
				<view class="name-text">{{ item.kf_name ? item.kf_name : `客服${item.user_id}号`}}</view>
				<view class="right-text" :class="{'grey-text':item.is_online == 0}">{{item.is_online == 0 ? '离线中' : '在线中'}}</view>
			</view>
			<u-loadmore class="load-more" :status="hasMore?'loading':'nomore'" :nomoreText="noMore" />
		</view>
		<view class="empty-container" v-else>
			<u-empty text="暂无相关数据" :icon="emptyIcon" />
		</view>
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
					is_online:1
				},
			}
		},
		onLoad(e) {
			_this = this;
			if (e.is_online) {
				_this.form.is_online = e.is_online
			}
			_this.get_kefu_list()
		},
		onReachBottom() {
			if(_this.hasMore){
				_this.form.pageIndex++
				_this.get_kefu_list()
			}
		},
		onReady() {
			if (_this.form.is_online == 0) {
				uni.setNavigationBarTitle({
					title:'离线'
				})
			}
		},
		methods: {
			async get_kefu_list() {
				const data = await _this.$post('port/kefu_list', _this.form)
				if (data.code == 200) {
					_this.lists.push(...data.result.list)
					_this.hasMore = data.result.list.length >= _this.form.pageSize
				} else {
					_this.hasMore = false
				}
				if (_this.load) {
					_this.load = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #fff;
	}
	.container {
		height: 100%;
		.items{
			padding: 0 36rpx;
			.item{
				@include flex-box(row,null,center);
				border-bottom: $global-border;
				padding: 20rpx 0;
				.item-img{
					width: 94rpx;
					height: 94rpx;
					margin-right: 34rpx;
				}
				.name-text{
					flex: 1;
					color: #141414;
				}
				.right-text{
					color: #02AAAB;
					font-size: 26rpx;
					position: relative;
					&::after{
						content: '';
						width: 8rpx;
						height: 8rpx;
						border-radius: 50%;
						background: #02AAAB;
						display: block;
						position: absolute;
						left: -16rpx;
						top: calc(50% - 4rpx);
					}
				}
				.grey-text{
					color: #7A7A7A;
					&::after{
						background: #7A7A7A;
					}
				}
			}
		}
	}
</style>
