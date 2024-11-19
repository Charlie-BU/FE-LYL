<template>
	<div class="app">
		<view :class="{'border':form.type != ''}">
			<u-tabs lineColor="#15B3B4" :list="tabbar_list" :scrollable="false" :current="current"
				@change="change" :activeStyle="{
			 color: '#000000',
			 fontWeight: 'bold',
			 transform: 'scale(1.05)',
			 fontSize:'28rpx'}" :inactiveStyle="{
			 color: '#5B5B5B',
			 transform: 'scale(1)',
			 fontSize:'28rpx' }"></u-tabs>
		</view>
		<!-- <div style="display: flex;">
			<u-search class="search_bar" v-model="search_post" bg-color="#ffffff" :show-action="false" placeholder="输入"></u-search>
			<button class="cu-btn btn" @click="search">查找</button>
		</div> -->

		<div v-for="(post, index) in posts" :key="index">

			<section @click="go_to_detail(post.id, post.liked)" class="section">
				<div class="boxList flex">
					<div style="display: flex;">
						<div>
							<img v-if="post.poster_pic" class="lIcon" :src="baseUrl+post.poster_pic" alt="AVATAR" />
						</div>
						<div class="poster-name">
							<span v-if="post.poster_realname" style="display: block;">{{post.poster_realname}}</span>
							<span v-else style="display: block;">{{post.poster_nickname}}</span>
							<span v-if="post.time" class="post-time" style="display: block;">{{post.time}}</span>
						</div>
					</div>
					<div class="right">
						<div v-if="post.title" class="post-content" style="font-weight: bold;">
							{{post.title}}
						</div>
						<div v-if="post.content" class="post-content">{{post.content}}</div>
			
						<div v-if="post.post_image" class="post-content">
							<div v-if="post.post_image.length>=1 && post.post_image.length<=3" class="image-grid" style="height: 200rpx;">
								<div v-for="(image, i) in post.post_image" :key="i" class="image-item">
									<img v-if="image && image.length>=6" class="post-images" :src="image" @click.stop="image_operation(image)" />
								</div>
							</div>
							<div v-else-if="post.post_image.length>=4 && post.post_image.length<=6" class="image-grid" style="height: 400rpx;">
								<div v-for="(image, i) in post.post_image" :key="i" class="image-item">
									<img v-if="image && image.length>=6" class="post-images" :src="image" @click.stop="image_operation(image)" />
								</div>
							</div>
							<div v-else-if="post.post_image.length>=7 && post.post_image.length<=9" class="image-grid" style="height: 600rpx;">
								<div v-for="(image, i) in post.post_image" :key="i" class="image-item">
									<img v-if="image && image.length>=6" class="post-images" :src="image" @click.stop="image_operation(image)" />
								</div>
							</div>
						</div>
						<div style="text-align: end; margin-top: 30rpx;">
							<div style="display: inline-block; text-align: center; margin-right: 30rpx;" @click.stop="like_post_or_cancel(post)">
								<img v-if="post.liked" class="bottom-icon" src="../../static/square/like-after.jpg" />
								<img v-else class="bottom-icon" src="../../static/square/like-before.jpg" />
								<p style="font-size: 22rpx; color: #999999; margin: 0;">{{post.likes}}</p>
							</div>
							<div style="display: inline-block; text-align: center;" @click.stop="send_comment(post)">
								<img class="bottom-icon" src="../../static/square/talk.jpg" />
								<p style="font-size: 22rpx; color: #999999; margin: 0;">{{post.comment_length}}</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	import { fetch_data } from '../../utils/ajax_request.js'
	import * as utils from '../../utils/utils.js'
	export default {
		data() {
			return {
				user: "",
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
		onShow() {
			fetch_data("POST", "get_all_posts", null, "application", (res) => {
				this.posts = res.data.posts.map(post => ({
					...post,
					time: utils.format_time(post.time),
					liked: false,
				}));
			})
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

			image_operation(image_url) {
				wx.previewImage({
					urls: [image_url],
					current: image_url,
				});
			},

			like_post_or_cancel(post) {
				if (!post.liked) {
					fetch_data("POST", "like_post", {'post_id': post.id}, "application", res=>{
						post.liked = true;
						++post.likes;
					})
				} else {
					fetch_data("POST", "cancel_like_post", {'post_id': post.id}, "application", res=>{
						post.liked = false;
						--post.likes;
					})
				}
				
			},
			
			send_comment(post) {
				wx.showModal({
					title: "评论",
					editable: true,
					placeHolderText: "请发表您的评论",
					confirmText: "评论",
					success: res => {
						if (res.confirm) {
							if (!res.content) {
								wx.showToast({
									title: "请输入评论内容",
									icon: "none",
									duration: 700,
								});
								return;
							}
							let data = {
								"my_id": this.user_id,
								"post_id": post.id,
								"content": res.content,
							}
							fetch_data("POST", "send_comment", data, "application", res=>{
								++post.comment_length;
								wx.showToast({
									title: "评论成功",
									icon: "none",
									duration: 700,
								});
							})
						}
					}
				})
			},
			go_to_detail(id, liked) {
				uni.navigateTo({
					url: "/pages/square/detail?id=" + id + "&liked=" + liked,
				})
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

			
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		background: linear-gradient(0deg, #efefef 0%, #f6f6f6 25%, #1abfc0 100%);
	}

	.poster-name {
		white-space: nowrap;
		margin-left: 10rpx;
		font-weight: bold;

		.post-time {
			margin-top: 10rpx;
			font-size: 25rpx;
			font-weight: normal;
			color: #999999;
		}
	}

	.post-content {
		margin-top: 34rpx;
		font-family: PingFang SC, PingFang SC;
		font-size: 26rpx;
		color: black;
		text-align: left;
		font-style: normal;
		text-transform: none;
	}

	.section {
		background: #ffffff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		margin: 20rpx 20rpx;

		.boxList {
			margin-top: 6rpx;
			box-sizing: border-box;
			padding: 30rpx 20rpx;
			padding-top: 40rpx;
			border-bottom: 1px solid #f2f2f2;

			.left {
				width: 20%;
			}

			.right {
				.text1 {
					font-size: 32rpx;
					color: #333333;
					line-height: 35rpx;
				}

				.text3 {
					font-weight: 500;
					font-size: 26rpx;
					color: #999999;
					line-height: 38rpx;
					text-align: justify;
				}

				margin-left: 20rpx;
				width: 90%;
			}

			.lIcon {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}

			.bottom-icon {
				width: 35rpx;
				height: 35rpx;
			}

			.image-grid {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: 10rpx;
			}

			.image-item {
				position: relative;
				width: 100%;
				padding-top: 100%;
				overflow: hidden;
			}

			.post-images {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: 5rpx;
			}


		}
	}
</style>