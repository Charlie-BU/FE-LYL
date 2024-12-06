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
					<text>性别</text>
				</view>
				<view class="row-tag">
					<view class="tag-item" :class="{'act' :form.sex == 1}" @click="changeIndex('sex',1)">男</view>
					<view class="tag-item" :class="{'act' :form.sex == 2}" @click="changeIndex('sex',2)">女</view>
				</view>
			</view>
			<view class="form-row" @click="showDate = true">
				<view class="row-left">
					<text class="red-text">*</text>
					<text>出生年月</text>
				</view>
				<view class="row-input">
					<text :class="{'text-c3':form.birthday == ''}">{{ form.birthday ? form.birthday : '请选择出生年月'}}</text>
				</view>
				<view class="row-right">
					<u-icon name="arrow-right" size="16" color="#7D7D7D"/>
				</view>
			</view>
			<view class="form-row">
				<view class="row-left">
					<text class="red-text">*</text>
					<text>擅长项目</text>
				</view>
				<view class="row-input" @click="goNext('tags',1)">
					<text :class="{'text-c3':other.tags == ''}">{{ other.tags ? other.tags : '请选择擅长项目'}}</text>
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
					<text>期望薪资</text>
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
					<text @click="showUnit = true" :class="{'text-c3':form.salary_unit == ''}">{{ form.salary_unit ? form.salary_unit : '请先选择单位再输入薪资'}}</text>
				</view>
				<view class="row-right" @click="showUnit = true">
					<u-icon name="arrow-right" size="16" color="#7D7D7D"/>
				</view>
			</view>
			<view class="form-row">
				<view class="row-left">
					<text class="red-text">*</text>
					<text>应聘岗位</text>
				</view>
				<view class="row-input" @click="goNext('post',2)">
					<text :class="{'text-c3':other.post == ''}">{{ other.post ? other.post : '请选择应聘岗位'}}</text>
				</view>
				<view class="row-right" @click="goNext('post',2)">
					<u-icon name="arrow-right" size="16" color="#7D7D7D"/>
				</view>
			</view>
			<view class="form-row">
				<view class="row-left">
					<text>擅长技能</text>
				</view>
				<view class="row-input" @click="goNext('talents',3)">
					<text :class="{'text-c3':other.talents == ''}">{{ other.talents ? other.talents : '请选择擅长技能'}}</text>
				</view>
				<view class="row-right" @click="goNext('talents',3)">
					<u-icon name="arrow-right" size="16" color="#7D7D7D"/>
				</view>
			</view>
			<view class="form-row column">
				<view class="row-left">
					<text>个人优势</text>
				</view>
				<view class="row-textarea">
					<u-textarea 
					:maxlength="300"
					height="80"
					border="none"
					v-model="form.strength" 
					:customStyle="customStyle1"
					placeholder="请输入个人优势" />
					<view class="textarea-count">已输入{{form.strength.length}}/300</view>
				</view>
			</view>
			<view class="form-row column">
				<view class="row-left">
					<text>项目经历</text>
				</view>
				<view class="row-textarea">
					<u-textarea 
					:maxlength="300"
					height="80"
					border="none"
					v-model="form.experience" 
					:customStyle="customStyle1"
					placeholder="请输入项目经历" />
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
			:show="showDate"
			confirmColor="#02AAAB"
			cancelColor="#B8B8B8"
			title="出生年月"
			:minDate="minDate"
			:maxDate="maxDate"
			@confirm="confirmDate"
			@cancel="showDate = false"
			mode="year-month"/>
			
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
				submitDisabled:false,
				customStyle1: {
					'padding': '20rpx 28rpx 20rpx 28rpx',
					'background':'transparent'
				},
				placeholderStyle:{
					'color':'#C3C3C3'
				},
				showDate:false,
				showUnit:false,
				columns: [
					['元/天', '元/月'],
				],
				form:{
					step:1,
					sex:1,
					birthday:'',
					tags:'',
					property:'',
					citys:'',
					salary:'',
					salary_unit:'',
					talents:'',
					post:'',
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
				minDate:Date.parse(`${d.getFullYear() - 70}/01/01`),
				maxDate:Date.parse(`${d.getFullYear()}/${d.getMonth() + 1}/01`),
				temp_field:''
			}
		},
		onLoad(e) {
			_this = this;
			uni.$on('selectCitys',res=>{
				console.log(res);
				let {
					arr,
					brr
				} = res
				_this.form.citys = arr.join(',')
			})
			uni.$on('chooseTag',res=>{
				if (res.from == 2) {
					_this.other[_this.temp_field] = res.brr.join(',')
					_this.form[_this.temp_field] = res.arr.join(',')
				}
				console.log(res);
			})
			_this.tijiao()
		},
		onUnload() {
			uni.$off('selectCitys')
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
				_this.form.birthday = `${y}-${m}`
				_this.showDate = false
			},
			changeIndex(field,index){
				if (_this.form[field] != index) {
					_this.form[field] = index
				}
			},
			goNext(field,type){
				_this.temp_field = field
				_this.toNext(`/pages/index/filter-list?max=3&from=2&type=${type}`)
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
						name: 'birthday',
						rules: ['require'],
						errorMsg: {
							require: '请选择出生年月',
						}
					},
					{
						name: 'tags',
						rules: ['require'],
						errorMsg: {
							require: '请选择擅长项目',
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
					},
					{
						name: 'post',
						rules: ['require'],
						errorMsg: {
							require: '请输入应聘岗位',
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
					// 	rule.splice(2,0,cityRule)
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
				const data = await _this.$post('port/edit_user_resume',_this.form)
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