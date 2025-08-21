<template>
	<view class="popup-container">
		<u-popup :show="showPopup" 
		@close="close" 
		round="10rpx" 
		overlayOpacity="0.3"
		:closeOnClickOverlay="maskClick">
			<view class="popup-info">
				<view class="popup-info-title">
					<text>{{ title }}</text>
					<view class="iconfont icon-shanchu1" @click="btnClose()"></view>
				</view>
				<view class="popup-info-items">
					<view class="item-row">
						<view class="row-left">当前简历</view>
						<view class="row-right">程序员</view>
					</view>
					<view class="item-row">
						<view class="row-left">置顶天数</view>
						<view class="row-right">2</view>
					</view>
				</view>
				<view class="popup-info-bot">
					<view class="left">
						<text class="left-text">应付价格：</text>
						<view class="price-text">
							<text>¥</text>
							<text class="money-text">20</text>
						</view>
					</view>
					<button class="right-btn">立即购买</button>
				</view>
				<view style="height: 30rpx;"></view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:"my-zd-item",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			maskClick: {
				type: Boolean,
				default: true
			},
			title: {
				type: String,
				default: '置顶简历'
			},
			value: {
				type: Array,
				default: () => [0,0,0]
			}
		},
		data() {
			return {
				showPopup:this.show,
			};
		},
		watch:{
			show(newVal,oldVal){
				this.showPopup = newVal
			}
		},
		methods:{
			close(e){
				this._emit('select','mask')
			},
			btnClose(e){
				this._emit('select','close')
			},
			//点击了重置
			reset(){
				this._emit('select','reset')
			},
			confirmClick(){
				this._emit('select','confirm')
			},
			_emit(emitName,type) {
				let pickObj = {
					type,
				};
				this.$emit(emitName, pickObj);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.popup-container{
		.popup-info{
			&-title{
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 100rpx;
				position: relative;
				padding: 0 30rpx;
				text{
					font-size: 34rpx;
					font-weight: bold;
				}
				.iconfont{
					color: #000;
					font-size: 50rpx;
				}
			}
			&-items{
				padding: 0 30rpx;
				.item-row{
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #171717;
					.row-left{}
					.row-right{}
				}
			}
			&-bot{
				padding: 0 30rpx;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 10rpx;
				.left{
					display: flex;
					align-items: center;
					.left-text{
						font-size: 34rpx;
						color: #888888;
					}
					.price-text{
						color: #15B3B3;
						.money-text{
							font-size: 48rpx;
							font-weight: bold;
						}
					}
				}
				.right-btn{
					width: 200rpx;
					height: 80rpx;
					line-height: 80rpx;
					font-size: 32rpx;
					color: #fff;
					background: #15B3B3;
					border-radius:10rpx;
				}
			}
		}
	}
</style>