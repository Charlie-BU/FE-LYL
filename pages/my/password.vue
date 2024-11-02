<template>
	<view class="container">
		<u-loading-page
		:loading="true" 
		v-if="load"
		fontSize="28rpx" />
		<block v-else>
		<view class="top-border"></view>
		<view class="inner">
			<view class="form">
				<view class="form-row">
					<text class="row-left">手机号</text>
					<view class="row-input">{{mobile}}</view>
				</view>
				<view class="form-row" v-if="edit_pwd_sms_enable==1">
					<text class="row-left">验证码</text>
					<view class="row-input">
						<u-input
						    placeholder="请输入验证码"
							border="none"
							type="number"
							maxlength="6"
							placeholderClass="placeholder30"
							v-model="form.code"
						    clearable />
					</view>
					<button type="default" size="mini" class="code-btn" :disabled="codeDisabled" @click="getCode">{{tips}}</button>
				</view>
				<view class="form-row" v-else>
					<text class="row-left">原密码</text>
					<view class="row-input">
						<u-input
						    placeholder="请输入原密码"
							border="none"
							password
							placeholderClass="placeholder30"
							v-model="form.oldpassword"
						    clearable />
					</view>
				</view>
				<view class="form-row">
					<text class="row-left">新密码</text>
					<view class="row-input">
						<u-input
						    placeholder="请输入新密码"
							border="none"
							password
							placeholderClass="placeholder30"
							v-model="form.newpass"
						    clearable />
					</view>
				</view>
				<view class="form-row">
					<text class="row-left">确认密码</text>
					<view class="row-input">
						<u-input
						    placeholder="请输入确认密码"
							border="none"
							password
							placeholderClass="placeholder30"
							v-model="form.conpassword"
						    clearable />
					</view>
				</view>
			</view>
			<view class="submit">
				<button type="default" class="submit-btn" @click="submit"
					:disabled="submitDisabled">保存</button>
			</view>
		</view>
		</block>
		<u-code ref="uCode1" startText="获取验证码" :seconds="sms_time_out" @change="codeChange" keep-running change-text="Xs"
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
					oldpassword:'',
					newpass:'',
					conpassword:'',
					code:'',
				},
				mobile:'',
				edit_pwd_sms_enable:0,
				sms_time_out:60,
				isPassword:true,
				submitDisabled:false,
				tips:'获取验证码',
				codeDisabled:false,
			}
		},
		onLoad(e) {
			_this = this;
			_this.tijiao()
		},
		methods: {
			submit(){
				_this.form.step = 2
				_this.tijiao()
			},
			//提交
			async tijiao(){
				if (_this.form.step == 2) {
					let oldPass = {
						name: 'oldpassword',
						rules: ['require', 'min:6'],
						errorMsg: {
							require: '请输入原密码',
							min: '原密码最少6位'
						}
					}
					let codeRule = {
						name: 'code',
						rules: ['require', 'integer', 'min:6'],
						errorMsg: {
							require: '请输入验证码',
							integer: '验证码只能为数字',
							min: '验证码为6位'
						}
					}
					var rule = [
					{
						name: 'newpass',
						rules: ['require', 'min:6'],
						errorMsg: {
							require: '请输入新密码',
							min: '新密码最少6位'
						}
					},
					{
						name: 'conpassword',
						rules: ['require', 'confirm:newpass'],
						errorMsg: {
							require: '请输入确认密码',
							confirm: '两次密码输入不一致'
						}
					}];
					if (this.edit_pwd_sms_enable == 1) {
						rule.unshift(codeRule);
					}else{
						rule.unshift(oldPass)
					}
					// 是否全部通过，返回Boolean
					let checked = validate.check(this.form, rule);
					if (!checked) {
						// 获取错误信息
						let err = validate.getError();
						uni.$u.toast(err[0])
						return;
					}
					_this.submitDisabled = true
					setTimeout(()=>{
						_this.submitDisabled = false
					},2000)
				}
				const data = await _this.$post('port/set-password',_this.form)
				if (data.code==200) {
					uni.$u.toast(data.msg,()=>{
						_this.finish()
					})
				}else if(data.code == -50){
					uni.$u.toast(data.msg,()=>{
						_this.finish()
					})
				}else if(data.code == -1){
					_this.mobile = data.result.result.mobile
					_this.edit_pwd_sms_enable = data.result.result.edit_pwd_sms_enable
					_this.sms_time_out = data.result.result.sms_time_out
					if (_this.load) {
						_this.load = false
					}
				}else{
					uni.$u.toast(data.msg)
				}
			},
			//获取验证码
			async getCode() {
				//单独验证使用
				// let check = validate.checkResult('mobile', this.phone);
				// if (!check) {
				// 	uni.$u.toast("手机号码格式有误")
				// 	return
				// }
				if (this.$refs.uCode1.canGetCode) {
					const params = {
						user_id: this.user_id,
						scene: 4
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
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "static/css/form.scss";
	.container {
		height: 100%;
		position: relative;
		.inner{
			padding: 0 20rpx;
			.form{
				padding: 0 20rpx;
				.form-row{
					padding: 0;
				}
			}
		}
	}
</style>
