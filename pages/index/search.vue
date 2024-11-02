<template>
	<view class="container">
		<view class="search-top">
			<u-search
			bgColor="#EFEFEF"
			placeholder="搜索职位/公司/内容" 
			@search="search"
			@custom="search"
			:actionStyle="{
				'color':'#02AAAB'
			}"
			v-model="form.keyword" />
		</view>
		<block v-if="startSearch">
			<scroll-view scroll-y="true" class="scroll" @scrolltolower="getMore">
				<block v-if="lists.length > 0">
				<view class="scroll-items">
					<my-items :datas="lists" @itemClick="itemClick"></my-items>
				</view>
				<u-loadmore class="load-more" :status="hasMore?'loading':'nomore'" :nomoreText="noMore" />
				</block>
				<view class="empty-container" v-else>
					<u-empty text="暂无相关数据" :icon="emptyIcon" />
				</view>
			</scroll-view>
		</block>
		<block v-else>
			<view class="search-container">
				<view class="search-title">
					<text class="search-title-text">历史搜索</text>
					<view class="search-title-right" v-if="search_list.length>0" @tap='qingkong()'>
						<image src="@/static/common/del-grey-icon.png" class="search-title-right-icon" mode="widthFix"/>
					</view>
				</view>
				<view class="items" v-if="search_list.length>0">
					<view class="item" v-for="(item,index) in search_list" :key="index" @click="clickLs(item)">
						<text>{{item}}</text>
					</view>
				</view>
				<view class="search-title" :style="{'marginTop':search_list.length>0?'0':'20rpx'}" v-if="false">
					<text class="search-title-text">热门搜索</text>
				</view>
				<view class="items" v-if="hot_keywords.length>0 && false">
					<view class="item" v-for="(item,index) in hot_keywords" :key="index" @click="toNext(`/pages/index/search-goods?keyword=${item}`)">
						<image src="@/static/index/hot.png" mode="widthFix" class="hot-img"/>
						<text >{{item}}</text>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				// 搜索内容
				keyword: '',
				search_list: [],
				hot_keywords:[],
				startSearch:false,
				form:{
					pageIndex:1,
					pageSize:20,
					status:3,
					keyword:''
				}
			}
		},
		onLoad() {
			_this=this
			this.get_hot_keywords()
		},
		onShow() {
			_this.get_lishi_list()
		},
		onReady() {
			switch (this.identity){
				case 1:
				uni.setNavigationBarTitle({
					title:'项目搜索'
				})
					break;
				case 2:
				uni.setNavigationBarTitle({
					title:'人才搜索'
				})
					break;
				case 3:
					break;
				default:
					break;
			}
		},
		methods: {
			search(value){
				_this.startSearch = true
				_this.form.pageIndex = 1
				_this.lists = []
				_this.get_items_list()
				
				if(_this.form.keyword!=''){
					_this.submit_keyword()
				}
				// _this.toNext(`/pages/index/search-goods?keyword=${_this.keyword}`)
			},
			set_lishi_list(){
				var search_list = uni.getStorageSync(`search_list_${_this.user_id}`)
				if(search_list){
					var user_keywords = search_list.split('|')
					let index = user_keywords.indexOf(_this.keyword)
					if(index==-1){
						user_keywords.unshift(_this.keyword)
					}else{
						user_keywords.splice(index,1)
						user_keywords.unshift(_this.keyword)
					}
					var str = user_keywords.join('|')
					uni.setStorageSync(`search_list_${_this.user_id}`,str)
				}else{
					uni.setStorageSync(`search_list_${_this.user_id}`,_this.keyword)
				}
			},
			//获取历史搜索
			async get_lishi_list(){
				const params = {
					type:this.identity
				}
				const data = await _this.$post('port/search_list',params)
				if (data.code==200) {
					_this.search_list = data.result.search
				}else{
					_this.search_list = []
				}
				if (_this.load) {
					_this.load = false
				}
				// var search_list = uni.getStorageSync(`search_list_${_this.user_id}`)
				// if(search_list){
				// 	var user_keywords = search_list.split('|')
				// 	_this.search_list = user_keywords
				// }else{
				// 	_this.search_list = []
				// }
			},
			//获取热门搜索
			async get_hot_keywords() {
				const data = await _this.$post('port/request_index_data')
				_this.hot_keywords=data.result.hot_keywords
			},
			qingkong(){
				uni.showModal({
					title:'提示',
					content:'确定清空?',
					cancelColor:'#B8B8B8',
					confirmColor:'#02AAAB',
					success: (res) => {
						if (res.confirm) {
							_this.clear()
						} else if (res.cancel) {
						}
					}
				})
			},
			//清空搜索记录
			async clear() {
				if (this.user_id) {
					const params = {
						type:this.identity
					}
					const data = await _this.$post('port/qk_search',params)
					if(data.code==200){
						this.$u.toast(data.msg)
						_this.get_lishi_list()
					}else{
						this.$u.toast(data.msg)
					}
				}
			},
			//提交搜索关键词
			async submit_keyword() {
				const params = {
					'keywords':_this.form.keyword,
					type:this.identity
				}
				const data = await _this.$post('port/add_search',params)
				if(data.code==200){
					
				}else{
				}
			},
			getMore(){
				if(_this.hasMore){
					_this.form.pageIndex++
					_this.get_items_list()
				}
			},
			async get_items_list() {
				_this.form.type = this.identity
				const data = await _this.$post('port/get_items_list', _this.form)
				if (data.code == 200) {
					_this.lists.push(...data.result.list)
					_this.hasMore = data.result.list.length >= _this.form.pageSize
				} else {
					_this.hasMore = false
				}
			},
			//项目点击
			itemClick(res){
				console.log(res);
				let {item} = res
				if (item.type == 1) {
					_this.toNext(`/pages/index/detail?id=${item.id}`)
				}else{
					_this.toNext(`/pages/talents/detail?id=${item.id}`)
				}
			},
			clickLs(item){
				_this.startSearch = true
				_this.form.keyword = item
				_this.form.pageIndex = 1
				_this.lists = []
				_this.get_items_list()
			}
		}
	}
</script>
<style lang="scss" scoped>
	page{
		
	}
	.container{
		height: 100%;
		overflow: hidden;
	}
	.search-container{
		height: 100%;
		background: #FFFFFF;
	}
	.search-top {
		background: #FFFFFF;
		padding:10rpx 33rpx;
		@include flex-box(row,null,center);
		border-bottom: $global-border;
	}

	.search-title {
		@include flex-box(row,space-between,center);
		padding: 20rpx 40rpx;
		.search-title-text{
			flex: 1;
			font-size: 32rpx;
			font-weight: bold;
		}
		.search-title-right{
			@include flex-box(row,center,center);
			.search-title-right-icon{
				width: 30rpx;
			}
		}
	}
	
	.items {
		display: flex;
		flex-wrap: wrap;
		margin-top: 10rpx;
		padding: 0 40rpx;
		.item{
			padding: 6rpx 20rpx;
			border-radius: 8rpx;
			background: #EFEFEF;
			margin:0 20rpx 16rpx 0rpx;
			font-size: 26rpx;
			@include flex-box(row,null,center);
			color: #141414;
			.hot-img{
				width: 32rpx;
				margin-right: 5rpx;
			}
			text{}
		}
	}
	.scroll{
		height: calc(100% - 84rpx);
		.scroll-items{
			padding: 15rpx 15rpx 0 15rpx;
		}
	}
</style>
