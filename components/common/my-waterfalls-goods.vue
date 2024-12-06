<template>
	<view>
		<custom-waterfalls-flow ref="waterfallsFlowRef" :value="list" :column="column" imageKey="goods_img"
			:columnSpace="1.5" :listStyle="{'box-shadow':'0px 0px 8rpx rgba(0,0,0,0.2)'}" @imageClick="wapperClick" @wapperClick="wapperClick">
			<!-- #ifdef MP-WEIXIN -->
			<view class="goods-item" v-for="(item, index) in list" :key="index" slot="slot{{index}}">
				<text class="goods_name">{{item.goods_name}}</text>
				<view class="goods-item-bot">
					<view class="goods-item-bot-left">
						<view class="goods_price">
							<text>￥</text>
							<text class="last">{{item.goods_price}}</text>
						</view>
						<view class="market_price" v-if="showMarket">￥{{item.market_price}}</view>
					</view>
					<image src="@/static/common/join-cart.png" @click.stop="add_cart(item.goods_id)" v-if="showCart"
						class="join_cart" mode="widthFix" />
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<template v-slot:default="item">
				<view class="goods-item">
					<text class="goods_name">{{item.goods_name}}</text>
					<view class="goods-item-bot">
						<view class="goods-item-bot-left">
							<view class="goods_price">
								<text>￥</text>
								<text class="last">{{item.goods_price}}</text>
							</view>
							<view class="market_price" v-if="showMarket">￥{{item.market_price}}</view>
						</view>
						<image src="@/static/common/join-cart.png" @click.stop="add_cart(item.goods_id)" v-if="showCart"
							class="join_cart" mode="widthFix" />
					</view>
				</view>
			</template>
			<!-- #endif -->
		</custom-waterfalls-flow>
	</view>
</template>

<script>
	export default {
		name: "my-waterfalls-goods",
		props: {
			list: {
				type: Array,
				default: () => []
			},
			showMarket: {
				type: Boolean,
				default: false
			},
			showCart: {
				type: Boolean,
				default: false
			},
			autoJump: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				// #ifdef VUE3
				column: ref(2),
				// #endif
				// #ifdef VUE2
				column: 2,
				// #endif
			};
		},
		methods: {
			wapperClick(item) {
				if(this.autoJump){
					this.$u.route({
						url: 'pages/goods/goods-detail',
						params: {
							id: item.goods_id
						}
					})
				}else{
					this.$emit('wapperClick',item)
				}
			},
			//加入购物车
			async add_cart(id) {
				const params = {
					goods_id: id,
					goods_num: 1
				}
				const data = await this.$u.api.add_cart(params)
				if (data.code == 200) {
					this.$u.toast(data.msg)
				} else {
					this.$u.toast(data.msg)
				}
			}
		},
		watch: {
			list(newValue) {
				this.$refs.waterfallsFlowRef.refresh();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-item {
		margin: 0 0 20rpx 0;
		display: flex;
		flex-direction: column;
		/* height: 474rpx; */
		background: #fff;
		-webkit-transition: all .2s linear;
		/*渐变效果*/
		transition: all .2s linear;
		border-radius: 15rpx;
		overflow: hidden;
		position: relative;

		.goods_name {
			font-weight: 500;
			font-size: 28rpx;
			padding: 0 15rpx;
			margin: 10rpx 0 0 0;
		}

		.goods-item-bot {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 15rpx;

			.goods-item-bot-left {
				.goods_price {
					margin: 10rpx 0 0 0;
					display: flex;
					align-items: center;
					text{
						color: #F94A36;
					}
					.last{
						font-size: 32rpx;
					}
				}

				.market_price {
					font-size: 22rpx;
					text-decoration: line-through;
				}
			}

			.join_cart {
				width: 50rpx;
			}
		}
	}
</style>
