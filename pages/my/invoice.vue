<template>
	<view class="container">
		<view v-if="setup==2">
			<view class="form">
				<u-input placeholder="" border="none" type="text" placeholderClass="placeholder28"
					v-model="price" disabled="true" disabledColor="#FFF">
					<u--text text="开票金额" slot="prefix" margin="0 60rpx 0 0" type="tips"></u--text>
				</u-input>
			</view>
			<view class="form">
				<u-input  placeholder="请输入发票抬头" border="none" type="text" placeholderClass="placeholder28"
					v-model="form.name" clearable>
					<u--text text="发票抬头(必填)" slot="prefix" margin="0 60rpx 0 0" type="tips"></u--text>
				</u-input>
			</view>
			<view class="form">
				<u-input  placeholder="请输入纳税人识别号" border="none" type="text" placeholderClass="placeholder28"
					v-model="form.number" clearable>
					<u--text text="纳税人识别号(必填)" slot="prefix" margin="0 60rpx 0 0" type="tips"></u--text>
				</u-input>
			</view>
			<view class="form">
				<u-input placeholder="请输入注册地址" border="none" type="text" placeholderClass="placeholder28"
					v-model="form.address" clearable>
					<u--text text="注册地址" slot="prefix" margin="0 60rpx 0 0" type="tips"></u--text>
				</u-input>
			</view>
			<view class="form">
				<u-input placeholder="请输入注册电话" border="none" type="text" placeholderClass="placeholder28"
					v-model="form.phone" clearable>
					<u--text text="注册电话" slot="prefix" margin="0 60rpx 0 0" type="tips"></u--text>
				</u-input>
			</view><view class="form">
				<u-input  placeholder="请输入邮箱地址" border="none" type="text" placeholderClass="placeholder28"
					v-model="form.email" clearable>
					<u--text text="邮箱地址(必填)" slot="prefix" margin="0 60rpx 0 0" type="tips"></u--text>
				</u-input>
			</view>
			<view class="btn" style="    display: flex;    justify-content: space-between;">
				<button  style="width: 40%;"  @click="setupt(1)">上一步</button>
				<button :disabled="disabled" style="width: 40%;" @click="submit()">提交审核</button>
			</view>
		</view>
		<view  v-if="setup==1">
			<view class="items" v-if="info.paylist && info.paylist.length > 0">
				<view class="cart-items">
					<view class="cart-item">
						<view class="cart-goods-items">
						<view class="goods-item" v-for="(item,index) in info.paylist" :key="index" >
							<block v-if="item.status==0">
								<image src="/static/common/dz-checkbox.png" v-if="item.checkbox==1"  @click="checkboxitem(item,index)"   class="goods-imgcheck" mode="aspectFill" />
								<image src="/static/common/dz-checkbox-sel.png" v-else  class="goods-imgcheck"  @click="checkboxitems(item,index)" mode="aspectFill" />
								<view class="goods-item-right"  v-if="item.checkbox==1" @click="checkboxitem(item,index)">
									<view class="goods-name">打款用户：{{item.user.nickname}}</view>
									<view class="goods-name">收款用户：{{item.touser.nickname}}</view>
									<view class="goods-name">打款时间：{{item.add_time}}</view>
									<view class="goods-name">打款金额：{{item.money}}</view>
								</view>
								<view class="goods-item-right"  v-else  @click="checkboxitems(item,index)">
									<view class="goods-name">打款用户：{{item.user.nickname}}</view>
									<view class="goods-name">收款用户：{{item.touser.nickname}}</view>
									<view class="goods-name">打款时间：{{item.add_time}}</view>
									<view class="goods-name">打款金额：{{item.money}}</view>
								</view>
							</block>
							<block v-else>
								<view class="goods-item-right">
									<view style="color: red;" class="goods-name">发票开具中</view>
									<view class="goods-name">打款用户：{{item.user.nickname}}</view>
									<view class="goods-name">收款用户：{{item.touser.nickname}}</view>
									<view class="goods-name">打款时间：{{item.add_time}}</view>
									<view class="goods-name">打款金额：{{item.money}}</view>
								</view>
							</block>
							
							<image :src="getFullUrl(item.img)"  @click="previewImage(getFullUrl(item.img))" class="goods-img" mode="aspectFill" />
						</view>
						</view>
					</view>
					<view class="btn">
						<button @click="setupt(2)">下一步</button>
					</view>
				</view>
			</view>
			<view class="empty-container" v-else>
				<u-empty text="暂无相关数据" :icon="emptyIcon" />
			</view>
			<view class="btn">
				<button @click="invoiceList()">开票记录</button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	var _this;
		import md5 from '@/components/MD5.js'
		var validate = require("@/components/validate/validate.js");
	export default {
		data() {
			return {
				form: {
					name: '',
					number: '',
					address: '',
					phone: '',
					email: '',
				},
				setup:1,
				id:0,
				data:[],
				fileList1: [],
				disabled: false,
				info:[],
				ids:[],
				price:0
			}
		},
		onLoad(e) {
			_this = this
			_this = this;
			_this.id=e.id
			_this.get_info()
		},
		onPullDownRefresh() {
			_this.get_info()
		},
		methods: {
			invoiceList(){
				uni.navigateTo({
					url: '/pages/my/invoicelist?id='+this.id
				})
			},
			previewImage(src) {
							 console.log(src)
			     uni.previewImage({
			       current: src, // 当前显示图片索引
			       urls: [src] // 需要预览的图片http链接列表
			     });
			   },
			async get_info(){
				const params = {
					id: _this.id,
				}
				const data = await _this.$post('port/contractDetailInvoice', params)
				_this.info=data.result
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 500)
			},
			setupt(s){
				_this.ids=[];
				_this.price=0;
				if(s==2){
					_this.info.paylist.forEach(item=>{
						if(item.checkbox==2){
							_this.ids.push(item.id)
							_this.price+=Number(item.money)
						}
					})
					if(_this.ids.length<=0){
						uni.$u.toast('请选择票据')
						return;
					}
				}
			
				console.log(_this.ids)
				console.log(_this.price)
				_this.setup=s
			},
			checkboxitem(item,index){
				console.log(item)
				_this.info.paylist[index].checkbox=2
			},checkboxitems(item,index){
				console.log(item)
				_this.info.paylist[index].checkbox=1
			},
			// 提交
			async submit() {
				const rule = [ {
					name: 'name',
					rules: ['require'],
					errorMsg: {
						require: '请输入您的发票抬头',
					}
				},
				{
					name: 'number',
					rules: ['require'],
					errorMsg: {
						require: '请输入您的纳税人识别号',
					}
				},
				{
					name: 'email',
					rules: ['require','email'],
					errorMsg: {
						require: '请输入您的邮箱',
						email: '请输正确的邮箱',
					}
				}];
				// 是否全部通过，返回Boolean
				let checked = validate.check(_this.form, rule);
				if (!checked) {
					// 获取错误信息
					let err = validate.getError();
					return uni.$u.toast(err[0])
				}
				if(_this.info.paylist.length<1){
					uni.$u.toast('该合约暂无可开发票')
					return
				}
				_this.form.id=_this.id
				_this.form.ids=_this.ids
				_this.form.price=_this.price
				_this.disabled = true
				const data = await _this.$post('port/saveInvoice', _this.form)
				if (data.code === 200) {
					uni.$u.toast(data.msg)
					setTimeout(() => {
						uni.navigateBack();
					}, 2000)
				} else {
					uni.$u.toast(data.msg)
					_this.disabled = false
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.jilus{
		display: flex;
		justify-content: center;
		font-size: 28rpx;
		color: #767676;
		    margin-top: 30rpx;
	}
		@import "static/css/order.scss";
	.container {
		padding: 20rpx 30rpx;

		.form {
			padding: 30rpx;
			background: #FFF;
			border-radius: 20rpx;
			margin-bottom: 20rpx;

			::v-deep .u-textarea {
				padding: 0 !important;
			}

			::v-deep .u-text__value {
				color: #121212 !important;
				font-size: 28rpx !important;
				font-weight: 500 !important;
			}

			.upload {
				.uploadImg {
					width: 150rpx;
					height: 150rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.btn {
			margin-top: 40rpx;

			button {
				color: #fff;
				font-size: 32rpx;
				letter-spacing: 1rpx;
				border-radius: 100rpx;
				background-color: #02ABAB;
			}
		}
		.cart-item{
			border-radius: 0;
			padding: 0;
			background: none;
			.cart-goods-items{
				.goods-item{
					align-items: center;
					border-radius: $border-radius;
					background: #fff;
					margin-bottom: 20rpx;
					padding: 20rpx;
					min-height: 180rpx;
					.goods-item-right{
						margin-left: 15rpx;
						justify-content: space-evenly;
					}
					.goods-imgcheck{
						width: 50rpx;
						height: 50rpx;
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