<template>
	<view class="container">
		<u-index-list :indexList="indexList" inactiveColor="#02AAAB" activeColor="#02AAAB">
			<view slot="header" class="top">
				<view class="title-text">选择城市</view>
				<view class="sub-title-text">添加多个城市，可以获得更多工作机会</view>
				<u-search 
				placeholder="搜索城市名" 
				v-model="keyword" 
				bgColor="#EFEFEF" 
				disabled
				shape="square" 
				@click="search_class = 'search-show'"
				:showAction="false" />
				<view class="items mt30">
					<view class="item">
						<view class="item-title">
							<text class="left-text">定位城市</text>
						</view>
						<view class="item-napes">
							<view class="item-nape" @click="clickItem(location_city)" :class="{'act':brr.indexOf(location_city.id)!=-1}">{{location_city.name}}</view>
						</view>
					</view>
					<view class="item">
						<view class="item-title">
							<text class="left-text">热门城市</text>
							<view class="right-icon" v-if="false">
								<u-icon name="arrow-down" size="14" color="#7D7D7D"/>
							</view>
						</view>
						<view class="item-napes">
							<view class="item-nape" @click="clickItem(item)" :class="{'act':brr.indexOf(item.id)!=-1}" v-for="(item,index) in hot_citys" :key="index">{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
			<template v-for="(item, index) in itemArr">
				<!-- #ifdef APP-NVUE -->
				<u-index-anchor :text="indexList[index]" bgColor="#fff" :key="index"></u-index-anchor>
				<!-- #endif -->
				<u-index-item :key="index">
					<!-- #ifndef APP-NVUE -->
					<u-index-anchor :text="indexList[index]" size="32rpx" bgColor="#fff"></u-index-anchor>
					<!-- #endif -->
					<view class="items">
						<view class="item item-p">
							<view class="item-napes">
								<view class="item-nape" :class="{'act':brr.indexOf(item1.id)!=-1}" @click="clickItem(item1)" v-for="(item1, index1) in item" :key="index1">{{item1.name}}</view>
							</view>
						</view>
					</view>
				</u-index-item>
			</template>
			<view slot="footer" class="footer"></view>
		</u-index-list>
		<view class="submit-bot">
			<view class="submit-top">
				<view class="left">
					已选<text>{{arr.length}}</text>/9
				</view>
				<scroll-view scroll-x class="scroll">
					<view class="scroll-inner">
						<view class="scroll-inner-item" v-for="(item,index) in arr" :key="index">
							<text>{{item}}</text>
							<u-icon @click="delItem(index)" name="close" size="12" color="#02AAAB"/>
						</view>
					</view>
				</scroll-view>
			</view>
			<button class="submit-btn" :disabled="arr.length == 0" @click="confirm">保存</button>
		</view>
		<view class="search-container" :class="search_class">
			<view class="search-top">
				<u-search 
				placeholder="搜索城市名" 
				v-model="keyword1" 
				bgColor="#EFEFEF" 
				actionText="取消"
				@change="searchChange"
				@custom="searchCustom"
				shape="square"  />
			</view>
			<scroll-view scroll-y="true" class="search-scroll">
				<view class="search-items">
					<view class="search-item" @click="clickItem(item,2)" v-for="(item,index) in search_list" :key="index">{{item.name}}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import mapUtils from '@/utils/mapUtils.js';
	var _this;
	let filter_letter = ["I","O","U","V"]
	let hot_citys = ["广州市","深圳市","杭州市","西安市","苏州市","武汉市","厦门市","长沙市","成都市","郑州市","菏泽市","青岛市"]
	const indexList = () => {
		const indexList = []
		const charCodeOfA = 'A'.charCodeAt(0)
		// indexList.push("↑")
		// indexList.push("☆")
		for (let i = 0; i < 26; i++) {
			let letter = String.fromCharCode(charCodeOfA + i)
			if (filter_letter.indexOf(letter) == -1) {
				indexList.push(String.fromCharCode(charCodeOfA + i))
			}
		}
		// indexList.map(r=>{
		// 	if (filter_letter.indexOf(r) != -1) {
				
		// 	}
		// })
		// indexList.push('#')
		return indexList
	}
	export default {
		data() {
			return {
				keyword: '',
				keyword1: '',
				search_class: '',
				search_list: [],
				indexList: indexList(),
				urls: [
					'https://cdn.uviewui.com/uview/album/1.jpg',
					'https://cdn.uviewui.com/uview/album/2.jpg',
					'https://cdn.uviewui.com/uview/album/3.jpg',
					'https://cdn.uviewui.com/uview/album/4.jpg',
					'https://cdn.uviewui.com/uview/album/5.jpg',
					'https://cdn.uviewui.com/uview/album/6.jpg',
					'https://cdn.uviewui.com/uview/album/7.jpg',
					'https://cdn.uviewui.com/uview/album/8.jpg',
					'https://cdn.uviewui.com/uview/album/9.jpg',
					'https://cdn.uviewui.com/uview/album/10.jpg',
				],
				names: ["勇往无敌", "疯狂的迪飙", "磊爱可", "梦幻梦幻梦", "枫中飘瓢", "飞翔天使",
					"曾经第一", "追风幻影族长", "麦小姐", "胡格罗雅", "Red磊磊", "乐乐立立", "青龙爆风", "跑跑卡叮车", "山里狼", "supersonic超"
				],
				arr:[],
				brr:[],
				hot_citys:[],
				location_city:{
					name:'正在定位..',
					id:''
				},
				citys:[]
			}
		},
		onLoad(e) {
			_this = this;
			mapUtils.getLocation().then(res=>{
				if (res.status == 200) {
					let {
						city
					} = res
					_this.location_city.name = city
				} else{
					console.log(res);
				}
			})
			mapUtils.getCitys().then(res => {
				if (res.status == 200) {
					_this.citys = res.result
					_this.findId()
					_this.citys.forEach(city=>{
						if (hot_citys.indexOf(city.fullname)!=-1) {
							_this.hot_citys.push({
								name:city.fullname,
								id:city.id
							})
						}
					})
				}
			})
		},
		computed: {
			itemArr() {
				const arr = []
				this.indexList.forEach(item => {
					let brr = []
					for (var i = 0; i < this.citys.length; i++) {
						let city  = this.citys[i]
						let p_f = city.pinyin[0].substring(0, 1)
						if (item.toLowerCase() == p_f) {
							brr.push({
								name:city.fullname,
								id:city.id
							})
						}
					}
					arr.push(brr)
					// for (let i = 0; i < 10; i++) {
					// 	arr.push({
					// 		name: this.names[uni.$u.random(0, this.names.length - 1)],
					// 		url: this.urls[uni.$u.random(0, this.urls.length - 1)]
					// 	})
					// }
				})
				return arr
			}
		},
		methods: {
			//根据城市查找城市id
			findId(){
				let id = ''
				this.citys.forEach(item=>{
					if (item.fullname == _this.location_city.name) {
						id = item.id
						return true
					}
				})
				if (id) {
					_this.location_city.id = id
				}
			},
			searchChange(val){
				_this.search_list = []
				if (val) {
					let arr = _this.citys.filter(item=>{
						return item.fullname.indexOf(val) > -1
					})
					let brr = arr.map(p=>{
						return {
							name:p.fullname,
							id:p.id
						}
					})
					_this.search_list = brr
					console.log(arr,brr);
				}
			},
			//点击搜索中的取消
			searchCustom(val){
				_this.search_class = ''
				_this.keyword1 = ''
			},
			clickItem(item,type = 1){
				if (_this.brr.indexOf(item.id) == -1) {
					if (_this.arr.length >= 9) {
						uni.$u.toast('最多可选择9个城市')
						return
					}
					_this.arr.push(item.name)
					_this.brr.push(item.id)
					if (type == 2) {
						_this.searchCustom('')
					}
				}else{
					if (type == 2) {
						_this.searchCustom('')
						return
					}
					let index = _this.brr.findIndex(r=>{
						return r == item.id
					})
					if (index != -1) {
						_this.arr.splice(index,1)
						_this.brr.splice(index,1)
					}
				}
			},
			delItem(index){
				_this.arr.splice(index,1)
				_this.brr.splice(index,1)
			},
			confirm(){
				uni.$emit('selectCitys',{arr:this.arr,brr:this.brr})
				this.finish()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background: #fff;
		position: relative;
		.top {
			padding: 30rpx 36rpx 0 36rpx;

			.title-text {
				font-size: 48rpx;
				font-weight: bold;
			}

			.sub-title-text {
				margin: 20rpx 0 20rpx 0;
				font-size: 24rpx;
				color: #5A5A5A;
			}
		}
		.items{
			.item{
				margin-bottom: 30rpx;
				&.item-p{
					padding: 0 36rpx;
				}
				.item-title{
					@include flex-box(row,space-between,center);
					margin-bottom: 20rpx;
					.left-text{
						font-size: 32rpx;
						font-weight: bold;
					}
					.right-icon{
						// margin-right: 20rpx;
					}
				}
				.item-napes{
					display: grid;
					grid-template-columns: repeat(3,1fr);
					grid-gap: 20rpx 17rpx;
					.item-nape{
						background: #EFEFEF;
						border: 2rpx solid #EFEFEF;
						line-height: 66rpx;
						text-align: center;
						border-radius: 10rpx;
						font-size: 24rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						&.act{
							color: #02AAAB;
							background: #F3FDFD;
							border-color: #02AAAB;
						}
					}
				}
			}
		}
		.mt30{
			margin-top: 30rpx;
		}
		.mb30{
			margin-bottom: 30rpx;
		}
		.footer{
			height: 220rpx;
		}
		.submit-bot{
			z-index: 100;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: 28rpx 37rpx;
			box-sizing: border-box;
			background: #fff;
			box-shadow: 0px -1px 0px 0px rgba(0,0,0,0.08);
			.submit-top{
				display: flex;
				.left{
					align-self: center;
					font-size: 24rpx;
					margin-right: 20rpx;
					text{
						margin-left: 6rpx;
						color: #02AAAB;
					}
				}
				.scroll{
					flex: 1;
					overflow: hidden;
					white-space: nowrap;
					.scroll-inner{
						.scroll-inner-item{
							display: inline-flex;
							align-items: center;
							background: #F3FDFD;
							border-radius: 8rpx;
							color: #02AAAB;
							height: 48rpx;
							padding: 0 10rpx;
							&:not(:last-child){
								margin-right: 20rpx;
							}
							text{
								font-size: 24rpx;
								margin-right: 10rpx;
							}
						}
					}
				}
			}
			.submit-btn{
				margin-top: 30rpx;
				background: #02AAAB!important;
				border-radius: 8rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				&[disabled]{
					background: rgba(#02AAAB, 0.6)!important;
				}
			}
		}
		.search-container{
			transition: all 0.3s;
			width: 100vw;
			height: calc(100vh - 44px);
			background: #fff;
			position: fixed;
			z-index: 9999;
			left: 0;
			top: 44px;
			display: flex;
			flex-direction: column;
			transform: translateY(100%);
			&.search-show{
				transform: translateY(0);
			}
			.search-top{
				padding: 20rpx 30rpx 20rpx 30rpx;
			}
			.search-scroll{
				flex: 1;
				overflow: hidden;
				.search-items{
					padding: 0 30rpx;
					.search-item{
						line-height: 90rpx;
						&:not(:last-child){
							border-bottom: 2rpx solid #EFEFEF;
						}
					}
				}
			}
		}
	}
</style>