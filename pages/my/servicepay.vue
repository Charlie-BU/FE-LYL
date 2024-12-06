<template>
	<view class="container">
		<view class="configs">
			总收益：{{pay_count}}
		</view>
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<view class="items" v-else-if="lists.length > 0">
			<my-servicepay :datas="lists" @itemClick="itemClick"></my-servicepay>
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
				},
				pay_count:0
			}
		},
		onLoad(e) {
			_this = this;
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
				const data = await _this.$post('port/payList', _this.form)
				if (data.code == 200) {
					_this.lists.push(...data.result.list)
					_this.pay_count=data.result.pay_count
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
				console.log(res)
				uni.navigateTo({
					url: '/pages/my/contract-detail?id='+res.id+'&name='+res.name
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.configs{
			    display: flex;
			    align-items: center;
			    padding: 30rpx;
			    background: #FFF;
			    border-radius: 20rpx;
			    margin-bottom: 20rpx;
				    justify-content: center;
					font-size: 34rpx;
					    font-weight: bold;
		}
		height: 100%;
		.items{
			padding: 15rpx 15rpx 0 15rpx;
		}
	}
</style>
