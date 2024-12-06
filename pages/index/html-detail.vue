<template>
	<view class="container">
		<web-view :src="web_url" v-if="web_url!=''"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				web_url:''
			}
		},
		onLoad(option) {
			var url = option.url
			if(!url){
				uni.$u.toast('提交参数有误')
				setTimeout(()=>{
					this.$u.route({
						type: "back"
					})
				},2000)
				return false;
			}
			if(option.title){
				uni.setNavigationBarTitle({
					title:option.title
				})
			}
			this.web_url=this.baseUrl + decodeURIComponent(url)
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		// padding: 20rpx 20rpx 0 20rpx;
	}
</style>