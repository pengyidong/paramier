export const baseURL = 'https://api.jiandaoyun.com/api/'

export const request = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${baseURL}${options.isUpload ? 'v1' : 'v4'}/app/63413e3366ceda0008b4e512/entry/${options.url}`,
			method: options.method || 'POST',
			data: options.data || {},
			header: {
				'Authorization': 'Bearer SMlLFl0qf3setN6OWJl7henCSwnwfLaX'
			},
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res)
				} else if (res.data.code === -1) {
					// 登录态失效, 重新登录
					console.log('登录态失效, 重新登录');
				}
				// 如果不满足上述判断就输出数据
			},
			// 这里的接口请求，如果出现问题就输出接口请求失败
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		})
	})
}
