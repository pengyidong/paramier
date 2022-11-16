<template>
	<view class="m24 bg-FFFFFF borderRadius">

		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item>
					<tempCharts @tempPopupShow='tempPopupShow' :tempAxis='tempAxis' :timeAxis='timeAxis' />
				</swiper-item>
				<swiper-item>
					<pulseWidthCharts :pulseWidthAxis='pulseWidthAxis' :timeAxis='timeAxis' />
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import tempCharts from "./tempCharts.vue"
	import pulseWidthCharts from "./pulseWidthCharts.vue"
	var uChartsInstance = {};
	export default {
		components: {
			tempCharts,
			pulseWidthCharts
		},
		props: {
			timeAxis: {
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
		methods: {
			tempPopupShow(e) {
				this.$emit('tempPopupShow', e)
			},
		}
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
