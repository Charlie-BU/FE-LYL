<template>
	<!--我要找活-->
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<block v-else>
			<view class="project">
				<view class="project-top">
					<view class="left-text">{{detail.title}}</view>
					<view class="right-text">{{detail.salary + detail.salary_unit}}</view>
				</view>
				
				<view class="project-head">
					<image :src="getFullUrl(detail.user.head_pic)" mode="aspectFit" class="left-img" />
					<view class="right">
						<view class="name-title">{{detail.user.qy_name}} <text v-if="star.length !== 0" class="score">{{star[0]}} {{star[1]}}</text></view>
						<view class="sub-name-title">{{detail.user.user_name}}</view>
						<!-- <view style="font-size: inherit;font-weight: 600;">评分</view> -->
					</view>
					<view class="time-text">{{detail.update_time_text}}</view>
				</view>
				<view class="project-detail">
					<view class="title-text">职位详情</view>
					<view class="project-tags">
						<view class="project-tag" v-for="(item,index) in detail.brr" :key="index">{{item}}</view>
					</view>
					<view class="project-rows">
						<view class="project-row">
							<view class="left-text">工作属性：</view>
							<view class="right-text">{{detail.property.join('、')}}</view>
						</view>
						<view class="project-row">
							<view class="left-text">期望城市：</view>
							<view class="right-text">{{detail.citys.join('、')}}</view>
						</view>
						<view class="project-row">
							<view class="left-text">合作时间：</view>
							<view class="right-text">{{detail.hz_start_time}} 至 {{detail.hz_end_time}}</view>
						</view>
						<view v-if="detail.strength" class="project-row column">
							<view class="left-text">项目需求：</view>
							<view class="right-text">{{detail.strength}}</view>
						</view>
						<view v-if="detail.experience" class="project-row column">
							<view class="left-text">岗位职责：</view>
							<view class="right-text">{{detail.experience}}</view>
						</view>
						<view v-if="detail.remark" class="project-row column">
							<view class="left-text">备注信息：</view>
							<view class="right-text">{{detail.remark}}</view>
						</view>
						<!-- 沟通列表 -->
						<div class="chats-list">
							<coopList :item_chats="all_chats" />
						</div>
					</view>
				</view>
				<view style="height: 136rpx;"></view>
			</view>
			<view class="project-bot" v-if="identity != 3">
				<view class="bot-item" @click="items_sc()">
					<image :src="is_sc == 0 ? '/static/index/shoucang.png' : '/static/index/shoucang_selected.png'"
						mode="widthFix" class="item-img" />
					<view class="item-text">{{is_sc == 0 ? '收藏' : '已收藏'}}</view>
				</view>
				<button class="project-btn" @click="toChat">立即沟通</button>
			</view>
		</block>
		<wxLogin ref="wx_login" @loginAfter="loginAfter"></wxLogin>
	</view>
</template>

<script>
	import {
		wxLogin
	} from "@/components/wx-login/wx-login.vue";
	import {
		coopList
	} from "@/pages/index/cooperation-list.vue";
	import {
		fetch_data
	} from '../../utils/ajax_request.js'
	import * as utils from '../../utils/utils.js'
	var _this;
	const GoEasy = uni.$GoEasy;
	export default {
		data() {
			return {
				id: '',
				is_sc: 0,
				fromIdentity: 0,
				star: [],
			}
		},
		onLoad(e) {
			_this = this;
			if (e.id) {
				_this.id = e.id
			} else {
				this.$u.toast('提交参数有误', () => {
					_this.finish()
				})
				return;
			}
			if (e.from) {
				_this.fromIdentity = e.from
			}
			_this.get_user_info()
		},
		components: {
			wxLogin,
			coopList,
		},
		onShow() {
			_this.get_items_xq()
			// 获取项目的沟通列表
			fetch_data("POST", "get_all_item_chats", {
				"item_id": this.id
			}, "application", (res) => {
				var item_chats = res.data.all_chats.map(chat => ({
					...chat,
					update_time: utils.format_time(chat.update_time),
					mode: false,
				}));
				uni.setStorageSync("item_chats", item_chats);
			});
			// 获取评分
			setTimeout(()=>{
				fetch_data("POST", "get_user_star", {
					"user_id": this.detail.user_id
				}, "user", (res) => {
					this.star = utils.show_stars(res.data.star_as_business);
				});
			}, 2000)
		},
		onShareAppMessage() {
			return {
				title: '利易联',
				path: `/pages/index/detail?id=${this.id}&from=2`,
				// imageUrl:_this.detail.goods_img
			}
		},
		methods: {
			loginAfter(result) {
				console.log('loginAfter', result);
			},
			async get_items_xq() {
				const params = {
					id: _this.id,
				}
				const data = await _this.$post('port/items_xq', params)
				if (data.code == 200) {
					_this.detail = data.result.detail
					_this.is_sc = _this.detail.is_sc
				} else if (data.code == 100) {
					this.$u.toast(data.msg, () => {
						_this.finish()
					})
				} else {
					this.$u.toast(data.msg)
				}
				if (_this.load) {
					_this.load = false
				}
			},
			async items_gt() {
				const params = {
					id: _this.id,
				}
				const data = await _this.$post('port/items_gt', params)
				if (data.code == 200) {

				} else {

				}
			},
			//收藏项目
			async items_sc() {
				if (_this.user_id == 0) {
					// _this.$refs.wx_login.loginShow = true
					uni.navigateTo({
						url: '/pages/index/login'
					});
					return
				}
				if (_this.fromIdentity != 0 && _this.fromIdentity == _this.identity) {
					this.$u.toast('请切换身份后收藏')
					return
				}
				const params = {
					id: _this.id,
				}
				const data = await _this.$post('port/items_sc', params)
				if (data.code == 200) {
					this.$u.toast(data.msg)
					_this.is_sc = _this.is_sc == 1 ? 0 : 1
				} else {
					this.$u.toast(data.msg)
				}
			},
			toChat() {
				if (_this.user_id == 0) {
					// _this.$refs.wx_login.loginShow = true
					uni.navigateTo({
						url: '/pages/index/login'
					});
					return
				}
				if (_this.user_id == _this.detail.user_id) {
					this.$u.toast('无法与自己的项目沟通')
					return
				}
				if (_this.fromIdentity != 0 && _this.fromIdentity == _this.identity) {
					this.$u.toast('请切换身份后沟通')
					return
				}
				_this.items_gt()
				let init = _this.detail.is_send == 1 ? 0 : 1
				let qy_name = _this.detail.user.qy_name
				_this.toNext(`/pages/message/private_chat?id=qy_${_this.detail.user_id}&init=${init}&title=${qy_name}`)
			},
			//获取用户信息
			async get_user_info() {
				if (_this.user_id > 0) {
					const data = await _this.$post('port/user_info')
					if (data.code == 200) {
						//存入用户信息
						this.$u.vuex('current_user', data.result.user)
						if (GoEasy.getConnectionStatus() === 'disconnected') {
							this.connectGoEasy(); //连接goeasy
							// this.subscribeGroup(); //建立连接后，就应该订阅群聊消息，避免漏掉
						}
					} else {
						this.$u.toast(data.msg)
					}
				}
			},
			connectGoEasy() {
				console.log('connectGoEasy', this.get_prefix() + this.user_id);
				GoEasy.connect({
					id: this.get_prefix() + this.user_id,
					data: {
						user_id: this.current_user.user_id,
						qy_name: this.current_user.qy_name,
						user_name: this.current_user.user_name,
						is_kf: this.current_user.is_kf,
						head_pic: this.current_user.head_pic,
						identity: this.identity
					},
					onSuccess: () => {
						console.log('GoEasy connect successfully.')
						// GoEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.setUnreadNumber);
					},
					onFailed: (error) => {
						console.log('Failed to connect GoEasy, code:' + error.code + ',error:' + error
						.content);
					},
					onProgress: (attempts) => {
						console.log('GoEasy is connecting', attempts);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "static/css/item.scss";
	
	.container {
		background: #fff;
		position: relative;
	}

	.chats-list {
		margin-top: 40rpx;
		padding: 20rpx;
		background-color: #f9f9f9;
		border-radius: 30rpx;
	}
	.score {
		font-size: 30rpx;
		margin-left: 20rpx;
		font-weight: 800;
		color: gold;
		white-space: nowrap;
	}
	
	
</style>