<template>
	<view class="bg-FFFFFF borderRadius">
		<canvas canvas-id="ARChXLxJXFJXrGGYgiCpdianGranriPH" id="ARChXLxJXFJXrGGYgiCpdianGranriPH" class="charts"
			@touchend="tap" />
	</view>
</template>

<script>
	import uCharts from '@/static/utils/u-charts.js';
	var uChartsInstance = {};
	export default {
		data() {
			return {
				cWidth: (uni.getSystemInfoSync().windowWidth * 2) - 48,
				cHeight: 500
			};
		},
		onReady() {
			let w = (uni.getSystemInfoSync().windowWidth * 2) - 48
			//这里的 750 对应 css .charts 的 width
			this.cWidth = uni.upx2px(w);
			//这里的 800 对应 css .charts 的 height
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ["10min", "20min", "30min", "40min", "50min", "60min"],
						series: [{
							name: "温度",
							data: [35, 28, 25, 37, 32, 20]
						}]
					};
					this.drawCharts('ARChXLxJXFJXrGGYgiCpdianGranriPH', res);
				}, 500);
			},
			drawCharts(id, data) {
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "line",
					context: ctx,
					width: this.cWidth,
					height: this.cHeight,
					categories: data.categories,
					series: data.series,
					animation: true,
					background: "#FFFFFF",
					color: ["#5AA1F9"],
					padding: [15, 10, 0, 15],
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2
					},
					extra: {
						line: {
							type: "curve",
							width: 2
						}
					}
				});
			},
			tap(e) {
				// uChartsInstance[e.target.id].touchLegend(e);
				// uChartsInstance[e.target.id].showToolTip(e);
			}
		}
	};
</script>

<style scoped>
	.charts {
		width: calc(100% - 48rpx);
		height: 500rpx;
	}
</style>
