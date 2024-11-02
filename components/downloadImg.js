export default function downloadImg(url){
	uni.showLoading({
		title: '正在下载',
		mask: true
	})
	console.log(url)
	let that = this;
	uni.getImageInfo({
		src: url,
		success(res) {
			console.log(res.path)
			uni.saveImageToPhotosAlbum({
				filePath: res.path,
				success(res) {
					uni.$u.toast("已保存至相册")
				},
				fail(err) {
					console.log(err);
					uni.hideLoading();
					uni.showModal({
						title: '保存图片至相册',
						content: '需要获取您的相册权限，请确认授权',
						success: function(res) {
							if (res.cancel) {
								uni.showToast({
									title: '获取相册权限失败',
									icon: 'none',
									duration: 2000
								})
							} else if (res.confirm) {
								uni.showLoading({
									title: '打开设置',
									mask: true
								})
								uni.openSetting({
									success: function(data) {
										uni.hideLoading();
										uni.$u.toast("请重新点击下载原图")
									}
								})
							}
						}
					})
				}
			})
		},
		fail(err) {
			console.log(err);
			uni.$u.toast("下载失败,请重试")
		}
	})
}