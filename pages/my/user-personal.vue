<template>
	<view class="container">
		<u-loading-page :loading="true" v-if="load" fontSize="28rpx" />
		<block v-else>
			<view class="form-info">
				<view class="form-row">
					<view class="row-left">头像</view>
					<view class="row-hint"></view>
					<image :src="head_pic" @click="headShow=true" class="head-img" mode="aspectFill" />
				</view>
				<view class="form-row" v-if="identity == 2">
					<view class="row-left">
						<text>企业名称</text>
					</view>
					<view class="row-input">
						<u-input placeholder="请输入企业名称" border="none" type="text"
							placeholderClass="placeholder28" v-model="form.firm_name" clearable />
					</view>
					<view class="row-right" v-if="false">
						<u-icon name="arrow-right" size="16" color="#7D7D7D" />
					</view>
				</view>
				<view class="form-row">
					<view class="row-left">
						<text>用户名</text>
					</view>
					<view class="row-input">
						<u-input placeholder="请输入用户名" border="none" type="text"
							placeholderClass="placeholder28" v-model="form.realname" clearable />
					</view>
					<view class="row-right" v-if="false">
						<u-icon name="arrow-right" size="16" color="#7D7D7D" />
					</view>
				</view>
				<view class="form-row">
					<view class="row-left">
						<text>微信号</text>
					</view>
					<view class="row-input">
						<u-input placeholder="请输入微信号" border="none" type="text"
							placeholderClass="placeholder28" v-model="form.weixin" clearable />
					</view>
					<view class="row-right" v-if="false">
						<u-icon name="arrow-right" size="16" color="#7D7D7D" />
					</view>
				</view>
				<view class="form-row border">
					<view class="row-left">
						<text>手机号码</text>
					</view>
					<view class="row-input flex-right">
						<text>{{form.mobile}}</text>
					</view>
				</view>
			</view>
			<view class="submit-bot">
				<button class="submit-bot-btn" :disabled="submitDisabled" @click="submit">保存</button>
			</view>
			<view class="save-btn" v-if="showSave" @click="save_head_pic">保存头像</view>
			<view class="logout" @click="logoutShow=true" v-if="false">退出登录</view>
		</block>
		<u-popup :show="headShow" @close="headShow=false" mode="bottom" bgColor="transparent" :overlayOpacity="0.4">
			<view class="take-photo-two">
				<view class="top-images">
					<view class="top-title">
						<text class="cancel-text" @click="headShow=false">取消</text>
						<text class="center-text">默认头像</text>
						<text class="confirm-text" @click="confirmTempIndex">确定</text>
					</view>
					<view class="images">
						<view class="img-item" v-for="(item,index) in default_heads" :key="index">
							<view class="img-con">
								<image :src="getFullUrl(item)" mode="widthFix" class="info-img"
									@click="changeTempIndex(index)" />
								<image src="@/static/my/img-sel.png" mode="widthFix" class="sel-img"
									v-if="temp_index == index" />
							</view>
						</view>
					</view>
				</view>
				<view class="bot">
					<view class="take-photo-item" @click="chooseImage('camera')">拍照</view>
					<view class="take-photo-item" @click="chooseImage()">从相册中选择</view>
					<view class="take-photo-item cancel-text" @click="headShow=false">取消</view>
				</view>
			</view>
		</u-popup>

		<u-popup :show="logoutShow" @close="logoutShow=false" mode="center" :customStyle="customAlertStyle"
			bgColor="transparent" :overlayOpacity="0.4">
			<view class="alert-popup">
				<view class="alert-title">退出登录</view>
				<view class="alert-info">确定退出登录此账号？</view>
				<view class="alert-bot">
					<text @click="logoutShow=false">取消</text>
					<text @click="confirmLogout">确定</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import md5 from '@/components/MD5.js'
	var validate = require("@/components/validate/validate.js");
	var _this;
	export default {
		data() {
			return {
				logoutShow: false,
				headShow: false,
				cacheSize: '0B',
				showSave: false,
				temp_head_pic: '',
				nick_name: '',
				is_bind_wx: 0,
				temp_index: -1,
				default_heads: [],
				submitDisabled: false,
				form: {
					step: 1,
					head_pic: '',
					firm_name: '',
					realname: '',
					weixin: '',
					mobile: '',
				}
			}
		},
		onLoad(e) {
			_this = this;
			// #ifdef H5
			let url = window.location.href.split('#')[0];
			let serch = url.split('?')[1];
			let is_out = e.is_out || 0
			if (serch && is_out == 0) {
				let arr = serch.split('&');
				let code = arr[0].split('code=')[1];
				if (code) {
					//进行验证
					_this.bind_wx(code)
				}
			}
			// #endif
			// _this.getCache()
			_this.tijiao()
		},
		computed: {
			head_pic: {
				cache: false,
				get() {
					if (this.temp_head_pic) {
						return this.temp_head_pic
					}
					return this.getFullUrl(this.form.head_pic)
				}
			}
		},
		methods: {
			submit() {
				_this.form.step = 2
				_this.tijiao()
			},
			//提交
			async tijiao() {
				if (_this.form.step == 2) {
					var rule = [{
							name: 'head_pic',
							rules: ['require'],
							errorMsg: {
								require: '请选择头像',
							}
						},
						{
							name: 'realname',
							rules: ['require', 'chn'],
							errorMsg: {
								require: '请输入用户名',
								chn: '用户名只能为中文',
							}
						},
						{
							name: 'weixin',
							rules: ['require'],
							errorMsg: {
								require: '请输入微信号',
							}
						}
					];
					let fire_rule = {
						name: 'firm_name',
						rules: ['require'],
						errorMsg: {
							require: '请输入企业名称',
						}
					}
					if (this.identity == 2) {
						rule.splice(1, 0, fire_rule)
					}
					// 是否全部通过，返回Boolean
					let checked = validate.check(this.form, rule);
					if (!checked) {
						// 获取错误信息
						let err = validate.getError();
						uni.$u.toast(err[0])
						return;
					}
					_this.submitDisabled = true
					setTimeout(() => {
						_this.submitDisabled = false
					}, 2000)
					if (_this.temp_head_pic) {
						_this.save_head_pic()
						return
					}
				}
				const data = await _this.$post('port/edit_user_info', _this.form)
				if (data.code == 200) {
					uni.$u.toast(data.msg, () => {
						_this.finish()
					})
				} else if (data.code == -50) {
					uni.$u.toast(data.msg, () => {
						_this.finish()
					})
				} else if (data.code == -1) {
					_this.mobile = data.result.mobile
					_this.form.head_pic = data.result.head_pic
					_this.form.firm_name = data.result.firm_name
					_this.form.realname = data.result.realname
					_this.form.weixin = data.result.weixin
					_this.form.mobile = data.result.mobile
					_this.temp_index = data.result.default_index
					_this.default_heads = data.result.default_heads
					if (_this.load) {
						_this.load = false
					}
				} else {
					uni.$u.toast(data.msg)
				}
			},
			changeTempIndex(index) {
				if (_this.temp_index != index) {
					_this.temp_index = index
				}
			},
			confirmTempIndex() {
				if (_this.temp_index != -1) {
					_this.temp_head_pic = ''
					_this.form.head_pic = _this.default_heads[_this.temp_index]
					_this.headShow = false
				}
			},
			async bind_wx(code) {
				if (_this.is_bind_wx == 1) {
					//取消绑定微信
					uni.showModal({
						title: '提示',
						content: '确定取消绑定微信?',
						success(res) {
							if (res.confirm) {
								_this.unbind_wx()
							}
						}
					})
				} else {
					let params = {
						code
					}
					const data = await _this.$post('port/user_weixin_bind', params)
					if (data.code == 100) {
						let url = data.result.url
						window.location.replace(url)
					} else if (data.code == 200) {
						uni.$u.toast(data.msg, () => {
							window.location.replace('/#/pages/my/user-personal')
						})
						_this.is_bind_wx = 1
						_this.nick_name = data.result.nick_name
					} else {
						uni.$u.toast(data.msg)
					}
				}
			},
			async unbind_wx() {
				const data = await _this.$post('port/user_weixin_qx_bind')
				if (data.code == 200) {
					uni.$u.toast(data.msg)
					_this.is_bind_wx = 0
					_this.nick_name = '未绑定'
				} else {
					uni.$u.toast(data.msg)
				}
			},
			//确定退出
			confirmLogout() {
				this.$u.toast('退出成功')
				setTimeout(() => {
					//清除缓存的token和用户信息
					_this.$u.vuex('user_id', 0)
					_this.$u.vuex('user_token', getApp().globalData.default_token)
					uni.reLaunch({
						url: '/pages/index/login'
					})
					_this.show = false
					_this.user = {}
				}, 1500)
			},
			//获取缓存大小
			getCache() {
				// #ifdef APP-PLUS
				plus.cache.calculate(function(size) { //size是多少个字节单位是b
					if (size < 1024) {
						_this.cacheSize = size + 'B';
					} else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
						_this.cacheSize = Math.floor(size / 1024 * 100) / 100 + 'KB';
					} else if (size / 1024 / 1024 >= 1) {
						_this.cacheSize = Math.floor(size / 1024 / 1024 * 100) / 100 + 'M';
					}
				});
				return
				// #endif
				_this.cacheSize = '0B'
			},
			//清除缓存
			clearCache() {
				//使用plus.cache.clear 清除应用中的缓存数据
				// #ifdef APP-PLUS
				plus.cache.clear(function() {});
				// #endif
				_this.getCache();
				_this.clearShow = false
			},
			chooseImage(sourceType = 'album') {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					//album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
					// sourceType: ['album','camera'], 
					sourceType: [sourceType],
					success(res) {
						const tempFilePath = res.tempFilePaths[0]
						// _this.user.head_pic = tempFilePath
						_this.temp_head_pic = tempFilePath
						// _this.showSave = true
						_this.headShow = false
					}
				});
			},
			async save_head_pic() {
				let sign_prefix = getApp().globalData.sign_prefix
				let token = _this.user_token
				let sign1 = encodeURIComponent('pathhead_picrealname' + _this.form.realname + sign_prefix +
					token + sign_prefix).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g,
					'%28').replace(/\)/g, '%29').replace(/\*/g, '%2A')
				let sign = md5.hax_md5(sign1).toLocaleLowerCase()
				uni.uploadFile({
					url: _this.baseUrl + '/port/touxiang',
					filePath: _this.temp_head_pic,
					name: 'file',
					header: {
						token: token
					},
					formData: {
						'path': 'head_pic',
						'realname': _this.form.realname,
						sign: sign
					},
					success: (result) => {
						let data = JSON.parse(result.data)
						if (data.code == 200) {
							uni.$u.toast(data.msg, () => {
								_this.finish()
							})
						} else {
							uni.$u.toast(data.msg)
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "static/css/form.scss";

	.container {
		height: 100%;
		box-sizing: border-box;
		background: #fff;
		padding: 0 36rpx 0 36rpx;
	}
</style>