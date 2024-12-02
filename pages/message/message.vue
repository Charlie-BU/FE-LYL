<template>
	<view class="container">
		<view class="tabs-info" v-if="identity == 3">
			<u-tabs lineColor="#15B3B4" :list="list1" :scrollable="false" :activeStyle="{
				 color: '#000000',
				 fontWeight: 'bold',
				 transform: 'scale(1.05)',
				 fontSize:'28rpx'
			 }" :inactiveStyle="{
				 color: '#5B5B5B',
				 transform: 'scale(1)',
				 fontSize:'28rpx'
			 }" @click="clickTab"></u-tabs>
		</view>
		<block v-if="lists.length > 0">
			<u-swipe-action>
				<u-swipe-action-item :options="options" v-for="(item,index) in lists" :key="index" :name="index"
					@click="clickAction($event,index)">
					<view class="item" @click="clickItem(item)">
						<view class="item-left">
							<image src="/my/static/kefu.png" mode="aspectFill" class="left-img"
								v-if="item.data.identity == 3" />
							<image :src="item.data.head_pic" mode="aspectFill" class="left-img" v-else />
							<view class="badge-text" v-if="item.unread">{{item.unread}}</view>
						</view>
						<view class="item-center">
							<view class="name-text">{{getName(item)}}</view>
							<view class="sub-text" v-if="item.lastMessage.type == 'text'">
								{{item.lastMessage.payload.text}}</view>
							<view class="sub-text" v-if="item.lastMessage.type == 'image'">[图片消息]</view>
							<view class="sub-text" v-if="item.lastMessage.type == 'audio'">[语音消息]</view>
							<view class="sub-text" v-if="item.lastMessage.type == 'file'">[文件消息]</view>
							<view class="sub-text" v-if="item.lastMessage.type == 'swap_wx'">
								<block v-if="is_self(item)">
									您申请了与对方交换微信
								</block>
								<block v-else>
									对方申请与您交换微信
								</block>
							</view>
							<view class="sub-text" v-if="item.lastMessage.type == 'swap_phone'">
								<block v-if="is_self(item)">
									您申请了与对方交换电话
								</block>
								<block v-else>
									对方申请与您交换电话
								</block>
							</view>
							<view class="sub-text" v-if="item.lastMessage.type == 'refuse_wx_phone'">
								<block v-if="is_self(item)">
									{{item.lastMessage.payload.type == 1 ? '您拒绝了与对方交换电话' : '您拒绝了与对方交换微信'}}
								</block>
								<block v-else>
									{{item.lastMessage.payload.type == 1 ? '对方拒绝了与您交换电话' : '对方拒绝了与您交换微信'}}
								</block>
							</view>
							<view class="sub-text"
								v-if="item.lastMessage.type == 'agree_wx_phone' || item.lastMessage.type == 'consent_wx_phone'">
								<block v-if="is_self(item)">
									{{item.lastMessage.payload.type == 1 ? '您同意了与对方交换电话' : '您同意了与对方交换微信'}}
								</block>
								<block v-else>
									{{item.lastMessage.payload.type == 1 ? '对方同意了与您交换电话' : '对方同意了与您交换微信'}}
								</block>
							</view>
						</view>
						<view class="item-right">{{ formatDate(item.lastMessage.timestamp) }}</view>
					</view>
				</u-swipe-action-item>
			</u-swipe-action>
		</block>
		<view class="empty-container" v-else>
			<u-empty text="暂无相关消息" :icon="emptyIcon" />
		</view>
	</view>
</template>

<script>
	import {
		fetch_data,
		upload_file
	} from '../../utils/ajax_request.js'
	import * as utils from '../../utils/utils.js'
	import {
		formatDate
	} from '@/lib/utils';
	var _this;
	const GoEasy = uni.$GoEasy;
	export default {
		data() {
			return {
				list1: [{
					name: '项目沟通',
					type: 2
				}, {
					name: '人才沟通',
					type: 1
				}],
				type: 2,
				options: [{
					text: '删除',
					icon: 'trash',
					iconSize: '18',
					style: {
						backgroundColor: '#EB5658',
						'flex-direction': 'column',
						'fontSize': '26rpx'
					}
				}]
			}
		},
		onLoad(e) {
			_this = this;
		},
		onShow() {
			if (GoEasy.getConnectionStatus() === 'disconnected' && this.user_id > 0) {
				this.connectGoEasy(); //连接goeasy
				// this.subscribeGroup(); //建立连接后，就应该订阅群聊消息，避免漏掉
			}
			if (this.user_id > 0) {
				GoEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.renderConversations);
				this.loadConversations(); //加载会话列表
			}
			_this.get_user_info()
		},
		beforeDestroy() {
			GoEasy.im.off(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.renderConversations);
		},
		watch: {
			type(newVal, oldVal) {
				this.loadConversations(); //加载会话列表
			}
		},
		methods: {
			formatDate,
			is_self(item) {
				let senderId = item.lastMessage.senderId
				// let arr = senderId.split('_')
				return this.get_prefix() + this.user_id == senderId
			},
			getName(item) {
				let {
					data
				} = item
				let identity = data.identity
				let name = ''
				switch (identity) {
					case 1:
						name = data.user_name
						break;
					case 2:
						name = data.qy_name
						break;
					case 3:
						name = data.kf_name || '客服'
						break;
					default:
						break;
				}
				return name
			},
			//获取用户信息
			async get_user_info() {
				if (_this.user_id > 0) {
					const data = await _this.$post('port/user_info')
					if (data.code == 200) {
						//存入用户信息
						this.$u.vuex('current_user', data.result.user)
					} else {
						this.$u.toast(data.msg)
					}
				}
			},
			connectGoEasy() {
				GoEasy.connect({
					id: this.get_prefix() + this.user_id,
					data: {
						user_id: this.current_user.user_id,
						qy_name: this.current_user.qy_name,
						user_name: this.current_user.user_name,
						kf_name: this.current_user.kf_name,
						is_kf: this.current_user.is_kf,
						head_pic: this.current_user.head_pic,
						identity: this.identity
					},
					onSuccess: () => {
						console.log('GoEasy connect successfully.')
					},
					onFailed: (error) => {
						console.log('Failed to connect GoEasy, code:' + error.code +
							',error:' + error.content);
					},
					onProgress: (attempts) => {
						console.log('GoEasy is connecting', attempts);
					}
				});
			},
			renderConversations(content) {
				console.log('获取最新会话列表:', content);
				let conversations = content.conversations;
				if (_this.identity == 3) {
					this.lists = conversations.filter(res => {
						return res.data.identity == _this.type
					})
				} else {
					this.lists = conversations;
				}
			},
			// 加载最新的会话列表
			loadConversations() {
				GoEasy.im.latestConversations({
					onSuccess: (result) => {
						let content = result.content;
						this.renderConversations(content);
						// this.setUnreadAmount(content);
						let unreadTotal = content.unreadTotal;
						if (unreadTotal > 0) {
							uni.setTabBarBadge({
								index: 1,
								text: unreadTotal.toString(),
								success(res) {
									console.log('setTabBarBadge success',
										res);
								},
								fail(fail) {
									console.log('setTabBarBadge fail', fail);
								}
							});
						} else {
							uni.removeTabBarBadge({
								index: 1,
								success(res) {
									console.log('removeTabBarBadge success',
										res);
								},
								fail(fail) {
									console.log('removeTabBarBadge fail',
										fail);
								}
							});
						}
					},
					onFailed: (error) => {
						console.log('获取最新会话列表失败, error:', error);
					}
				});
			},
			clickTab(item) {
				if (_this.type != item.type) {
					_this.type = item.type
				}
				console.log('item', item);
			},
			clickAction(e, index) {
				console.log('clickAction', e, index);
				uni.showModal({
					title: '提示',
					content: '确定删除吗?',
					cancelColor: '#B8B8B8',
					confirmColor: '#02AAAB',
					success(res) {
						if (res.confirm) {
							let conversation = _this.lists[index]
							GoEasy.im.removeConversation({
								conversation: conversation,
								onSuccess() {
									console.log('删除会话成功');
									_this.lists.splice(index, 1)
								},
								onFailed(error) {
									console.log('删除会话失败', error);
								},
							})
						}
					}
				})
			},
			clickItem(item) {
				// 询问用户是否订阅消息提醒
				utils.get_openid((openid) => {
					fetch_data("POST", "store_openid", { "my_id": _this.user_id, "openid": openid }, "user");
				})
				utils.subscirbe_message(['8AMX7lHwjpeH4uN-6XslAmSDJhcbbsJcB_RLdIcQZ4o'], () => {
					console.log('clickItem', item);
					let data = item.data
					let title = ''
					switch (data.identity) {
						case 1:
							title = data.user_name
							break;
						case 2:
							title = data.qy_name
							break;
						case 3:
							title = data.kf_name
							break;
						default:
							break;
					}
					_this.toNext(`/pages/message/private_chat?id=${item.userId}&title=${title}`)
				});
			},
		}
	}
</script>
<!-- #ifdef MP-WEIXIN -->
<style>
	page {
		background: #fff;
	}
</style>
<!-- #endif -->
<style lang="scss" scoped>
	.container {
		position: relative;

		.tabs-info {
			border-bottom: $global-border;
			height: 88rpx;
		}

		.item {
			@include flex-box(row, null, center);
			padding: 20rpx 36rpx;

			.item-left {
				margin-right: 20rpx;
				position: relative;

				.left-img {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
				}

				.badge-text {
					position: absolute;
					right: 0;
					top: 0;
					background: #E7524D;
					color: #fff;
					border-radius: 50%;
					width: 30rpx;
					height: 30rpx;
					line-height: 30rpx;
					text-align: center;
					font-size: 24rpx;
				}
			}

			.item-center {
				flex: 1;
				overflow: hidden;

				.name-text {
					font-size: 30rpx;
					font-weight: 500;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.sub-text {
					color: #666666;
					font-size: 26rpx;
					margin-top: 6rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}

			.item-right {
				color: #B0B0B0;
				font-size: 26rpx;
			}
		}

		.empty-container {
			border-radius: 15rpx;
			background: #fff;
			padding: 120rpx 0;
		}
	}
</style>