<template>
	<view class="bg-FFFFFF borderRadius" id="tempContainer">
		<canvas canvas-id="tempCharts" id="tempCharts" class="charts" @tap="tap" />
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
			tempAxis: {
				value: Array,
				default: {}
			},
			timeAxis: {
				value: Array,
				default: {}
			}
		},
		watch: {
			tempAxis(val) {
				if (val.length === 0) return
				this.getServerData();
			}
		},
		methods: {
			getServerData() {
				let res = {
					categories: this.timeAxis,
					series: [{
						name: "温度",
						data: this.tempAxis
					}]
				};
				let container = uni.createSelectorQuery().in(this).select("#tempContainer");
				container.boundingClientRect(data => {
					this.drawCharts('tempCharts', res, data.width, data.height);
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
					color: ["#5AA1F9"],
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
				this.$emit('tempPopupShow', true)
			}
		}
	};
</script>

<style scoped>
	.charts {
		width: 100%;
		height: 500rpx;
		z-index: 100;
	}
</style>
