<template>
	<view class="container">
		<view class="login">
			<view class="login-top">
				<view class="title-text">手机号登录</view>
				<view class="sub-title-text">首次登录将自动注册</view>
			</view>
			<view class="info">
				<view class="info-form">
					<view class="form-rows">
						<view class="form-row">
							<view class="row-left">
								<image src="@/auth/static/image/phone.png" mode="widthFix" class="row-left-icon" />
							</view>
							<view class="row-input">
								<u-input placeholder="请输入手机号码" border="none" type="number"
									placeholderClass="placeholder28" v-model="form.mobile" @input="input" clearable />
							</view>
						</view>
						<view class="form-row">
							<view class="row-left">
								<image src="@/auth/static/image/mima.png" mode="widthFix" class="row-left-icon" />
							</view>
							<view class="row-input">
								<u-input placeholder="请输入密码" border="none" placeholderClass="placeholder28"
									v-model="form.password" password @input="input" clearable />
							</view>
						</view>
					</view>
					<!-- #ifndef MP-WEIXIN -->
					<view class="form-bot-text" @click="toNext('forget')">忘记密码？</view>
					<!-- #endif -->
					<view class="form-bot-btns">
						<button class="login-btn" :disabled="disabled" @click="doLogin">登录</button>
						<!-- #ifndef MP-WEIXIN -->
						<button class="reg-btn" @click="toNext('register')">没有账号，立即注册</button>
						<!-- #endif -->
					</view>
				</view>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="wx-login" @click="xcx_denglu()">
				<image src="https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/weixin.png" mode="widthFix"
					class="icon-img" />
				<view class="wx-login-text">微信登录</view>
			</view>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="wx-login" @click="wx_denglu('')" v-if="is_wx">
				<image src="https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/weixin.png" mode="widthFix"
					class="icon-img" />
				<view class="wx-login-text">微信登录</view>
			</view>
			<!-- #endif -->
		</view>
		<wxLogin ref="wx_login" @loginAfter="loginAfter"></wxLogin>
	</view>
</template>

<script>
import wxLogin from "@/components/wx-login/wx-login.vue"
var validate = require("@/components/validate/validate.js");
var _this;
export default {
	data() {
		return {
			form: {
				mobile: '',
				password: '',
			},
			disabled: true
		}
	},
	onLoad(e) {
		_this = this;
		// #ifdef H5
		let url = window.location.href.split('#')[0];
		let serch = url.split('?')[1];
		let is_out = e.is_out || 0
		if (serch && is_out == 0) {
			let arr = serch.split('&');
			let code = arr[0].split('code=')[1];
			if (code) {
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
		// if(this.user_id>0){
		// 	uni.switchTab({
		// 		url:'/pages/index/index'
		// 	})
		// 	return
		// }
	},
	components: {
		wxLogin
	},
	methods: {
		loginAfter(result) {
			console.log('loginAfter', result);
			this.$u.route({
				url: "pages/index/index",
				type: "reLaunch"
			})
		},
		xcx_denglu() {
			this.$refs.wx_login.loginShow = true
		},
		input(e) {
			//单独验证使用
			let check = validate.checkResult('mobile', this.form.mobile);
			if (check && this.form.password.length >= 3) {
				_this.disabled = false
			} else {
				_this.disabled = true
			}
		},
		async wx_denglu(code) {
			_this.disabled = true
			setTimeout(() => {
				_this.disabled = false
			}, 2000)
			let params = {
				code
			}
			const data = await _this.$post('port/wx_h5_denglu', params)
			if (data.code == 100) {
				let url = data.result.url
				// window.location.href = url
				window.location.replace(url)
			} else if (data.code == 200) {
				uni.$u.toast(data.msg, () => {
					// uni.reLaunch({
					// 	url:'/pages/index/index'
					// })
					window.location.replace('/#/pages/index/index')
				})
				//存入用户信息
				this.$u.vuex('user_id', data.result.user_id)
				//存入token
				this.$u.vuex('user_token', data.result.token)
			} else if (data.code == -50) {
				uni.setStorageSync('openid', data.result.openid)
				uni.$u.toast(data.msg, () => {
					_this.toNext('bind-mobile')
				})
			} else {
				uni.$u.toast(data.msg)
			}
		},
		async doLogin() {
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
			_this.disabled = true
			const data = await _this.$post('port/denglu', _this.form)
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
				_this.disabled = false
			}, 2000)
		}
	}
}
</script>
<!-- #ifndef H5 -->
<style>
page {
	background: #fff;
}
</style>
<!-- #endif -->
<style lang="scss" scoped>
@import "static/css/login.scss";

.container {
	height: 100%;
	background: #fff;
}
</style>
