<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<block v-else>
			<view class="form">
				<view class="form-row">
					<text>收货人</text>
					<view class="right">
						<u-input border="none" placeholder="姓名" placeholderClass="placeholder28"
							:placeholderStyle="placeholderStyle" type="text" fontSize="28rpx" clearable
							v-model="form.consignee" />
					</view>
				</view>
				<view class="form-row">
					<text>手机号码</text>
					<view class="right">
						<u-input border="none" placeholder="手机号码" placeholderClass="placeholder28"
							:placeholderStyle="placeholderStyle" type="text" fontSize="28rpx" clearable
							v-model="form.mobile" />
					</view>
				</view>
				<view class="form-row">
					<text>所在地区</text>
					<view class="right" @click="openAddres()">
						<text class="text black" v-if="form.province && form.city && form.district">{{ form.province +
							form.city + form.district}}</text>
						<text class="text" v-else>省、市、区</text>
						<image src="https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/dizhi.png"
							mode="widthFix" class="icon-img" />
					</view>
				</view>
				<view class="form-row">
					<text class="dizhi">详细地址</text>
					<view class="right">
						<u-textarea v-model="form.address" placeholderClass="placeholder28"
							:placeholderStyle="placeholderStyle" placeholder="详细地址" border="none"
							:customStyle="{ 'padding': '20rpx 0', 'background': 'none' }" />
					</view>
				</view>
				<view class="default-row">
					<text>设置为默认收货地址</text>
					<image @click="changeDefault"
						:src="form.is_default == 1 ? 'https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/checkbox_select.png' : 'https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/checkbox_unselect.png'"
						mode="widthFix" class="icon-img" />
				</view>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="wx-location" @click="chooseAddress" v-if="form.id == 0">
				<image src="https://liyilian.oss-cn-hangzhou.aliyuncs.com/static/common/weixin.png" mode="widthFix">
				</image>
				<text>从微信获取新地址</text>
			</view>
			<!-- #endif -->
			<view class="submit">
				<button type="default" class="submit-btn" @click="submit" :disabled="submitDisabled">保存</button>
			</view>
			<view class="delete" v-if="form.id" @click="del">
				<text>删除地址</text>
			</view>
		</block>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"
			themeColor="#00A73C" cancelColor="#525252"></simple-address>
	</view>
</template>

<script>
import mapUtils from '@/utils/mapUtils.js';
var validate = require("@/components/validate/validate.js");
import simpleAddress from '@/components/simple-address/simple-address.vue';
var _this;
export default {
	data() {
		return {
			form: {
				id: 0,
				consignee: '',
				mobile: '',
				province: '',
				city: '',
				district: '',
				address: '',
				is_default: 0
			},
			cityPickerValueDefault: [0, 0, 0],
			title: '',
			submitDisabled: false,
			placeholderStyle: "color:#959595;"
		}
	},
	onLoad(e) {
		_this = this;
		if (e.id) {
			_this.form.id = e.id
			_this.get_dizhi_xq()
			_this.title = '编辑收货地址'
		} else {
			setTimeout(() => {
				_this.load = false
			}, 500)
		}
	},
	onReady() {
		if (_this.title) {
			uni.setNavigationBarTitle({
				title: _this.title
			})
		}
	},
	components: {
		simpleAddress
	},
	methods: {
		//选择微信地址
		chooseAddress() {
			uni.chooseAddress({
				success(res) {
					_this.form.consignee = res.userName
					_this.form.mobile = res.telNumber
					_this.form.province = res.provinceName
					_this.form.city = res.cityName
					_this.form.district = res.countyName
					_this.form.address = res.detailInfo
					// console.log(res.userName)
					// console.log(res.postalCode)
					// console.log(res.provinceName)
					// console.log(res.cityName)
					// console.log(res.countyName)
					// console.log(res.detailInfo)
					// console.log(res.nationalCode)
					// console.log(res.telNumber)
				},
				fail(fail) {
					console.log('fail==>', fail);
				}
			})
		},
		//选择地址
		chooseLocation() {
			uni.chooseLocation({
				success(res) {
					_this.form.address = res.name
					mapUtils.getReocoder(res).then(result => {
						_this.form.province = result.province
						_this.form.city = result.city
						_this.form.district = result.district
						// _this.form.latitude=result.latitude + ''
						// _this.form.longitude=result.longitude + ''
					})
				},
				fail(fail) {
					console.log('fail==>', fail);
				}
			});
		},
		async get_dizhi_xq() {
			let params = {
				id: _this.form.id
			}
			const data = await _this.$post('port/dizhi_xq', params)
			if (data.code == 200) {
				_this.form = data.result.address
			} else {
				uni.$u.toast(data.msg)
			}
			if (_this.load) {
				_this.load = false
			}
		},
		changeDefault() {
			_this.form.is_default = _this.form.is_default == 1 ? 0 : 1
		},
		openAddres() {
			this.$refs.simpleAddress.open();
		},
		onConfirm(e) {
			this.form.province = e.labelArr[0]
			this.form.city = e.labelArr[1]
			this.form.district = e.labelArr[2]
		},
		async submit() {
			var rule = [{
				// 字段名
				name: 'consignee',
				rules: ['require'],
				errorMsg: {
					require: '请填写收货人',
				}
			},
			// {
			// 	// 字段名
			// 	name: 'mobile',
			// 	rules: ['require', 'mobile'],
			// 	errorMsg: {
			// 		require: '请输入手机号码',
			// 		mobile: '手机号码格式有误',
			// 	}
			// }, 
			{
				// 字段名
				name: 'province',
				rules: ['require'],
				errorMsg: {
					require: '请选择省份',
				}
			}, {
				// 字段名
				name: 'city',
				rules: ['require'],
				errorMsg: {
					require: '请选择城市',
				}
			}, {
				// 字段名
				name: 'district',
				rules: ['require'],
				errorMsg: {
					require: '请选择地区',
				}
			}, {
				// 字段名
				name: 'address',
				rules: ['require'],
				errorMsg: {
					require: '请输入详细地址',
				}
			}];
			// 是否全部通过，返回Boolean
			let checked = validate.check(this.form, rule);
			if (!checked) {
				// 获取错误信息
				let err = validate.getError();
				uni.$u.toast(err[0])
				return;
			}
			_this.submitDisabled = true
			const data = await _this.$post('port/dizhi_save', _this.form)
			if (data.code == 200) {
				uni.$u.toast(data.msg, () => {
					_this.finish()
				})
			} else {
				uni.$u.toast(data.msg)
			}
			setTimeout(() => {
				_this.submitDisabled = false
			}, 2000)
		},
		del() {
			uni.showModal({
				title: '提示',
				content: '确认删除?',
				success(res) {
					if (res.confirm) {
						_this.submitDisabled = true
						_this.del_address()
					}
				}
			})
		},
		//删除收货地址
		async del_address() {
			const params = {
				address_id: _this.form.id,
			}
			const data = await _this.$post('port/dizhi_del', params)
			if (data.code == 200) {
				uni.$u.toast(data.msg, () => {
					uni.navigateBack({})
				})
			} else {
				uni.$u.toast(data.msg)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	padding: 20rpx 20rpx 0 20rpx;

	.form {
		border-radius: $border-radius;
		background: #fff;
		padding-top: 10rpx;

		.form-row {
			padding: 15rpx 20rpx;
			@include flex-box(null, null, center);

			text {
				width: 130rpx;
			}

			.dizhi {
				align-self: flex-start;
				margin-top: 20rpx;
			}

			.right {
				padding: 0 20rpx;
				flex: 1;
				background: $bg-color;
				min-height: 70rpx;
				@include flex-box(null, null, center);
				border-radius: 10rpx;

				.text {
					flex: 1;
					color: $text-grey;
				}

				.black {
					color: $text-353535;
				}

				.icon-img {
					width: 33rpx;
				}
			}
		}

		.default-row {
			@include flex-box(null, space-between, center);
			height: $row-h;
			padding: 0 20rpx;

			.icon-img {
				width: 50rpx;
			}
		}
	}

	.wx-location {
		@include flex-box(null, center, center);
		margin-top: 30rpx;

		image {
			width: 50rpx;
			margin-right: 5rpx;
		}

		text {
			color: $text-595959;
		}
	}

	.delete {
		width: 100%;
		margin-top: 10rpx;
		text-align: center;
		color: $text-959595;
		height: $row-h;
		@include flex-box(null, center, center);
	}
}
</style>
