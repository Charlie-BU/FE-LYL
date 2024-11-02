<template>
	<view class="my-tab" :style="{'height':height,'background':bgColor}">
		<view :style="{'fontSize':fontSize}" class="my-tab-item" :key="index" :class="{'active':index==currentIndex}" v-for="(item,index) in datas" @tap="itemClick(index)">
			{{item[itemKey]}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-tab",
		props:{
			datas:{
				type:Array,
				default:() => []
			},
			current:{
				type:[String,Number],
				default:'0'
			},
			height:{
				type:String,
				default:'88rpx'
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
		data() {
			return {
				currentIndex:this.current
			};
		}
	}
</script>

<style lang="scss" scoped>
	.my-tab{
		display: flex;
		&-item{
			flex: 1;
			text-align: center;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #353535;
		}
		.active{
			color: #00A73C;
			&::after{
				content: '';
				width: 40rpx;
				height: 8rpx;
				background: #00A73C;
				position: absolute;
				border-radius: 6rpx;
				left: calc(50% - 20rpx);
				bottom: 0;
			}
		}
	}
</style>