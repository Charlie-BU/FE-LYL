<template>
	<view class="items-container">
		<view class="zp-item" v-for="(item,index) in 2" :key="index" @click="itemClick(1,item)">
			<view class="zp-item-title">
				<view class="left">商务经理（五险+奖金+节日福利）</view>
				<view class="center"></view>
				<view class="right">6K-1.5W</view>
			</view>
			<view class="zp-item-tab">
				<view class="tab-item">相关专业</view>
				<view class="tab-item">线下办公</view>
				<view class="tab-item">水暖工程师</view>
			</view>
			<view class="zp-item-bot">
				<view class="left">
					<view class="left-item">
						<image src="@/static/my/qiyong.png" mode="widthFix" class="left-icon"/>
						<text class="success-text">启用中</text>
					</view>
					<view class="left-item" @click.stop="itemClick(2,item)">
						<image src="@/static/my/shuaxin.png" mode="widthFix" class="left-icon"/>
						<text class="theme-text">刷新</text>
					</view>
				</view>
				<view class="right">
					<button size="mini" class="theme-btn" @click.stop="itemClick(3,item)">
						<image src="@/static/my/bianji-btn.png" mode="widthFix" class="right-icon"/>
						<text>编辑</text>
					</button>
					<button size="mini" class="ty-btn" @click.stop="itemClick(4,item)">
						<image src="@/static/my/ty-btn.png" mode="widthFix" class="right-icon"/>
						<text>停用</text>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-jl-items",
		props:{
			datas:{
				type:Array,
				default:() => []
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
			itemClick(type,item){
				let param = {
					type,
					item:item
				}
				this.$emit('itemClick',param)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.items-container{
		.zp-item{
			padding:30rpx 22rpx;
			margin-bottom: 16rpx;
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
					font-size: 34rpx;
					font-weight: 500;
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
					.left-item{
						display: flex;
						align-items: center;
						&:last-child{
							margin-top: 26rpx;
						}
						.left-icon{
							width: 34rpx;
						}
						text{
							font-size: 26rpx;
							margin-left: 8rpx;
							&.success-text{
								color: #12A70B;
							}
							&.theme-text{
								color: #02AAAB;
							}
						}
					}
				}
				.right{
					align-self: flex-end;
					button{
						display: inline-flex;
						align-items: center;
						height: 52rpx;
						line-height: 52rpx;
						padding: 0 20rpx;
						border-radius: 8rpx;
						&:not(:last-child){
							margin-right: 14rpx;
						}
						&.theme-btn{
							background: #02AAAB;
							color: #fff;
						}
						&.ty-btn{
							background: #fff9f1;
							color: #FF9900;
							border: 2rpx solid #FF9900;
						}
						.right-icon{
							width: 32rpx;
							margin-right: 8rpx;
						}
					}
				}
			}
		}
	}
</style>