<template>
	<view class="w100" id="tempContainer">
		<w-qrcode v-if="show" ref="qrcode" :options="options" @press="longtap">
		</w-qrcode>
		<!-- <view @click="SaveCode">保存图片</view> -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				show: false,
				options: {}
			}
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select("#tempContainer").boundingClientRect(data => {
				let size = data.width * (750 / uni.getSystemInfoSync().windowWidth)
				let options = {
					code: 'https://rfm.bmrjtech.cn/equipment?id=M211009105',
					level: 4,
					type: 'none',
					padding: 3,
					border: {
						color: ['#9AAECF', '#DAB1C1'],
						opacity: 0.6,
						lineWidth: 4,
						degree: 5
					},
					color: ['#9AAECF', '#DAB1C1'],
					bgColor: "#FFFFFF",
					size
				}
				this.options = options
				this.show = true
			}).exec(res => {})
		},
		methods: {
			async longtap(e) { //手指长按事件
				const res = await this.$refs.qrcode.GetCodeImg()
				// console.log(res)
				// uni.previewImage({
				// 	urls: [res.tempFilePath],
				// 	longPressActions: {
				// 		itemList: ['发送给朋友', '保存图片', '收藏']
				// 	}
				// })
			}
		},
	}
</script>
