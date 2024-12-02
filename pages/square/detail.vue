<template>
	<div class="container">
		<section class="section">
			<div class="boxList flex">
				<div style="display: flex;">
					<div>
						<img v-if="post.poster_pic" class="lIcon" :src="baseUrl+post.poster_pic" alt="AVATAR" />
					</div>
					<div class="poster-name">
						<span v-if="post.poster_realname" style="display: block;">{{post.poster_realname}}</span>
						<span v-else style="display: block;">{{post.poster_nickname}}</span>
					</div>
				</div>
				<div class="right">
					<div v-if="post.title" class="post-content" style="font-weight: bold; font-size: 30rpx;">
						{{post.title}}
					</div>
					<div v-if="post.content" class="post-content">{{post.content}}</div>

					<div v-if="post.post_image" class="post-content">
						<div v-if="post.post_image.length>=1 && post.post_image.length<=3" class="image-grid"
							style="height: 200rpx;">
							<div v-for="(image, i) in post.post_image" :key="i" class="image-item">
								<img v-if="image && image.length>=6" class="post-images" :src="image"
									@click="image_operation(image)" />
							</div>
						</div>
						<div v-else-if="post.post_image.length>=4 && post.post_image.length<=6" class="image-grid"
							style="height: 400rpx;">
							<div v-for="(image, i) in post.post_image" :key="i" class="image-item">
								<img v-if="image && image.length>=6" class="post-images" :src="image"
									@click="image_operation(image)" />
							</div>
						</div>
						<div v-else-if="post.post_image.length>=7 && post.post_image.length<=9" class="image-grid"
							style="height: 600rpx;">
							<div v-for="(image, i) in post.post_image" :key="i" class="image-item">
								<img v-if="image && image.length>=6" class="post-images" :src="image"
									@click="image_operation(image)" />
							</div>
						</div>
					</div>
				</div>
				<div style="display: flex;">
					<p v-if="formatted_time" class="post-time">发布于{{formatted_time}}</p>
					<p v-if="(post.poster_id === user_id) || identity === 3" class="post-time"
						style="color: red; margin-left: 20rpx; z-index: 999;" @click="delete_post(post.id)">删除</p>
				</div>

				<div style="text-align: end; margin-top: 30rpx;">
					<div style="display: inline-block; text-align: center; margin-right: 30rpx; z-index: 999;"
						@click="like_post_or_cancel(post)">
						<img v-if="liked" class="bottom-icon" src="../../static/square/like-after.jpg" />
						<img v-else class="bottom-icon" src="../../static/square/like-before.jpg" />
						<p style="font-size: 22rpx; color: #999999; margin: 0;">{{post.likes}}</p>
					</div>
					<div style="display: inline-block; text-align: center; z-index: 999;" @click="send_comment(post)">
						<img class="bottom-icon" src="../../static/square/talk.jpg" />
						<p style="font-size: 22rpx; color: #999999; margin: 0;">{{comment_length}}</p>
					</div>
				</div>
				<div style="margin-top: 30rpx;">
					<div style="font-size: 30rpx; font-weight: bold;">全部评论</div>
					<div v-if="post.comment_length !== 0" class="comment-section">
						<div v-for="(comment, ind) in comments" :key="ind" class="comment-item">
							<div @click="reply_comment(comment)">
								<div class="comment-header flex">
									<img v-if="comment.sender_pic" class="comment-avatar"
										:src="baseUrl+comment.sender_pic" alt="User Avatar" />
									<div class="comment-user-info">
										<span v-if="comment.sender_realname"
											class="comment-username">{{comment.sender_realname}}<span v-if="comment.comment_sender" style="margin-left: 13rpx;"> > {{comment.comment_sender}}</span></span>
										<span v-else class="comment-username">{{comment.sender_nickname}}</span>
										<span class="comment-time">{{comment.time}}</span>
									</div>
								</div>
								<div class="comment-content">
									{{comment.content}}
								</div>
								<div class="comment-actions flex">
									<div v-if="!comment.comment_sender" @click.stop="like_comment_or_cancel(comment)" class="comment-action">
										<img v-if="comment.liked" class="action-icon"
											src="../../static/square/like-after.jpg" />
										<img v-else class="action-icon" src="../../static/square/like-before.jpg" />
										<span>{{comment.likes}}</span>
									</div>
									<div v-if="(comment.sender_id === user_id && !comment.comment_sender) || identity === 3" @click.stop="delete_comment(comment.id, true)" class="comment-action">
										<span style="color: red;">删除</span>
									</div>
									<div v-else-if="(comment.sender_id === user_id && comment.comment_sender) || identity === 3" @click.stop="delete_comment(comment.id, false)" class="comment-action">
										<span style="color: red;">删除</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import {
		fetch_data
	} from '../../utils/ajax_request.js'
	import * as utils from '../../utils/utils.js'

	export default {
		data() {
			return {
				id: 0,
				post: "",
				comments: [],
				comment_length: 0,
				liked: false,
			}
		},
		onLoad(options) {
			wx.showToast({
				title: "加载中...",
				icon: "loading",
				duration: 100000,
			});
			this.id = options.id;
			if (!this.id) {
				wx.showToast({
					title: "帖子不存在",
					icon: "none",
					duration: 700,
				});
				setTimeout(() => {
					uni.reLaunch({
						url: "/pages/square/index",
					})
				}, 700);
			}
			this.liked = JSON.parse(options.liked);
			fetch_data("POST", "get_this_post", {
				"id": this.id
			}, "application", (res) => {
				this.post = res.data.post;
				fetch_data("POST", "get_post_comments_and_replies", {
					"post_id": this.id
				}, "application", (res) => {
					this.comments = res.data.comments.map(comment => ({
						...comment,
						time: utils.format_time(comment.time),
						liked: false,
					}));
					this.comment_length = res.data.comment_length;
					wx.hideToast();
				});
			});
		},
		computed: {
			formatted_time() {
				return this.post.time ? utils.format_time(this.post.time) : "";
			},
		},
		methods: {
			image_operation(image_url) {
				wx.previewImage({
					urls: [image_url],
					current: image_url,
				});
			},

			like_post_or_cancel(post) {
				if (!this.liked) {
					fetch_data("POST", "like_post", {
						'post_id': post.id
					}, "application", res => {
						this.liked = true;
						++post.likes;
					})
				} else {
					fetch_data("POST", "cancel_like_post", {
						'post_id': post.id
					}, "application", res => {
						this.liked = false;
						--post.likes;
					})
				}
			},

			send_comment(post) {
				wx.showModal({
					title: "评论",
					editable: true,
					placeholderText: "请发表您的评论",
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
							wx.showToast({
								title: "请稍后...",
								icon: "loading",
								duration: 10000,
							});
							const data = {
								"my_id": this.user_id,
								"post_id": post.id,
								"content": res.content,
							}
							fetch_data("POST", "send_comment", data, "application", res => {
								++post.comment_length;
								wx.showToast({
									title: "评论成功",
									icon: "none",
									duration: 700,
								});
								fetch_data("POST", "get_post_comments_and_replies", {
									"post_id": this.id
								}, "application", (res) => {
									this.comments = res.data.comments.map(comment => ({
										...comment,
										time: utils.format_time(comment.time),
									}));
								});
							})
						}
					}
				})
			},

			delete_post(post_id) {
				wx.showModal({
					title: '删除帖子',
					content: '确定删除该帖子',
					success: res => {
						if (res.confirm) {
							wx.showToast({
								title: "删除中...",
								icon: "loading",
								duration: 10000,
							});
							const data = {
								"my_id": this.user_id,
								"post_id": post_id,
							}
							fetch_data("POST", "delete_post", data, "application", res => {
								if (res.data.status === 200) {
									wx.showToast({
										title: "删除成功",
										icon: "none",
										duration: 700,
									});
									setTimeout(() => {
										uni.reLaunch({
											url: "/pages/square/index",
										})
									}, 700);
								}
							})
						}
					}
				})
			},

			like_comment_or_cancel(comment) {
				if (!comment.liked) {
					fetch_data("POST", "like_comment", {
						'comment_id': comment.id
					}, "application", res => {
						comment.liked = true;
						++comment.likes;
					})
				} else {
					fetch_data("POST", "cancel_like_comment", {
						'comment_id': comment.id
					}, "application", res => {
						comment.liked = false;
						--comment.likes;
					})
				}
			},

			delete_comment(comment_id, is_comment) {
				wx.showModal({
					title: '删除评论',
					content: '确定删除该评论',
					success: res => {
						if (res.confirm) {
							wx.showToast({
								title: "删除中...",
								icon: "loading",
								duration: 10000,
							});
							const data = {
								"my_id": this.user_id,
								"comment_id": comment_id,
							}
							const url = is_comment ? "delete_comment" : "delete_comment_reply";
							fetch_data("POST", url, data, "application", res => {
								if (res.data.status === 200) {
									wx.showToast({
										title: "删除成功",
										icon: "none",
										duration: 700,
									});
								}
								fetch_data("POST", "get_post_comments_and_replies", {
									"post_id": this.id
								}, "application", (res) => {
									this.comments = res.data.comments.map(comment => ({
										...comment,
										time: utils.format_time(comment.time),
									}));
								});
							})
						}
					}
				})
			},
			
			reply_comment(comment) {
				if (comment.comment_sender) {
					return;
				}
				wx.showModal({
					title: comment.content,
					editable: true,
					placeholderText: "请发表您的回复",
					confirmText: "回复",
					success: res => {
						if (res.confirm) {
							if (!res.content) {
								wx.showToast({
									title: "请输入回复内容",
									icon: "none",
									duration: 700,
								});
								return;
							}
							wx.showToast({
								title: "请稍后...",
								icon: "loading",
								duration: 10000,
							});
							const data = {
								"my_id": this.user_id,
								"comment_id": comment.id,
								"content": res.content,
							}
							fetch_data("POST", "send_comment_reply", data, "application", res => {
								wx.showToast({
									title: "回复成功",
									icon: "none",
									duration: 700,
								});
								// TODO
								fetch_data("POST", "get_post_comments_and_replies", {
									"post_id": this.id
								}, "application", (res) => {
									this.comments = res.data.comments.map(comment => ({
										...comment,
										time: utils.format_time(comment.time),
									}));
								});
							})
						}
					}
				})
			}
		}
	}
		
</script>


<style lang="scss" scoped>
	.container {
		height: 100%;
		background: #fff;
		position: relative;
		box-sizing: border-box;
	}

	.poster-name {
		white-space: nowrap;
		font-weight: bold;
		font-size: 30rpx;
		margin: 20rpx;
	}

	.post-time {
		margin-top: 20rpx;
		font-size: 25rpx;
		font-weight: normal;
		color: #999999;
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

			.comment-section {
				margin-top: 20rpx;
				padding: 20rpx;
				background-color: #f9f9f9;
				border-radius: 25rpx;
			}

			.comment-item {
				padding: 20rpx 0;
				border-bottom: 1px solid #eaeaea;
			}

			.comment-item:last-child {
				border-bottom: none;
			}

			.comment-header {
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;
			}

			.comment-avatar {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				margin-right: 10rpx;
			}

			.comment-user-info {
				display: flex;
				flex-direction: column;
			}

			.comment-username {
				font-size: 26rpx;
				font-weight: bold;
				color: #333;
			}

			.comment-time {
				font-size: 22rpx;
				color: #999;
				margin-top: 4rpx;
			}

			.comment-content {
				margin-top: 20rpx;
				font-size: 28rpx;
				color: #666;
				line-height: 1.5;
			}

			.comment-actions {
				display: flex;
				align-items: center;
				margin: 20rpx 10rpx;
			}

			.comment-action {
				display: flex;
				align-items: center;
				margin-right: 30rpx;
				font-size: 24rpx;
				color: #999;
				cursor: pointer;
				z-index: 999;
			}

			.action-icon {
				width: 30rpx;
				height: 30rpx;
				margin-right: 5rpx;
			}
		}
	}
</style>