<template>
	<view class="container">
		<u-loading-page
		:loading="true" 
		v-if="load"
		fontSize="28rpx" />
		<block v-else>
		<view class="form-info">
			<view class="form-row">
				<view class="row-left">
					<text class="red-text">*</text>
					<text>项目标题</text>
				</view>
				<view class="row-input">
					<u-input
					placeholder="请输入项目标题" 
					border="none" 
					type="text"
					placeholderClass="placeholder28" 
					v-model="form.title" 
					clearable />
				</view>
			</view>
			<view class="form-row">
				<view class="row-left">
					<text class="red-text">*</text>
					<text>项目标签</text>
				</view>
				<view class="row-input" @click="goNext('tags',1)">
					<text :class="{'text-c3':other.tags == ''}">{{ other.tags ? other.tags : '请选择项目标签'}}</text>
				</view>
				<view class="row-right" @click="goNext('tags',1)">
					<u-icon name="arrow-right" size="16" color="#7D7D7D"/>
				</view>
			</view>
			<view class="form-row">
				<view class="row-left">
					<text class="red-text">*</text>
					<text>工作属性</text>
				</view>
				<view class="row-input" @click="goNext('property',5)">
					<text :class="{'text-c3':other.property == ''}">{{ other.property ? other.property : '请选择工作属性'}}</text>
				</view>
				<view class="row-right" @click="goNext('property',5)">
					<u-icon name="arrow-right" size="16" color="#7D7D7D"/>
				</view>
			</view>
			<view class="form-row">
				<view class="row-left">
					<text class="red-text">*</text>
					<text>期望城市</text>
				</view>
				<view class="row-input" @click="goNext('citys',4)">
					<text :class="{'text-c3':other.citys == ''}">{{ other.citys ? other.citys : '请选择期望城市'}}</text>
				</view>
				<view class="row-right" @click="goNext('citys',4)">
					<u-icon name="arrow-right" size="16" color="#7D7D7D"/>
				</view>
			</view>
			<view class="form-row">
				<view class="row-left">
					<text class="red-text">*</text>
					<text>招聘岗位</text>
				</view>
				<view class="row-input" @click="goNext('post',2)">
					<text :class="{'text-c3':other.post == ''}">{{ other.post ? other.post : '请选择招聘岗位'}}</text>
				</view>
				<view class="row-right" @click="goNext('post',2)">
					<u-icon name="arrow-right" size="16" color="#7D7D7D"/>
				</view>
			</view>
			<view class="form-row">
				<view class="row-left">
					<text>需求技能</text>
				</view>
				<view class="row-input" @click="goNext('talents',3)">
					<text :class="{'text-c3':other.talents == ''}">{{ other.talents ? other.talents : '请选择需求技能'}}</text>
				</view>
				<view class="row-right" @click="goNext('talents',3)">
					<u-icon name="arrow-right" size="16" color="#7D7D7D"/>
				</view>
			</view>
			<view class="form-row">
				<view class="row-left">
					<text>合作时间</text>
				</view>
				<view class="row-input">
					<text @click="showStartDate = true" :class="{'text-c3':form.hz_start_time == ''}">{{ form.hz_start_time ? form.hz_start_time : '选择开始时间'}}</text>
					<text class="heng-text">—</text>
					<text @click="showEndDate = true" :class="{'text-c3':form.hz_end_time == ''}">{{ form.hz_end_time ? form.hz_end_time : '选择结束时间'}}</text>
				</view>
			</view>
			<view class="form-row">
				<view class="row-left">
					<text class="red-text">*</text>
					<text>薪资</text>
				</view>
				<view class="row-input">
					<block v-if="form.salary_unit">
					<u-input
					placeholder="请输入薪资" 
					border="none" 
					type="text"
					placeholderClass="placeholder28" 
					v-model="form.salary" 
					clearable />
					</block>
					<text @click="showUnit = true" :class="{'text-c3':form.salary_unit == ''}">{{ form.salary_unit ? form.salary_unit : '请先选择单位，再输入薪资'}}</text>
				</view>
				<view class="row-right" @click="showUnit = true">
					<u-icon name="arrow-right" size="16" color="#7D7D7D"/>
				</view>
			</view>
			<view class="form-row column">
				<view class="row-left">
					<text>项目需求</text>
				</view>
				<view class="row-textarea">
					<u-textarea 
					:maxlength="300"
					height="80"
					border="none"
					v-model="form.strength" 
					:customStyle="customStyle1"
					placeholder="请输入项目需求" />
					<view class="textarea-count">已输入{{form.strength.length}}/300</view>
				</view>
			</view>
			<view class="form-row column">
				<view class="row-left">
					<text>岗位职责</text>
				</view>
				<view class="row-textarea">
					<u-textarea 
					:maxlength="300"
					height="80"
					border="none"
					v-model="form.experience" 
					:customStyle="customStyle1"
					placeholder="请输入岗位职责" />
					<view class="textarea-count">已输入{{form.experience.length}}/300</view>
				</view>
			</view>
			<view class="form-row column">
				<view class="row-left">
					<text>备注信息</text>
				</view>
				<view class="row-textarea">
					<u-textarea 
					:maxlength="300"
					height="80"
					border="none"
					v-model="form.remark" 
					:customStyle="customStyle1"
					placeholder="请输入备注信息" />
					<view class="textarea-count">已输入{{form.remark.length}}/300</view>
				</view>
			</view>
		</view>
		<view style="height: 120rpx;"></view>
		<view class="submit-bot">
			<button class="submit-bot-btn" :disabled="submitDisabled" @click="submit">发布</button>
		</view>
		</block>
		 <u-datetime-picker
			:show="showStartDate"
			confirmColor="#02AAAB"
			cancelColor="#B8B8B8"
			title="选择时间"
			:minDate="minDate"
			@confirm="confirmDate"
			@cancel="showStartDate = false"
			mode="date"/>
			
		 <u-datetime-picker
			:show="showEndDate"
			confirmColor="#02AAAB"
			cancelColor="#B8B8B8"
			title="选择时间"
			:minDate="minDate"
			@confirm="confirmEndDate"
			@cancel="showEndDate = false"
			mode="date"/>
			
		<u-picker 
		:show="showUnit" 
		:columns="columns"
		confirmColor="#02AAAB"
		cancelColor="#B8B8B8"
		@cancel="showUnit = false"
		@confirm="confirmUnit"></u-picker>
	</view>
</template>

<script>
	import md5 from '@/components/MD5.js'
	var validate = require("@/components/validate/validate.js");
	var _this;
	let d = new Date()
	export default {
		data() {
			return {
				temp_index:-1,
				default_heads:[],
				submitDisabled:false,
				customStyle1: {
					'padding': '20rpx 28rpx 20rpx 28rpx',
					'background':'transparent'
				},
				placeholderStyle:{
					'color':'#C3C3C3'
				},
				showStartDate:false,
				showEndDate:false,
				showUnit:false,
				columns: [
					['元/天', '元/月','项目总额'],
				],
				form:{
					step:1,
					id:'',
					title:'',
					tags:'',
					property:'',
					citys:'',
					post:'',
					talents:'',
					hz_start_time:'',
					hz_end_time:'',
					salary:'',
					salary_unit:'',
					strength:'',
					experience:'',
					remark:'',
				},
				other:{
					tags:'',
					property:'',
					citys:'',
					talents:'',
					post:'',
				},
				minDate:Date.parse(`${d.getFullYear()}/01/01`),
				maxDate:Date.parse(`${d.getFullYear()}/${d.getMonth() + 1}/01`),
				temp_field:''
			}
		},
		onLoad(e) {
			_this = this;
			if (e.id) {
				_this.form.id = e.id
			}
			uni.$on('chooseTag',res=>{
				if (res.from == 3) {
					_this.other[_this.temp_field] = res.brr.join(',')
					_this.form[_this.temp_field] = res.arr.join(',')
				}
			})
			_this.tijiao()
		},
		onUnload() {
			uni.$off('chooseTag')
		},
		computed:{
			minDate1:{
				cache:false,
				get() {
					return Date.parse(`${d.getFullYear() - 70}/01/01`)
				}
			},
			// showCitys:{
			// 	cache:false,
			// 	get() {
			// 		return this.other.property.includes('线下办公')
			// 	}
			// }
		},
		methods: {
			goNext(field,type){
				_this.temp_field = field
				_this.toNext(`/pages/index/filter-list?max=3&from=3&type=${type}`)
			},
			confirmUnit(e){
				let {
					value
				} = e
				_this.form.salary_unit = value[0]
				_this.showUnit = false
			},
			confirmDate(e){
				let {
					value,
					mode
				} = e
				const date = new Date(value);
				let y = date.getFullYear()
				let m = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
				let d = (date.getDate() < 10) ? `0${date.getDate()}` : `${date.getDate()}`
				_this.form.hz_start_time = `${y}-${m}-${d}`
				_this.showStartDate = false
			},
			confirmEndDate(e){
				let {
					value,
					mode
				} = e
				const date = new Date(value);
				let y = date.getFullYear()
				let m = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
				let d = (date.getDate() < 10) ? `0${date.getDate()}` : `${date.getDate()}`
				_this.form.hz_end_time = `${y}-${m}-${d}`
				_this.showEndDate = false
			},
			changeIndex(field,index){
				if (_this.form[field] != index) {
					_this.form[field] = index
				}
			},
			submit(){
				_this.form.step = 2
				_this.tijiao()
			},
			//提交
			async tijiao(){
				if (_this.form.step == 2) {
					var rule = [
						{
							name: 'title',
							rules: ['require'],
							errorMsg: {
								require: '请输入项目标题',
							}
						},
						{
							name: 'tags',
							rules: ['require'],
							errorMsg: {
								require: '请选择项目标签',
							}
						},
					{
						name: 'property',
						rules: ['require'],
						errorMsg: {
							require: '请选择工作属性',
						}
					},
					{
						name: 'citys',
						rules: ['require'],
						errorMsg: {
							require: '请选择期望城市',
						}
					},
					{
						name: 'post',
						rules: ['require'],
						errorMsg: {
							require: '请输入招聘岗位',
						}
					},
					{
						name: 'salary_unit',
						rules: ['require'],
						errorMsg: {
							require: '请选择薪资单位',
						}
					},
					{
						name: 'salary',
						rules: ['require'],
						errorMsg: {
							require: '请输入薪资',
						}
					}];
					// let cityRule = {
					// 	name: 'citys',
					// 	rules: ['require'],
					// 	errorMsg: {
					// 		require: '请选择期望城市',
					// 	}
					// }
					// if (this.showCitys) {
					// 	rule.splice(1,0,cityRule)
					// }
					// 是否全部通过，返回Boolean
					let checked = validate.check(this.form, rule);
					if (!checked) {
						// 获取错误信息
						let err = validate.getError();
						uni.$u.toast(err[0])
						return;
					}
					_this.submitDisabled = true
					setTimeout(()=>{
						_this.submitDisabled = false
					},2000)
				}
				const data = await _this.$post('port/edit_user_item',_this.form)
				if (data.code==200) {
					uni.$u.toast(data.msg,()=>{
						_this.finish()
					})
				}else if(data.code == -50){
					uni.$u.toast(data.msg,()=>{
						_this.finish()
					})
				}else if(data.code == -1){
					_this.form = {
						..._this.form,
						...data.result.form
					}
					_this.other = {
						..._this.other,
						...data.result.other
					}
					if (_this.load) {
						_this.load = false
					}
				}else{
					uni.$u.toast(data.msg)
				}
			},
			chooseImage(sourceType='album'){
				uni.chooseImage({
					count:1, //默认9
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
			async save_head_pic(){
				let sign_prefix=getApp().globalData.sign_prefix
				let token = _this.user_token
				let sign1=encodeURIComponent('pathhead_picrealname' + _this.form.realname + sign_prefix + token + sign_prefix).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A')
				let sign=md5.hax_md5(sign1).toLocaleLowerCase()
				uni.uploadFile({
					url: _this.baseUrl+'/port/touxiang',
					filePath: _this.temp_head_pic,
					name: 'file',
					header:{
						token:token
					},
					formData:{
						'path':'head_pic',
						'realname':_this.form.realname,
						sign:sign
					},
					success: (result) => {
						let data=JSON.parse(result.data)
						if(data.code==200){
							uni.$u.toast(data.msg)
						}else{
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
		background: #fff;
		padding: 0 36rpx 0 36rpx;
	}
</style>