<template>
	<view class="m24 bg-FFFFFF borderRadius">

		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item>
					<itemCharts :yAxis='tempAxis' :xAxis='numAxis' :index='0' :recordId='recordId' :model='model' />
				</swiper-item>
				<swiper-item>
					<itemCharts :yAxis='tempAxis' :xAxis='numAxis' :index='1' :recordId='recordId' :model='model' />
				</swiper-item>
				<swiper-item>
					<itemCharts :yAxis='pulsesNumberAxis' :xAxis='numAxis' :index='2' :recordId='recordId'
						:model='model' />
				</swiper-item>
				<swiper-item>
					<itemCharts :yAxis='energyAxis' :xAxis='numAxis' :index='3' :recordId='recordId' :model='model' />
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import itemCharts from "./itemCharts.vue"
	var uChartsInstance = {};
	export default {
		components: {
			itemCharts
		},
		props: {
			numAxis: {
				value: Array,
				default: {}
			},
			tempAxis: {
				value: Array,
				default: {}
			},
			pulseWidthAxis: {
				value: Array,
				default: {}
			},
			pulsesNumberAxis: {
				value: Array,
				default: {}
			},
			energyAxis: {
				value: Array,
				default: {}
			},
			model: {
				value: String,
				default: ''
			},
			recordId: {
				value: String,
				default: ''
			}
		},
		data() {
			return {
				indicatorDots: false,
				autoplay: true,
				interval: 3000,
				duration: 750,
			};
		},
		watch: {
			lineList(val) {
				val.forEach((item, index) => {
					// this.timeAxis.push(this.initTime(Date.parse(val[0].createTime), Date.parse(item
					// 	.createTime)))
					this.timeAxis.push(index)
					this.tempAxis.push(parseFloat(item.temperature.toFixed(1)))
					this.pulseWidthAxis.push(item.pulse_width)
				})
			}
		},
		onReady() {},
		methods: {}
	};
</script>

<style scoped>
	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}

	.swiper {
		height: 500rpx;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}

	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}

	.info {
		position: absolute;
		right: 20rpx;
	}

	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}
</style>
