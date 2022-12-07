export const baseURL = 'https://api.jiandaoyun.com/api/'
export const ybpURL = 'https://rfm.bmrjtech.cn'
export const request = (options) => {
	let url;
	if (options.type != '0') {
		url = `${baseURL}v${options.type}/app/63413e3366ceda0008b4e512/entry/${options.url}`
	} else {
		url = `${ybpURL}/_/${options.url}`
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method: options.method || 'POST',
			data: options.data || {},
			withCredentials: true,
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
