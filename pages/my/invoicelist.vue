<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<view class="items" v-else-if="lists.length > 0">
			<my-invoice :datas="lists" @itemClick="itemClick"></my-invoice>
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
					id:0
				}
			}
		},
		onLoad(e) {
			_this = this;
			_this.id=e.id
			_this.get_sc_list()
		},
		onPullDownRefresh() {
			_this.lists=[];
				_this.form.pageIndex=1
				_this.get_sc_list()
		},
		onReachBottom() {
			if(_this.hasMore){
				_this.form.pageIndex++
				_this.get_sc_list()
			}
		},
		methods: {
			async get_sc_list() {
				_this.form.type = this.identity
				_this.form.id = this.id
				const data = await _this.$post('port/invoiceList', _this.form)
				if (data.code == 200) {
					_this.lists.push(...data.result.list)
					_this.hasMore = data.result.list.length >= _this.form.pageSize
					setTimeout(() => {
						uni.stopPullDownRefresh()
					}, 500)
				} else {
					_this.hasMore = false
				}
				if (_this.load) {
					_this.load = false
				}
			},
			//项目点击
			itemClick(res){
				let {item} = res
				if (item.type == 1) {
					_this.toNext(`/pages/index/detail?id=${item.item_id}`)
				}else{
					_this.toNext(`/pages/talents/detail?id=${item.item_id}`)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		.items{
			padding: 15rpx 15rpx 0 15rpx;
		}
	}
</style>
