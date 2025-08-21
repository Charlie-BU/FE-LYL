<template>
	<view class="popup-container">
		<u-popup :show="showPopup" @close="close" round="10rpx" overlayOpacity="0.3" :closeOnClickOverlay="maskClick">
			<view class="popup-info">
				<view class="popup-info-title">
					<text>{{ title }}</text>
					<view class="iconfont icon-shanchu1" @click="btnClose()"></view>
				</view>
				<view class="popup-info-items">
					<view class="item">
						<view class="item-title">薪资要求</view>
						<view class="item-info">
							<view class="item-one act">全部</view>
							<view class="item-one">2000以上</view>
							<view class="item-one">4000以上</view>
							<view class="item-one">6000以上</view>
							<view class="item-one">8000以上</view>
							<view class="item-one">10000以上</view>
						</view>
					</view>
					<view class="item">
						<view class="item-title">公司福利</view>
						<view class="item-info">
							<view class="item-one act">全部</view>
							<view class="item-one">节日福利</view>
							<view class="item-one">六险一金</view>
							<view class="item-one">班车接送</view>
							<view class="item-one">工作餐</view>
							<view class="item-one">年底双薪</view>
							<view class="item-one">周末双休</view>
							<view class="item-one">社保五险</view>
							<view class="item-one">奖励计划</view>
						</view>
					</view>
					<view class="item">
						<view class="item-title">学历要求</view>
						<view class="item-info">
							<view class="item-one act">不限</view>
							<view class="item-one">高中</view>
							<view class="item-one">中专</view>
						</view>
					</view>
				</view>
				<view class="popup-info-bot">
					<button class="left-btn" @click="reset">重置</button>
					<button class="right-btn">确定</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	name: "my-filter",
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
			default: '全部筛选'
		},
		value: {
			type: Array,
			default: () => [0, 0, 0]
		}
	},
	data() {
		return {
			showPopup: this.show,
		};
	},
	watch: {
		show(newVal, oldVal) {
			this.showPopup = newVal
		}
	},
	methods: {
		close(e) {
			this._emit('select', 'mask')
		},
		btnClose() {
			this._emit('select', 'close')
		},
		//点击了重置
		reset() {
			this._emit('select', 'reset')
		},
		confirmClick() {
			this._emit('select', 'confirm')
		},
		_emit(emitName, type) {
			let pickObj = {
				type,
			};
			this.$emit(emitName, pickObj);
		},
	}
}
</script>

<style lang="scss" scoped>
.popup-container {
	.popup-info {
		&-title {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100rpx;
			position: relative;

			text {
				font-size: 34rpx;
				font-weight: bold;
			}

			.iconfont {
				position: absolute;
				right: 20rpx;
				color: #000;
				font-size: 50rpx;
			}
		}

		&-items {
			padding: 0 30rpx 20rpx 30rpx;

			.item {
				.item-title {
					font-size: 30rpx;
					font-weight: bold;
					height: 90rpx;
					line-height: 90rpx;
				}

				.item-info {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					grid-gap: 30rpx 25rpx;

					.item-one {
						border-radius: 40rpx;
						height: 66rpx;
						background: #F5F5F6;
						display: flex;
						align-items: center;
						justify-content: center;
						font-weight: 500;

						&.act {
							background: #E4FDFD;
							color: #15B3B3;
						}
					}
				}
			}
		}

		&-bot {
			padding: 0 30rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			button {
				width: 50%;
				height: 76rpx;
				line-height: 76rpx;
				font-size: 30rpx;
				color: #fff;

				&.left-btn {
					background: linear-gradient(120deg, #fb5757 0%, #f76e60 100%) #fdd5ac;
					border-radius: 40rpx 0 0 40rpx;
				}

				&.right-btn {
					background: linear-gradient(120deg, #15b3b3 0%, #0dcfcf 100%) #fdd5ac;
					border-radius: 0 40rpx 40rpx 0;
				}
			}
		}
	}
}
</style>