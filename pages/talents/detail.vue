<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<block v-else>
			<view class="project">
				<view class="project-top">
					<image :src="getFullUrl(detail.user.head_pic)" mode="aspectFit" class="left-img"/>
					<view class="center-text">{{detail.user.user_name}}</view>
					<view class="right-text">{{detail.salary + detail.salary_unit}}</view>
				</view>
				<view class="project-detail">
					<view class="title-text">人才详情</view>
					<view class="project-tags">
						<view class="project-tag" v-for="(item1,index1) in detail.brr" :key="index1">{{item1}}</view>
					</view>
					<view class="project-rows">
						<view class="project-row">
							<view class="left-text">工作属性：</view>
							<view class="right-text">{{ detail.property.join('、') }}</view>
						</view>
						<view class="project-row">
							<view class="left-text">期望城市：</view>
							<view class="right-text">{{detail.citys.join('、')}}</view>
						</view>
						<view class="project-row column">
							<view class="left-text">个人优势：</view>
							<view class="right-text">{{detail.strength}}</view>
						</view>
						<view class="project-row column">
							<view class="left-text">项目经历：</view>
							<view class="right-text">{{detail.experience}}</view>
						</view>
						<view class="project-row column">
							<view class="left-text">备注信息：</view>
							<view class="right-text">{{detail.remark}}</view>
						</view>
					</view>
				</view>
				<view style="height: 136rpx;"></view>
			</view>
			<view class="project-bot" v-if="identity != 3">
				<view class="bot-item" @click="items_sc()">
					<image :src="is_sc == 0 ? '/static/index/shoucang.png' : '/static/index/shoucang_selected.png'" mode="widthFix" class="item-img"/>
					<view class="item-text">{{is_sc == 0 ? '收藏' : '已收藏'}}</view>
				</view>
				<button class="project-btn" @click="toChat">立即沟通</button>
			</view>
		</block>
		<wxLogin ref="wx_login" @loginAfter="loginAfter"></wxLogin>
	</view>
</template>

<script>
	import wxLogin from "@/components/wx-login/wx-login.vue"
	var _this;
	const GoEasy = uni.$GoEasy;
	export default {
		data() {
			return {
				id:'',
				is_sc:0,
				fromIdentity:0
			}
		},
		onLoad(e) {
			_this = this;
			if (e.id) {
				_this.id = e.id
			}else{
				this.$u.toast('提交参数有误',()=>{
						_this.finish()
					})
				return;
			}
			if (e.from) {
				_this.fromIdentity = e.from
			}
			_this.get_user_info()
		},
		onShow() {
			_this.get_items_xq()
		},
		onShareAppMessage() {
			return {
				title:'利易联',
				path:`/pages/talents/detail?id=${this.id}&from=1`,
				// imageUrl:_this.detail.goods_img
			}
		},
		components:{
			wxLogin
		},
		methods: {
			loginAfter(result){
				console.log('loginAfter',result);
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
					this.$u.toast(data.msg,()=>{
						_this.finish()
					})
				}else {
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
			async items_sc(){
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
				if(data.code==200){
					this.$u.toast(data.msg)
					_this.is_sc = _this.is_sc==1?0:1
				}else{
					this.$u.toast(data.msg)
				}
			},
			async toChat(){
				if (_this.user_id == 0) {
					// _this.$refs.wx_login.loginShow = true
					uni.navigateTo({
						url: '/pages/index/login'
					});
					return
				}
				if (_this.user_id == _this.detail.user_id) {
					this.$u.toast('无法与自己的简历沟通')
					return
				}
				if (_this.fromIdentity != 0 && _this.fromIdentity == _this.identity) {
					this.$u.toast('请切换身份后沟通')
					return
				}
				const data = await _this.$post('port/user_info')
				if (data.code == 200) {
					let user = data.result.user
					if (user.item_qy_count == 0) {
						this.$u.toast('需要发布项目后才可与人才沟通')
						return
					}
					_this.items_gt()
					let init = _this.detail.is_send == 1 ? 0 : 1
					let user_name = _this.detail.user.user_name
					_this.toNext(`/pages/message/private_chat?id=user_${_this.detail.user_id}&init=${init}&title=${user_name}`)
				} else {
					this.$u.toast(data.msg)
				}
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
				console.log('connectGoEasy',this.get_prefix() + this.user_id);
			  GoEasy.connect({
			    id: this.get_prefix() + this.user_id,
			    data: {
			      user_id: this.current_user.user_id,
			      qy_name: this.current_user.qy_name,
			      user_name: this.current_user.user_name,
			      is_kf: this.current_user.is_kf,
			      head_pic: this.current_user.head_pic,
				  identity:this.identity
			    },
			    onSuccess: () => {
			      console.log('GoEasy connect successfully.')
				  // GoEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.setUnreadNumber);
			    },
			    onFailed: (error) => {
			      console.log('Failed to connect GoEasy, code:' + error.code + ',error:' + error.content);
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
		height: 100%;
		background: #fff;
		position: relative;
	}
</style>
