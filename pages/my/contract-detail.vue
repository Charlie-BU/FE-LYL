<template>
	<view class="container">
		<block>
			<view class="tabs">
				<u-tabs
				lineColor="#fff"
				:list="tabs" 
				:scrollable="false"
				:current="current"
				 :activeStyle="{
					 color: '#000000',
					 fontWeight: 'bold',
					 transform: 'scale(1.05)',
					 fontSize:'28rpx'
				 }"
				 :inactiveStyle="{
					 color: '#868686',
					 transform: 'scale(1)',
					 fontSize:'28rpx'
				 }"
				@click="tabClick"/>
			</view>
			<view v-if="current==0">
				<view  class="infosimg" v-if="info.imgarr&&info.imgarr.length>0">
					<block v-for="(item,index) in info.imgarr">
							<image :src="getFullUrl(item.src)" class="info-img" mode="aspectFill"   @click="previewImage(getFullUrl(item.src))" >
					</block>
				</view>
					<block v-for="(item,index) in info.filearr">
						<view class="user-top-bot">
							<image src='https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/wenjians.png' mode="widthFix"/>
							<view class="user-top-bot-center">
								<view class="tit">合约文件</view>
							</view>
							<button size="mini" @click="previewFile(item.src)">查看</button>
						</view>
						<!-- <view class="infos">
							<image src='https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/wenjians.png' class="info-img" mode="aspectFill"/>
							<view class="rightbtn" @click="previewFile(item.src)">查看文件  &nbsp;&nbsp;&nbsp; ></view>
						</view> -->
					</block>
			
					
					<view  class="infosinvoice" v-if="identitys==1">
						<button size="mini"  @click="invoiceadd(info.id)">开票申请（代管费部分）</button>
					</view>
					
			</view>
			<view v-else>
				<block v-if="current==1">
					<view class="items" style="    padding: 30rpx;" v-if="info.pingtaiArr.length > 0">
						<view class="cart-items">
							<view class="cart-item">
								<view class="cart-goods-items">
									<view style="border-radius: 20rpx;background: #fff;margin-bottom: 20rpx;padding: 30rpx;">
										<view style="display: flex;">
											<view class="goods-name">合约编号：{{info.order_sn}}</view>
										</view>
										<view style="display: flex;justify-content: space-between;">
											<view class="goods-name">总笔数：{{info.pay_countpt}}笔</view>
											<view class="goods-name">已收款笔数：{{info.contpaycountpingtai}}</view>
										</view>
										<view  style="display: flex;justify-content: space-between;">
											<view class="goods-name">总金额：{{info.pay_pricept}}</view>
											<view class="goods-name">已收款金额：{{info.contpaypricepingtai}}</view>
										</view>
									</view>
									<view class="goods-item" v-for="(item,index) in info.pingtaiArr" :key="index"  :class="[item.pingtais==1?'dkcolor':item.pingtais==2?'dkcolors':'']">
										<view class="goods-item-right">
											<view class="goods-name">笔数：第{{item.sort}}笔</view>
											<view class="goods-name">打款用户：{{item.user.nickname}}</view>
											<view class="goods-name">打款时间：{{item.add_time}}</view>
											<view class="goods-name">收款用户：{{item.touser.nickname}}</view>
											<view class="goods-name">打款金额：{{item.money}}</view>
										</view>
										<image :src="getFullUrl(item.img)"  @click="previewImage(getFullUrl(item.img))" class="goods-img" mode="aspectFill" />
									</view>
								</view>
							</view>
							
						</view>
					</view>
					<view class="empty-container" v-else>
						<u-empty text="暂无相关数据" :icon="emptyIcon" />
					</view>
				</block>
				<block v-else>
					<view class="items" style="    padding: 30rpx;" v-if="info.yifangArr.length > 0">
						<view class="cart-items">
							<view class="cart-item">
								<view class="cart-goods-items">
									<view style="border-radius: 20rpx;background: #fff;margin-bottom: 20rpx;padding: 30rpx;">
										<view style="display: flex;">
											<view class="goods-name">合约编号：{{info.order_sn}}</view>
										</view>
										<view style="display: flex;justify-content: space-between;">
											<view class="goods-name">总笔数：{{info.pay_countyf}}笔</view>
											<view class="goods-name">已收款笔数：{{info.contpaycountyifang}}</view>
										</view>
										<view  style="display: flex;justify-content: space-between;">
											<view class="goods-name">总金额：{{info.pay_priceyf}}</view>
											<view class="goods-name">已收款金额：{{info.contpaypriceyifang}}</view>
										</view>
									</view>
									<view class="goods-item" v-for="(item,index) in info.yifangArr" :key="index"  :class="[item.pingtais==1?'dkcolor':item.pingtais==2?'dkcolors':'']">
										<view class="goods-item-right">
											<view class="goods-name">笔数：第{{item.sort}}笔</view>
											<view class="goods-name">打款用户：{{item.user.nickname}}</view>
											<view class="goods-name">打款时间：{{item.add_time}}</view>
											<view class="goods-name">收款用户：{{item.touser.nickname}}</view>
											<view class="goods-name">打款金额：{{item.money}}</view>
										</view>
										<image :src="getFullUrl(item.img)"  @click="previewImage(getFullUrl(item.img))" class="goods-img" mode="aspectFill" />
									</view>
								</view>
							</view>
							
						</view>
					</view>
					<view class="empty-container" v-else>
						<u-empty text="暂无相关数据" :icon="emptyIcon" />
					</view>
				</block>
				
			</view>
			
		
		
		</block>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				//导航栏高度
				navBarHeight: 44,
				statusbarH:0,
				delDisabled:false,
				current:0,
				id:0,
				tabs: [{
					name: '合同详情',
					type:1
				}, {
					name: '平台收款情况',
					type:2
				}, {
					name: '乙方收款情况',
					type:3
				}],
				info:[],
				identitys:0
			};
		},
		methods: {
	
			tabClick(item) {
					_this.current = item.index
					console.log(_this.current)
			},
			async get_info(){
				const params = {
					id: _this.id,
				}
				const data = await _this.$post('port/contractDetail', params)
				_this.info=data.result
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 500)
			},
			previewImage(src) {
							 console.log(src)
			     uni.previewImage({
			       current: src, // 当前显示图片索引
			       urls: [src] // 需要预览的图片http链接列表
			     });
			   },
			   previewFile(src) {
				   uni.downloadFile({
				     url: _this.getFullUrl(src),
				     success: function (res) {
				       var filePath = res.tempFilePath;
				       uni.openDocument({
				         filePath: filePath,
				         showMenu: true,
				         success: function (res) {
				           console.log('打开文档成功');
				         }
				       });
				     }
				   });
							 // console.log(src)
							 // uni.openDocument({
							 //       filePath: _this.getFullUrl(src),
							 //       showMenu: true,
							 //       success: function (res) {
							 //         console.log('打开文档成功');
							 //       }
							 //     });
			    	// _this.toNext(`/pages/index/html-detail?title=${title}&url=${url}`)
			   },
			   invoiceadd(id){
				   _this.toNext(`/pages/my/invoice?id=`+id)
				   console.log(id)
			   }
			
		},
		onLoad(e) {
			_this = this;
			if(e.name){
				uni.setNavigationBarTitle({
					title:e.name
				})
			}
			_this.id=e.id
			_this.get_info()
			_this.identitys=this.identity
		},
		onPullDownRefresh() {
			_this.get_info()
		},
	}
</script>

<style lang="scss" scoped>

	@import "static/css/order.scss";
	.container {
		height: 100%;
		overflow: hidden;
		.dkcolor{
			    border: 1px solid #E91E63;
		}
		.dkcolors{
			    border: 1px solid #00BCD4;
		}
		.tabs{
			background: #fff;
			height: 88rpx;
		}
		.user-top-bot{
			border-radius: 16rpx;
			padding: 20rpx 30rpx;
			background: #fff;
			@include flex-box(row,null,center);
			margin: 20rpx 15rpx 0 15rpx;
			image{
				width: 55rpx;
			}
			.user-top-bot-center{
				flex: 1;
				margin-left: 20rpx;
				.tit{
					font-size: 30rpx;
					color: #141414;
					font-weight: 600;
				}
				.sub-tit{
					font-size: 24rpx;
					color: #757575;
				}
			}
			button{
				padding: 0;
				width: 124rpx;
				height: 58rpx;
				line-height: 58rpx;
				border-radius: 30rpx;
				color: #fff;
				background: $theme-color;
				font-size: 24rpx;
			}
		}
		.infos{
			    border-radius: 16rpx;
			    padding: 20rpx 30rpx;
			    background: #fff;
			    display: flex;
			    flex-direction: row;
			    align-items: center;
			    margin: 20rpx 15rpx 0 15rpx;
				    justify-content: space-between;
				.info-img{
					    width: 30%;
					    height: 200rpx;
				}
				.rightbtn{
					 //    width: 70%;
					 //    height: 80rpx;
						// line-height: 80rpx;
						//     background: #02ABAB;
						// 	color:#fff ;
						color: #02ABAB;
						    font-size: 30rpx;
				}
			
		}.infosinvoice{
			    border-radius: 16rpx;
			    padding: 20rpx 30rpx;
			    background: #fff;
			    display: flex;
			    flex-direction: row;
			    align-items: center;
			    margin: 20rpx 15rpx 0 15rpx;
				justify-content: center;
			
		
				button{
					    width: 70%;
					    height: 80rpx;
						line-height: 80rpx;
						    background: #02ABAB;
							color:#fff ;
						
				}
		}
		.infosimg{
			    border-radius: 16rpx;
			    padding: 20rpx 30rpx;
			    background: #fff;
			    display: grid;
			    /* flex-direction: row; */
			    align-items: center;
			    margin: 20rpx 15rpx 0 15rpx;
			    /* justify-content: center; */
			    display: grid;
			    grid-template-columns: repeat(3,1fr);
			    grid-gap: 30rpx 30rpx;
				.info-img{
					       width: 100%;
					       height: 150rpx;
				}
				button{
					    width: 100%;
					    height: 80rpx;
						line-height: 80rpx;
						    background: #02ABAB;
							color:#fff ;
				}
		}
		
		.scroll{
			height: calc(100% - 88rpx);
			.cart-items{
				padding: 20rpx 30rpx 0 30rpx;
				box-sizing: border-box;
			}
		}
		
		.cart-item{
			border-radius: 0;
			padding: 0;
			background: none;
			.cart-goods-items{
				.goods-item{
					border-radius: $border-radius;
					background: #fff;
					margin-bottom: 20rpx;
					padding: 30rpx;
					min-height: 180rpx;
					.goods-item-right{
						justify-content: space-evenly;
					}
				}
			}
		}
		.shop-items{
			.shop-item{
				display: flex;
				padding: 30rpx;
				background: #fff;
				border-radius: 20rpx;
				&:not(:last-child){
					margin-bottom: 20rpx;
				}
				.left-img{
					width: 140rpx;
					height: 140rpx;
					margin-right: 20rpx;
					border-radius: 10rpx;
				}
				.center{
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					overflow: hidden;
					.name-title{
						display: flex;
						align-items: center;
						.tag{
							background: linear-gradient(0deg,#ff7126 0%, #ff4901 100%), #e02169;
							border-radius: 6rpx;
							color: #fff;
							font-size: 22rpx;
							padding: 3rpx 6rpx;
							margin-right: 10rpx;
						}
						.name-text{
							font-size: 30rpx;
							font-weight: 500;
						}
					}
					.bot{
						display: flex;
						align-items: center;
						.dz-img{
							width: 24rpx;
						}
						text{
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							color: #8B8B8B;
							font-size: 24rpx;
						}
					}
				}
				.right{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					.cancel-btn{
						background: $bg-btn;
						color: #fff;
						width: 120rpx;
						padding: 0;
						font-size: 24rpx;
						border-radius: 40rpx;
					}
					text{
						color: #8B8B8B;
						font-size: 26rpx;
					}
				}
			}
		}
	}
</style>