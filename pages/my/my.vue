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
						<text class="fb f30 co-333333">变美日记广州体验中心</text>
					</view>
					<image class="pa rfm" style="width: 120rpx;"
						src="https://bianm.jinxiongsj.com/file/uploads/20221108/21a69a0de3ca4cfbaf8839a89fa8ffd3.png"
						mode="widthFix"></image>
				</view>
				<view class="p35 d-s-c">
					<view class="d-c"  @click="goto('/pages/integral/detail')">
						<image style="width:40rpx;height:40rpx" class="mr5"
							src="https://bianm.jinxiongsj.com/file/uploads/20221012/de25cb71c28e4b050c8d76b782e5a95f.png"
							mode=""></image>
						<text class="fb f30 co-333333 mr15">当前积分</text>
						<text class="fb f30 activeText mr5">112312</text>
						<u-icon name="arrow-right" color="#333333" size="13"></u-icon>
					</view>
					<view class="useIntegralBtn borderRadius co-FFFFFF f30 "  @click="goto('/pages/integral/list')">
						使用积分
					</view>
				</view>

			</view>
		</view>

		<view class="m-0-24 mt150 mb30 bglg buy borderRadius d-c pr">
			<image src="https://bianm.jinxiongsj.com/file/uploads/20221121/0b2922f09c4d0638803dbbcf112d8f2e.png" mode="widthFix" style="width: 140rpx;height: 140rpx;"></image>
			<text class="fb co-FFFFFF f48 ml30 pa">耗材采购</text>
			<view class="buybtn d-c-c">立即采购</view>
		</view>

		<view class="d-s-c">
			<view class="itemH m-0-24 bg-FFFFFF borderRadius p-25-30 d-s-c bgImg"
				:style="'background-image:url('+ item.icon+');background-color:'+item.bgColor+';'"
				v-for="(item, index) in list" :key="index" @click="goto(item.url)">
				<view class="d-c">
					<view class="f36 fb co-333333 ml15">
						{{item.name}}
					</view>
				</view>
				<u-icon name="arrow-right" color="#333333" size="16"></u-icon>
			</view>
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
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221121/75680b296b8fe2564b8703405a795f80.png',
					url: '/pages/doctor/doctor',
					bgColor: 'rgba(217, 195, 255, 0.1)'
				}, {
					name: '任务列表',
					linkUrl: '',
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221121/f893bf9f146a36e3667c9abbbc330ad3.png',
					url: '/pages/integral/list',
					bgColor: 'rgba(254, 195, 146, 0.1)'
				}]
			}
		},
		computed: {
			bglgH() {
				let windowWidth = uni.getSystemInfoSync().windowWidth
				return (windowWidth * 410) / 750
			}
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url
				})
			}
		}
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

	.itemH {
		height: 170rpx;
		width: 90%;
	}

	.bgImg {
		background-repeat: no-repeat;
		background-size: 120rpx 120rpx;
		background-position: left 20rpx top 20rpx;
	}
	
	.buy{
		height: 140rpx;
		width: calc(100% - 48rpx);
		background: linear-gradient(76deg, #DAB1C1, #9AAECF);
	}
	
	.buybtn{
		font-size: 30rpx;
		font-weight: bold;
		color: #CFB0C3;
		width: 152rpx;
		height: 48rpx;
		background: #FEFEFE;
		box-shadow: 0rpx 5rpx 10rpx 0rpx rgba(167,175,204,0.35);
		border-radius: 12rpx;
		margin-left: auto;
		margin-right: 35rpx;
	}
</style>
