<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<block v-else>
			<view class="info">
				<view class="search-top" v-if="false">
					<view class="status-bar" :style="{'height':statusbarH+'px'}"></view>
					<view class="search" :style="{'height':navBarHeight+'px','paddingRight':navRight+'px'}">
						<view class="left" @click="finish">
							<u-icon name="arrow-left" size="18" color="#303030" />
						</view>
						<u-search @search="search" placeholder="搜索类型" :showAction="false" bgColor="#F7F7F7"
							v-model="keywords" />
					</view>
				</view>
				<view class="center">
					<scroll-view scroll-y="true" class="left-scroll">
						<view class="left-items">
							<view class="left-item" :class="{'act':item.type==left_type}"
								v-for="(item,index) in list1" @click="changeLeft(item)" :key="index">
								{{item.name}}</view>
						</view>
					</scroll-view>
					<scroll-view scroll-y="true" class="right-scroll" :scroll-into-view="`item-${left_type}`"
						:scroll-with-animation="true">
						<view class="right-items">
							<view class="right-item" v-for="(item,index) in list1" :key="index">
								<view class="item-title" :id="`item-${item.type}`">
									<text class="left-text">{{item.name}}</text>
									<view class="right" v-if="false">
										<text>收起</text>
										<u-icon name="arrow-up" size="12" color="#A4A4A4" />
									</view>
								</view>
								<view class="inner-items">
									<view class="inner-item"
										:class="{'act': is_filter == 1 ? item.arr.includes(item1.id) : arr.includes(item1.id)}"
										@click="changeItem(item1,item)"
										v-for="(item1,index1) in item.items" :key="index1">
										{{item1.name}}</view>
								</view>
							</view>
							<view style="height: 20rpx;"></view>
						</view>
					</scroll-view>
				</view>
				<view class="bottom">
					<view class="submit-top">
						<view class="left">
							已选<text>{{arr.length}}</text>/{{max>0?max:'-'}}
						</view>
						<scroll-view scroll-x class="scroll">
							<view class="scroll-inner">
								<view class="scroll-inner-item" v-for="(item,index) in brr"
									:key="index">
									<text>{{item}}</text>
									<u-icon @click="delItem(index)" name="close" size="12"
										color="#02AAAB" />
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="bottom-btns">
						<button class="clear-btn" :disabled="brr.length==0" @click="clear">清除</button>
						<button class="confirm-btn" @click="confirm">确认</button>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				//导航栏高度
				navBarHeight: 44,
				statusbarH: 10,
				navRight: 10,
				keywords: '',
				value: '',
				left_type: 0,
				pageIndex: 1,
				pageSize: 20,
				list1: [],
				max: 0,
				arr: [],
				brr: [],
				crr: [],
				kf_type: 0,
				is_filter: 0,
				ids: '',
				add: false,
				from: 0,
				type: -1
			}
		},
		onLoad(e) {
			_this = this;
			if (e) {
				for (let item in e) {
					_this[item] = e[item]
				}
			}
			let sysInfo = uni.getSystemInfoSync();
			_this.statusbarH = sysInfo.statusBarHeight
			// #ifdef MP-WEIXIN
			// 胶囊信息
			let menu = uni.getMenuButtonBoundingClientRect();
			// 导航栏高度
			let navBarHeight = menu.height + 10;
			this.navBarHeight = navBarHeight
			_this.navRight = menu.width + 10
			// #endif
			this.get_tags_list()
		},
		onReady() {
			if (this.is_filter == 1) {
				switch (this.identity) {
					case 1:
						uni.setNavigationBarTitle({
							title: '筛选项目'
						})
						break;
					case 2:
						uni.setNavigationBarTitle({
							title: '筛选人才'
						})
						break;
					case 3:
						if (this.kf_type != 0) {
							if (this.kf_type == 1) {
								uni.setNavigationBarTitle({
									title: '筛选项目'
								})
							} else {
								uni.setNavigationBarTitle({
									title: '筛选人才'
								})
							}
						}
						break;
					default:
						break;
				}
			} else {
				switch (Number(this.type)) {
					case 1:
						uni.setNavigationBarTitle({
							title: '项目类型'
						})
						break;
					case 2:
						uni.setNavigationBarTitle({
							title: '职能标签'
						})
						break;
					case 3:
						uni.setNavigationBarTitle({
							title: '擅长技能'
						})
						break;
					case 4:
						uni.setNavigationBarTitle({
							title: '所在城市'
						})
						break;
					case 5:
						uni.setNavigationBarTitle({
							title: '工作属性'
						})
						break;
					default:
						break;
				}
			}
		},
		methods: {
			search(value) {
				this.keywords = value
				this.pageIndex = 1
				this.lists = []
				this.get_tags_list()
			},
			changeLeft(item) {
				if (this.left_type == item.type) {
					return
				}
				this.left_type = item.type
			},
			changeItem(item, parent) {
				if (_this.is_filter == 1) {
					if (parent.arr.length >= 3 && parent.arr.indexOf(item.id) == -1) {
						uni.$u.toast(`最多可选择3个标签`)
						return
					}
					if (parent.arr.indexOf(item.id) == -1) {
						parent.arr.push(item.id)
					} else {
						let index = parent.arr.findIndex((res) => {
							return res == item.id
						})
						if (index != -1) {
							parent.arr.splice(index, 1)
						}
					}
				} else {
					if (this.arr.length >= this.max && this.arr.indexOf(item.id) == -1 && this.max > 0) {
						uni.$u.toast(`最多可选择${this.max}个标签`)
						return
					}
				}
				this.doArr(item)
			},
			//清除
			clear() {
				this.arr = []
				this.brr = []
				for (var i = 0; i < _this.list1.length; i++) {
					let item = _this.list1[i]
					if (item.arr.length > 0) {
						item.arr = []
					}
				}
			},
			//点击确定
			confirm() {
				let arr = {
					from: this.from,
				}
				if (this.is_filter == 1) {
					let list = this.list1.filter(item => {
						return item.arr.length > 0
					})
					let map = []
					if (list) {
						map = list.map(res => {
							return {
								key: res.key,
								arr: res.arr,
								type: res.type
							}
						})
					}
					arr.arr = map
				} else {
					arr.arr = this.arr
					arr.brr = this.brr
				}
				uni.$emit('chooseTag', arr)
				this.finish()
			},
			delItem(index) {
				let id = this.arr[index]
				for (var i = 0; i < _this.list1.length; i++) {
					let item = _this.list1[i]
					let index1 = item.arr.indexOf(id)
					if (index1 != -1) {
						item.arr.splice(index1, 1)
						break;
					}
				}
				this.arr.splice(index, 1)
				this.brr.splice(index, 1)
			},
			doArr(item) {
				if (this.arr.indexOf(item.id) == -1) {
					this.arr.push(item.id)
					this.brr.push(item.name)
				} else {
					let index = this.arr.findIndex((res) => {
						return res == item.id
					})
					if (index != -1) {
						this.arr.splice(index, 1)
						this.brr.splice(index, 1)
					}
				}
			},
			//获取工种类型
			async get_tags_list() {
				let params = {
					keywords: this.keywords,
					type: this.type,
					ids: this.ids
				}
				const data = await _this.$post('port/get_tags', params)
				if (data.code == 200) {
					this.list1 = data.result.list
					// this.arr = data.result.arr || []
					// this.brr = data.result.brr || []
					if (this.list1.length > 0) {
						this.left_type = this.list1[0]['type']
						// this.getProfessionClildList()
					}
				} else {
					uni.$u.toast(data.msg)
				}
				if (_this.load) {
					_this.load = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	$theme: #3F8EF3;

	.container {
		height: 100%;
		display: flex;
		flex-direction: column;

		.info {
			height: 100%;
			display: flex;
			flex-direction: column;
		}

		.search-top {
			background: #fff;

			.search {
				flex-shrink: 0;
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				box-sizing: border-box;

				.left {
					margin-right: 10rpx;
				}
			}
		}

		.center {
			flex-grow: 1;
			overflow: hidden;
			display: flex;

			.left-scroll {
				background: #fff;
				width: 30%;
				height: 100%;
				border-right: 2rpx solid $border-color;

				.left-items {
					.left-item {
						position: relative;
						height: 100rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #000;
						box-sizing: border-box;
						font-size: 28rpx;
						font-weight: 500;
					}

					.act {
						color: $theme-color;
						font-weight: bold;

						&::after {
							content: '';
							width: 6rpx;
							height: calc(33%);
							background: $theme-color;
							position: absolute;
							display: block;
							left: 0;
							border-radius: 5rpx;
						}
					}
				}
			}

			.right-scroll {
				width: 70%;
				height: 100%;
				background: #fff;

				.right-items {
					padding: 20rpx 25rpx 0 25rpx;

					.right-item {
						&:not(:last-child) {
							margin-bottom: 25rpx;
						}

						.item-title {
							height: 100rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.left-text {
								font-size: 28rpx;
								font-weight: bold;
								color: #141414;

								&.act {
									color: $theme;
								}
							}

							.right {
								display: flex;
								align-items: center;

								text {
									color: #A4A4A4;
									font-size: 24rpx;
								}
							}
						}

						.inner-items {
							display: grid;
							grid-template-columns: repeat(2, 1fr);
							grid-gap: 20rpx 26rpx;

							.inner-item {
								font-size: 26rpx;
								line-height: 66rpx;
								background: #F6F6F6;
								border-radius: 8rpx;
								text-align: center;
								color: #141414;
								border: 2rpx solid #F6F6F6;
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;

								&.act {
									background: #FFFFFF;
									color: #02AAAB;
									border-color: #02AAAB;
								}
							}
						}
					}
				}
			}
		}

		.bottom {
			flex-shrink: 0;
			padding: 20rpx 30rpx 20rpx 30rpx;
			font-size: 28rpx;
			background: #fff;
			box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.08);

			.submit-top {
				display: flex;

				.left {
					align-self: center;
					font-size: 24rpx;
					margin-right: 20rpx;

					text {
						margin-left: 6rpx;
						color: #02AAAB;
					}
				}

				.scroll {
					flex: 1;
					overflow: hidden;
					white-space: nowrap;

					.scroll-inner {
						.scroll-inner-item {
							display: inline-flex;
							align-items: center;
							background: #F3FDFD;
							border-radius: 8rpx;
							color: #02AAAB;
							height: 48rpx;
							padding: 0 10rpx;

							&:not(:last-child) {
								margin-right: 20rpx;
							}

							text {
								font-size: 24rpx;
								margin-right: 10rpx;
							}
						}
					}
				}
			}

			.bottom-btns {
				margin-top: 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				button {
					margin: 0;
					padding: 0;
					font-size: 28rpx;
					font-weight: bold;
					line-height: 80rpx;
					box-sizing: border-box;
					border-radius: 8rpx;

					&[disabled] {
						background: #C9C9C9;
					}
				}

				.clear-btn {
					width: 30%;
					color: #414141;
					background: #F6F6F6;

					&[disabled] {
						border-color: #C9C9C9;
						color: #fff;
					}
				}

				.confirm-btn {
					width: 65%;
					color: #fff;
					background: $theme-color;
				}
			}
		}
	}
</style>