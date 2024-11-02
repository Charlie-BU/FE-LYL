<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<block v-else>
			<view class="inner">
				<view class="form">
					<view class="form-row">
						<text class="row-left">昵称</text>
						<view class="row-input">
							<u-input 
							placeholder="请输入昵称" 
							border="none" 
							type="text"
							placeholderClass="placeholder28" 
							v-model="form.nickname" 
							clearable />
						</view>
					</view>
				</view>
				<view class="submit">
					<button type="default" class="submit-btn" @click="submit"
						:disabled="submitDisabled">确认修改</button>
				</view>
			</view>
		</block>
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
					nickname:'',
				},
				submitDisabled:false,
				result:{},
			}
		},
		onLoad(e) {
			_this = this;
			if (e.is_tx) {
				_this.is_tx = e.is_tx
			}
			_this.get_nicheng()
		},
		methods: {
			submit(){
				_this.form.step = 2
				_this.get_nicheng()
			},
			async get_nicheng(){
				if (_this.form.step == 2) {
					var rule = [{
						// 字段名
						name: 'nickname',
						rules: ['require'],
						errorMsg: {
							require: '请输入昵称',
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
					_this.submitDisabled = true
					setTimeout(()=>{
						_this.submitDisabled = false
					},2000)
				}
				const data = await _this.$post('port/nicheng',_this.form)
				if (data.code==200) {
					uni.$u.toast(data.msg)
				}else if(data.code == -50){
					uni.$u.toast(data.msg,()=>{
						_this.finish()
					})
				}else if(data.code == -1){
					_this.setResult(data.result.result)
					if (_this.load) {
						_this.load = false
					}
				}else{
					uni.$u.toast(data.msg)
				}
			},
			setResult(result){
				_this.result = result
				if (result!='' && result!=null) {
					_this.form.nickname = result.nickname
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "static/css/form.scss";
	
	.container {
		height: 100%;
		position: relative;
	
		.inner {
			padding: 20rpx 20rpx 0 20rpx;
			.form {
				.form-row {
					&:last-child {
						border-bottom: none;
					}
				}
			}
		}
	}
</style>
