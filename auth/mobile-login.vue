<template>
	<view class="container">
		<view class="login">
			<view class="login-top">
				<view class="title-text">手机号登录</view>
				<view class="sub-title-text">首次登录将自动注册</view>
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
					<view class="form-row" v-if="false">
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
					<view class="form-row">
						<view class="row-input">
							<u-input
							    placeholder="请输入短信验证码"
								border="none"
								type="number"
								maxlength="6"
								placeholderClass="placeholder30"
								v-model="form.code"
							    clearable />
						</view>
						<button type="default" size="mini" :disabled="codeDisabled" @click="getCode" class="code-btn">{{tips}}</button>
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
					<button class="login-btn" :disabled="disabled" @click="submit">登录</button>
				</view>
			</view>
		</view>
		<wxLogin ref="wx_login" @loginAfter="loginAfter"></wxLogin>
		<u-code ref="uCode1" startText="获取验证码" :seconds="sms_time_out" @change="codeChange" change-text="Xs"
										@start="codeDisabled = true" @end="codeDisabled = false"></u-code>
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
					step:1,
					mobile:'',
					code:'',
				},
				sms_time_out:60,
				tips:'获取验证码',
				codeDisabled:false,
				disabled:false,
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
			// if(this.user_id>0){
			// 	uni.switchTab({
			// 		url:'/pages/index/index'
			// 	})
			// 	return
			// }
			
			_this.doLogin()
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
					this.$u.vuex('user_token', data.result.user_token)
				}else{
					uni.$u.toast(data.msg)
				}
			},
			submit(){
				_this.form.step = 2
				_this.doLogin()
			},
			async doLogin(){
				if (_this.form.step == 2) {
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
							name: 'code',
							rules: ['require', 'integer', 'min:6'],
							errorMsg: {
								require: '请输入验证码',
								integer: '验证码只能为数字',
								min: '验证码为6位'
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
					_this.disabled = true
					setTimeout(() => {
						_this.disabled=false
					}, 2000)
				}
				const data = await _this.$post('port/denglu',_this.form)
				if (data.code == 200) {
					//存入用户信息
					this.$u.vuex('user_id', data.result.user_id)
					//存入token
					this.$u.vuex('user_token', data.result.user_token)
					uni.$u.toast(data.msg,()=>{
						_this.toNext(`/my/change-identity?is_kf=${data.result.is_kf}`,true)
					})
				} else if(data.code == -1){
					_this.sms_time_out = data.result.sms_time_out
					if (_this.load) {
						_this.load = false
					}
				}else {
					uni.$u.toast(data.msg)
				}
			},
			//获取验证码
			async getCode() {
				//单独验证使用
				let check = validate.checkResult('mobile', this.form.mobile);
				if (!check) {
					uni.$u.toast("手机号码格式有误")
					return
				}
				if (this.$refs.uCode1.canGetCode) {
					const params = {
						mobile: this.form.mobile,
						scene: 1
					}
					const data = await _this.$post('port/send_code',params)
					if (data.code == 200) {
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('发送成功');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode1.start();
					} else {
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast(data.msg);
					}
				} else {
					uni.$u.toast('请倒计时结束后再发送');
				}
			},
			codeChange(text) {
				this.tips = text;
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
