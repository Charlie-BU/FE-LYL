import { fetch_data } from './ajax_request.js'

export function get_openid(success=null) {
	wx.login({
		success(r) {
			if (r.code) {
				// 由于微信官方要求，获取用户openid的接口调用必须在后端实现，此处把r.code发给后端，换取openid
				fetch_data("POST", "fetch_openid", { "code": r.code }, "user", res => {
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

export function format_time(datetime) {
	const date = new Date(datetime);
	if (isNaN(date.getTime())) {
		console.log('Invalid datetime:', datetime);
		return null;
	}
	const year = date.getUTCFullYear().toString();
	const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
	const day = date.getUTCDate().toString().padStart(2, '0');
	const hours = date.getUTCHours().toString().padStart(2, '0');
	const minutes = date.getUTCMinutes().toString().padStart(2, '0');
	const seconds = date.getUTCSeconds().toString().padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function subscirbe_message(template_Ids, callback = null) {
	//template_Ids为列表，对应的消息模板
	wx.requestSubscribeMessage({
		tmplIds: template_Ids,
		success(res) {
			//用户授权后，无论同意与否
			if (res.errMsg == 'requestSubscribeMessage:ok') {
				callback();
			} 
		},
		fail(e) {
			console.log(e)
		},
	});
}

