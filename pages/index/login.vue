<template>
	<view class="container">
		<view class="login">
			<view class="login-logo">
				<image src="@/static/logo.png" mode="widthFix"/>
			</view>
			<view class="login-btns">
				<!-- #ifdef MP-WEIXIN -->
				<button class="xcx-btn" v-if="!checkbox" @click="denglu">手机号快捷登录</button>
				<button class="xcx-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-else>手机号快捷登录</button>
				<!-- #endif -->
				<button class="mobile-btn" @click="toNext('/auth/mobile-login')">手机号/用户名登录</button>
			</view>
			<view style="height: 89rpx;"></view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="login-xieyi">
				<image 
				:src="checkbox ? '/static/common/checkbox_select.png' : '/static/common/checkbox_unselect.png'" 
				mode="widthFix" 
				@click="checkbox = !checkbox"
				class="xieyi-img"/>
				<view class="xieyi-text">
					<text>我已阅读并同意</text>
					<text class="theme-text" @click="goXieYi(1)">《利易联用户协议》</text>
					<text>和</text>
					<text class="theme-text" @click="goXieYi(2)">《隐私政策》</text>
				</view>
			</view>
			<!-- #endif -->
		</view>
		<view class="login-bot" @click="toNext('/auth/kefu-login')">让工作 · 更自由</view>
	</view>
</template>

<script>
	var validate = require("@/components/validate/validate.js");
	var _this;
	export default {
		data() {
			return {
				checkbox:false
			}
		},
		onLoad(e) {
			_this = this;
			// #ifdef H5
			let url = window.location.href.split('#')[0];
			let serch = url.split('?')[1];
			let is_out = e.is_out || 0
			if(serch && is_out==0){
			    let arr = serch.split('&');
			    let code = arr[0].split('code=')[1];
			        if(code){
			            //进行登录验证
						// uni.showModal({
						// 	title:'提示',
						// 	content:code,
						// 	success(res) {
						// 		if (res.confirm) {
						// 			uni.$u.toast('复制成功')
						// 			uni.setClipboardData({
						// 				data:code
						// 			})
						// 		}
						// 	}
						// })
						_this.wx_denglu(code)
			        }
			}
			// #endif
			if(this.user_id>0){
				uni.switchTab({
					url:'/pages/index/index'
				})
				return
			}
			// #ifdef MP-WEIXIN
			_this.login()
			// #endif
		},
		methods: {
			async login(){
				uni.login({
				  provider: 'weixin',
				  onlyAuthorize:true,
				  success(loginRes) {
					_this.wx_login(loginRes.code)
				  },fail(fail) {
					console.log(fail)
				  }
				});
			},
			async wx_login(code){
				let res = {'code':code}
				const data = await _this.$post('port/get_wx_xcx_data',res)
				if(data.code==200){
					let unionid=data.result.unionid
					let xcx_openid=data.result.xcx_openid
					let session_key=data.result.session_key
					if (unionid) {
						uni.setStorageSync('unionid',unionid)
					}
					uni.setStorageSync('xcx_openid',xcx_openid)
					uni.setStorageSync('session_key',session_key)
				}
			},
			denglu(){
				if (!_this.checkbox) {
					uni.$u.toast('请阅读并同意协议')
					return;
				}
			},
			loginAfter(result){
				console.log('loginAfter',result);
				this.$u.route({
					url: "pages/index/index",
					type: "reLaunch"
				})
			},
			async doLogin(){
				var rule = [{
						// 字段名
						name: 'mobile',
						rules: ['require', 'mobile'],
						errorMsg: {
							require: '请输入手机号码',
							mobile: '手机号码格式有误',
						}
					},
					{
						// 字段名
						name: 'password',
						rules: ['require', 'min:3'],
						errorMsg: {
							require: '密码不能为空',
							min: '密码最少3位'
						}
					}
				];
				// 是否全部通过，返回Boolean
				let checked = validate.check(_this.form, rule);
				if (!checked) {
					// 获取错误信息
					let err = validate.getError();
					uni.$u.toast(err[0])
					return;
				}
				_this.disabled=true
				const data = await _this.$post('port/denglu',_this.form)
				if (data.code == 200) {
					//存入用户信息
					this.$u.vuex('user_id', data.result.user_id)
					//存入token
					this.$u.vuex('user_token', data.result.token)
					setTimeout(() => {
						this.$u.route({
							url: "pages/index/index",
							type: "reLaunch"
						})
					}, 1000)
					uni.$u.toast(data.msg)
				} else {
					uni.$u.toast(data.msg)
				}
				setTimeout(() => {
					_this.disabled=false
				}, 2000)
			},
			async getPhoneNumber(e){
				if(e.target.errMsg=="getPhoneNumber:ok"){
					this.loginDisabled=true
					let res={
						'encryptedData':e.target.encryptedData,
						'iv':e.target.iv,
						'session_key':uni.getStorageSync('session_key'),
						'unionid':uni.getStorageSync('unionid'),
						'xcx_openid':uni.getStorageSync('xcx_openid'),
						'reid':uni.getStorageSync('reid') || "",
					}
					const data = await this.$post('port/weixin_mobile',res)
					if (data.code==200) {
						//存入用户信息
						this.$u.vuex('user_id',data.result.user_id)
						//存入token
						this.$u.vuex('user_token', data.result.user_token)
						_this.toNext(`/my/change-identity?is_kf=${data.result.is_kf}`,true)
					}else{
						uni.$u.toast(data.msg)
					}
				}else{
					uni.$u.toast('获取失败')
					this.loginShow=false
				}
			},
			goXieYi(type){
				let title = '用户协议'
				let id = 1
				if (type == 2) {
					title = '隐私政策'
					id = 3
				}
				let url = encodeURIComponent(`/port/xieyi_xq?id=${id}`)
				_this.toNext(`/pages/index/html-detail?title=${title}&url=${url}`)
			}
		}
	}
</script>
<!-- #ifndef H5 -->
<style>
	page{
		background: #fff;
	}
</style>
<!-- #endif -->
<style lang="scss" scoped>
	@import "@/auth/static/css/login.scss";
	.container {
		height: 100%;
		background: #fff;
		position: relative;
		.login-bot{
			position: absolute;
			width: 100%;
			bottom: 80rpx;
			text-align: center;
			color: $theme-color;
		}
	}
</style>
