<template>
	<view :style="'margin-top:'+statusBarHeight+'px'" class="mb88">
		<view class="bglg pr" :style="'height:'+bglgH+'px'">
			<view class="pa m-0-24 bg-FFFFFF borderRadius boxShadow calcW">
				<view class="p-45-35 pr">
					<view class="mb40">
						<text class="f36 fb co-333333 mr30">序列号</text><text
							class="f48 fb500 co-539DF9">M123564640</text>
					</view>
					<view class="d-c">
						<image style="width:40rpx;height:40rpx" class="mr5"
							src="https://bianm.jinxiongsj.com/file/uploads/20221012/1cf616d6c5c693714f228b8822fae6fb.png"
							mode=""></image>
						<text class="fb f30 co-333333">北京丽格机构</text>
					</view>
					<image class="pa rfm" style="width: 120rpx;"
						src="https://bianm.jinxiongsj.com/file/uploads/20221108/21a69a0de3ca4cfbaf8839a89fa8ffd3.png"
						mode="widthFix"></image>
				</view>
				<view class="p35 d-s-c">
					<view class="d-c">
						<image style="width:40rpx;height:40rpx" class="mr5"
							src="https://bianm.jinxiongsj.com/file/uploads/20221012/de25cb71c28e4b050c8d76b782e5a95f.png"
							mode=""></image>
						<text class="fb f30 co-333333 mr15">当前积分</text>
						<text class="fb f30 activeText mr5">112312</text>
						<u-icon name="arrow-right" color="#333333" size="13"></u-icon>
					</view>
					<view class="useIntegralBtn borderRadius co-FFFFFF f30 ">
						使用积分
					</view>
				</view>

			</view>
		</view>

		<view class="m-0-24 mt150 mb30">
			<image class="w100"
				src="https://bianm.jinxiongsj.com/file/uploads/20221012/cb5cdff8edfc451181165338f24b5cc5.png"
				mode="widthFix"></image>
		</view>

		<view class="m-0-24 bg-FFFFFF borderRadius p-25-30 d-s-c" v-for="(item, index) in list" :key="index">
			<view class="d-c">
				<image style="width: 95rpx;height: 95rpx;" :src="item.icon" mode=""></image>
				<view class="f36 fb co-333333 ml15">
					{{item.name}}
				</view>
			</view>
			<u-icon name="arrow-right" color="#333333" size="16"></u-icon>
		</view>

		<tabbar></tabbar>
	</view>

</template>

<script>
	import tabbar from '@/components/tabbar/tabbar.vue';
	export default {
		components: {
			tabbar,
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				list: [{
					name: '认证医生',
					linkUrl: '',
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221012/78c4226064f1d7cbf54165ae59e3225f.png'
				}, {
					name: '仪器信息',
					linkUrl: '',
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221012/57f97d121e0bb9417c5a9fee1cac7ca7.png'
				}, {
					name: '案例记录',
					linkUrl: '',
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221012/7df8233e1dcc8b40e4b195688d05ecbf.png'
				}, {
					name: '任务列表',
					linkUrl: '',
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221012/d85d4a63240c2eab561fc96a474544d9.png'
				}]
			}
		},
		computed: {
			bglgH() {
				let windowWidth = uni.getSystemInfoSync().windowWidth
				return (windowWidth * 410) / 750
			}
		},
	}
</script>

<style lang="scss" scoped>
	.bglg {
		background: linear-gradient(76deg, #DAB1C1, #9AAECF);
	}

	.p-45-35 {
		padding: 45rpx 35rpx;
		border-bottom: 2rpx rgba(153, 153, 153, .2) solid;
	}

	.calcW {
		top: 178rpx;
		width: calc(100% - 48rpx);
	}

	.activeText {
		background: linear-gradient(0deg, #DAB1C1, #9AAECF);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		text-shadow: 0px 2px 2px 0px rgba(78, 42, 3, 1);
	}

	.useIntegralBtn {
		width: 144rpx;
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		background: linear-gradient(185deg, #5BBAE6, #4B90F8);
		box-shadow: 0rpx 7rpx 13rpx 0rpx rgba(79, 153, 244, 0.32);
	}

	.rfm {
		right: 30rpx;
		top: -85rpx;
	}

	.p-25-30 {
		padding: 25rpx 30rpx;
		margin-bottom: 15rpx;
	}
</style>
