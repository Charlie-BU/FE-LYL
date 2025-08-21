<template>
	<view class="popup-container">
		<u-popup :show="showPopup" 
		@close="close" 
		round="10rpx" 
		overlayOpacity="0.3"
		:closeOnClickOverlay="maskClick">
			<view class="popup-info">
				<view class="popup-info-top">
					<view class="left-text" @click="cancel">取消</view>
					<view class="center-text">{{title}}</view>
					<view class="right-text" @click="confirmClick">确定</view>
				</view>
				<view class="popup-inner">
					<picker-view indicator-class="picker-row" :value="pickerValueDefault" @change="bindChange" class="picker-view">
						<picker-view-column>
							<view class="picker-item" v-for="(item,index) in provinceDataList" :key="index">{{item.fullname}}</view>
						</picker-view-column>
						<picker-view-column v-if="level>=2">
							<view class="picker-item" v-for="(item,index) in cityDataList" :key="index">{{item.fullname}}</view>
						</picker-view-column>
						<picker-view-column v-if="level>=3">
							<view class="picker-item" v-for="(item,index) in areaDataList" :key="index">{{item.fullname}}</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "my-address",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			maskClick: {
				type: Boolean,
				default: true
			},
			title: {
				type: String,
				default: '选择地区'
			},
			level: {
				type: Number,
				default: 3
			},
			value: {
				type: Array,
				default: () => [0,0,0]
			}
		},
		data() {
			return {
				pickerValueDefault:this.value,
				showPopup:this.show,
				provinceDataList: [],
				cityDataList: [],
				areaDataList: []
			};
		},
		watch:{
			show(newVal,oldVal){
				this.showPopup = newVal
			}
		},
		created() {
			this.init()
		},
		methods: {
			close(){
				this._emit('select','mask')
			},
			//点击了取消
			cancel(){
				this._emit('select','cancel')
			},
			confirmClick(){
				this._emit('select','confirm')
			},
			async init(){
				let provinceDataList =await this.get_district('')
				this.provinceDataList = provinceDataList
				if (this.level>=2) {
					let p_cid = provinceDataList[this.pickerValueDefault[0]]['id']
					let cityDataList =await this.get_district(p_cid)
					this.cityDataList = cityDataList;
					if (this.level>=3 && cityDataList.length>0) {
						let p_did = cityDataList[this.pickerValueDefault[1]]['id']
						let areaDataList =await this.get_district(p_did)
						this.areaDataList = areaDataList
					}
				}
			},
			async bindChange(e){
				const changePickerValue = e.detail.value
				if (this.pickerValueDefault[0] !== changePickerValue[0]){
					//第一级发生滚动
					if (this.level>=2) {
						let p_cid = this.provinceDataList[changePickerValue[0]]['id']
						let cityDataList =await this.get_district(p_cid)
						this.cityDataList = cityDataList;
						if (this.level>=3 && cityDataList.length>0) {
							let p_did = cityDataList[changePickerValue[1]]['id']
							let areaDataList =await this.get_district(p_did)
							this.areaDataList = areaDataList
						}
					}
					changePickerValue[1] = 0;
					changePickerValue[2] = 0;
				}else if (this.pickerValueDefault[1] !== changePickerValue[1]) {
					//第二级发生滚动
					if (this.level>=3 && this.cityDataList.length>0) {
						let p_did = this.cityDataList[changePickerValue[1]]['id']
						let areaDataList =await this.get_district(p_did)
						this.areaDataList = areaDataList
					}
					changePickerValue[2] = 0;
				}
				this.pickerValueDefault = changePickerValue
			},
			//获取腾讯省市区列表
			get_district(pid){
				let key = getApp().globalData.tx_map_key
				let url = `https://apis.map.qq.com/ws/district/v1/getchildren`
				let params = {
					key,
					output:'jsonp',
				}
				if (pid) {
					params.id = pid
				}
				return new Promise((resolve,reject)=>{
					// #ifdef H5
					this.$jsonp(url,params).then(res=>{
						if(res.status==0){
							resolve(res.result[0])
						}else{
							reject(res)
						}
					})
					return
					// #endif
					delete params.output
					let _this = this
					uni.request({
						url,
						data:params,
						success(res) {
							let {result,status} = res.data
							if (status == 0) {
								resolve(result[0])
							}else{
								reject(res)
							}
						}
					})
				})
			},
			_emit(emitName,type) {
				let label = this._getLabel()
				let pickObj = {
					type,
					label: label,
					value: this.pickerValueDefault,
					cityCode: this._getCityCode(),
					areaCode: this._getAreaCode(),
					provinceCode: this._getProvinceCode(),
					labelArr: label.split('-')
				};
				this.$emit(emitName, pickObj);
			},
			_getLabel() {
				if (this.areaDataList.length>0) {
					var pcikerLabel =
						this.provinceDataList[this.pickerValueDefault[0]].fullname + '-' + this.cityDataList[this.pickerValueDefault[1]].fullname + '-' + this.areaDataList[this.pickerValueDefault[2]].fullname;
				} else{
					var pcikerLabel =
						this.provinceDataList[this.pickerValueDefault[0]].fullname + '-' + this.cityDataList[this.pickerValueDefault[1]].fullname;
				}
				return pcikerLabel;
			},
			_getCityCode() {
				return this.cityDataList[this.pickerValueDefault[1]].id;
			},
			_getProvinceCode() {
				return this.provinceDataList[this.pickerValueDefault[0]].id;
			},
			_getAreaCode() {
				return this.areaDataList[this.pickerValueDefault[2]].id || 0;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-container {
		.popup-info{
			.popup-info-top{
				padding: 0 30rpx;
				height: 87rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 2rpx solid #F2F2F2;
				font-size: 30rpx;
				.left-text{}
				.center-text{
					font-weight: bold;
				}
				.right-text{
					color: #15B3B3;
				}
			}
			.popup-inner{
				height: 500rpx;
				::v-deep .picker-row{
					height: 100rpx;
					border-top: 2rpx solid #B5B5B5;
					border-bottom: 2rpx solid #B5B5B5;
					box-sizing: border-box;
					&::after{
						border-bottom: none;
					}
				}
				.picker-view{
					height: 100%;
					.picker-item{
						font-size: 30rpx;
						line-height: 100rpx;
						text-align: center;
					}
				}
			}
		}
	}
</style>