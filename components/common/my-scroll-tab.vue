<template>
	<view>
		<scroll-view scroll-x class="scroll-tabs" :style="{'height':height,'background':bgColor}">
			<view :style="{'fontSize':fontSize}" class="scroll-tabs-item" :key="index" :class="{'active':index==currentIndex}" v-for="(item,index) in list" @tap="itemClick(index)">
				{{item[itemKey]}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"my-scroll-tab",
		props:{
			list:{
				type:Array,
				default:() => []
			},
			current:{
				type:[String,Number],
				default:'0'
			},
			height:{
				type:String,
				default:'80rpx'
			},
			fontSize:{
				type:String,
				default:'28rpx'
			},
			bgColor:{
				type:String,
				default:'transparent'
			},
			itemKey:{
				type:String,
				default:'name'
			}
		},
		data() {
			return {
				currentIndex:this.current
			};
		},
		methods:{
			itemClick(index){
				if(this.currentIndex==index){
					return;
				}
				this.currentIndex=index;
				this.$emit('itemClick',index)
			}
		},
		watch:{
			current(newVal, oldVal){
				this.currentIndex=newVal
			}
		},
	}
</script>

<style lang="scss" scoped>
	.scroll-tabs{
		white-space: nowrap;
		&-item{
			display: inline-flex;
			height: 100%;
			align-items: center;
			text-align: center;
			position: relative;
			padding: 0 30rpx;
		}
		.active{
			color: $theme-color;
			&::after{
				content: '';
				width: 40rpx;
				height: 4rpx;
				background: $theme-color;
				position: absolute;
				border-radius: 4rpx;
				left: calc(50% - 20rpx);
				bottom: 0;
			}
		}
	}
</style>