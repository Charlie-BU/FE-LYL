<template>
	<view>
		<u-popup
		:closeOnClickOverlay="false" 
		:show="loginShow" 
		@close="loginShow=false" 
		mode="center" 
		:customStyle="customAlertStyle"
		bgColor="transparent"
		:overlayOpacity="0.6">
			<view class="weixin-login">
				<view class="weixin-login-info">
					<text class="text">登录后可体验完整功能</text>
					<button :disabled="loginDisabled" type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
						class="weixin-login-btn">手机号快捷登录</button>
				</view>
				<view class="weixin-login-bot">
					<image src="@/static/common/alert-close.png" @click="loginShow=false" mode="widthFix"/>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:"wx-login",
		data() {
			return {
				loginDisabled:false,
				loginShow:false,
			};
		},
		methods:{
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
						uni.$u.toast(data.msg,()=>{
							this.loginShow=false
							this.loginDisabled=false
							this.$emit('loginAfter',data.result)
						})
						//存入用户信息
						this.$u.vuex('user_id',data.result.user_id)
						//存入token
						this.$u.vuex('user_token', data.result.user_token)
						return;
					}else if(data.code==-50){
						uni.setStorageSync('rekey',data.result.rekey)
						uni.setStorageSync('mobile',data.result.mobile)
						uni.$u.toast(data.msg,()=>{
							this.loginShow=false
							this.loginDisabled=false
							this.toNext('/auth/xcx-bind-mobile')
						})
						return;
					}else{
						uni.$u.toast(data.msg)
					}
					setTimeout(()=>{
						// this.loginShow=false
						this.loginDisabled=false
					},2000)
				}else{
					uni.$u.toast('获取失败')
					this.loginShow=false
				}
			}
		}
	}
</script>

<style>

</style>