
## 基本用法
```html
<template>
	<view>
		<button type="primary" @click="open">myDTPicker</button>
		<ch-datetime-picker :isShow="show" @cancle="cancel" @confirm="confirm"></ch-datetime-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
		}
	},
	onLoad() {},
	methods: {
		open() {
			this.show = true
		},
		cancel(res) {
			this.show = false
			console.log(res)
		},
		confirm(res) {
			console.log(res)
		},
	}
}
</script>
```
或者
```html
<template>
	<view>
		<button type="primary" @click="open">myDTPicker</button>
		<ch-datetime-picker ref="myDTPicker" @confirm="confirm"></ch-datetime-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	onLoad() {},
	methods: {
		open() {
			this.$refs.myDTPicker.show()
		},
		confirm(res) {
			console.log(res)
		},
	}
}
</script>
```
			
## 启动方式
 1. 属性isShow被赋值为true
 2.  `this.$refs.myDTPicker.show()`

## 属性
| 属性 | 描述 | 类型 | 默认值 |
|--|--|--|--|
| isShow | 显示否 | Boolean | false |
| value| 初始值 | String | 当前时间 |
| min| 最小可选日期 | String | 1990-01-01 00:00:00 |
| max| 最大可选日期 | String | 默认为当前年份的最后一秒 |
| addYear| 不设置最大可选日期时，可设置最大可选时间在当前年份再往后推多少年 | Number | 1|
| format| 日期格式 | String | yyyy-MM-dd hh:mm:ss |
| mask| 是否显示遮罩层 | Boolean | true |
## 事件
| 事件 | 描述 | 返回值|
|--|--|--|
| cancle | 启动方式通过isShow属性时，需配合改事件 | true/false| 
| confirm| 点击组件内”确定“按钮时触发 | {value:'',array:[]} |
