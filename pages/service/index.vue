<template>
	<view class="container">
		<view class="header">
			<view class="header-buttons">
				<button v-if="is_admin" class="add-service-btn" @click="addService">新增服务包</button>
				<button v-if="identity === 2" class="my-purchase-btn" @click="toMyPurchase">我的购买</button>
				<button v-else-if="identity === 1" class="my-purchase-btn" @click="toMyPurchase">我的接单</button>
			</view>
		</view>
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<view class="service-list" v-else-if="lists">
			<view class="service-item" v-for="(item, index) in lists" :key="index">
				<view class="service-item-header">
					<view class="service-item-title">{{ item.name }}</view>
					<view class="operation-buttons">
						<button v-if="is_admin" class="edit-btn" @click="editService(item)">编辑</button>
						<button v-if="is_admin" class="delete-btn" @click="deleteService(item)">删除</button>
					</view>
				</view>
				<view class="service-item-price">
					<text class="price-symbol">¥</text>
					<text class="price-value">{{ item.price }}</text>
				</view>
				<view class="service-item-desc">{{ item.description }}</view>
				<view class="service-item-features">
					<view class="feature-item" v-for="(feature, fIndex) in item.features" :key="fIndex">
						<u-icon name="checkmark-circle" color="#02ABAB" size="28"></u-icon>
						<text>{{ feature }}</text>
					</view>
				</view>
				<button v-if="identity === 2" class="buy-btn" @click="buyService(item)">立即购买</button>
				<button v-if="identity === 3" class="buy-btn" @click="assignTalent(item)">分配人才</button>
			</view>
			<u-loadmore class="load-more" :status="hasMore ? 'loading' : 'nomore'" :nomoreText="noMore" />
		</view>
		<view class="empty-container" v-else>
			<u-empty text="暂无相关数据" mode="list" />
		</view>

		<!-- 新增/编辑服务包弹窗 -->
		<view class="modal" v-if="showModal">
			<view class="modal-content">
				<view class="modal-header">
					<text class="modal-title">{{ isEdit ? '编辑服务包' : '新增服务包' }}</text>
					<text class="modal-close" @click="closeModal">×</text>
				</view>
				<view class="modal-body">
					<view class="form-item">
						<text class="label">服务包名称</text>
						<input type="text" v-model="formData.name" placeholder="请输入服务包名称" />
					</view>
					<view class="form-item">
						<text class="label">价格</text>
						<input type="number" v-model="formData.price" placeholder="请输入价格" />
					</view>
					<view class="form-item">
						<text class="label">简介</text>
						<textarea v-model="formData.description" placeholder="请输入简介" />
					</view>
					<view class="form-item">
						<text class="label">特色</text>
						<view class="features-list">
							<view class="feature-input" v-for="(feature, index) in formData.features" :key="index">
								<input type="text" v-model="formData.features[index]" placeholder="请输入特色" />
								<text class="delete-feature" @click="deleteFeature(index)"
									v-if="formData.features.length > 1">×</text>
							</view>
						</view>
						<view class="add-feature" @click="addFeature">+ 添加特色</view>
					</view>
				</view>
				<view class="modal-footer">
					<button class="cancel-btn" @click="closeModal">取消</button>
					<button class="confirm-btn" @click="confirmModal">确定</button>
				</view>
			</view>
		</view>

		<!-- 分配人才弹窗 -->
		<view class="modal" v-if="showAssignModal && is_admin">
			<view class="modal-content">
				<view class="modal-header">
					<text class="modal-title">分配人才</text>
					<text class="modal-close" @click="closeAssignModal">×</text>
				</view>
				<view class="modal-body">
					<view class="form-item">
						<text class="label">手机号</text>
						<view class="search-box">
							<input type="text" v-model="searchPhone" placeholder="请输入手机号" />
							<button class="search-btn" @click="searchUser">查询</button>
						</view>
					</view>
					<view class="user-info" v-if="users && users.length > 0">
						<view class="user-item" v-for="(user, index) in users" :key="index">
							<view class="user-detail">
								<text class="user-name">{{ user.name || "【未填写姓名】" }}</text>
								<text class="user-phone">{{ user.phone }}</text>
							</view>
							<button class="assign-btn" @click="confirmAssign(user)">分配</button>
						</view>
					</view>
					<view v-else-if="searched" class="empty-tip">
						<text>未找到相关用户</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
import { fetch_data } from '../../utils/ajax_request.js'
import * as utils from '../../utils/utils.js'
var _this;
export default {
	data() {
		return {
			lists: [],
			load: true,
			hasMore: false,
			noMore: '没有更多了',
			is_admin: utils.is_admin(),
			showModal: false,
			isEdit: false,
			formData: {
				name: '',
				price: '',
				description: '',
				features: ['']
			},
			showAssignModal: false,
			searchPhone: '',
			users: null,
			searched: false,  // 添加标记，用于显示空状态
			currentService: null
		}
	},
	onLoad() {
		_this = this;
		_this.getServiceList();
	},
	methods: {
		getServiceList() {
			// 获取服务包数据
			fetch_data("POST", 'get_all_services', null, "service", res => {
				if (res.data.status == 200) {
					const pageData = res.data.services;
					_this.lists.push(...pageData);
					// 将load状态的更新移到这里
					if (_this.load) {
						_this.load = false;
					}
				} else {
					uni.showToast({
						title: '数据获取失败',
						icon: 'none',
						duration: 800
					})
				}
			});
		},
		buyService(item) {
			uni.navigateTo({
				url: `/pages/my/servicepay?id=${item.id}&name=${item.name}`
			});
		},
		toMyPurchase() {
			uni.navigateTo({
				url: '/pages/my/servicepay'
			});
		},
		addService() {
			this.isEdit = false;
			this.formData = {
				name: '',
				price: '',
				description: '',
				features: ['']
			};
			this.showModal = true;
		},
		editService(item) {
			this.isEdit = true;
			this.formData = {
				id: item.id,
				name: item.name,
				price: item.price,
				description: item.description,
				features: [...item.features]
			};
			this.showModal = true;
		},
		closeModal() {
			this.showModal = false;
		},
		addFeature() {
			this.formData.features.push('');
		},
		deleteFeature(index) {
			if (this.formData.features.length > 1) {
				this.formData.features.splice(index, 1);
			}
		},
		confirmModal() {
			// 表单验证
			if (!this.formData.name.trim()) {
				uni.showToast({
					title: '请输入服务包名称',
					icon: 'none'
				});
				return;
			}
			if (!this.formData.price) {
				uni.showToast({
					title: '请输入价格',
					icon: 'none'
				});
				return;
			}
			if (!this.formData.description.trim()) {
				uni.showToast({
					title: '请输入简介',
					icon: 'none'
				});
				return;
			}
			if (this.formData.features.some(f => !f.trim())) {
				uni.showToast({
					title: '请填写所有特色内容',
					icon: 'none'
				});
				return;
			}

			// 显示加载提示
			uni.showToast({
				title: '请稍后',
				icon: 'loading',
				duration: 1000000
			});

			// 调用接口保存数据
			const url = this.isEdit ? 'edit_service' : 'add_service';
			fetch_data("POST", url, this.formData, "service", res => {
				// 隐藏加载提示
				uni.hideToast();

				if (res.data.status == 200) {
					uni.showToast({
						title: this.isEdit ? '编辑成功' : '添加成功',
						icon: 'none',
						duration: 1000
					});
					this.closeModal();
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/service/index'
						});
					}, 1000)
				} else {
					uni.showToast({
						title: res.data.message || '操作失败',
						icon: 'none',
						duration: 1000
					});
				}
			});
		},
		deleteService(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除该服务包吗？',
				success: function (res) {
					if (res.confirm) {
						// 显示加载提示
						uni.showToast({
							title: '请稍后',
							icon: 'loading',
							duration: 1000000
						});

						fetch_data("POST", 'delete_service', { id: item.id }, "service", res => {
							// 隐藏加载提示
							uni.hideToast();

							if (res.data.status == 200) {
								uni.showToast({
									title: '删除成功',
									icon: 'none',
									duration: 1000
								});
								setTimeout(() => {
									uni.reLaunch({
										url: '/pages/service/index'
									});
								}, 1000)
							} else {
								uni.showToast({
									title: res.data.message || '删除失败',
									icon: 'none',
									duration: 1000
								});
							}
						});
					}
				}
			});
		},
		assignTalent(item) {
			this.currentService = item;
			this.showAssignModal = true;
			this.searchPhone = '';
			this.users = null;
			this.searched = false;
		},

		closeAssignModal() {
			this.showAssignModal = false;
			this.searchPhone = '';
			this.users = null;
			this.searched = false;
		},

		searchUser() {
			if (!this.searchPhone.trim()) {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none'
				});
				return;
			}
			if (this.searchPhone.trim().length < 5) {
				uni.showToast({
					title: '手机号不能少于5位',
					icon: 'none'
				});
				return;
			}

			// 显示加载提示
			uni.showToast({
				title: '查询中',
				icon: 'loading',
				duration: 1000000
			});

			// 调用查询用户接口
			fetch_data("POST", 'search_user', { phone: this.searchPhone }, "service", res => {
				this.searched = true;

				if (res.data.status == 200) {
					this.users = res.data.users;
					uni.hideToast();
				} else {
					this.users = null;
					uni.showToast({
						title: res.data.message || '未找到用户',
						icon: 'none',
						duration: 2000
					});
				}
			});
		},

		confirmAssign(user) {
			if (!user || !this.currentService) {
				return;
			}

			// 显示加载提示
			uni.showToast({
				title: '处理中',
				icon: 'loading',
				duration: 1000000
			});

			// 调用分配接口
			fetch_data("POST", 'assign_talent', {
				service_id: this.currentService.id,
				user_id: user.id
			}, "service", res => {
				uni.hideToast();

				if (res.data.status == 200) {
					uni.showToast({
						title: '分配成功',
						icon: 'success',
						duration: 2000
					});
					this.closeAssignModal();
				} else {
					uni.showToast({
						title: res.data.message || '分配失败',
						icon: 'none',
						duration: 2000
					});
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	padding: 30rpx;
	background-color: #f8f9fa;
	min-height: 100vh;

	.header {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 30rpx;

		.header-buttons {
			display: flex;
			gap: 20rpx;
		}

		.add-service-btn,
		.my-purchase-btn {
			font-size: 28rpx;
			padding: 12rpx 36rpx;
			border-radius: 40rpx;
			height: auto;
			line-height: 1.8;
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
			transition: all 0.3s ease;

			&:active {
				transform: translateY(2rpx);
				box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
			}
		}

		.add-service-btn {
			background: linear-gradient(135deg, #4CAF50, #45a049);
			color: #fff;
		}

		.my-purchase-btn {
			background: linear-gradient(135deg, #02ABAB, #029595);
			color: #fff;
		}
	}

	.service-list {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 40rpx;
	}

	.service-item {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 40rpx;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
		transition: transform 0.3s ease;
		position: relative;
		overflow: hidden;

		&:hover {
			transform: translateY(-4rpx);
		}

		&-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;
		}

		&-title {
			font-size: 38rpx;
			font-weight: 600;
			color: #2c3e50;
			letter-spacing: 0.5rpx;
		}

		.operation-buttons {
			display: flex;
			gap: 16rpx;

			button {
				font-size: 24rpx;
				padding: 8rpx 24rpx;
				border-radius: 30rpx;
				height: auto;
				line-height: 1.8;
				transition: all 0.3s ease;
				box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);

				&:active {
					transform: translateY(2rpx);
					box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.1);
				}
			}

			.edit-btn {
				background: linear-gradient(135deg, #FFA500, #ff9100);
				color: #fff;
			}

			.delete-btn {
				background: linear-gradient(135deg, #FF4444, #ff3333);
				color: #fff;
			}
		}

		&-price {
			margin: 36rpx 0;
			display: flex;
			align-items: baseline;

			.price-symbol {
				font-size: 34rpx;
				color: #02ABAB;
				margin-right: 4rpx;
			}

			.price-value {
				font-size: 52rpx;
				font-weight: 700;
				color: #02ABAB;
				letter-spacing: -1rpx;
			}
		}

		&-desc {
			font-size: 28rpx;
			color: #5c6b7c;
			line-height: 1.6;
			margin-bottom: 36rpx;
		}

		&-features {
			margin-bottom: 40rpx;

			.feature-item {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
				padding: 12rpx 20rpx;
				background-color: #f8f9fa;
				border-radius: 12rpx;
				transition: all 0.3s ease;

				&:hover {
					background-color: #f0f2f5;
				}

				text {
					font-size: 26rpx;
					color: #4a5568;
					margin-left: 16rpx;
				}
			}
		}

		.buy-btn {
			width: 100%;
			height: 88rpx;
			line-height: 88rpx;
			background: linear-gradient(135deg, #02ABAB, #029595);
			color: #fff;
			font-size: 30rpx;
			font-weight: 600;
			border-radius: 44rpx;
			margin-top: 30rpx;
			box-shadow: 0 6rpx 16rpx rgba(2, 171, 171, 0.2);
			transition: all 0.3s ease;

			&:active {
				transform: translateY(2rpx);
				box-shadow: 0 3rpx 8rpx rgba(2, 171, 171, 0.2);
			}
		}
	}
}

.modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
	animation: fadeIn 0.3s ease;

	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	.modal-content {
		width: 90%;
		max-height: 90vh;
		background-color: #fff;
		border-radius: 24rpx;
		overflow: hidden;
		box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.15);
		animation: slideUp 0.3s ease;
		display: flex; // 添加这行
		flex-direction: column; // 添加这行

		@keyframes slideUp {
			from {
				transform: translateY(50rpx);
				opacity: 0;
			}

			to {
				transform: translateY(0);
				opacity: 1;
			}
		}
	}

	.modal-header {
		padding: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #f0f2f5;
		background: linear-gradient(to right, #02ABAB, #029595);

		.modal-title {
			font-size: 36rpx;
			font-weight: 600;
			color: #fff;
			letter-spacing: 1rpx;
		}

		.modal-close {
			font-size: 44rpx;
			color: #fff;
			padding: 10rpx 20rpx;
			border-radius: 50%;
			transition: all 0.3s ease;

			&:active {
				background-color: rgba(255, 255, 255, 0.2);
			}
		}
	}

	.modal-body {
		padding: 40rpx;
		max-height: calc(90vh - 240rpx);
		overflow-y: auto;
		flex: 1; // 添加这行，让内容区域自适应高度

		.form-item {
			margin-bottom: 36rpx;

			.label {
				display: block;
				font-size: 30rpx;
				color: #2c3e50;
				margin-bottom: 20rpx;
				font-weight: 500;
			}

			input,
			textarea {
				width: 100%;
				height: 88rpx; // 增加输入框高度
				padding: 0 24rpx; // 调整内边距，去掉上下内边距
				border: 2rpx solid #e2e8f0;
				border-radius: 12rpx;
				font-size: 28rpx;
				box-sizing: border-box;
				transition: all 0.3s ease;
				line-height: 88rpx; // 设置行高等于高度，实现垂直居中

				&:focus {
					border-color: #02ABAB;
					box-shadow: 0 0 0 2rpx rgba(2, 171, 171, 0.1);
				}

				&::placeholder {
					color: #a0aec0;
					line-height: 88rpx; // 确保占位符也垂直居中
				}
			}

			textarea {
				height: 180rpx; // 文本域保持较大高度
				line-height: 1.6; // 文本域使用更适合阅读的行高
				padding: 24rpx; // 文本域需要上下内边距
			}

			.features-list {
				.feature-input {
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;
					background: #f8fafb;
					border-radius: 12rpx;
					padding: 8rpx;

					input {
						flex: 1;
						border: none;
						background: transparent;
						height: 88rpx; // 特色输入框保持一致高度
						line-height: 88rpx;
						padding: 0 24rpx;

						&:focus {
							box-shadow: none;
						}
					}

					.delete-feature {
						padding: 10rpx 24rpx;
						color: #ff4444;
						font-size: 40rpx;
						border-radius: 8rpx;
						transition: all 0.3s ease;

						&:active {
							background-color: rgba(255, 68, 68, 0.1);
						}
					}
				}
			}

			.add-feature {
				color: #02ABAB;
				font-size: 28rpx;
				padding: 24rpx 0;
				text-align: center;
				border: 2rpx dashed #02ABAB;
				border-radius: 12rpx;
				margin-top: 24rpx;
				transition: all 0.3s ease;
				background-color: rgba(2, 171, 171, 0.05);

				&:active {
					background-color: rgba(2, 171, 171, 0.1);
				}
			}
		}
	}

	.modal-footer {
		padding: 24rpx 40rpx;
		display: flex;
		justify-content: flex-end;
		gap: 24rpx;
		border-top: 2rpx solid #f0f2f5;
		background-color: #f8fafb;
		flex-shrink: 0; // 添加这行，防止footer被压缩

		button {
			min-width: 160rpx; // 添加最小宽度
			height: 72rpx; // 固定高度
			padding: 0 32rpx; // 修改内边距
			font-size: 28rpx;
			border-radius: 40rpx;
			font-weight: 500;
			transition: all 0.3s ease;
			display: flex; // 添加flex布局
			align-items: center;
			justify-content: center;
			border: none; // 重置边框
			margin: 0; // 重置外边距
			line-height: 1; // 重置行高

			&:active {
				transform: translateY(2rpx);
			}
		}

		.cancel-btn {
			background-color: #f1f5f9;
			color: #64748b;

			&:active {
				background-color: #e2e8f0;
			}
		}

		.confirm-btn {
			background: linear-gradient(135deg, #02ABAB, #029595);
			color: #fff;
			box-shadow: 0 4rpx 12rpx rgba(2, 171, 171, 0.2);

			&:active {
				box-shadow: 0 2rpx 6rpx rgba(2, 171, 171, 0.2);
			}
		}
	}
}

.modal {
	// ... existing code ...

	.modal-body {
		// ... existing code ...

		.search-box {
			display: flex;
			gap: 20rpx;
			align-items: center;

			input {
				flex: 1;
			}

			.search-btn {
				width: 140rpx;
				height: 88rpx;
				line-height: 88rpx;
				background: linear-gradient(135deg, #02ABAB, #029595);
				color: #fff;
				font-size: 28rpx;
				border-radius: 12rpx;
				padding: 0;
				margin: 0;

				&:active {
					opacity: 0.9;
				}
			}
		}

		.user-info {
			margin-top: 30rpx;

			.user-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 24rpx;
				background: #f8fafb;
				border-radius: 12rpx;
				margin-bottom: 16rpx; // 添加间距

				&:last-child {
					margin-bottom: 0;
				}

				.user-detail {
					.user-name {
						font-size: 30rpx;
						font-weight: 500;
						color: #2c3e50;
						margin-bottom: 8rpx;
						display: block;
					}

					.user-phone {
						font-size: 26rpx;
						color: #64748b;
					}
				}

				.assign-btn {
					width: 120rpx;
					height: 60rpx;
					line-height: 60rpx;
					background: linear-gradient(135deg, #02ABAB, #029595);
					color: #fff;
					font-size: 26rpx;
					border-radius: 30rpx;
					padding: 0;
					margin: 0;

					&:active {
						opacity: 0.9;
					}
				}
			}
		}

		.empty-tip {
			text-align: center;
			padding: 40rpx 0;
			color: #64748b;
			font-size: 28rpx;
		}
	}
}
</style>