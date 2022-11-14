<template>
	<view class="bg-FFFFFF borderRadius" id="pulseWidthContainer">
		<canvas canvas-id="pulseWidthCharts" id="pulseWidthCharts" class="charts" @touchend="tap" />
	</view>
</template>

<script>
	import uCharts from '@/static/utils/u-charts.js';
	var uChartsInstance = {};
	export default {
		data() {
			return {};
		},
		props: {
			pulseWidthAxis: {
				value: Array,
				default: {}
			},
			timeAxis: {
				value: Array,
				default: {}
			}
		},
		watch: {
			pulseWidthAxis(val) {
				if (val.length === 0) return
				this.getServerData();
			}
		},
		methods: {
			getServerData() {
				let res = {
					categories: this.timeAxis,
					series: [{
						name: "脉宽",
						data: this.pulseWidthAxis
					}]
				};
				let container = uni.createSelectorQuery().in(this).select("#pulseWidthContainer");
				container.boundingClientRect(data => {
					this.drawCharts('pulseWidthCharts', res, data.width, data.height);
				}).exec(function(res) {
					// 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
				})

			},
			drawCharts(id, data, width, height) {
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "line",
					context: ctx,
					width,
					height,
					categories: data.categories,
					series: data.series,
					animation: true,
					background: "#FFFFFF",
					color: ["#9278ae"],
					fontSize: '12',
					padding: [20, 10, 0, 10],
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
		width: 100%;
		height: 500rpx;
	}
</style>
