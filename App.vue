<script>
	export default {
		onLaunch: function() {
			this.getSystemInfo();
			this.getOpenid()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			getOpenid() {
				wx.login({
					success: loginRes => {
						uni.setStorageSync('loginRes', loginRes.code)
					}
				});
			},
			/* 获取系统信息 */
			getSystemInfo() {
				uni.getSystemInfo({
					success: res => {
						let custom = wx.getMenuButtonBoundingClientRect()
						//  状态栏（顶部）高度
						uni.setStorageSync('statusBarHeight', res.statusBarHeight)
						let navBarHeight = custom.height + (custom.top - res.statusBarHeight) * 2
						uni.setStorageSync('navBarHeight', navBarHeight)
					},
				})

			},
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
