<template>
	<view class="container">
		<view class="user-top-bot">
			<image src='/static/my/zaixian.png' mode="widthFix"/>
			<view class="user-top-bot-center">
				<view class="tit">我的合约</view>
			</view>
			<button size="mini" @click="goNext('/pages/my/contract?identity='+identitys)">去查看</button>
		</view>
		<view class="user-top-bot"  v-if="identitys != 3">
			<image src='/static/my/zjdg.png' mode="widthFix"/>
			<view class="user-top-bot-center">
				<view class="tit">资金代管</view>
			</view>
			<button size="mini" @click="goNext('/pages/my/servicekf')">发起代管</button>
		</view>
	<!-- 	<view class="form">
			<u-input placeholder="收款方式" border="none" type="number" placeholderClass="placeholder28"
				v-model="data.collection_type" clearable disabled disabledColor="#fff">
				<u--text text="收款方式" slot="prefix" margin="0 60rpx 0 0" type="tips"></u--text>
			</u-input>
		</view>
		<view class="form">
			<u-input placeholder="收款账户" border="none" type="number" placeholderClass="placeholder28"
				v-model="data.collection_name" clearable disabled disabledColor="#fff">
				<u--text text="收款账户" slot="prefix" margin="0 60rpx 0 0" type="tips"></u--text>
			</u-input>
		</view>
		<view class="form">
			<u-input placeholder="收款账号" border="none" type="number" placeholderClass="placeholder28"
				v-model="data.collection_account" clearable disabled disabledColor="#fff">
				<u--text text="收款账号" slot="prefix" margin="0 60rpx 0 0" type="tips"></u--text>
			</u-input>
		</view>
		<view class="form">
			<view class="upload">
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" multiple deletable name="1"
					:maxCount="3" previewFullImage>
					<view class="uploadImg">
						<image src="@/static/common/upload.png" mode="widthFix">
						</image>
					</view>
				</u-upload>
			</view>
		</view>
		<view class="form" @click="showconget()">
			<u-input placeholder="请选择所属合约（必填）" disabled="true" disabledColor="#FFF" border="none" type="number" placeholderClass="placeholder28"
				v-model="form.contract_name" clearable >
				<u--text text="请选择所属合约" slot="prefix" margin="0 60rpx 0 0" type="tips"></u--text>
			</u-input>
		</view><view class="form">
			<u-input placeholder="请输入联系方式（必填）" border="none" type="number" placeholderClass="placeholder28"
				v-model="form.mobile" clearable>
				<u--text text="联系方式" slot="prefix" margin="0 60rpx 0 0" type="tips"></u--text>
			</u-input>
		</view>
		<view class="btn">
			<button :disabled="disabled" @click="submit">提交</button>
		</view>

		<u-picker :show="showcon" :columns="columns"  confirmColor="#02AAAB"
		cancelColor="#B8B8B8"	@cancel="showcon = false"
		@confirm="confirmCon"></u-picker> -->
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
					imgs: [],
					mobile: '',
					contract_name:''
				},
				data:[],
				fileList1: [],
				disabled: false,
				showcon:false,
				columns:[],
				identitys:0
			}
		},
		onLoad(e) {
			console.log(e)
			_this = this
			_this.request_voucher_data();
			_this.identitys=e.identity
		},
		methods: {
			goNext(page){
				if (_this.user_id == 0) {
					// _this.$refs.wx_login.loginShow = true
					uni.navigateTo({
						url: '/pages/index/login'
					});
					return
				}
				_this.toNext(page)
			},
			showconget(){
				_this.get_sc_list();
				_this.showcon = true
			},
			confirmCon(e){
				let {
					value
				} = e
				console.log(e)
				_this.form.contract_name = value[0]
				_this.showcon = false
			},
			async get_sc_list() {
				const data = await _this.$post('port/contractListservice',{})
					_this.columns=data.result.list
					console.log(_this.columns)
			},
			async request_voucher_data(){
				const data = await _this.$post('port/request_voucher_data')
				_this.data=data.result
				if (_this.load) {
					_this.load = false
				}
				setTimeout(()=>{
					uni.stopPullDownRefresh()
				},1000)
			},
			// 提交
			async submit() {
				if(_this.form.imgs.length<1){
						uni.$u.toast('请上传付款凭证');
						return;
				}
				const rule = [ {
					name: 'mobile',
					rules: ['require', 'mobile'],
					errorMsg: {
						require: '请输入您的联系方式',
						mobile: '联系方式格式不正确'
					}
				}];
				// 是否全部通过，返回Boolean
				let checked = validate.check(_this.form, rule);
				if (!checked) {
					// 获取错误信息
					let err = validate.getError();
					return uni.$u.toast(err[0])
				}
				_this.disabled = true
				const data = await _this.$post('port/saveVoucher', _this.form)
				if (data.code === 200) {
					uni.$u.toast(data.msg)
					setTimeout(() => {
						_this.form.imgs = []
						_this.form.mobile = ''
						_this.fileList1 = []
						_this.disabled = false
					}, 1500)
				} else {
					uni.$u.toast(data.msg)
					_this.disabled = false
				}
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = _this[`fileList${event.name}`].length
				lists.map((item) => {
					_this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await _this.uploadFilePromise(lists[i].url, event.name)
					let item = _this[`fileList${event.name}`][fileListLen]
					_this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			// 上传图片
			uploadFilePromise(url, name) {
				let sign_prefix = getApp().globalData.sign_prefix
				let sign = md5.hax_md5('user_id' + _this.user_id + sign_prefix + _this
					.user_token +
					sign_prefix).toLocaleLowerCase()
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: _this.baseUrl + '/port/put_file',
						filePath: url,
						name: 'file',
						header: {
							token: _this.user_token
						},
						formData: {
							user_id: _this.user_id,
							sign: sign
						},
						success: (res) => {
							let data = JSON.parse(res.data)
							console.log(data)
							_this.form.imgs.push(data.result.file)
							setTimeout(() => {
								resolve(res.data.data)
							}, 1500)
						}
					});
				})
			},
			// 删除图片
			deletePic(event) {
				_this[`fileList${event.name}`].splice(event.index, 1)
				_this.form.imgs.splice(event.index, 1)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.user-top-bot{
			border-radius: 16rpx;
			padding: 20rpx 30rpx;
			background: #fff;
			@include flex-box(row,null,center);
			margin: 20rpx 15rpx 0 15rpx;
			image{
				width: 60rpx;
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
	}
</style>