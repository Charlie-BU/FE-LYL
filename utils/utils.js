import {
	times
} from '../uview-ui/libs/function/digit.js';
import {
	fetch_data
} from './ajax_request.js'

export function get_openid(success = null) {
	wx.login({
		success(r) {
			if (r.code) {
				// 由于微信官方要求，获取用户openid的接口调用必须在后端实现，此处把r.code发给后端，换取openid
				fetch_data("POST", "fetch_openid", {
					"code": r.code
				}, "user", res => {
					if (res.data.openid) {
						success(res.data.openid);
					} else {
						console.log("openid获取失败");
					}
				});
			} else {
				console.log("openid获取失败");
			}
		}
	})
}

export function decodeBase64(encodedString) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	let str = String(encodedString).replace(/=+$/, '');
	if (str.length % 4 === 1) {
		throw new Error("'decodeBase64' failed: The string to be decoded is not correctly encoded.");
	}
	let output = '';
	for (let bc = 0, bs, buffer, idx = 0;
		(buffer = str.charAt(idx++)); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output +=
		String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
		buffer = chars.indexOf(buffer);
	}
	return output;
}

export function decode(encodedString) {
	let byteString = decodeBase64(encodedString);
	let decodedString = decodeURIComponent(escape(byteString));
	return decodedString;
}

function is_valid_timestamp(str) {
	if (!/^\d+$/.test(str)) {
		return false;
	}
	const num = Number(str);
	if (str.length === 10) {
		const date = new Date(num * 1000);
		return date.getTime() > 0;
	} else if (str.length === 13) {
		const date = new Date(num);
		return date.getTime() > 0;
	}
	return false;
}

export function format_time(datetime) {
	// datetime目前接受两种类型参数：1.number类型以秒为单位的时间戳；2.string类型Mon, 25 Nov 2024 20:41:38 GMT
	// js的Date对象在处理时间戳时，默认以毫秒为单位，而注意时间戳是否以秒为单位
	let is_timestamp = false;
	if (is_valid_timestamp(datetime.toString())) {
		if (typeof datetime === 'number' && datetime.toString().length <= 10) {
			datetime *= 1000; // 将秒级时间戳转换为毫秒级
		}
		is_timestamp = true;
	}
	const date = new Date(datetime);
	if (isNaN(date.getTime())) {
		console.log('Invalid datetime:', datetime);
		return null;
	}
	const year = is_timestamp ? date.getFullYear().toString() : date.getUTCFullYear().toString();
	const month = is_timestamp ? (date.getMonth() + 1).toString().padStart(2, '0') : (date.getUTCMonth() + 1).toString()
		.padStart(2, '0');
	const day = is_timestamp ? date.getDate().toString().padStart(2, '0') : date.getUTCDate().toString().padStart(2,
		'0');
	const hours = is_timestamp ? date.getHours().toString().padStart(2, '0') : date.getUTCHours().toString().padStart(2,
		'0');
	const minutes = is_timestamp ? date.getMinutes().toString().padStart(2, '0') : date.getUTCMinutes().toString()
		.padStart(2, '0');
	const seconds = is_timestamp ? date.getSeconds().toString().padStart(2, '0') : date.getUTCSeconds().toString()
		.padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function subscirbe_message(template_Ids, callback = null) {
	//template_Ids为列表，对应的消息模板
	wx.requestSubscribeMessage({
		tmplIds: template_Ids,
		success(res) {
			// 用户授权后，无论同意与否
			if (res.errMsg == 'requestSubscribeMessage:ok') {
				callback();
			}
		},
		fail(e) {
			console.log(e)
		},
	});
}

// star_value最大值为100
export function show_stars(star_value) {
	star_value = Number(star_value);
	let stars = star_value <= 0 ? 0 : (star_value >= 100 ? 5 : Math.floor(star_value / 20) + 1);
	let unstars = 5 - stars;
	return ["★".repeat(stars) + "☆".repeat(unstars), (star_value / 20).toFixed(1)];
}