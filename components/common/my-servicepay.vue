<template>
	<view class="items-container">
		<view class="zp-item" v-for="(item,index) in datas" :key="index"  >
			<view class="flexitem">
				<view class="zp-item-title" >
				<view class="left" >
					<text>合约名称：{{item.name}}</text>
				</view>
				<view class="center"></view>
				</view><view class="zp-item-title" >
					<view class="left" >
						<text>合约编号：{{item.order_sn}}</text>
					</view>
					<view class="center"></view>
				</view><view class="zp-item-title" >
					<view class="left" >
						<text>已打款笔数：{{item.ydkpay_count}}笔</text>
					</view>
					<view class="center"></view>
				</view><view class="zp-item-title" >
					<view class="left" >
						<text>已打款金额：{{item.ydkpay_countprice}}元</text>
					</view>
					<view class="center"></view>
				</view>
			</view>
			<view>
				<button size="mini" @click="itemClick(item.id,item.name)">查看合同详情</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-items",
		props:{
			datas:{
				type:Array,
				default:() => []
			},
			showBot:{
				type:Boolean,
				default:false
			},
			showTime:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			
			itemClick(id,name){
				let param = {
					id,
					name
				}
				this.$emit('itemClick',param)
			},
			 previewImage(index) {
				 console.log(index)
			      uni.previewImage({
			        current: index, // 当前显示图片索引
			        urls: [index] // 需要预览的图片http链接列表
			      });
			    },
			getFullUrl(url){
				if(url.indexOf('http://')!=-1 || url.indexOf('https://')!=-1){
					return url;
				}
				return `${this.baseUrl}/${url}`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.items-container{
		.zp-item{
		padding: 35rpx;
			margin-bottom: 16rpx;
			background: #fff;
			border-radius: 16rpx;
			display: flex;
			justify-content: space-between;
			    align-items: center;
			>view{
				&:not(:first-child){
					display: flex;
					flex-wrap: wrap;
					margin-top: 20rpx;
				}
			}
				button{
					padding: 0;
					width: 190rpx;
					height: 58rpx;
					line-height: 58rpx;
					border-radius: 30rpx;
					color: #fff;
					background: $theme-color;
					font-size: 24rpx;
				}
			&-title{
				display: flex;
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
						font-size: 28rpx;
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
					text{
						color: #7A7A7A;
						font-size: 26rpx;
						&:not(:last-child){
							margin-right: 6rpx;
						}
					}
					.time-text{
						
					}
				}
			}
			&-bot-btns{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left{
					display: flex;
					align-items: center;
					.left-icon{
						width: 32rpx;
						margin-right: 10rpx;
					}
					text{
						font-size: 26rpx;
					}
				}
				.blue-text{
					color: #2F94FF;
				}
				.success-text{
					color: #12A70B;
				}
				.theme-text{
					color: #02AAAB;
				}
				.red-text{
					color: #E92129;
				}
				.yellow-text{
					color: #FF9900;
				}
				.right{
					display: flex;
					button{
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 8rpx;
						width: 116rpx;
						padding: 0;
						line-height: 52rpx;
						&:not(:last-child){
							margin-right: 14rpx;
						}
						&.theme-btn{
							background: #02AAAB;
							color: #fff;
						}
						&.red-btn{
							background: #FFF6F6;
							border: 2rpx solid #F03D37;
							color: #F03D37;
						}
						&.ty-btn{
							background: #FFF9F1;
							border: 2rpx solid #FF9900;
							color: #FF9900;
						}
						&.qy-btn{
							background: #F5FFF5;
							color: #12A70B;
							border: 2rpx solid #12A70B;
						}
						.btn-icon{
							width: 32rpx;
							margin-right: 6rpx;
						}
						text{
							font-size: 26rpx;
						}
					}
				}
			}
		}
	}
</style>