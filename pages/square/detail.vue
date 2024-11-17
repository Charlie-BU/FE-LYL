<template>
	<div class="container">
		<section class="section">
			<div class="boxList flex">
				<div style="display: flex;">
					<div>
						<img v-if="post.poster_pic" class="lIcon" :src="baseUrl+post.poster_pic"
							alt="AVATAR" />
					</div>
					<div class="poster-name">
						<span v-if="post.poster_realname"
							style="display: block;">{{post.poster_realname}}</span>
						<span v-else style="display: block;">{{post.poster_nickname}}</span>
						<span v-if="post.time" class="post-time"
							style="display: block;">{{post.time}}</span>
					</div>
				</div>
				<div class="right">
					<div v-if="post.title" class="post-content" style="font-weight: bold;">
						{{post.title}}
					</div>
					<div v-if="post.content" class="post-content">{{post.content}}</div>
					<div>浏览数</div>
					<div v-if="post.post_image" class="post-content">
						<div v-if="post.post_image.length>=1 && post.post_image.length<=3"
							class="image-grid" style="height: 200rpx;">
							<div v-for="(image, i) in post.post_image" :key="i" class="image-item">
								<img v-if="image && image.length>=6" class="post-images"
									:src="image" @click="image_operation(image)" />
							</div>
						</div>
						<div v-else-if="post.post_image.length>=4 && post.post_image.length<=6"
							class="image-grid" style="height: 400rpx;">
							<div v-for="(image, i) in post.post_image" :key="i" class="image-item">
								<img v-if="image && image.length>=6" class="post-images"
									:src="image" @click="image_operation(image)" />
							</div>
						</div>
						<div v-else-if="post.post_image.length>=7 && post.post_image.length<=9"
							class="image-grid" style="height: 600rpx;">
							<div v-for="(image, i) in post.post_image" :key="i" class="image-item">
								<img v-if="image && image.length>=6" class="post-images"
									:src="image" @click="image_operation(image)" />
							</div>
						</div>
					</div>
				</div>
				<div style="display: flex; justify-content: space-between; margin-top: 30rpx;">
				    <p style="font-size: 20px; color: #000000;font-weight: bold;padding-top: 7px;">评论120</p>
				    <div style="display: flex; align-items: center; border-radius: 25%; padding: 10px; background-color: #f0f0f0;">
				        <div style="margin-right: 10rpx;">
				            <img class="bottom-icon" src="../../static/square/talk.jpg" />
				        </div>
						<div style="margin-bottom: 5px;">|</div>
				        <div style="display: flex;">
				            <img style="margin-left: 10rpx;" class="bottom-icon" src="../../static/square/like-after.jpg" />
				            <p style="font-size: 22rpx; color: #999999; margin: 0;margin-top: 5rpx;margin-left: 5rpx;">{{post.likes}}</p>
				        </div>
				    </div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import { fetch_data } from '../../utils/ajax_request.js'
	import * as utils from '../../utils/utils.js'
	
	export default {
		onLoad(option) {
			this.id = option.id;
			fetch_data("POST", "get_special_post", {"id": this.id}, "application", (res) => {
				this.post = res.data.post;
			});
		},
		onShow() {
			
		},
		data() {
			return {
				id: 0,
				post: null,
			}
		},
		methods: {
			
		},
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