<template>
	<view class="charts-box">
		<canvas canvas-id="arcbarCharts" id="arcbarCharts" type="2d" class="charts" @tap="tap" />
	</view>
</template>

<script>
	import uCharts from '@/static/utils/u-charts.js';
	var uChartsInstance = {};
	export default {
		data() {
			return {
				pixelRatio: 2,
				cWidth: 180,
				cHeight: 180,
			};
		},
		props: {
			progress: {
				value: Array,
				default: {}
			},
		},
		onReady() {
			this.cWidth = uni.upx2px(180);
			this.cHeight = uni.upx2px(180);
			this.pixelRatio = uni.getSystemInfoSync().pixelRatio;
		},
		watch: {
			progress(val) {
				if (!val) return
				this.getServerData();
			}
		},
		methods: {
			getServerData() {
				let res = {
					series: [{
						color: "#5D9AFF",
						data: this.progress || 0
					}]
				};
				this.drawCharts('arcbarCharts', res);
			},
			drawCharts(id, data) {
				const query = uni.createSelectorQuery().in(this);
				query.select('#' + id).fields({
					node: true,
					size: true
				}).exec(res => {
					if (res[0]) {
						const canvas = res[0].node;
						const ctx = canvas.getContext('2d');
						canvas.width = res[0].width * this.pixelRatio;
						canvas.height = res[0].height * this.pixelRatio;
						uChartsInstance[id] = new uCharts({
							type: "arcbar",
							context: ctx,
							width: this.cWidth * this.pixelRatio,
							height: this.cHeight * this.pixelRatio,
							series: data.series,
							animation: true,
							background: "#FFFFFF",
							color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272",
								"#FC8452", "#9A60B4", "#ea7ccc"
							],
							padding: undefined,
							title: {
								name: `${this.progress * 100}%` || 0,
								fontSize: 36,
								color: "#5D9AFF"
							},
							extra: {
								arcbar: {
									type: "default",
									width: 16,
									backgroundColor: "#E9E9E9",
									startAngle: 0.75,
									endAngle: 0.25,
									gap: 2,
								}
							}
						});
					} else {
						console.error("[uCharts]: 未获取到 context");
					}
				});
			}
		},
		getServerData() {
			//模拟从服务器获取数据时的延时
			setTimeout(() => {
				//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
				let res = {
					series: [{
						name: "正确率",
						color: "#2fc25b",
						data: 0.8
					}]
				};

			}, 500);
		}
	}
</script>

<style scoped>
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 180rpx;
		height: 180rpx;
		z-index: 1;
	}
</style>
