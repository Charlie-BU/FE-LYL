var res = ""

// 服务器ip
var local = 'http://127.0.0.1:8000/'
var release = 'https://liyilian.fun/'
var run = local;

export function fetch_data(request_type = null, url = null, data = null, blue = null, success = null) {
	let full_url = run + blue + '/' + url;
	// 把wx.request()封装写死，存在success和fail回调，无返回值，不能用Promise风格
	wx.request({
		url: full_url,
		data: data,
		dataType: "json",
		method: request_type,
		sslVerify: false,
		withCredentials: false,
		firstIpv4: false,
		success(res) {
			if (success) {
				success(res)
			}
		},
		fail(e) {
			console.log('fail :', e);
			wx.showToast({
				title: "服务器繁忙，请稍后再试",
				icon: "none",
				duration: 1000,
			});
		},
	});
}

export function upload_file(url = null, file_path = null, name = null, blue = null, success = null) {
	let full_url = run + blue + '/' + url;
	uni.uploadFile({
		url: full_url,
		filePath: file_path,
		name: name, 		// 后台接收的文件字段名
		success: (res) => {
			if (success) {
				success(res);
			}
		},
		fail: (err) => {
			console.error('上传失败:', err);
			wx.showToast({
				title: "文件上传失败",
				icon: "none",
				duration: 1000,
			});
		}
	});
}