<template>
	<view class="container">
		<view class="login">
			<view class="login-top">
				<view class="title-text">客服登录</view>
				<view class="sub-title-text">拥有客服账号可登录</view>
			</view>
			<view class="login-form">
				<view class="form-rows">
					<view class="form-row">
						<view class="row-input">
							<u-input
							    placeholder="请输入手机号"
								border="none"
								type="number"
								placeholderClass="placeholder30"
								v-model="form.mobile"
							    clearable />
						</view>
					</view>
					<view class="form-row">
						<view class="row-input">
							<u-input
							    placeholder="请输入密码"
								border="none"
								placeholderClass="placeholder30"
								v-model="form.password"
								password
							    clearable />
						</view>
					</view>
				</view>
				<view style="height: 88rpx;"></view>
				<view class="login-xieyi p-0">
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
				<view class="form-bot-btns">
					<button class="login-btn" :disabled="disabled" @click="doLogin">登录</button>
				</view>
			</view>
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
				form:{
					mobile:'',
					password:'',
				},
				disabled:false,
				checkbox:false
			}
		},
		onLoad(e) {
			_this = this;
		},
		components:{
			wxLogin
		},
		methods: {
			loginAfter(result){
				console.log('loginAfter',result);
				this.$u.route({
					url: "pages/index/index",
					type: "reLaunch"
				})
			},
			xcx_denglu(){
				this.$refs.wx_login.loginShow = true
			},
			input(e){
				//单独验证使用
				let check = validate.checkResult('mobile', this.form.mobile);
				if (check && this.form.password.length>=3) {
					_this.disabled=false
				} else{
					_this.disabled=true
				}
			},
			async wx_denglu(code){
				_this.disabled=true
				setTimeout(() => {
					_this.disabled=false
				}, 2000)
				let params = {
					code
				}
				const data = await _this.$post('port/wx_h5_denglu',params)
				if (data.code==100) {
					let url = data.result.url
					// window.location.href = url
					window.location.replace(url)
				} else if (data.code==200) {
					uni.$u.toast(data.msg,()=>{
						// uni.reLaunch({
						// 	url:'/pages/index/index'
						// })
						window.location.replace('/#/pages/index/index')
					})
					//存入用户信息
					this.$u.vuex('user_id', data.result.user_id)
					//存入token
					this.$u.vuex('user_token', data.result.token)
				}else if (data.code==-50) {
					uni.setStorageSync('openid',data.result.openid)
					uni.$u.toast(data.msg,()=>{
						_this.toNext('bind-mobile')
					})
				}else{
					uni.$u.toast(data.msg)
				}
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
				if (!_this.checkbox) {
					uni.$u.toast('请阅读并同意协议')
					return;
				}
				_this.disabled=true
				const data = await _this.$post('port/kf_denglu',_this.form)
				if (data.code == 200) {
					//存入用户信息
					this.$u.vuex('user_id', data.result.user_id)
					//存入token
					this.$u.vuex('user_token', data.result.user_token)
					this.$u.vuex('identity',3)
					uni.$u.toast(data.msg,()=>{
						uni.reLaunch({
							url: '/pages/index/index'
						});
					})
				} else {
					uni.$u.toast(data.msg)
				}
				setTimeout(() => {
					_this.disabled=false
				}, 2000)
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
	@import "static/css/login.scss";
	.container {
		height: 100%;
		background: #fff;
	}
</style>
