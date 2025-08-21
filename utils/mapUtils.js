const app = getApp()

//获取腾讯地图所有城市
function getCitys() {
	return new Promise((resolve, reject) => {
		let key = app.globalData.tx_map_key
		let url = `https://apis.map.qq.com/ws/district/v1/list`
		let params = {
			key,
			output: 'jsonp',
			location
		}
		// #ifdef H5
		app.$jsonp(url, params).then(res => {
			if (res.status == 0) {
				let result = res.result
				let data = {
					status: 200,
					result: result[1],
				}
				resolve(data)
			} else {
				reject({
					...res,
					status: 100
				})
			}
		})
		return
		// #endif
		delete params.output
		uni.request({
			url: url,
			data: params,
			method: "GET",
			success(res) {
				let data = res.data
				if (res.status == 0) {
					let result = res.result
					let data = {
						status: 200,
						result: result[1],
					}
					resolve(data)
				} else {
					reject({
						...res,
						status: 100
					})
				}
			},
			fail(fail) {
				reject({
					...fail,
					status: 100
				})
				console.log(fail);
			}
		})
	})
}

function getLocation() {
	return new Promise((resolve, reject) => {
		uni.getLocation({
			type: 'gcj02',
			success(res) {
				getReocoder(res).then(result => {
					if (result.status == 200) {
						resolve(result)
					} else {
						reject(result)
					}
				})
			}
		});
	})
}
//腾讯逆地址解析
function getReocoder(res) {
	return new Promise((resolve, reject) => {
		let key = app.globalData.tx_map_key
		let location = `${res.latitude},${res.longitude}`
		let url = `https://apis.map.qq.com/ws/geocoder/v1/`
		let params = {
			key,
			output: 'jsonp',
			//是否返回周边地点（POI）列表，可选值：0 不返回(默认)1 返回
			get_poi: 0,
			location
		}
		// #ifdef H5
		app.$jsonp(url, params).then(res => {
			// console.log(res.result);
			if (res.status == 0) {
				let {
					formatted_addresses,
					address_component
				} = res.result
				let {
					location
				} = res.result.ad_info
				// console.log("省份:" + address_component.province);
				// console.log("城市:" + address_component.city);
				// console.log("区县:" + address_component.district);
				// console.log("乡镇/街道:" + address_component.street);
				let result = {
					...address_component,
					status: 200,
					latitude: location.lat,
					longitude: location.lng,
					recommend: formatted_addresses.recommend
				}
				resolve(result)
			} else {
				reject({
					...res,
					status: 100
				})
			}
		})
		return
		// #endif
		delete params.output
		uni.request({
			url: url,
			data: params,
			method: "GET",
			success(res) {
				let data = res.data
				if (data.status == 0) {
					let {
						formatted_addresses,
						address_component
					} = data.result
					let {
						location
					} = data.result.ad_info
					let result = {
						...address_component,
						status: 200,
						latitude: location.lat,
						longitude: location.lng,
						recommend: formatted_addresses.recommend
					}
					resolve(result)
				} else {
					reject({
						...data,
						status: 100
					})
				}
			},
			fail(fail) {
				reject({
					...fail,
					status: 100
				})
				console.log(fail);
			}
		})
	})
}
module.exports = {
	getCitys,
	getLocation,
	getReocoder
}