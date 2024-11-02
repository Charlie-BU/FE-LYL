<template>
	<view class="simple-address" v-if="showPopup" @touchmove.stop.prevent="clear">
		<!-- 遮罩层 -->
		<view class="simple-address-mask" @touchmove.stop.prevent="clear"
			:class="[ani + '-mask', animation ? 'mask-ani' : '']" :style="{
				'background-color': maskBgColor
			}" @tap.stop="hideMask(true)"></view>

		<view class="simple-address-content simple-address--fixed"
			:class="[type, ani + '-content', animation ? 'content-ani' : '']">
			<view class="simple-address__header">
				<view class="simple-address__header-btn-box" @click="pickerCancel">
					<text class="simple-address__header-text"
						:style="{ color: cancelColor, fontSize: btnFontSize }">取消</text>
				</view>
				<view class="simple-address__header-title" v-if="title">
					<text>{{title}}</text>
				</view>
				<view class="simple-address__header-btn-box" @click="pickerConfirm">
					<text class="simple-address__header-text"
						:style="{ color: confirmColor || themeColor, fontSize: btnFontSize }">确定</text>
				</view>
			</view>
			<scroll-view scroll-y="true" class="simple-address__multiple" v-if="showAddress">
				<view class="popup-con-t">
					<view class="popup-content" v-for="(item,index) in address" :key="index">
						<view class="popup-content-text">{{item[customKey]}}</view>
						<image class="popup-content-image" src="@/static/common/delete.png" @click="addressclick(index)"></image>
					</view>
				</view>
			</scroll-view>
			<view class="simple-address__box">
				<picker-view indicator-style="height: 70rpx;" class="simple-address-view" :value="pickerValue" @change="pickerChange" v-if="customArr.length>0">
					<picker-view-column>
						<!-- #ifndef APP-NVUE -->
						<view class="picker-item" :style="{ fontSize: fontSize }" v-for="(item, index) in customArr"
							:key="index">{{ item[customKey] }}</view>
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<text class="picker-item" :style="{ fontSize: fontSize }" v-for="(item, index) in customArr"
							:key="index">{{ item[customKey] }}</text>
						<!-- #endif -->
					</picker-view-column>
				</picker-view>
				<picker-view indicator-style="height: 70rpx;" class="simple-address-view" :value="pickerValue"
					@change="pickerChange" v-else>
					<picker-view-column v-show="level>=1">
						<!-- #ifndef APP-NVUE -->
						<view class="picker-item" :style="{ fontSize: fontSize }"
							v-for="(item, index) in cate1List" :key="index">{{ item[customKey] }}</view>
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<text class="picker-item" :style="{ fontSize: fontSize }"
							v-for="(item, index) in cate1List" :key="index">{{ item[customKey] }}</text>
						<!-- #endif -->
					</picker-view-column>
					<picker-view-column v-show="level>=2">
						<!-- #ifndef APP-NVUE -->
						<view class="picker-item" :style="{ fontSize: fontSize } " v-for="(item, index) in cate2List"
							:key="index">{{ item[customKey] }}</view>
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<text class="picker-item" :style="{ fontSize: fontSize }" v-for="(item, index) in cate2List"
							:key="index">{{ item[customKey] }}</text>
						<!-- #endif -->
					</picker-view-column>
					<picker-view-column v-show="level>=3">
						<!-- #ifndef APP-NVUE -->
						<view class="picker-item" :style="{ fontSize: fontSize }" v-for="(item, index) in cate3List"
							:key="index">{{ item[customKey] }}</view>
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<text class="picker-item" :style="{ fontSize: fontSize }" v-for="(item, index) in cate3List"
							:key="index">{{ item[customKey] }}</text>
						<!-- #endif -->
					</picker-view-column>
					<picker-view-column v-show="level>=4">
						<!-- #ifndef APP-NVUE -->
						<view class="picker-item" @click="clickCate4(item)" :style="{ fontSize: fontSize }" v-for="(item, index) in cate4List"
							:key="index">{{ item[customKey] }}</view>
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<text class="picker-item" @click="clickCate4(item)" :style="{ fontSize: fontSize }" v-for="(item, index) in cate4List"
							:key="index">{{ item[customKey] }}</text>
						<!-- #endif -->
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * Simple-addres  地址联动组件
	 * @description 三级地址联动，支持（app）nvue、小程序、H5
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=1084
	 * @property {String} animation 是否开启动画
	 * @property {String} type = [bottom] 弹出层类型，暂时只支持底部弹出
	 * @property {Boolean} maskClick = [true | false] 是否允许点击遮罩层关闭
	 * @property {Boolean} show = [true | false]  显示或隐藏地址组件
	 * @property {String} maskBgColor 遮罩层背景颜色
	 * @property {String} cancelColor 取消按钮颜色，默认为：#1aad19
	 * @property {String} confirmColor 确认按钮颜色，默认为：themeColor
	 * @property {String} themeColor 主题颜色，后续会废弃该配置，建议使用`cancelColor`或`confirmColor`
	 * @property {String} btnFontSize 取消、确认按钮字体大小，默认为`uni.scss里的 $uni-font-size-base `
	 * @property {String} fontSize picker-item字体大小，默认为：28rpx
	 * @property {Array} pickerValueDefault 默认值，可以通过function queryIndex 获取
	 * @property {Function} queryIndex 根据自定义信息返回对应的index
	 * @property {Function} open 打开
	 * @example  <simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#007AFF'></simple-address>
	 */
	export default {
		name: 'simpleCate',
		props: {
			mode: {
				// 地址类型
				// default 则代表老版本根据index索引获取数据
				//
				type: String,
				default: 'default'
			},
			// 开启动画
			animation: {
				type: Boolean,
				default: true
			},
			/* 弹出层类型，可选值；
					bottom：底部弹出层
				*/
			type: {
				type: String,
				default: 'bottom'
			},
			// maskClick
			maskClick: {
				type: Boolean,
				default: true
			},
			show: {
				type: Boolean,
				default: true
			},
			maskBgColor: {
				type: String,
				default: 'rgba(0, 0, 0, 0.4)' //背景颜色 rgba(0, 0, 0, 0.4) 为空则调用 uni.scss
			},
			themeColor: {
				type: String,
				default: '' // 确认按钮颜色（向下兼容）
			},
			cancelColor: {
				type: String,
				default: '' // 取消按钮颜色
			},
			confirmColor: {
				type: String,
				default: '#EA642D' // 确认按钮颜色
			},
			fontSize: {
				type: String,
				default: '28rpx' // picker-item字体大小
			},
			btnFontSize: {
				type: String,
				default: '' // 按钮的字体大小
			},
			/* 默认值 */
			pickerValueDefault: {
				type: Array,
				default () {
					return [0, 0, 0];
				}
			},
			customArr: {
				type: Array,
				default () {
					return [];
				}
			},
			customKey: {
				type: String,
				default: "name"
			},
			level: {
				type: Number,
				default: 1,
			},
			title: {
				type: String,
				default: "",
			},
			showAddress: {
				type: Boolean,
				default: false
			},
			address:{
				type: Array,
				default () {
					return [];
				}
			}
		},
		data() {
			return {
				ani: '',
				superId:'',
				showPopup: false,
				pickerValue: [0, 0, 0, 0],
				cate1List: [],
				cate2List: [],
				cate3List: [],
				cate4List: [],
			};
		},
		// watch: {
		// 	show(newValue) {
		// 		console.log(newValue,111111111111);
		// 		if (newValue) {
		// 			this.open();
		// 		} else {
		// 			this.close();
		// 		}
		// 	},
		// 	pickerValueDefault() {
		// 		this.init();
		// 	}
		// },
		created() {
			// this.init();
		},
		methods: {
			init() {
				this.pickerValue=this.pickerValueDefault
				if (this.customArr.length > 0){
					return;
				}
				if(this.superId){
					this._getList(this.superId).then(cate1=>{
						this.cate1List=cate1
					})
					return
				}
				this._getList(0).then(cate1=>{
					this.cate1List=cate1
					if(this.level>=2 && this.cate1List.length>0){
						return this._getList(this.cate1List[this.pickerValue[0]]['id'])
					}
				}).then(cate2=>{
					this.cate2List=cate2
					if(this.level>=3 && this.cate2List.length>0){
						return this._getList(this.cate2List[this.pickerValue[1]]['id'])
					}
				}).then(cate3=>{
					if(cate3){
						this.cate3List=cate3
					}
					if(this.level>=4 && this.cate3List.length>0){
						return this._getList(this.cate3List[this.pickerValue[2]]['id'])
					}
				}).then(cate4=>{
					if(cate4){
						this.cate4List=cate4
					}
				})
			},
			pickerChange(e) {
				let changePickerValue = e.detail.value;
				if (this.pickerValue[0] !== changePickerValue[0]) {
					// 第一级发生滚动
					if(this.level>=4){
						this._getList(this.cate1List[changePickerValue[0]].id).then(cate2=>{
							this.cate2List=cate2
							return this._getList(this.cate2List[0].id);
						}).then(cate3=>{
							this.cate3List=cate3
							return this._getList(this.cate3List[0].id);
						}).then(cate4=>{
							this.cate4List=cate4
						})
					}else if(this.level>=3){
						this._getList(this.cate1List[changePickerValue[0]].id).then(cate2=>{
							this.cate2List=cate2
							return this._getList(this.cate2List[0].id);
						}).then(cate3=>{
							this.cate3List=cate3
						})
					}else if(this.level>=2){
						this._getList(this.cate1List[changePickerValue[0]].id).then(cate2=>{
							this.cate2List=cate2
						})
					}
					changePickerValue[1] = 0;
					changePickerValue[2] = 0;
					changePickerValue[3] = 0;
				} else if (this.pickerValue[1] !== changePickerValue[1]) {
					// 第二级滚动
					if(this.level>=4){
						this._getList(this.cate2List[changePickerValue[1]].id).then(cate3=>{
							this.cate3List=cate3
							return this._getList(this.cate3List[0].id);
						}).then(cate4=>{
							this.cate4List=cate4
						})
					}else if(this.level>=3){
						this._getList(this.cate2List[changePickerValue[1]].id).then(cate3=>{
							this.cate3List=cate3
						})
					}
					changePickerValue[2] = 0;
					changePickerValue[3] = 0;
				}else if (this.pickerValue[2] !== changePickerValue[2]) {
					// 第三级滚动
					if(this.level>=4){
						this._getList(this.cate3List[changePickerValue[2]].id).then(cate4=>{
							this.cate4List=cate4
						})
					}
					changePickerValue[3] = 0;
				}
				this.pickerValue = changePickerValue;
				this._$emit('onChange');
			},
			async _getList(superId){
				const params = {
					superId
				}
				const data = await uni.$post('sys/country/loadList',params)
				if(data.code==100){
					return data.data
				}else{
					return []
				}
			},
			clickCate3(item){
				if(!this.showAddress){
					return
				}
				let index=this.address.findIndex(item1=>{
					return item.id==item1.id
				})
				if(index==-1){
					this.address.push(item)
				}else{
					this.address.splice(index,1)
				}
			},
			clickCate4(item){
				if(!this.showAddress){
					return
				}
				let index=this.address.findIndex(item1=>{
					return item.id==item1.id
				})
				if(index==-1){
					this.address.push(item)
				}else{
					this.address.splice(index,1)
				}
			},
			addressclick(index){
				this.address.splice(index,1);
			},
			_$emit(emitName) {
				let pickObj = {
					label: this._getLabel(),
					idsArr: this._getIds(),
					multipleLabel: this._getMultipleLabel(),
					multipleIdsArr: this._getMultipleIds(),
					address: this.address,
					value: this.pickerValue,
					level: this.level
				};
				this.$emit(emitName, pickObj);
			},
			_getLabel() {
				var pcikerLabel;
				if (this.customArr.length > 0) {
					pcikerLabel=[this.customArr[this.pickerValue[0]][this.customKey],"","",""]
				} else {
					if(this.level>=4){
						pcikerLabel =[this.cate1List[this.pickerValue[0]][this.customKey],this.cate2List[this.pickerValue[1]]
							[this.customKey],this.cate3List[this.pickerValue[2]][this.customKey],this.cate4List[this.pickerValue[3]][this.customKey]]
					}else if(this.level>=3){
						pcikerLabel =[this.cate1List[this.pickerValue[0]][this.customKey],this.cate2List[this.pickerValue[1]]
							[this.customKey],this.cate3List[this.pickerValue[2]][this.customKey],""]
					}else if(this.level>=2){
						pcikerLabel = [this.cate1List[this.pickerValue[0]][this.customKey],this.cate2List[this.pickerValue[1]][this.customKey],"",""];
					}else{
						if(this.cate1List.length>0){
							pcikerLabel =[this.cate1List[this.pickerValue[0]][this.customKey],"","",""];
						}else{
							pcikerLabel =["","","",""];
						}
					}
				}
				return pcikerLabel;
			},
			_getIds(){
				var ids;
				if (this.customArr.length > 0) {
					ids=[this.customArr[this.pickerValue[0]].id,0,0]
				} else {
					if(this.level>=4){
						ids =[this.cate1List[this.pickerValue[0]].id,this.cate2List[this.pickerValue[1]].id,this.cate3List[this.pickerValue[2]].id,this.cate4List[this.pickerValue[3]].id];
					}else if(this.level>=3){
						ids =[this.cate1List[this.pickerValue[0]].id,this.cate2List[this.pickerValue[1]].id,this.cate3List[this.pickerValue[2]].id,0];
					}else if(this.level>=2){
						ids =[this.cate1List[this.pickerValue[0]].id,this.cate2List[this.pickerValue[1]].id,0,0];
					}else{
						if(this.cate1List.length>0){
							ids =[this.cate1List[this.pickerValue[0]].id,0,0,0];
						}else{
							ids =[0,0,0,0];
						}
					}
				}
				return ids;
			},
			_getMultipleLabel(){
				if(!this.showAddress || this.address.length<=0){
					return "";
				}
				var label=[];
				for (var i = 0; i < this.address.length; i++) {
					var one = this.address[i];
					label.push(one[this.customKey])
				};
				return label.join(',')
			},
			_getMultipleIds(){
				if(!this.showAddress || this.address.length<=0){
					return [];
				}
				var ids=[];
				for (var i = 0; i < this.address.length; i++) {
					var one = this.address[i];
					ids.push(one.id)
				};
				return ids.join(',')
			},
			queryIndex(params = [], type = 'value') {
				// params = [ 11 ,1101,110101 ];
				// 1.获取省份的index
				let provinceIndex = provinceData.findIndex(res => res[type] == params[0]);
				let cityIndex = cityData[provinceIndex].findIndex(res => res[type] == params[1]);
				let areaIndex = areaData[provinceIndex][cityIndex].findIndex(res => res[type] == params[2]);
				return {
					index: [provinceIndex, cityIndex, areaIndex],
					data: {
						province: provinceData[provinceIndex],
						city: cityData[provinceIndex][cityIndex],
						area: areaData[provinceIndex][cityIndex][areaIndex]
					}
				};
			},
			clear() {},
			hideMask() {
				if(this.maskClick){
					this._$emit('onCancel');
					this.close();
				}
			},
			pickerCancel() {
				this._$emit('onCancel');
				this.close();
			},
			pickerConfirm() {
				this.qg = 0
				this._$emit('onConfirm');
				this.close();
			},
			open(obj) {
				if (obj) {
					if(obj.level){
						this.level = obj.level;
					}
					if(obj.superId!=''){
						this.superId = obj.superId;
					}
				}
				this.init();
				this.showPopup = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.ani = 'simple-' + this.type;
					}, 100);
				});
			},
			close() {
				// if (!this.maskClick && type) return;
				this.ani = '';
				this.pickerValue=[0,0,0,0]
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPopup = false;
					}, 300);
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.simple-address {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: relative;
		z-index: 99999;
	}

	.simple-address-mask {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;

		transition-property: opacity;
		transition-duration: 0.3s;
		opacity: 0;
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}

	.mask-ani {
		transition-property: opacity;
		transition-duration: 0.2s;
	}

	.simple-bottom-mask {
		opacity: 1;
	}

	.simple-center-mask {
		opacity: 1;
	}

	.simple-address--fixed {
		position: fixed;
		bottom: var(--window-bottom);
		left: 0;
		right: 0;
		transition-property: transform;
		transition-duration: 0.3s;
		transform: translateY(100%);
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}

	.simple-address-content {
		background-color: #ffffff;
		border-radius: 20rpx 20rpx 0 0;
	}

	.content-ani {
		transition-property: transform, opacity;
		transition-duration: 0.2s;
	}

	.simple-bottom-content {
		transform: translateY(0);
	}

	.simple-center-content {
		transform: scale(1);
		opacity: 1;
	}

	.simple-address__header {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.simple-address--fixed-top {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		border-top-color: $uni-border-color;
		border-top-style: solid;
		border-top-width: 1rpx;
	}

	.simple-address__header-btn-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 80rpx;
	}

	.simple-address__header-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		justify-content: center;
		height: 80rpx;

		text {
			font-weight: bold;
		}
	}

	.simple-address__header-text {
		text-align: center;
		font-size: $uni-font-size-base;
		color: #EA642D;
		line-height: 80rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
	}

	.simple-address__header-top {
		display: flex;
		height: 76rpx;

		.simple-address__header-top-item {
			flex: 1;
			text-align: center;
			line-height: 76rpx;
		}
	}

	.simple-address__multiple {
		height: 300rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		.popup-con-t{
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			.popup-content{
				width: 25%;
				color: #fff;
				margin-top: 40rpx;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				.popup-content-text{
					background: #EA642D;
					width: calc(100% - 20rpx);
					height: 50rpx;
					line-height: 50rpx;
					text-align: center;
					border-radius: 10rpx;
				}
				.popup-content-image{
					position: absolute;
					top: -20rpx;
					right: -10rpx;
					height: 40rpx;
					width: 40rpx;
				}
			}
		}
	}

	.simple-address__box {
		position: relative;
	}

	.simple-address-view {
		position: relative;
		bottom: 0;
		left: 0;
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		width: 750rpx;
		/* #endif */
		height: 408rpx;
		background-color: rgba(255, 255, 255, 1);
	}

	.picker-item {
		text-align: center;
		line-height: 70rpx;
		text-overflow: ellipsis;
		font-size: 28rpx;
	}
</style>
