<template>
	<view class="bg-FFFFFF borderRadius" id="tempContainer">
		<canvas :canvas-id="list[index].id" type="2d" :id="list[index].id" class="charts" @tap="tap" />
	</view>
</template>

<script>
	import uCharts from '@/static/utils/u-charts.js';
	var uChartsInstance = {};
	export default {
		data() {
			return {
				pixelRatio: 2,
				list: [{
						id: 'temp',
						name: '温度',
						unitMeasure: "℃",
						color: '#5AA1F9'
					},
					{
						id: 'pulseWidth',
						name: '脉宽',
						unitMeasure: "℃",
						color: '#91CB74'
					},

					{
						id: 'pulsesNumber',
						name: '脉冲个数',
						unitMeasure: "℃",
						color: '#FAC858'
					},
					{
						id: 'energ',
						name: '能量大小',
						unitMeasure: "℃",
						color: '#EE6666'
					}
				],
			};
		},
		props: {
			index: {
				value: Number,
			},
			yAxis: {
				value: Array,
				default: {}
			},
			xAxis: {
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
		watch: {
			yAxis(val) {
				if (val.length === 0) return
				this.getServerData();
			}
		},
		onReady() {
			this.pixelRatio = uni.getSystemInfoSync().pixelRatio;
		},
		methods: {
			getServerData() {
				let res = {
					categories: this.xAxis,
					series: [{
						name: this.list[this.index].name,
						data: this.yAxis
					}]
				};
				let container = uni.createSelectorQuery().in(this).select("#tempContainer");
				container.boundingClientRect(data => {
					this.drawCharts(this.list[this.index].id, res, data.width * this.pixelRatio, data.height * this
						.pixelRatio);
				}).exec(function(res) {
					// 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
				})
			},
			drawCharts(id, data, width, height) {
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
							type: "line",
							context: ctx,
							width: canvas.width,
							height: canvas.height,
							categories: data.categories,
							series: data.series,
							animation: true,
							background: "#FFFFFF",
							color: [this.list[this.index].color],
							fontSize: '24',
							padding: [35, 10, 0, 10],
							legend: {
								fontSize: '24',
								fontWeight: 800,
							},
							dataPointShapeType: 'hollow',
							xAxis: {
								disableGrid: true
							},
							yAxis: {
								gridType: "dash",
								dashLength: 2,
								showTitle: true,
								data: [{
									fontSize: 24,
									title: this.list[this.index].unitMeasure,
									titleFontSize: 24,
									tofix: 1,
								}]
							},
							extra: {
								line: {
									type: "curve",
									width: 4
								}
							}
						})
					}
				});
			},
			tap(e) {
				let url = `/pages/recordList/dataDetail?index=${this.index}&model=${this.model}&record_id=${this.recordId}`
				uni.navigateTo({
					url
				})
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
