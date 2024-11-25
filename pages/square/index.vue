<template>
	<div class="app">
		<div style="display: flex;">
			<view style="width: 75%;">
				<u-tabs lineColor="#15B3B4" :list="tabbar_list" :scrollable="false" :current="current" @change="change"
					:activeStyle="{
				 color: '#000000',
				 fontWeight: 'bold',
				 transform: 'scale(1.05)',
				 fontSize:'28rpx'}" :inactiveStyle="{
				 color: '#5B5B5B',
				 transform: 'scale(1)',
				 fontSize:'28rpx' }"></u-tabs>
			</view>
			<view>
				<button class="post-button" @click="send_post">
					发布
				</button>
			</view>
		</div>
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
						<div style="margin-left: 230rpx;" @click.stop="star_post_or_unstar(post)">
							<uni-icons v-if="post.starred" type="star-filled" color="gold" size="30" />
							<uni-icons v-else-if="!post.starred && identity === 3" type="star" color="gold" size="30" />
						</div>
					</div>
					<div class="right">
						<div v-if="post.title" class="post-content" style="font-weight: bold;">
							{{post.title}}
						</div>
						<div v-if="post.content" class="post-content">{{post.content}}</div>

						<div v-if="post.post_image" class="post-content">
							<div v-if="post.post_image.length>=1 && post.post_image.length<=3" class="image-grid"
								style="height: 200rpx;">
								<div v-for="(image, i) in post.post_image" :key="i" class="image-item">
									<img v-if="image && image.length>=6" class="post-images" :src="image"
										@click.stop="image_operation(image)" />
								</div>
							</div>
							<div v-else-if="post.post_image.length>=4 && post.post_image.length<=6" class="image-grid"
								style="height: 400rpx;">
								<div v-for="(image, i) in post.post_image" :key="i" class="image-item">
									<img v-if="image && image.length>=6" class="post-images" :src="image"
										@click.stop="image_operation(image)" />
								</div>
							</div>
							<div v-else-if="post.post_image.length>=7 && post.post_image.length<=9" class="image-grid"
								style="height: 600rpx;">
								<div v-for="(image, i) in post.post_image" :key="i" class="image-item">
									<img v-if="image && image.length>=6" class="post-images" :src="image"
										@click.stop="image_operation(image)" />
								</div>
							</div>
						</div>
						<div style="text-align: end; margin-top: 30rpx;">
							<div style="display: inline-block; text-align: center; margin-right: 30rpx;"
								@click.stop="like_post_or_cancel(post)">
								<img v-if="post.liked" class="bottom-icon" src="../../static/square/like-after.jpg" />
								<img v-else class="bottom-icon" src="../../static/square/like-before.jpg" />
								<p style="font-size: 22rpx; color: #999999; margin: 0;">{{post.likes}}
								</p>
							</div>
							<div style="display: inline-block; text-align: center;" @click.stop="send_comment(post)">
								<img class="bottom-icon" src="../../static/square/talk.jpg" />
								<p style="font-size: 22rpx; color: #999999; margin: 0;">
									{{post.comment_length}}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>

		<!-- 模态弹框 -->
		<div v-if="showPostModal" class="modal-overlay">
			<div class="modal">
				<h3 class="modal-title">发布帖子</h3>
				<div class="form-group">
					<label for="post-title">标题</label>
					<input id="post-title" v-model="new_post.title" type="text" placeholder="请输入标题"
						class="input-field" />
				</div>
				<div class="form-group">
					<label for="post-content">内容</label>
					<textarea id="post-content" v-model="new_post.content" placeholder="说点什么吧..."
						class="textarea-field"></textarea>
				</div>
				<div class="form-group">
					<label for="post-images">上传图片</label>
					<div class="image-preview">
						<img v-for="(image, index) in preview_images" :key="index" :src="image" class="preview-image"
							@click="image_operation(image)" />
						<button v-if="preview_images.length === 0" @click="choose_image"
							class="upload-button">+</button>
						<button v-else @click="choose_image" class="upload-button">×</button>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-cancel" @click="closeModal">取消</button>
					<button class="btn btn-submit" @click="submit_post">发布</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		fetch_data,
		upload_file
	} from '../../utils/ajax_request.js'
	import * as utils from '../../utils/utils.js'
	export default {
		data() {
			return {
				user: "",
				posts: [],
				tabbar_list: [{
						name: "推荐",
					},
					{
						name: "全部",
					},
					{
						name: "同城",
					},
				],
				current: 0,
				showPostModal: false,
				new_post: {
					title: '',
					content: '',
					images: [],
				},
				preview_images: []
			}
		},
		onShow() {
			wx.showToast({
				title: "加载中...",
				icon: "loading",
				duration: 100000,
			});
			fetch_data("POST", "get_all_posts", null, "application", (res) => {
				this.posts = res.data.posts.map(post => ({
					...post,
					time: utils.format_time(post.time),
					liked: false,
				}));
				wx.hideToast();
			})
		},
		methods: {
			onInput(e) {
				this.new_post.title = e.target.value;
				this.new_post.content = e.target.value;
			},

			back() {
				uni.navigateBack({
					delta: 1
				});
			},

			// 关闭模态弹框
			closeModal() {
				this.showPostModal = false;
				this.new_post = {
					title: '',
					content: '',
					images: [],
				};
				this.preview_images = [];
			},

			choose_image(sourceType = 'album') {
				uni.chooseImage({
					sizeType: ['original', 'compressed'],
					sourceType: [sourceType],
					success: (res) => {
						this.new_post.images = res.tempFilePaths;
						this.preview_images = res.tempFilePaths;
					}
				});
			},

			upload_images() {
				if (!this.new_post.images || this.new_post.images.length === 0) {
					return Promise.resolve([]); // 如果没有图片，直接返回空数组
				}

				const uploadPromises = this.new_post.images.map((image_path) => {
					return new Promise((resolve, reject) => {
						upload_file("upload_image_to_OSS", image_path, 'image',
							"application", (res) => {
								let response;
								try {
									response = JSON.parse(res.data);
								} catch (error) {
									console.error("JSON解析错误:", error);
									wx.showToast({
										title: "图片上传失败，请稍后重试",
										icon: "none",
										duration: 700,
									});
									return reject("JSON解析错误");
								}

								if (res.statusCode === 200) {
									resolve(response.url); // 上传成功返回 URL
								} else {
									wx.showToast({
										title: "图片上传失败，请稍后重试",
										icon: "none",
										duration: 700,
									});
									reject("上传失败");
								}
							});
					});
				});

				return Promise.all(uploadPromises); // 等待所有上传完成
			},

			async submit_post() {
				if (!this.new_post.title || !this.new_post.content) {
					wx.showToast({
						title: "请填写标题和内容",
						icon: "none",
						duration: 700,
					});
					return;
				}
				try {
					wx.showToast({
						title: "发布中...",
						icon: "loading",
						duration: 10000,
					});
					// 等待图片上传完成
					const image_urls = await this.upload_images();
					// 图片上传成功后关闭加载提示
					wx.hideToast();
					// 准备提交数据
					const data = {
						"my_id": this.user_id,
						"title": this.new_post.title,
						"content": this.new_post.content,
						"image_urls": image_urls,
					};

					// 提交数据
					fetch_data("POST", "send_post", data, "application", (res) => {
						if (res.data.status === 200) {
							wx.showToast({
								title: "发布成功",
								icon: "none",
								duration: 700,
							});
							// 刷新帖子列表
							fetch_data("POST", "get_all_posts", null, "application", (
								res) => {
								this.posts = res.data.posts.map(post => ({
									...post,
									time: utils.format_time(post.time),
									liked: false,
								}));
							});
							// 关闭模态框
							this.closeModal();
						} else {
							console.log(res);
						}
					});

				} catch (error) {
					wx.showToast({
						title: "发布失败，请稍后重试",
						icon: "none",
						duration: 700,
					});
					console.error("提交失败:", error);
				}
			},


			// 打开模态弹框
			send_post() {
				this.showPostModal = true;
			},

			image_operation(image_url) {
				wx.previewImage({
					urls: [image_url],
					current: image_url,
				});
			},

			star_post_or_unstar(post) {
				if (this.identity !== 3) {
					return;
				}
				const content = post.starred ? "取消推荐该帖子？" : "确认推荐该帖子？";
				const confirm_text = post.starred ? "取消推荐" : "推荐";
				const success_msg = post.starred ? "取消推荐成功" : "推荐成功";
				wx.showModal({
					title: "推荐帖子",
					content: content,
					confirmText: confirm_text,
					success: res => {
						if (res.confirm) {
							wx.showToast({
								title: "请稍后...",
								icon: "loading",
								duration: 10000,
							});
							let data = {
								"my_id": this.user_id,
								"post_id": post.id,
							}
							fetch_data("POST", "star_post_or_unstar", data, "application", res => {
								if (res.data.status === 200) {
									wx.showToast({
										title: success_msg,
										icon: "none",
										duration: 700,
									});
									// 刷新帖子列表
									fetch_data("POST", "get_all_posts", null, "application", (res) => {
										this.posts = res.data.posts.map(post => ({
											...post,
											time: utils.format_time(post.time),
											liked: false,
										}));
									});
								}
							})
						}
					}
				})
			},

			like_post_or_cancel(post) {
				if (!post.liked) {
					fetch_data("POST", "like_post", {
						'post_id': post.id
					}, "application", res => {
						post.liked = true;
						++post.likes;
					})
				} else {
					fetch_data("POST", "cancel_like_post", {
						'post_id': post.id
					}, "application", res => {
						post.liked = false;
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
							let data = {
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

	.post-button {
		margin-left: 30rpx;
		width: 100rpx;
		padding: 10rpx 20rpx;
		background: linear-gradient(to right, #7F7FD5, #86A8E7, #91EAE4);
		color: #fff;
		border: none;
		border-radius: 20rpx;
		font-size: 26rpx;
		font-weight: bold;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
		transition: all 0.3s;
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

	/* 背景遮罩 */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	/* 弹框容器 */
	.modal {
		width: 80%;
		background: #ffffff;
		border-radius: 16px;
		padding: 20px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		animation: scaleIn 0.3s ease;
	}

	/* 动画效果 */
	@keyframes scaleIn {
		from {
			transform: scale(0.9);
			opacity: 0;
		}

		to {
			transform: scale(1);
			opacity: 1;
		}
	}

	/* 标题 */
	.modal-title {
		font-size: 23px;
		font-weight: bold;
		color: #333;
		text-align: center;
		margin-bottom: 20px;
	}

	/* 表单项 */
	.form-group {
		margin-bottom: 15px;
	}

	label {
		font-size: 16px;
		color: #555;
		display: block;
		margin-bottom: 5px;
	}

	.input-field,
	.textarea-field {
		width: 93%;
		padding: 10px;
		font-size: 16px;
		border: 1px solid #ddd;
		border-radius: 8px;
	}

	.textarea-field {
		height: 80px;
		resize: none;
	}

	.form-group {
		margin-bottom: 20px;
	}

	.upload-button {
		width: 60px;
		height: 60px;
		border: 2px dashed #ccc;
		border-radius: 4px;
		font-size: 32px;
		color: #999;
		background-color: #f9f9f9;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.upload-status {
		font-size: 16px;
		color: #666;
	}

	.input-file {
		display: none;
	}

	.image-preview {
		display: flex;
		flex-wrap: wrap;
		margin-top: 10px;
		gap: 10px;
		align-items: center;
	}

	.preview-image {
		width: 60px;
		height: 60px;
		object-fit: cover;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}


	/* 按钮 */
	.modal-footer {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
		padding: 60rpx;
		height: 70rpx;
	}

	.btn {
		padding: 10px 20px;
		border: none;
		border-radius: 8px;
		font-size: 16px;
		cursor: pointer;
	}

	.btn-cancel {
		background: #f5f5f5;
		color: #333;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn-submit {
		background: linear-gradient(to right, #7F7FD5, #86A8E7, #91EAE4);
		color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>