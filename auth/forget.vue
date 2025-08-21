<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<view class="login reg" v-else>
			<view class="info">
				<view class="info-top">
					<view class="title">忘记密码</view>
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
						<view class="form-row">
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
							<button type="default" size="mini" class="code-btn" @click="getCode" :disabled="codeDisabled">{{tips}}</button>
						</view>
						<view class="form-row">
							<view class="row-left">
								<image src="/static/mima.png" mode="widthFix" class="row-left-icon"/>
							</view>
							<view class="row-input">
								<u-input
								    placeholder="请输入新密码"
									border="none"
									placeholderClass="placeholder28"
									password
									v-model="form.password"
								    clearable />
							</view>
						</view>
						<view class="form-row">
							<view class="row-left">
								<image src="/static/mima.png" mode="widthFix" class="row-left-icon"/>
							</view>
							<view class="row-input">
								<u-input
								    placeholder="请再次输入新密码"
									border="none"
									password
									placeholderClass="placeholder28"
									v-model="form.conpassword"
								    clearable />
							</view>
						</view>
					</view>
					<view style="height: 30rpx;"></view>
					<view class="form-bot-btns">
						<button class="login-btn"  @click="submit()" :disabled="btnDisabled">确定</button>
					</view>
				</view>
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
					conpassword:'',
				},
				tips:'获取验证码',
				codeDisabled:false,
				btnDisabled:false,
				sms_time_out:60,
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
			_this.doForget()
		},
		methods: {
			changeXieyi(){
				_this.xieyi=!_this.xieyi
			},
			close(){
				uni.navigateBack()
			},
			submit(){
				_this.form.step = 2
				_this.doForget()
			},
			//点击了确定
			async doForget(){
				if (_this.form.step == 2) {
					var rule = [{
						name: 'mobile',
						rules: ['require', 'mobile'],
						errorMsg: {
							require: '请输入手机号码',
							mobile: '手机号码格式有误',
						}
					},
					{
						name: 'code',
						rules: ['require', 'integer', 'min:6'],
						errorMsg: {
							require: '请输入验证码',
							integer: '验证码只能为数字',
							min: '验证码为6位'
						}
					},
					{
						name: 'password',
						rules: ['require', 'min:3'],
						errorMsg: {
							require: '请输入新密码',
							min: '密码最少3位'
						}
					},
					{
						name: 'conpassword',
						rules: ['require', 'confirm:password'],
						errorMsg: {
							require: '请再次输入新密码',
							confirm: '两次密码输入不一致'
						}
					}];
					// 是否全部通过，返回Boolean
					let checked = validate.check(this.form, rule);
					if (!checked) {
						// 获取错误信息
						let err = validate.getError();
						uni.$u.toast(err[0])
						return;
					}
					_this.btnDisabled = true
					setTimeout(()=>{
						_this.btnDisabled = false
					},2000)
				}
				const data = await _this.$post('port/forget',this.form)
				if (data.code == 200) {
					this.$u.toast(data.msg,()=>{
						_this.finish()
					})
				}else if(data.code == -1){
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
						scene: 3
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
