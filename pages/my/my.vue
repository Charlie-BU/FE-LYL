<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<block v-else>
			<view class="user-top">
				<view class="nav-title">
					<view :style="{'height':statusbarH+'px'}"></view>
					<view class="nav-title-inner">我的</view>
				</view>
				<view class="my-top" v-if="user_id > 0">
					<view class="left" v-if="identity == 3">
						<image :src="head_pic" mode="aspectFill" class="head-img"/>
					</view>
					<view class="left" @click="toNext('/pages/my/user-personal')" v-else>
						<image :src="head_pic" mode="aspectFill" class="head-img"/>
					</view>
					<view class="center">
						<view class="center-nickname" :class="{'kf-nickname':identity == 3}">
							<text class="nickname-text">{{temp_user.firm_name}}</text>
						</view>
						<view class="center-bot" @click="toNext('/pages/my/user-personal')" v-if="identity != 3">
							<text>{{temp_user.nickname}}</text>
							<image src="@/static/my/bianji.png" mode="widthFix"/>
						</view>
					</view>
					<view class="right">
						<view class="right-item" @click="goNext(`/my/change-identity?is_kf=${user.is_kf || 0}`)">
							<image src="@/static/my/change-identity.png" mode="widthFix"></image>
							<text>切换身份</text>
						</view>
						<button class="right-item" v-if="identity != 3" @click="lx_kefu()">
							<image src="@/static/my/kefu.png" mode="widthFix"></image>
							<text>客服</text>
						</button>
					</view>
				</view>
				<view class="my-top" v-else @click="goLogin()">
					<view class="left">
						<image src="@/static/touxiang.png" mode="scaleToFill" class="head-img"/>
					</view>
					<view class="center">
						<view class="center-nickname">
							<text class="nickname-text">点击登录</text>
						</view>
					</view>
				</view>
				<view class="user-top-items" v-if="identity == 3">
					<view class="user-top-item" @click="goNext('/pages/kefu/link-up')">
						<text class="num-text">{{user.chat_count || 0}}</text>
						<text class="sub-text">沟通过</text>
					</view>
					<view class="user-top-item" @click="goNext('/pages/kefu/online')">
						<text class="num-text">{{user.is_online_count || 0}}</text>
						<text class="sub-text">在线</text>
					</view>
					<view class="user-top-item" @click="goNext('/pages/kefu/online?is_online=0')">
						<text class="num-text">{{user.is_offline_count || 0}}</text>
						<text class="sub-text">离线</text>
					</view>
				</view>
				<view class="user-top-items" v-else>
					<view class="user-top-item" @click="goNext('/my/link-up')">
						<text class="num-text">{{identity == 1 ? (user.chat_xm_count || 0) : (user.chat_jl_count || 0)}}</text>
						<text class="sub-text">沟通过</text>
					</view>
					<view class="user-top-item" @click="goNext('/pages/my/user-collect')">
						<text class="num-text">{{identity == 1 ? (user.collect_xm_count || 0) : (user.collect_jl_count || 0)}}</text>
						<text class="sub-text">收藏</text>
					</view>
				</view>
				<view class="user-top-bot">
					<image :src="temp_user.top_icon" mode="widthFix"/>
					<view class="user-top-bot-center">
						<view class="tit">{{temp_user.center_title}}</view>
						<view class="sub-tit">{{temp_user.sub_title}}</view>
					</view>
					<button size="mini" @click="goNext('/my/my-resume')" v-if="identity == 1">{{temp_user.btn_title}}</button>
					<view class="switch" v-if="identity == 3">
						<u-switch 
						asyncChange
						v-model="online"
						 :inactiveValue="0"
						 :activeValue="1"
						 size="20"
						 :loading="switchLoad"
						 :disabled="switchLoad"
						activeColor="#03AAAB"
						@change="switchChange"/>
					</view>
					<button size="mini" @click="goNext('/pages/talents/publish')" v-if="identity == 2 && user.item_count < 10">{{temp_user.btn_title}}</button>
				</view>
				<!-- <view class="user-top-bot">
					<image src='/static/my/zaixian.png' mode="widthFix"/>
					<view class="user-top-bot-center">
						<view class="tit">我的合约</view>
					</view>
					<button size="mini" @click="goNext('/pages/my/contract?identity='+identity)">去查看</button>
				</view> -->
				<view class="user-top-bot"  >
					<image src='/static/my/zjdg.png' mode="widthFix"/>
					<view class="user-top-bot-center">
						<view class="tit">资金代管</view>
					</view>
					<button size="mini" @click="goNext('/pages/my/service?identity='+identity)">去查看</button>
				</view>
				<view class="user-top-bot" v-if="identity != 3">
					<image src='/static/my/wdsy.png' mode="widthFix"/>
					<view class="user-top-bot-center">
						<view class="tit">我的收益</view>
					</view>
					<button size="mini"  v-if="user"  @click="goNext('/pages/my/servicepay?identity='+identity)">去查看</button>
					<text size="mini" v-else>请登录</text>
				</view>
			</view>
		<view class="info">
			<view class="info-title" v-if="identity != 3">{{temp_user.info_title}}</view>
			<view class="tabs-info" v-if="identity == 2">
				<u-tabs
				lineColor="#15B3B4"
				:list="list1" 
				:scrollable="false"
				 :activeStyle="{
					 color: '#000000',
					 fontWeight: 'bold',
					 transform: 'scale(1.05)',
					 fontSize:'28rpx'
				 }"
				 :inactiveStyle="{
					 color: '#5B5B5B',
					 transform: 'scale(1)',
					 fontSize:'28rpx'
				 }"
				@click="clickTab"></u-tabs>
			</view>
			<view class="tabs-info" v-if="false">
				<u-tabs
				lineColor="#15B3B4"
				:list="list2" 
				:scrollable="false"
				 :activeStyle="{
					 color: '#000000',
					 fontWeight: 'bold',
					 transform: 'scale(1.05)',
					 fontSize:'28rpx'
				 }"
				 :inactiveStyle="{
					 color: '#5B5B5B',
					 transform: 'scale(1)',
					 fontSize:'28rpx'
				 }"
				@click="clickKfTab"></u-tabs>
			</view>
			<view class="items" :class="{'items-p':identity != 1}">
				<template v-if="identity == 1">
					<view class="jl-item-container">
						<view class="jl-item" v-if="Object.keys(resume).length>0">
							<view class="jl-item-title">
								<view class="left">
									<text v-for="(item,index) in resume.citys" :key="index">{{item}}</text>
								</view>
								<view class="center"></view>
								<view class="right">{{resume.salary + resume.salary_unit}}</view>
							</view>
							<view class="jl-item-tab">
								<view class="tab-item" v-for="(item,index) in resume.arr" :key="index">{{item}}</view>
							</view>
							<view class="jl-item-bot" :class="{'column':resume.status == 2}">
								<view class="left-error-item" v-if="resume.status == 2">
									<image src="@/static/index/jg-red.png" mode="widthFix" class="left-icon"/>
									<text class="red-text">已驳回：{{resume.reason}}</text>
								</view>
								<view class="left" v-else>
									<view class="left-item" v-if="resume.status == -1">
										<image src="@/static/index/check-wait.png" mode="widthFix" class="left-icon"/>
										<text class="blue-text">审核中</text>
									</view>
									<view class="left-item" v-if="resume.status == 3">
										<image src="@/static/my/qiyong.png" mode="widthFix" class="left-icon"/>
										<text class="success-text">启用中</text>
									</view>
									<view class="left-item" v-if="resume.status == 4">
										<image src="@/static/index/yitingyong.png" mode="widthFix" class="left-icon"/>
										<text class="yellow-text">已停用</text>
									</view>
									<view class="left-item" v-if="resume.status == 3" @click.stop="refreshClick()">
										<image src="@/static/my/shuaxin.png" mode="widthFix" class="left-icon"/>
										<text class="theme-text">刷新</text>
									</view>
								</view>
								<view class="right">
									<button size="mini" class="theme-btn" @click="goNext('/my/my-resume')">
										<image src="@/static/my/bianji-btn.png" mode="widthFix" class="right-icon"/>
										<text>编辑</text>
									</button>
									<button size="mini" class="ty-btn" @click.stop="tyClick()" v-if="resume.status == 3">
										<image src="@/static/my/ty-btn.png" mode="widthFix" class="right-icon"/>
										<text>停用</text>
									</button>
									<button size="mini" class="qy-btn" @click.stop="do_resume(2,3)" v-if="resume.status == 1 || resume.status == 4">
										<image src="@/static/index/qy-icon.png" mode="widthFix" class="right-icon"/>
										<text>启用</text>
									</button>
								</view>
							</view>
						</view>
						<view class="empty-container" v-else>
							<u-empty text="暂无简历" :icon="emptyIcon" />
						</view>
					</view>
				</template>
				<template v-else-if="identity == 2">
					 <block v-if="xm_lists.length>0">
					 <my-xm-items @itemClick="xmItemClick" :datas="xm_lists"></my-xm-items>
					 </block>
					<view class="empty-container" v-else>
						<u-empty text="暂无相关项目" :icon="emptyIcon" />
					</view>
				</template>
				<!-- <template v-else>
					<block v-if="kf_lists.length>0">
					 <my-items @itemClick="kfItemClick" :datas="kf_lists"></my-items>
					 </block>
					<view class="empty-container" v-else>
						<u-empty text="暂无相关数据" :icon="emptyIcon" />
					</view>
				</template> -->
			</view>
		</view>
		<view style="height: 120rpx;"></view>
		</block>
		
		<wxLogin ref="wx_login" @loginAfter="loginAfter"></wxLogin>
	</view>
</template>

<script>
	import wxLogin from "@/components/wx-login/wx-login.vue"
	var _this;
	export default {
		data() {
			return {
				//导航栏高度
				navBarHeight: 44,
				statusbarH:10,
				navRight:0,
				loginDisabled:false,
				online:0,
				switchLoad:false,
				list1: [{
					name: '审核中',
					status:-1
				},{
					name: '已驳回',
					status:2
				}, {
					name: '启用中',
					status:3
				}, {
					name: '已停用',
					status:4
				}],
				list2: [{
					name: '项目沟通',
					type:1
				}, {
					name: '人才沟通',
					type:2
				}],
				resume:{},
				xm_form: {
					pageIndex:1,
					pageSize:20,
					user:1,
					type:1,
					status:-1
				},
				xm_lists:[],
				kf_form: {
					pageIndex:1,
					pageSize:20,
					is_kf:1,
					type:1
				},
				kf_lists:[],
			}
		},
		onLoad(e) {
			_this = this;
			let sysInfo = uni.getSystemInfoSync();
			_this.statusbarH=sysInfo.statusBarHeight
			// #ifdef MP-WEIXIN
			// 胶囊信息
			let menu = uni.getMenuButtonBoundingClientRect();
			// 导航栏高度
			// let navBarHeight = menu.height;
			// this.navBarHeight = navBarHeight
			_this.navRight = menu.width
			// #endif
			// #ifdef H5
			// _this.$u.vuex('user_id', 1)
			// _this.$u.vuex('user_token', '59b32d0d2db428029154137876cd8e77')
			// _this.$u.vuex('user_id', 13)
			// _this.$u.vuex('user_token', 'ec59ca0bf53c94ef14d3c62edc542475')
			// #endif
			// uni.hideTabBar({
			// 	animation:false,
			// 	success() {
			// 		console.log('隐藏tabbar成功');
			// 	}
			// })
			switch (this.identity){
				case 1:
					break;
				case 2:
				this.get_items_list()
					break;
				case 3:
				this.get_gt_list()
					break;
				default:
					break;
			}
		},
		onShow() {
			_this.get_user_info()
		},
		computed:{
			phone:{
				cache:false,
				get() {
					if(this.user=='' || this.user.mobile=='' || this.user.mobile==undefined){
						return '****'
					}
					let phone= this.user.mobile
					let result = phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
					return result;
				}
			},
			head_pic:{
				cache:false,
				get() {
					switch (this.identity){
						case 3:
						return '/my/static/kefu.png'
							break;
						default:
						return this.user.head_pic
							break;
					}
				}
			},
			temp_user:{
				cache:false,
				get() {
					let user = {}
					switch (this.identity){
						case 1:
						user.firm_name = this.user.realname || '完善真实姓名'
						user.nickname = '编辑信息'
						user.top_icon = '/static/my/xiangmu.png'
						user.center_title = '我的简历'
						user.sub_title = '千万求职者的选择'
						if(Object.keys(this.resume).length>0){
							user.btn_title = '去编辑'
						}else{
							user.btn_title = '去发布'
						}
						user.info_title = '我的简历'
							break;
						case 2:
						user.firm_name = this.user.firm_name || '完善企业名称'
						user.nickname = this.user.realname || '完善真实姓名'
						user.top_icon = '/static/my/wenjianjia.png'
						user.center_title = '发布项目'
						user.sub_title = '千万招聘者的选择'
						user.btn_title = '去发布'
						user.info_title = '我的项目'
							break;
						case 3:
						user.firm_name = this.user.kf_name || '客服'
						user.top_icon = '/static/my/zaixian.png'
						user.center_title = '在线状态'
						user.sub_title = '千万求职者/招聘者的选择'
						user.btn_title = ''
						user.info_title = '我的沟通'
							break;
					}
					return user
				}
			}
		},
		components:{
			wxLogin
		},
		onPullDownRefresh() {
			_this.get_user_info()
			switch (this.identity){
				case 1:
					break;
				case 2:
				this.xm_form.pageIndex = 1
				this.xm_lists = []
				this.get_items_list()
					break;
				case 3:
				this.kf_form.pageIndex = 1
				this.kf_lists = []
				this.get_gt_list()
					break;
				default:
					break;
			}
		},
		onReachBottom() {
			if(_this.hasMore){
				switch (this.identity){
					case 1:
						break;
					case 2:
					this.xm_form.pageIndex++
					this.get_items_list()
						break;
					case 3:
					this.kf_form.pageIndex++
					this.get_gt_list()
						break;
					default:
						break;
				}
			}
		},
		methods: {
			clickTab(item) {
				if (_this.xm_form.status != item.status) {
					_this.xm_form.status = item.status
					_this.xm_form.pageIndex = 1
					_this.xm_lists = []
					_this.get_items_list()
				}
			},
			async switchChange(value){
				_this.switchLoad = true
				const params = {
					is_online: value + 1,
				}
				const data = await _this.$post('port/kefu_online', params)
				if(data.code==200){
					_this.online = value
					_this.switchLoad = false
				}else{
					this.$u.toast(data.msg)
				}
			},
			itemClick(res){
				switch (res.type){
					case 1:
						break;
					case 2:
						break;
					case 3:
						break;
					case 4:
					uni.showModal({
						title:'停用简历',
						content:'您确定要停用简历吗？停用后招聘者将无法查看到您的简历。请您谨慎操作！',
						cancelColor:'#B8B8B8',
						confirmColor:'#02AAAB',
						success(res) {
							if (res.confirm) {
								console.log('点击了确定');
							}else{
								console.log('点击了取消');
							}
						}
					})
						break;
					default:
						break;
				}
				console.log('点击简历项',res);
			},
			//刷新简历
			refreshClick(){
				uni.showModal({
					title:'刷新简历',
					content:'您确定要刷新简历吗？每天可刷新3次您的简历。请您谨慎操作！',
					cancelColor:'#B8B8B8',
					confirmColor:'#02AAAB',
					success(res) {
						if (res.confirm) {
							_this.do_resume(1)
						}else{
							console.log('点击了取消');
						}
					}
				})
			},
			//停用简历
			tyClick(){
				uni.showModal({
					title:'停用简历',
					content:'您确定要停用简历吗？停用后招聘者将无法查看到您的简历。请您谨慎操作！',
					cancelColor:'#B8B8B8',
					confirmColor:'#02AAAB',
					success(res) {
						if (res.confirm) {
							_this.do_resume(3,4)
						}else{
							console.log('点击了取消');
						}
					}
				})
			},
			async do_resume(type,status){
				let params = {
					type
				}
				const data = await _this.$post('port/handle_resume',params)
				if (data.code == 200) {
					this.$u.toast(data.msg)
					if (status) {
						this.resume.status = status
					}
				} else {
					this.$u.toast(data.msg)
				}
			},
			xmItemClick(res){
				console.log('点击项目项',res);
				switch (res.type){
					case 1:
					_this.toNext(`/pages/talents/publish?id=${res.item.id}`)
						break;
					case 2:
					_this.do_item(1,res.item,3,res.index,1)
						break;
					case 3:
					uni.showModal({
						title:'刷新项目',
						content:'您确定要刷新项目吗？每天可刷新5次您的项目。请您谨慎操作！',
						cancelColor:'#B8B8B8',
						confirmColor:'#02AAAB',
						success(res1) {
							if (res1.confirm) {
								_this.do_item(2,res.item)
							}else{
								console.log('点击了取消');
							}
						}
					})
						break;
					case 4:
					uni.showModal({
						title:'停用项目',
						content:'您确定要停用项目吗？停用后将无法查看到您的项目。请您谨慎操作！',
						cancelColor:'#B8B8B8',
						confirmColor:'#02AAAB',
						success(res1) {
							if (res1.confirm) {
								_this.do_item(3,res.item,4,res.index,1)
							}else{
								console.log('点击了取消');
							}
						}
					})
					break;
					case 5:
					uni.showModal({
						title:'删除项目',
						content:'您确定要删除项目吗？删除后将无法找回您的项目。请您谨慎操作！',
						cancelColor:'#B8B8B8',
						confirmColor:'#02AAAB',
						success(res1) {
							if (res1.confirm) {
								_this.do_item(4,res.item,'',res.index)
							}else{
								console.log('点击了取消');
							}
						}
					})
						break;
					default:
						break;
				}
			},
			async do_item(type,item,status,index = '',is_update = 0){
				let params = {
					id:item.id,
					type
				}
				const data = await _this.$post('port/handle_item',params)
				if (data.code == 200) {
					this.$u.toast(data.msg)
					if (status && index !== '' && is_update == 1) {
						_this.xm_lists[index]['status'] = status
						// item.status = status
					}
					if (index !== '' && is_update == 0) {
						_this.xm_lists.splice(index,1)
					}
					if (type == 4) {
						_this.get_user_info()
					}
				} else {
					this.$u.toast(data.msg)
				}
			},
			loginAfter(result){
				console.log('loginAfter',result);
				_this.get_user_info()
			},
			copy(){
				uni.setClipboardData({
					data: _this.user.re_key,
					success: function () {
						uni.$u.toast('复制成功');
					}
				});
			},
			goLogin(){
				uni.navigateTo({
					url: '/pages/index/login'
				});
			},
			goNext(page){
				if (_this.user_id == 0) {
					// _this.$refs.wx_login.loginShow = true
					uni.navigateTo({
						url: '/pages/index/login'
					});
					return
				}
				_this.toNext(page)
			},
			//获取用户信息
			async get_user_info() {
				if (_this.user_id > 0) {
					const data = await _this.$post('port/user_info')
					if (data.code == 200) {
						this.user = data.result.user
						this.resume = data.result.resume
						this.online = data.result.user.is_online
						//存入用户信息
						this.$u.vuex('current_user', data.result.user)
					} else {
						this.$u.toast(data.msg)
					}
				}
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 500)
				if (_this.load) {
					_this.load = false
				}
			},
			async get_items_list() {
				const data = await _this.$post('port/get_items_list', _this.xm_form)
				if (data.code == 200) {
					_this.xm_lists.push(...data.result.list)
					_this.hasMore = data.result.list.length >= _this.xm_form.pageSize
				} else {
					_this.hasMore = false
				}
			},
			clickKfTab(item) {
				if (_this.kf_form.type != item.type) {
					_this.kf_form.type = item.type
					_this.kf_form.pageIndex = 1
					_this.kf_lists = []
					_this.get_gt_list()
				}
			},
			async get_gt_list() {
				const data = await _this.$post('port/items_gt_list', _this.kf_form)
				if (data.code == 200) {
					_this.kf_lists.push(...data.result.list)
					_this.hasMore = data.result.list.length >= _this.kf_form.pageSize
				} else {
					_this.hasMore = false
				}
			},
			kfItemClick(res){
				console.log('点击客服项',res);
				// let {item} = res
				// if (item.type == 1) {
				// 	_this.toNext(`/pages/index/detail?id=${item.id}`)
				// }else{
				// 	_this.toNext(`/pages/talents/detail?id=${item.id}`)
				// }
			},
			async lx_kefu(){
				const data = await _this.$post('port/lx_kefu')
				if (data.code == 200) {
					let id = data.result.id
					let kf_name = data.result.kf_name
					_this.toNext(`/pages/message/private_chat?id=kf_${id}&title=${kf_name}`)
				} else {
					this.$u.toast(data.msg)
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "static/css/user.scss";
	.container{
		position: relative;
		.user-top{
			background:linear-gradient(0deg,#efefef 0%, #f6f6f6 25%, #1abfc0 100%);
			box-sizing: border-box;
			.nav-title{
				.nav-title-inner{
					height: 44px;
					color: #fff;
					font-size: 32rpx;
					font-weight: bold;
					@include flex-box(row,center,center);
				}
			}
			.my-top {
				padding: 0 30rpx;
				display: flex;
				position: relative;
				.left{
					margin-right: 20rpx;
					.head-img{
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						box-sizing: border-box;
					}
				}
				.center{
					color: #050200;
					align-self: center;
					flex: 1;
					overflow: hidden;
					.center-nickname{
						@include flex-box();
						width: calc(100% - 160rpx);
						&.kf-nickname{
							width: calc(100% - 100rpx);
						}
						.nickname-text{
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							font-size: 38rpx;
							font-weight: bold;
							color: #050200;
						}
					}
					.center-bot{
						margin-top: 10rpx;
						color: #415556;
						display: inline-flex;
						align-items: center;
						image{
							width: 28rpx;
							margin-left: 10rpx;
						}
					}
				}
				.right{
					position: absolute;
					right: 28rpx;
					top: 0;
					@include flex-box();
					.right-item{
						@include flex-box(column,center,center);
						background: none;
						line-height: unset;
						margin: 0;
						padding: 0;
						&:not(:last-child){
							margin-right: 20rpx;
						}
						image{
							width: 38rpx;
						}
						text{
							font-size: 24rpx;
							color: #141414;
						}
					}
				}
			}
			.user-top-items{
				@include flex-box();
				margin-top: 20rpx;
				.user-top-item{
					flex: 1;
					@include flex-box(column,center,center);
					.num-text{
						font-size: 36rpx;
						font-weight: bold;
						color: #171717;
					}
					.sub-text{
						margin-top: 10rpx;
						color: #555555;
						font-size: 24rpx;
					}
				}
			}
			.user-top-bot{
				border-radius: 16rpx;
				padding: 20rpx 30rpx;
				background: #fff;
				@include flex-box(row,null,center);
				margin: 20rpx 15rpx 0 15rpx;
				image{
					width: 60rpx;
				}
				.user-top-bot-center{
					flex: 1;
					margin-left: 20rpx;
					.tit{
						font-size: 30rpx;
						color: #141414;
						font-weight: 600;
					}
					.sub-tit{
						font-size: 24rpx;
						color: #757575;
					}
				}
				button{
					padding: 0;
					width: 124rpx;
					height: 58rpx;
					line-height: 58rpx;
					border-radius: 30rpx;
					color: #fff;
					background: $theme-color;
					font-size: 24rpx;
				}
			}
		}
		.info{
			// background: #fff;
			border-radius: $border-radius;
			// margin: 0 15rpx;
			.info-title{
				line-height: 76rpx;
				font-size: 30rpx;
				color: #141414;
				font-weight: bold;
				padding: 0 15rpx;
			}
			.tabs-info{
				background: #fff;
				height: 88rpx;
			}
			.items{
				padding: 0 15rpx 0 15rpx;
				.jl-item-container{
					.jl-item{
						padding:30rpx 22rpx;
						background: #fff;
						border-radius: 16rpx;
						>view{
							&:not(:first-child){
								display: flex;
								flex-wrap: wrap;
								margin-top: 20rpx;
							}
						}
						&-title{
							display: flex;
							justify-content: space-between;
							.left{
								text{
									font-size: 34rpx;
									font-weight: 500;
									&:not(:last-child){
										margin-right: 10rpx;
									}
								}
							}
							.center{
								width: 160rpx;
							}
							.right{
								color: #02ABAB;
								font-size: 30rpx;
								font-weight: bold;
								flex-shrink: 0;
							}
						}
						&-tab{
							.tab-item{
								background: #EFEFEF;
								color: #5E5E5E;
								padding: 4rpx 12rpx;
								border-radius:6rpx;
								font-size:24rpx;
								&:not(:first-child){
									margin-left: 10rpx;
								}
							}
						}
						&-bot{
							align-items: center;
							justify-content: space-between;
							&.column{
								flex-direction: column;
								align-items: flex-start;
							}
							.left-error-item{
								display: flex;
								align-items: center;
								margin-bottom: 10rpx;
								.left-icon{
									width: 34rpx;
								}
								text{
									font-size: 26rpx;
									margin-left: 8rpx;
									&.red-text{
										color: #E92129;
									}
								}
							}
							.left{
								.left-item{
									display: flex;
									align-items: center;
									&:not(:last-child){
										margin-bottom: 26rpx;
									}
									.left-icon{
										width: 34rpx;
									}
									text{
										font-size: 26rpx;
										margin-left: 8rpx;
										&.blue-text{
											color: #2F94FF;
										}
										&.success-text{
											color: #12A70B;
										}
										&.theme-text{
											color: #02AAAB;
										}
										&.red-text{
											color: #E92129;
										}
										&.yellow-text{
											color: #FF9900;
										}
									}
								}
							}
							.right{
								align-self: flex-end;
								button{
									display: inline-flex;
									align-items: center;
									height: 52rpx;
									line-height: 52rpx;
									padding: 0 20rpx;
									border-radius: 8rpx;
									&:not(:last-child){
										margin-right: 14rpx;
									}
									&.theme-btn{
										background: #02AAAB;
										color: #fff;
									}
									&.ty-btn{
										background: #fff9f1;
										color: #FF9900;
										border: 2rpx solid #FF9900;
									}
									&.qy-btn{
										background: #F5FFF5;
										color: #12A70B;
										border: 2rpx solid #12A70B;
									}
									.right-icon{
										width: 32rpx;
										margin-right: 8rpx;
									}
								}
							}
						}
					}
				}
			}
			.items-p{
				padding: 15rpx 15rpx 0 15rpx;
			}
		}
		.empty-container{
			border-radius: 15rpx;
			background: #fff;
			padding: 120rpx 0;
		}
	}
</style>
