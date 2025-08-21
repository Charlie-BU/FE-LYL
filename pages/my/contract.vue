<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<block v-else>
		<view class="items" v-if="lists.length > 0">
			<my-contract :datas="lists" @itemClick="itemClick"></my-contract>
		</view>
		<view class="empty-container" v-else>
			<u-empty text="暂无相关数据" :icon="emptyIcon" />
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
					// pageIndex:1,
					// pageSize:20,
					identity:0,
				}
			}
		},
		onLoad(e) {
			_this = this;
			if (e.identity) {
				_this.form.identity = e.identity
			}
			_this.get_sc_list()
		},
		onPullDownRefresh() {
			_this.get_sc_list()
		},
		// onReachBottom() {
		// 	if(_this.hasMore){
		// 		_this.form.pageIndex++
		// 		_this.get_sc_list()
		// 	}
		// },
		methods: {
			async get_sc_list() {
				const data = await _this.$post('port/contractList', _this.form)
				// if (data.code == 200) {
					_this.lists=data.result.list
					// _this.hasMore = data.result.list.length >= _this.form.pageSize
				// } else {
				// 	_this.hasMore = false
				// }
				// if (_this.load) {
				// 	_this.load = false
				// }
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 500)
				if (_this.load) {
					_this.load = false
				}
			},
			//项目点击
			itemClick(res){
				let {item} = res
				// console.log(`/pages/my/contract-detail?id=${item.id}&name=${item.name}`);return;
				_this.toNext(`/pages/my/contract-detail?id=${item.id}&name=${item.name}`)
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
