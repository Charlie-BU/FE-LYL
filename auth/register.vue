<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<view class="login reg" v-else>
			<view class="info">
				<view class="info-top">
					<view class="title">用户注册</view>
				</view>
				<view class="info-form">
					<view class="form-rows">
						<view class="form-row">
							<view class="row-left">
								<image src="/static/phone.png" mode="widthFix" class="row-left-icon"/>
							</view>
							<view class="row-input">
								<u-input
								    placeholder="请输入手机号码"
									border="none"
									type="number"
									placeholderClass="placeholder28"
									v-model="form.mobile"
								    clearable />
							</view>
						</view>
						<view class="form-row" v-if="regis_sms_enable==1">
							<view class="row-left">
								<image src="/static/code.png" mode="widthFix" class="row-left-icon"/>
							</view>
							<view class="row-input">
								<u-input
								    placeholder="请输入验证码"
									border="none"
									type="number"
									maxlength="6"
									placeholderClass="placeholder28"
									v-model="form.code"
								    clearable />
							</view>
							<button type="default" size="mini" :disabled="codeDisabled" @click="getCode" class="code-btn">{{tips}}</button>
						</view>
						<view class="form-row">
							<view class="row-left">
								<image src="/static/mima.png" mode="widthFix" class="row-left-icon"/>
							</view>
							<view class="row-input">
								<u-input
								    placeholder="请输入密码"
									border="none"
									password
									placeholderClass="placeholder28"
									v-model="form.password"
								    clearable />
							</view>
						</view>
						<view class="form-row">
							<view class="row-left">
								<image src="/static/yqm.png" mode="widthFix" class="row-left-icon"/>
							</view>
							<view class="row-input">
								<u-input
								    placeholder="请输入邀请码"
									border="none"
									type="number"
									placeholderClass="placeholder28"
									v-model="form.rekey"
								    clearable />
							</view>
						</view>
					</view>
					<view style="height: 30rpx;"></view>
					<view class="form-bot-btns">
						<button class="login-btn" @click="submit" :disabled="btnDisabled">注册</button>
						<button class="reg-btn" @click="toLogin">已有账号，立即登录</button>
					</view>
				</view>
			</view>
			<view class="xieyi" @click="goXieYi()">
				<image @click.stop="changeXieyi" :src="xieyi?'https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/checkbox_select.png':'https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/checkbox_unselect.png'" mode="widthFix" class="check-img"/>
				<text>我已阅读并同意</text>
				<text class="theme">《注册协议》</text>
			</view>
		</view>
		<u-code ref="uCode1" startText="获取验证码" :seconds="sms_time_out" @change="codeChange" change-text="Xs"
										@start="codeDisabled = true" @end="codeDisabled = false"></u-code>
	</view>
</template>

<script>
	var validate = require("@/components/validate/validate.js");
	var _this;
	export default {
		data() {
			return {
				form:{
					step:1,
					mobile:'',
					code:'',
					password:'',
					rekey:'',
				},
				tips:'获取验证码',
				xieyi:false,
				codeDisabled:false,
				btnDisabled:false,
				regis_sms_enable:0,
				sms_time_out:60,
				hasReKey:false
			}
		},
		onLoad(e) {
			_this = this;
			if(this.user_id>0){
				uni.switchTab({
					url:'/pages/my/my'
				})
				return
			}
			if (e.rekey) {
				_this.form.rekey = e.rekey
				_this.hasReKey = true
			}
			_this.register()
		},
		methods: {
			changeXieyi(){
				_this.xieyi=!_this.xieyi
			},
			submit(){
				_this.form.step = 2
				_this.register()
			},
			async register(){
				if (_this.form.step==2) {
					let codeRule = {
						// 字段名
						name: 'code',
						rules: ['require', 'integer', 'min:6'],
						errorMsg: {
							require: '请输入验证码',
							integer: '验证码只能为数字',
							min: '验证码为6位'
						}
					}
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
							require: '请输入密码',
							min: '密码最少3位'
						}
					},
					{
						// 字段名
						name: 'rekey',
						rules: ['require'],
						errorMsg: {
							require: '请输入邀请码',
						}
					}];
					if (this.regis_sms_enable == 1) {
						rule.splice(1,0,codeRule)
					}
					// 是否全部通过，返回Boolean
					let checked = validate.check(this.form, rule);
					if (!checked) {
						// 获取错误信息
						let err = validate.getError();
						uni.$u.toast(err[0])
						return;
					}
					if(!this.xieyi){
						uni.$u.toast('请阅读并同意注册协议')
						return;
					}
					_this.btnDisabled = true
					setTimeout(()=>{
						_this.btnDisabled = false
					},2000)
				}
				const data = await _this.$post('port/zhuce',this.form)
				if (data.code == 200) {
					//是直接扫码进来的
					if (_this.hasReKey){
						//存入用户信息
						this.$u.vuex('user_id', data.result.user_id)
						//存入token
						this.$u.vuex('user_token', data.result.token)
						this.$u.toast(data.msg,()=>{
							this.$u.route({
								url: "pages/index/index",
								type: "reLaunch"
							})
						})
					}else{
						this.$u.toast(data.msg,()=>{
							_this.finish()
						})
					}
				} else if(data.code == -1){
					_this.regis_sms_enable = data.result.regis_sms_enable
					_this.sms_time_out = data.result.sms_time_out
					if (_this.load) {
						_this.load = false
					}
				}else {
					this.$u.toast(data.msg)
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
						scene: 2
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
			goXieYi(){
				let url = encodeURIComponent('/port/xieyi_xq?id=1')
				_this.toNext(`/pages/index/html-detail?title=注册协议&url=${url}`)
			},
			toLogin(){
				if (_this.hasReKey) {
					this.$u.route({
						url: "login",
						type: "reLaunch"
					})
				} else{
					_this.finish()
				}
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
	page{
		background: #fff;
	}
	.container {
		height: 100%;
	}
</style>
