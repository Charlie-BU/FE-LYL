<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<block v-else>
			<view class="address-item-container">
				<view v-if="lists.length>0">
					<view class="address-item" v-for="(item,index) in lists" :key="index">
						<view class="address-item-left">
							<view class="address-item-top">
								<text class="text">{{item.consignee}}</text>
								<text class="text">{{item.mobile}}</text>
								<text class="default-text" v-if="item.is_default">默认</text>
								<button v-if="is_cart!=0" size="mini" class="chooseBtn" @click.stop="chooseAddress(item)">选择地址</button>
							</view>
							<view class="address-item-bottom">
								<text>{{item.province+item.city+item.district+item.address}}</text>
							</view>
						</view>
						<view class="address-item-right" @click='toNext(`/pages/my/add-edit-address?id=${item.address_id}`)'>
							<button size="mini">编辑</button>
						</view>
					</view>
					<view :style="{'height':`calc(${safe_bot}px + 100rpx)`}"></view>
				</view>
				<block v-else>
					<view style="height: 300rpx;"></view>
					<view class="empty-container">
						<u-empty text="暂无收货地址" :icon="emptyIcon" />
					</view>
				</block>
			</view>
			<view class="address-fixed">
				<button type="default" class="address-btn" @click='toNext(`/pages/my/add-edit-address`)'>新建收货地址</button>
				<view :style="{'height':safe_bot + 'px'}"></view>
			</view>
		</block>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				is_cart:0,
				safe_bot:10
			}
		},
		onLoad(e) {
			_this = this;
			let sysInfo = uni.getSystemInfoSync();
			_this.safe_bot = sysInfo.safeAreaInsets.bottom == 0 ? 10 : sysInfo.safeAreaInsets.bottom
			if (e.is_cart) {
				_this.is_cart = e.is_cart
			}
		},
		onShow() {
			_this.get_dizhi_list()
		},
		methods: {
			async get_dizhi_list(){
				const data = await _this.$post('port/dizhi_list')
				if (data.code == 200) {
					_this.lists = data.result.list
				} else {
					uni.$u.toast(data.msg)
				}
				if (_this.load) {
					_this.load = false
				}
			},
			chooseAddress(item){
				uni.$emit('chooseAddress',item)
				_this.finish()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		.address-item-container{
			padding: 20rpx 20rpx 0 20rpx;
			.address-item {
				border-radius: $border-radius;
				margin-bottom: 20rpx;
				padding: 20rpx 30rpx;
				@include flex-box(null,null,center);
				background: #FFFFFF;
				.address-item-left {
					flex: 1;
					.address-item-top {
						@include flex-box(null,null,center);
						font-size: 30rpx;
						.text {
							&:nth-child(2){
								margin-left: 10rpx;
							}
						}
						.default-text {
							margin-left: 10rpx;
							background: rgba($bg-btn, 0.2);
							color: $bg-btn;
							border-radius: 6rpx;
							font-size: 24rpx;
							padding: 2rpx 16rpx;
						}
						.chooseBtn{
							line-height: 46rpx;
							padding: 0;
							height: 46rpx;
							width: 140rpx;
							margin:0 0 0 10rpx;
							background: $bg-btn;
							border: none;
							color: #FFFFFF;
						}
					}
					.address-item-bottom {
						margin-top: 20rpx;
						color: $text-2D2D2D;
					}
				}
				.address-item-right{
					button{
						border: 2rpx solid $text-grey;
						background: none;
						width: 90rpx;
						height: 47rpx;
						line-height: 43rpx;
						padding: 0;
						color: $text-7C7C7C;
					}
				}
			}
		}
	}
	.address-fixed {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #fff;
		padding: 20rpx 20rpx 0 20rpx;
		box-sizing: border-box;
	}

	.address-btn {
		height: 80rpx;
		border-radius: 44rpx;
		background: $bg-btn;
		color: #fff;
		font-size: 28rpx;
		line-height: 80rpx;
		font-weight: 300;
	}
</style>
