<template>
	<view :style="'margin-top:'+statusBarHeight+'px'" class="mb88">
		<view class="bglg pr" :style="'height:'+bglgH+'px'">
			<view class="pa m-0-24 bg-FFFFFF borderRadius boxShadow calcW">
				<view class="p-45-35 pr">
					<view class="mb40">
						<text class="f36 fb co-333333 mr30">序列号</text><text
							class="f48 fb500 co-539DF9">{{instrument.serial_number}}</text>
					</view>
					<view class="d-c">
						<image style="width:40rpx;height:40rpx" class="mr5"
							src="https://bianm.jinxiongsj.com/file/uploads/20221012/1cf616d6c5c693714f228b8822fae6fb.png"
							mode=""></image>
						<text class="fb f30 co-333333">{{institutions.agency_name}}</text>
					</view>
					<image class="pa rfm" style="width: 120rpx;"
						src="https://bianm.jinxiongsj.com/file/uploads/20221108/21a69a0de3ca4cfbaf8839a89fa8ffd3.png"
						mode="widthFix"></image>
				</view>
				<view class="p35 d-s-c">
					<view class="d-c" @click="goto('/pages_my/integral/detail')">
						<image style="width:40rpx;height:40rpx" class="mr5"
							src="https://bianm.jinxiongsj.com/file/uploads/20221012/de25cb71c28e4b050c8d76b782e5a95f.png"
							mode=""></image>
						<text class="fb f30 co-333333 mr15">当前积分</text>
						<text class="fb f30 activeText mr5">112312</text>
						<u-icon name="arrow-right" color="#333333" size="13"></u-icon>
					</view>
					<view class="useIntegralBtn borderRadius co-FFFFFF f30 "
						@click="goto('/pages_my/integral/exchange')">
						使用积分
					</view>
				</view>

			</view>
		</view>

		<view class="m-0-24 mt150 mb30 bglg buy borderRadius d-c pr boxShadow" @click="goto('/pages_my/buy/buy')">
			<image src="https://bianm.jinxiongsj.com/file/uploads/20221121/0b2922f09c4d0638803dbbcf112d8f2e.png"
				mode="widthFix" style="width: 140rpx;height: 140rpx;"></image>
			<text class="fb co-FFFFFF f48 ml30 pa" goto>耗材采购</text>
			<view class="buybtn d-c-c">立即采购</view>
		</view>

		<view class="d-r-c m-0-24">
			<view class="itemH  bg-FFFFFF borderRadius p-25-30 d-s-c bgImg boxShadow"
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
	import {
		getInstitutions,
		getInstrument
	} from '@/common/api.js'
	export default {
		components: {
			tabbar,
		},
		data() {
			return {
				institutions: {},
				instrument: {},
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				list: [{
					name: '认证医生',
					linkUrl: '',
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221121/75680b296b8fe2564b8703405a795f80.png',
					url: '/pages_my/doctor/doctor',
					bgColor: 'rgba(217, 195, 255, 0.1)'
				}, {
					name: '任务列表',
					linkUrl: '',
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221121/f893bf9f146a36e3667c9abbbc330ad3.png',
					url: '/pages_my/integral/list',
					bgColor: 'rgba(254, 195, 146, 0.1)'
				}, {
					name: '扫码验真',
					linkUrl: '',
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221207/b183b8b3f39dccb01ddf6c05e8d3f024.png',
					url: '/pages_my/antiFake/antiFake',
					bgColor: 'rgba(192, 226, 255, 0.1)'
				}]
			}
		},
		computed: {
			bglgH() {
				let windowWidth = uni.getSystemInfoSync().windowWidth
				return (windowWidth * 410) / 750
			}
		},
		created() {
			this.getData()
		},
		methods: {
			async getData() {
				let obj = {
					"data_id": "634f9e714b9f6a0008a6ee83"
				}
				const res = await getInstitutions(obj)
				if (res.statusCode === 200) {
					this.institutions = res.data.data
					let object = {
						limit: 1,
						filter: {
							rel: "and",
							cond: [{
								field: "agency_name",
								method: "eq",
								value: res.data.data.agency_name
							}, ]
						}
					}
					const data = await getInstrument(object)
					this.instrument = data.data.data[0]
				}
			},
			goto(url) {
				uni.navigateTo({
					url
				})
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
		margin-bottom: 20rpx;
	}

	.itemH {
		height: 170rpx;
		width: 40%;
	}

	.bgImg {
		background-repeat: no-repeat;
		background-size: 120rpx 120rpx;
		background-position: left 20rpx top 20rpx;
	}

	.buy {
		height: 140rpx;
		width: calc(100% - 48rpx);
		background: linear-gradient(76deg, #DAB1C1, #9AAECF);
	}

	.buybtn {
		font-size: 30rpx;
		font-weight: bold;
		color: #CFB0C3;
		width: 152rpx;
		height: 48rpx;
		background: #FEFEFE;
		box-shadow: 0rpx 5rpx 10rpx 0rpx rgba(167, 175, 204, 0.35);
		border-radius: 12rpx;
		margin-left: auto;
		margin-right: 35rpx;
	}
</style>
