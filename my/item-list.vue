<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<view class="items" v-else-if="lists.length > 0">
			<my-items :datas="lists" @itemClick="itemClick"></my-items>
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
					uid:0,
					type:1,
					status:3,
				}
			}
		},
		onLoad(e) {
			_this = this;
			if (e.uid) {
				_this.form.uid = e.uid
			}else{
				this.$u.toast('提交参数有误',()=>{
						_this.finish()
					})
				return;
			}
			_this.get_items_list()
		},
		onReachBottom() {
			if(_this.hasMore){
				_this.form.pageIndex++
				_this.get_items_list()
			}
		},
		methods: {
			async get_items_list() {
				const data = await _this.$post('port/get_items_list', _this.form)
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
			//项目点击
			itemClick(res){
				let {item} = res
				if (item.type == 1) {
					_this.toNext(`/pages/index/detail?id=${item.id}`)
				}else{
					_this.toNext(`/pages/talents/detail?id=${item.id}`)
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
