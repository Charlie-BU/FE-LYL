<template name="input">
	<view>
		<input :type="type" placeholder-style="font-size:24rpx;color:#ADADAD;" :placeholder="pla" />
	</view>
</template>

<script>
	export default {
		name: 'ninput',
		data() {
			return {
			}
		},
		props: {
			type:{
				type:String,
				default:'text'
			},
			pla:{
				type:String,
				default:'请输入内容'
			},
		},
		methods: {

		}
	}
</script>

<style>

</style>
