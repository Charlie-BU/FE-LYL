<template>
	<view class="items-container">
		<view class="zp-item" v-for="(item,index) in datas" :key="index" @click="itemClick(item,1,index)">
			<view class="zp-item-title">
				<view class="left" v-if="item.type == 1">
					<text>{{item.title}}<text v-if="item.star_as_business" class="score">{{item.star_as_business[0]}}</text></text>
				</view>
				<view class="left" v-else>
					<image :src="getFullUrl(item.user.head_pic)" class="left-img" mode="aspectFit" />
					<!-- <text>{{item.user.user_name}}</text> -->
					<text>{{item.user.user_name}}<text v-if="item.star_as_elite" class="score">{{item.star_as_elite[0]}}</text></text>
				</view>
				<view class="right">{{item.salary + item.salary_unit}}</view>
			</view>
			<view class="zp-item-tab">
				<view class="tab-item" v-for="(item2,index2) in item.arr" :key="index2">{{item2}}</view>
			</view>
			<view class="zp-item-bot">
				<view class="left">
					<view class="name-title" v-if="item.type == 1">{{item.user.qy_name}}</view>
					<view class="name-title" v-else>{{item.user.user_name}}</view>
				</view>
				<view class="right">
					<text v-if="showTime" class="time-text">16:30</text>
					<block v-else>
						<text v-for="(item3,index3) in item.citys" :key="index3">{{item3}}</text>
					</block>
				</view>
			</view>
			<view class="zp-item-bot-btns" v-if="showBot">
				<view class="left" v-if="item.status == -1">
					<image src="@/static/index/check-wait.png" mode="widthFix" class="left-icon" />
					<text class="blue-text">待审核</text>
				</view>
				<view class="left" v-if="item.status == 1">
					<image src="@/static/index/check-pass-theme.png" mode="widthFix" class="left-icon" />
					<text class="theme-text">已通过</text>
				</view>
				<view class="left" v-if="item.status == 2">
					<image src="@/static/index/bohui.png" mode="widthFix" class="left-icon" />
					<text class="red-text">已驳回</text>
				</view>
				<view class="left" v-if="item.status == 3">
					<image src="@/static/my/qiyong.png" mode="widthFix" class="left-icon" />
					<text class="success-text">启用中</text>
				</view>
				<view class="left" v-if="item.status == 4">
					<image src="@/static/index/yitingyong.png" mode="widthFix" class="left-icon" />
					<text class="yellow-text">已停用</text>
				</view>
				<view class="right">
					<block v-if="item.status == -1">
						<button size="mini" class="theme-btn" @click.stop="itemClick(item,2,index)">
							<image src="@/static/index/check-pass-white.png" mode="widthFix" class="btn-icon" />
							<text>通过</text>
						</button>
						<button size="mini" class="red-btn" @click.stop="itemClick(item,3,index)">
							<image src="@/static/index/bohui.png" mode="widthFix" class="btn-icon" />
							<text>驳回</text>
						</button>
					</block>
					<block v-if="item.status == 3">
						<button size="mini" class="ty-btn" @click.stop="itemClick(item,5,index)">
							<image src="@/static/my/ty-btn.png" mode="widthFix" class="btn-icon" />
							<text>停用</text>
						</button>
					</block>
					<block v-if="item.status == 1 || item.status == 4">
						<button size="mini" class="qy-btn" @click.stop="itemClick(item,4,index)">
							<image src="@/static/index/qy-icon.png" mode="widthFix" class="btn-icon" />
							<text>启用</text>
						</button>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-items",
		props: {
			datas: {
				type: Array,
				default: () => []
			},
			showBot: {
				type: Boolean,
				default: false
			},
			showTime: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {};
		},
		methods: {
			itemClick(item, type, index) {
				let param = {
					type,
					index,
					item
				}
				this.$emit('itemClick', param)
			},
			getFullUrl(url) {
				if (url.indexOf('http://') != -1 || url.indexOf('https://') != -1) {
					return url;
				}
				return `${this.baseUrl}/${url}`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.items-container {
		.zp-item {
			padding: 30rpx 22rpx;
			margin-bottom: 16rpx;
			background: #fff;
			border-radius: 16rpx;

			>view {
				&:not(:first-child) {
					display: flex;
					flex-wrap: wrap;
					margin-top: 20rpx;
				}
			}

			&-title {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					display: flex;
					align-items: center;

					.left-img {
						width: 63rpx;
						height: 63rpx;
						border-radius: 50%;
						margin-right: 12rpx;
					}

					.score {
						font-size: 30rpx;
						margin-left: 20rpx;
						font-weight: 800;
						color: gold;
						white-space: nowrap;
					}

					text {
						font-size: 34rpx;
						font-weight: 500;
					}
				}

				.right {
					color: #02ABAB;
					font-size: 30rpx;
					font-weight: bold;
					flex-shrink: 0;
				}
			}

			&-tab {
				.tab-item {
					background: #EFEFEF;
					color: #5E5E5E;
					padding: 4rpx 12rpx;
					border-radius: 6rpx;
					font-size: 24rpx;

					&:not(:first-child) {
						margin-left: 10rpx;
					}
				}
			}

			&-bot {
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;

					.name-title {
						color: #292929;
					}
				}

				.right {
					text {
						color: #7A7A7A;
						font-size: 26rpx;

						&:not(:last-child) {
							margin-right: 6rpx;
						}
					}

					.time-text {}
				}
			}

			&-bot-btns {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;

					.left-icon {
						width: 32rpx;
						margin-right: 10rpx;
					}

					text {
						font-size: 26rpx;
					}
				}

				.blue-text {
					color: #2F94FF;
				}

				.success-text {
					color: #12A70B;
				}

				.theme-text {
					color: #02AAAB;
				}

				.red-text {
					color: #E92129;
				}

				.yellow-text {
					color: #FF9900;
				}

				.right {
					display: flex;

					button {
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 8rpx;
						width: 116rpx;
						padding: 0;
						line-height: 52rpx;

						&:not(:last-child) {
							margin-right: 14rpx;
						}

						&.theme-btn {
							background: #02AAAB;
							color: #fff;
						}

						&.red-btn {
							background: #FFF6F6;
							border: 2rpx solid #F03D37;
							color: #F03D37;
						}

						&.ty-btn {
							background: #FFF9F1;
							border: 2rpx solid #FF9900;
							color: #FF9900;
						}

						&.qy-btn {
							background: #F5FFF5;
							color: #12A70B;
							border: 2rpx solid #12A70B;
						}

						.btn-icon {
							width: 32rpx;
							margin-right: 6rpx;
						}

						text {
							font-size: 26rpx;
						}
					}
				}
			}
		}
	}
</style>