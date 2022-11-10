<template>
	<view class="m24 bg-FFFFFF borderRadius">

		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item>
					<tempCharts />
				</swiper-item>
				<swiper-item>
					<tempCharts />
				</swiper-item>
				<swiper-item>
					<tempCharts />
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import tempCharts from "./tempCharts.vue"
	var uChartsInstance = {};
	export default {
		components: {
			tempCharts
		},
		data() {
			return {
				indicatorDots: false,
				autoplay: true,
				interval: 3000,
				duration: 750
			};
		},
		onReady() {},
		methods: {

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
