<template>
	<view class="items-container">
		<view class="zp-item" v-for="(item,index) in 10" :key="index">
			<view class="zp-item-top">
				<image src="../../static/test.jpg" mode="aspectFill" class="left-img"/>
				<view class="right">
					<view class="title-text">济南市互联网开发有限公司</view>
					<view class="zp-item-tab">
						<view class="tab-item">山东-济南</view>
						<view class="tab-item">10-50人</view>
						<view class="tab-item">民营企业</view>
					</view>
				</view>
			</view>
			<view class="zp-item-bot" v-if="showZw">
				<view class="left">2个职位再招</view>
				<view class="right">
					<u-icon name="arrow-right" size="14" color="#888888"></u-icon>
				</view>
			</view>
			<view class="zp-item-bot-look" v-else>
				<view class="left">
					<text class="name-text">马总</text>
					<text>查看了你</text>
				</view>
				<view class="icon-btn">
					<text class="iconfont icon-remove-1-copy"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-qy-items",
		props:{
			datas:{
				type:Array,
				default:() => []
			},
			showZw: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.items-container{
		.zp-item{
			padding:30rpx 20rpx 0 20rpx;
			margin-bottom: 20rpx;
			background: #fff;
			border-radius: 20rpx;
			&-top{
				display: flex;
				flex-wrap: wrap;
				.left-img{
					width: 90rpx;
					height: 90rpx;
					margin-right: 30rpx;
					border-radius: 10rpx;
				}
				.right{
					flex: 1;
					.title-text{
						font-size: 32rpx;
						font-weight: bold;
					}
					.zp-item-tab{
						display: flex;
						flex-wrap: wrap;
						margin-top: 10rpx;
						.tab-item{
							background: #F5F5F6;
							color: #3A3A3A;
							padding: 4rpx 10rpx;
							&:not(:first-child){
								margin-left: 20rpx;
							}
						}
					}
				}
			}
			
			&-bot{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 10rpx;
				height: 90rpx;
				.left{
					font-size: 26rpx;
					color: #3A3A3A;
				}
				.right{
					color: #888888;
				}
			}
			&-bot-look{
				height: 90rpx;
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left{
					text{
						color: #888888;
					}
					.name-text{
						color: #3A3A3A;
						font-size: 26rpx;
						margin-right: 20rpx;
					}
				}
				.icon-btn{
					@include flex-box(row,center,center);
					width: 48rpx;
					height: 48rpx;
					border-radius: 30rpx;
					background: $bg-color;
					text{
						font-size: 24rpx;
						color: $text-grey;
					}
				}
			}
		}
	}
</style>