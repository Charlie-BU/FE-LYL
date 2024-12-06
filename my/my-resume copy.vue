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
					<text>工作属性</text>
				</view>
				<view class="row-tag">
					<view class="tag-item" :class="{'act' :form.property == 1}" @click="changeIndex('property',1)">线下办公</view>
					<view class="tag-item" :class="{'act' :form.property == 2}" @click="changeIndex('property',2)">远程办公</view>
				</view>
			</view>
			<view class="form-row">
				<view class="row-left">
					<text class="red-text">*</text>
					<text>期望城市</text>
				</view>
				<view class="row-input" @click="toNext('/my/desired-city')">
					<text :class="{'text-c3':form.citys == ''}">{{ form.citys ? form.citys : '请选择期望城市'}}</text>
				</view>
				<view class="row-right">
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
					type="number"
					placeholderClass="placeholder28" 
					v-model="form.salary" 
					clearable />
					</block>
					<text @click="showUnit = true" :class="{'text-c3':form.salary_unit == ''}">{{ form.salary_unit ? form.salary_unit : '请先选择单位再输入薪资'}}</text>
				</view>
				<view class="row-right">
					<u-icon name="arrow-right" size="16" color="#7D7D7D"/>
				</view>
			</view>
			<view class="form-row">
				<view class="row-left">
					<text class="red-text">*</text>
					<text>应聘岗位</text>
				</view>
				<view class="row-input">
					<text class="text-c3">请选择应聘岗位</text>
				</view>
				<view class="row-right">
					<u-icon name="arrow-right" size="16" color="#7D7D7D"/>
				</view>
			</view>
			<view class="form-row">
				<view class="row-left">
					<text>人才标签</text>
				</view>
				<view class="row-tag">
					<view class="tag-item" :class="{'act' :form.talents == 1}" @click="changeIndex('tag',1)">二筑证件</view>
					<view class="tag-item" :class="{'act' :form.talents == 2}" @click="changeIndex('tag',2)">一筑证件</view>
					<view class="tag-item" :class="{'act' :form.talents == 3}" @click="changeIndex('tag',3)">消防证件</view>
				</view>
			</view>
			<view class="form-row column">
				<view class="row-left">
					<text class="red-text">*</text>
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
					<text class="red-text">*</text>
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
					<text class="red-text">*</text>
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
					property:1,
					citys:'',
					salary:'',
					salary_unit:'',
					talents:1,
					post:'',
					strength:'',
					experience:'',
					remark:'',
				},
				minDate:Date.parse(`${d.getFullYear() - 70}/01/01`),
				maxDate:Date.parse(`${d.getFullYear()}/${d.getMonth() + 1}/01`)
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
			_this.tijiao()
		},
		onUnload() {
			uni.$off('selectCitys')
		},
		computed:{
			minDate1:{
				cache:false,
				get() {
					return Date.parse(`${d.getFullYear() - 70}/01/01`)
				}
			}
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
			submit(){
				_this.form.step = 2
				_this.tijiao()
			},
			//提交
			async tijiao(){
				if (_this.form.step == 2) {
					var rule = [
					{
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
							require: '请输入真实姓名',
							chn: '真实姓名只能为中文',
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
					setTimeout(()=>{
						_this.submitDisabled = false
					},2000)
				}
				const data = await _this.$post('port/edit_user_resume',_this.form)
				if (data.code==200) {
					uni.$u.toast(data.msg,()=>{
						
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