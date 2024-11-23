<template>
	<view>
		<div class="top" style="font-size: 32rpx;font-weight: bold;display: flex;">
			合作列表 (<p style="color: #03A9F4;">{{lists.length}}</p> )
		</div>
		<view v-for="(one,index) in lists" :key="index" style="margin-top: 40rpx;border-bottom: 0.5px solid #EFEFEF;;">
			<div class="header" @click="changeMode(index)">
				<div>
				<span class="left">名称：    </span>
				<span class="right">{{one.name.slice(0,1) + '*'.repeat(one.name.length-1)}}</span>
				</div>
				<span>▼</span>
			</div>
			<div v-if="lists[index].mode">
				<span class="right"></span>
				<span class="left"></span>
				<ul>
					<li class="li">
						<span class="right">国家/地区：</span>
						<span class="left">{{lists[index].position}}</span>
						</li>
					<li class="li">
						<span class="right">报价时间： </span>
						<span class="left">{{lists[index].time}}</span>
					</li>
					<li class="li">
						<span class="right">报价类型： </span>
						<span class="left">{{lists[index].type}}</span>
					</li>
				</ul>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[],
			}
		},
		created() { // 在组件创建后调用
		    this.get_lists();
		  },
		methods: {
			get_lists(){
				console.log("in get_lists");
				this.lists = [
					{
						name: "哇哇哇的撒下",
						position : "上海",
						time: "2024-11-06 17:09:01",
						type: "主动报价",
						},
					{name: "啊速度下",position : "上海",time: "2024-11-06 17:09:01",type: "主动报价"},
					{name: "婆婆家分店撒阿迪斯",position : "上海",time: "2024-11-06 17:09:01",type: "主动报价"},
					{name: "特人也如同让人",position : "上海",time: "2024-11-06 17:09:01",type: "主动报价"},
					{name: "达到",position : "上海",time: "2024-11-06 17:09:01",type: "主动报价"},
				];
				this.lists = this.lists.map(item => ({ ...item, mode: false }));//子标签是否展开
			},
			changeMode(index){
				this.lists[index].mode = !this.lists[index].mode;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		font-size: 32rpx;
		font-weight: bold;
		display: flex;
		border-top: 0.5px solid #EFEFEF;
	}
	.header {
		display: flex;
		justify-content: space-between;
		font-weight: 700;
	}
	.right {
		justify-content: space-between;
	}
	.left {
		justify-content: space-between;
	}
	li {
		margin-top: 10rpx;
		justify-content: space-between;
		display:flex;
	}
</style>