<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<block v-else>
		<view class="tabs-info">
			<u-tabs
			lineColor="#15B3B4"
			:list="list1" 
			:scrollable="false"
			 :activeStyle="{
				 color: '#000000',
				 fontWeight: 'bold',
				 transform: 'scale(1.05)',
				 fontSize:'28rpx'
			 }"
			 :inactiveStyle="{
				 color: '#5B5B5B',
				 transform: 'scale(1)',
				 fontSize:'28rpx'
			 }"
			@click="clickTab"/>
		</view>
		<scroll-view scroll-y="true" class="scroll" @scrolltolower="getMore()">
			<view class="items"  v-if="lists.length > 0">
				<view class="item" v-for="(item1,index1) in lists" :key="index1">
					<view class="item-title">{{item1.title}}</view>
					<view class="item-rows">
						<view class="item-row" v-for="(item,index) in item1.child" :key="index" @click="itemClick(item)">
							<view class="item-row-title">
								<view class="left" v-if="item.type == 1">
									<text>{{item.title}}</text>
								</view>
								<view class="left" v-else>
									<image v-if="item.user.head_pic" :src="getFullUrl(item.user.head_pic)" class="left-img" mode="aspectFit"/>
									<text>{{item.user.user_name}}</text>
								</view>
								<view class="center"></view>
								<view class="right">{{item.salary + item.salary_unit}}</view>
							</view>
							<view class="item-row-tab">
								<view class="tab-item" v-for="(item2,index2) in item.arr" :key="index2">{{item2}}</view>
							</view>
							<view class="item-row-bot">
								<view class="left">
									<view class="name-title" v-if="item.type == 1">{{item.user.qy_name}}</view>
									<view class="name-title" v-else>{{item.user.user_name}}</view>
								</view>
								<view class="right">
									<text>{{item.add_time_str}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore class="load-more" :status="hasMore?'loading':'nomore'" :nomoreText="noMore" />
			</view>
			<view class="empty-container" v-else>
				<u-empty text="暂无相关数据" :icon="emptyIcon" />
			</view>
		</scroll-view>
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
					type:1
				},
				list1: [{
					name: '项目沟通',
					type:1
				}, {
					name: '人才沟通',
					type:2
				}],
			}
		},
		onLoad(e) {
			_this = this;
			_this.get_gt_list()
		},
		methods: {
			clickTab(item) {
				if (_this.form.type != item.type) {
					_this.form.type = item.type
					_this.form.pageIndex = 1
					_this.lists = []
					_this.get_gt_list()
				}
			},
			async get_gt_list() {
				const data = await _this.$post('port/items_gt_list', _this.form)
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
			getMore(){
				if(_this.hasMore){
					_this.form.pageIndex++
					_this.get_gt_list()
				}
			},
			//项目点击
			itemClick(item){
				console.log('项目点击',item);
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
		overflow: hidden;
		.tabs-info{
			background: #fff;
			height: 88rpx;
		}
		.scroll{
			height: calc(100% - 88rpx);
			.items{
				padding: 0 15rpx;
				.item{
					.item-title{
						line-height: 62rpx;
					}
					.item-rows{
						.item-row{
							padding:30rpx 22rpx;
							&:not(:last-child){
								margin-bottom: 16rpx;
							}
							background: #fff;
							border-radius: 16rpx;
							>view{
								&:not(:first-child){
									display: flex;
									flex-wrap: wrap;
									margin-top: 20rpx;
								}
							}
							&-title{
								display: flex;
								justify-content: space-between;
								.left{
									display: flex;
									align-items: center;
									.left-img{
										width: 63rpx;
										height: 63rpx;
										border-radius: 50%;
										margin-right: 12rpx;
									}
									text{
										font-size: 34rpx;
										font-weight: 500;
									}
								}
								.center{
									width: 160rpx;
								}
								.right{
									color: #02ABAB;
									font-size: 30rpx;
									font-weight: bold;
									flex-shrink: 0;
								}
							}
							&-tab{
								.tab-item{
									background: #EFEFEF;
									color: #5E5E5E;
									padding: 4rpx 12rpx;
									border-radius:6rpx;
									font-size:24rpx;
									&:not(:first-child){
										margin-left: 10rpx;
									}
								}
							}
							&-bot{
								align-items: center;
								justify-content: space-between;
								.left{
									display: flex;
									align-items: center;
									.name-title{
										color: #292929;
									}
								}
								.right{
									color: #7A7A7A;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
