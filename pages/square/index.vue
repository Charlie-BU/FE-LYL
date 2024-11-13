<template>
	<div class="app">
		<u-tabs style="position: relative; bottom: 4rpx;" :list="tabbar_list" bg-color=null
			active-color="#1abfc0" is-scroll="true" :current="current" @change="change">
		</u-tabs>
		<!-- <div style="display: flex;">
			<u-search class="search_bar" v-model="search_post" bg-color="#ffffff" :show-action="false" placeholder="输入"></u-search>
			<button class="cu-btn btn" @click="search">查找</button>
		</div> -->
		<section class="section">
			<div class="boxList flex">
				<div class="left" @click="image_operation('https://tjtt-assets.oss-cn-shanghai.aliyuncs.com/pictures/avatars/unlogined.png')">
					<img v-if="Liyilian.avatar_url" class="lIcon" :src="Liyilian.avatar_url" alt="AVATAR" />
					<img v-else class="lIcon" src="https://tjtt-assets.oss-cn-shanghai.aliyuncs.com/pictures/avatars/unlogined.png" alt="" />
				</div>
				<div class="right" style="font-weight: bold;">
					<div class="text1" style="color: #0081ff; display: flex; white-space: nowrap;">Liyilian.name&nbsp;&nbsp;&nbsp;&nbsp;<div class="text3">Email: Liyilian.email</div></div>
					<div class="text1" style="color: #f37b1d; display: flex; white-space: nowrap;">Liyilian.name&nbsp;&nbsp;&nbsp;&nbsp;<div class="text3">Email: Liyilian.email</div></div>
					<div class="text2">Liyilian.department | Liyilian.job</div>
					<div class="text2">Liyilian.property</div>
					<div class="text3 flex" style="margin-top: 25rpx;">
						<div class="time">
							简介：Liyilian.description
						</div>
					</div>
				</div>
			</div>
		</section>			
	</div>
</template>

<script>
	import { fetch_data } from '../../utils/ajax_request.js'
	export default {
		data() {
			return {
				user: "",
				message: "",
				search_post: "",
				posts: [],
				tabbar_list: [{
						name: "全部",
					},
					{
						name: "推荐",
					},
					{
						name: "同城",
					},
				],
				current: 0,
			}
		},
		onLoad() {
			// login_check(user => {
			// 	this.user = user;
			// });
			// if (!this.user) {
			// 	wx.showToast({
			// 		title: "请登录",
			// 		icon: "none",
			// 		duration: 1500,
			// 	});
			// 	setTimeout(() => {
			// 		uni.reLaunch({
			// 			url: '/pages/login/login',
			// 		})
			// 	}, 1000);
			// };
			// wx.showToast({
			// 	title: '加载中',
			// 	icon: 'loading',
			// 	duration: 100000,
			// });
			// fetch_data("POST", "get_Chinese_posts", null, "application", res => {
			// 	this.posts = res.data.posts;
			// 	wx.hideToast();
			// });
		},
		methods: {
			onInput(e) {
				this.search_post = e.target.value
			},
			
			back() {
				uni.navigateBack({
					delta: 1
				});
			},

			// search() {
			// 	this.current = 4;
			// 	wx.showToast({
			// 		title: '加载中',
			// 		icon: 'loading',
			// 		duration: 100000,
			// 	});
			// 	let data = {"search_post": this.search_post};
			// 	fetch_data("POST", "find_post_by_name", data, "application", res => {
			// 		this.posts = res.data.posts;
			// 		wx.hideToast();
			// 	});
			// },
			
			// change(index) {
			// 	this.current = index; 			// 按钮切换状态
			// 	if (index == 0) {
			// 		wx.showToast({
			// 			title: '加载中',
			// 			icon: 'loading',
			// 			duration: 100000,
			// 		});
			// 		fetch_data("POST", "get_Chinese_posts", null, "application", res => {
			// 			this.posts = res.data.posts;
			// 			wx.hideToast();
			// 		});
			// 	} else if (index == 1) {
			// 		wx.showToast({
			// 			title: '加载中',
			// 			icon: 'loading',
			// 			duration: 100000,
			// 		});
			// 		fetch_data("POST", "get_foreign_posts", null, "application", res => {
			// 			this.posts = res.data.posts;
			// 			wx.hideToast();
			// 		});
			// 	} else if (index == 2) {
			// 		wx.showToast({
			// 			title: '加载中',
			// 			icon: 'loading',
			// 			duration: 100000,
			// 		});
			// 		fetch_data("POST", "get_male_posts", null, "application", res => {
			// 			this.posts = res.data.posts;
			// 			wx.hideToast();
			// 		});
			// 	} else if (index == 3) {
			// 		wx.showToast({
			// 			title: '加载中',
			// 			icon: 'loading',
			// 			duration: 100000,
			// 		});
			// 		fetch_data("POST", "get_female_posts", null, "application", res => {
			// 			this.posts = res.data.posts;
			// 			wx.hideToast();
			// 		});
			// 	} else if (index == 4) {
			// 		wx.showToast({
			// 			title: '加载中',
			// 			icon: 'loading',
			// 			duration: 100000,
			// 		});
			// 		fetch_data("POST", "get_posts", null, "application", res => {
			// 			this.posts = res.data.posts;
			// 			wx.hideToast();
			// 		});
			// 	};
			// },
			
			image_operation(image_url) {
				wx.previewImage({
					urls: [image_url],
					current: image_url,
				});
			},
			
			// anecdote(post) {
			// 	if (!post.anecdote) {
			// 		wx.showToast({
			// 			title: "该运动员暂未完善轶闻趣事",
			// 			icon: "none",
			// 			duration: 1000,
			// 		});
			// 		return;
			// 	}
			// 	wx.showModal({
			// 		title: post.name + '的轶闻趣事',
			// 		content: post.anecdote,
			// 		showCancel: false,
			// 		confirmText: "退出",
			// 	})
			// },
			
			// comment(post) {
			// 	if (!post.comment) {
			// 		wx.showToast({
			// 			title: "该运动员暂未完善人物评价",
			// 			icon: "none",
			// 			duration: 1000,
			// 		});
			// 		return;
			// 	}
			// 	wx.showModal({
			// 		title: post.name + '的人物评价',
			// 		content: post.comment,
			// 		showCancel: false,
			// 		confirmText: "退出",
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.scroll {
		height: 90vh;
	}

	.search_bar {
		width: 540rpx;
		margin: 15rpx 20rpx;
	}
	
	.box {
		box-sizing: border-box;
		padding: 40rpx 20rpx;
		background-color: white;
		margin-top: 8rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;

		.btn {
			margin-left: 20rpx;
		}

		.mon {
			margin-top: 20rpx;
			text-align: right;
			font-weight: 600;
			font-size: 28rpx;
			color: #333333;
			line-height: 40rpx;

			.q {
				font-size: 38rpx;
			}
		}

		.time {
			margin-top: 20rpx;
			box-sizing: box-sizing;
			padding: 20rpx;
			background: #fff3eb;
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			font-weight: 500;
			font-size: 24rpx;
			color: #000000;
			line-height: 30rpx;
			text-align: justify;
		}
		
		.time2 {
			margin-top: 20rpx;
			box-sizing: box-sizing;
			padding: 20rpx;
			background: #ebebeb;
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			font-weight: 500;
			font-size: 24rpx;
			color: #000000;
			line-height: 30rpx;
			text-align: justify;
		}
		
		.time3 {
			margin-top: 20rpx;
			box-sizing: box-sizing;
			padding: 20rpx;
			background: #f2c7ff;
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			font-weight: 500;
			font-size: 24rpx;
			color: #000000;
			line-height: 30rpx;
			text-align: justify;
		}

		.l {
			font-weight: 400;
			font-size: 28rpx;
			color: #666666;
			line-height: 24rpx;
			margin-left: 10rpx;
		}

		.r {
			font-weight: 600;
			font-size: 28rpx;
			color: #f25c07;
			line-height: 28rpx;
			margin-right: 20rpx;
		}

		.bc {
			border-radius: 12rpx 12rpx 12rpx 12rpx;

			.text1 {
				margin-top: 4rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: bold;
				font-size: 28rpx;
				color: #282456;
				text-align: left;
				font-style: normal;
				text-transform: none;
			}

			.text2 {
				margin-top: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 600;
				font-size: 26rpx;
				color: black;
				line-height: 10rpx;
				text-align: left;
				font-style: normal;
				text-transform: none;
			}

			.text3 {
				margin-top: 34rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: #666666;
				line-height: 15rpx;
				text-align: left;
				font-style: normal;
				text-transform: none;
			}

			.right {
				width: 54%;
			}

			.left {
				width: 42%;

				.bcImg {
				    border-radius: 20rpx;
				    width: 100%;
				    height: 116.67px;
				}
			}

			margin-top: 30rpx;
			background-color: white;
			box-sizing: box-sizing;
			padding: 18rpx 0rpx;
		}
	}

	.app {
		box-sizing: border-box;
		padding: 20rpx;
		background: linear-gradient(0deg, #efefef 0%, #f6f6f6 25%, #1abfc0 100%);
	}

	.tabA {
		background-color: #1abfc0 !important;
		color: white !important;
	}

	.tabs {
		width: 16%;
		text-align: center;
		font-weight: 400;
		font-size: 24rpx !important;
		color: #999999;
		background-color: red;
		box-sizing: border-box;
		padding: 5rpx 20rpx;
		background: #ffffff;
		border-radius: 40rpx 40rpx 40rpx 40rpx;
	}
	
	.head {
		position: relative;
		
		.headTitle {
			font-weight: 600;
			font-size: 35rpx;
			color: #212121;
			line-height: 36rpx;
			position: absolute;
			text-align: center;
			width: 100%;
			top: 100rpx;
			z-index: 999;
			position: fixed;
		}
	}
	
	.section {
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		margin-top: 20rpx;
		.cu-btn {
			margin-right: 20rpx;
		}
	
		.boxList {
			margin-top: 6rpx;
			box-sizing: border-box;
			padding: 30rpx 20rpx;
			padding-top: 40rpx;
			border-bottom: 1px solid #f2f2f2;
	
			.left {
				width: 15%;
			}
	
			.right {
				.quan {
					margin-right: 4rpx;
					border-radius: 50%;
					background: #d9d9d9;
					width: 28rpx;
					height: 28rpx;
					display: inline-block;
					position: relative;
					top: 4rpx;
	
				}
	
				.text1 {
					font-weight: bold;
					font-size: 32rpx;
					color: #333333;
					line-height: 35rpx;
				}
	
				.text2 {
					margin-top: 28rpx;
					font-weight: bold;
					font-size: 28rpx;
					color: black;
					line-height: 22rpx;
				}
	
				.text3 {
					font-weight: 500;
					font-size: 26rpx;
					color: #999999;
					line-height: 38rpx;
					text-align: justify;
				}
	
				width: 83%;
			}
	
			.lIcon {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
		}
	}
	
	.phb {
		.yjfk {
			font-size: 28rpx;
			color: #333333;
			line-height: 28rpx;
		}
	
		box-sizing: border-box;
		padding: 30rpx;
		background-color: white;
		margin-top: 35rpx;
		background: #FEF2DA;
		border-radius: 14rpx;
	
		.jf {
			font-family: PingFang SC, PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: #282456;
			line-height: 36rpx;
			text-align: left;
			font-style: normal;
			text-transform: none;
		}
	
		.num {
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 48rpx;
			color: #282456;
			line-height: 48rpx;
			text-align: center;
			font-style: normal;
			text-transform: none;
		}
	}
	
	.time {
		margin-top: 10rpx;
		box-sizing: box-sizing;
		padding: 20rpx;
		background: #f2c7ff;
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		font-weight: 500;
		font-size: 24rpx;
		color: #000000;
		line-height: 30rpx;
		text-align: justify;
	}
	
	.headBox {
		background: linear-gradient(135deg, #FEF2DA, #FFD5A4);
		box-sizing: border-box;
		padding: 20rpx;
	}
	
	.topHead {
		margin-top: 50rpx;
	}
	
	.icon {
		margin-right: 30rpx;
		width: 37rpx;
		height: 37rpx;
	}
</style>