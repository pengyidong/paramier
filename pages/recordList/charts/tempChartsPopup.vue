<template>
	<u-popup :show="show" mode="center" @close="close" @open="open" :round="10" :custom-style="cStyle">
		<cover-view class="bg-FFFFFF borderRadius tempPopup pr" id="tempContainer">
			<canvas canvas-id="tempPopupCharts" id="tempPopupCharts" class="charts" @touchstart="touchstart"
				@touchmove="touchmove" @touchend="touchend" />
			<cover-view class="pa close" @click="close">
				<cover-view class="closed">
					<cover-view class="left"> </cover-view>
					<cover-view class="right"> </cover-view>
				</cover-view>
			</cover-view>
		</cover-view>
	</u-popup>
</template>

<script>
	import uCharts from '@/static/utils/u-charts.js';
	var uChartsInstance = {};
	export default {
		data() {
			return {
				cStyle: {
					width: '100%',
					height: '100%'
				},
			};
		},
		props: {
			tempAxis: {
				value: Array,
				default: {}
			},
			timeAxis: {
				value: Array,
				default: {}
			},
			show: {
				value: Boolean,
				default: false
			}
		},
		watch: {
			show(val) {
				if (!val && this.tempAxis.length > 0) return
				this.$nextTick(() => {
					this.getServerData();
				})

			}
		},
		methods: {
			getServerData() {
				let res = {
					categories: this.timeAxis,
					series: [{
						name: "温度",
						data: this.tempAxis
					}],
					enableScroll: true,
					xAxis: {
						disableGrid: true,
						scrollShow: true,
						itemCount: 12
					}
				};
				if (this.tempAxis.length < 12) {
					res.enableScroll = false
					res.xAxis = {
						disableGrid: true
					}
				}
				const statusBarHeight = uni.getStorageSync('statusBarHeight') + 10;
				const query = uni.createSelectorQuery().in(this);
				query.select("#tempContainer").boundingClientRect(data => {
					this.drawCharts('tempPopupCharts', res, data.width, data.height, statusBarHeight);
				}).exec(res => {})
			},
			drawCharts(id, data, width, height, statusBarHeight) {
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
					padding: [20, 30, 0, statusBarHeight],
					enableScroll: data.enableScroll,
					legend: {},
					rotate: true,
					xAxis: data.xAxis,
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
			touchstart(e) {
				uChartsInstance[e.target.id].scrollStart(e);
			},
			touchmove(e) {
				uChartsInstance[e.target.id].scroll(e);
			},
			touchend(e) {
				uChartsInstance[e.target.id].scrollEnd(e);
				uChartsInstance[e.target.id].touchLegend(e);
				// uChartsInstance[e.target.id].showToolTip(e);
			},
			open() {
				// console.log('open');
			},
			close() {
				this.$emit('tempPopupShow', false)
				// console.log('close');
			}
		}
	};
</script>

<style scoped>
	.tempPopup,
	.charts {
		width: 100%;
		height: 100%;
	}

	.close {
		bottom: 20rpx;
		right: 20rpx;
		width: 60rpx;
		height: 60rpx;
	}

	.closed {
		width: 60rpx;
		height: 60rpx;
		background: #cccccc;
		border-radius: 50%;
		position: relative;
		z-index: 999;
	}

	.left {
		width: 46rpx;
		height: 6rpx;
		border-radius: 6rpx;
		position: absolute;
		left: 32rpx;
		margin-left: -23rpx;
		top: 28rpx;
		background: #FFFFFF;
		transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
	}

	.right {
		width: 46rpx;
		height: 6rpx;
		border-radius: 6rpx;
		position: absolute;
		left: 32rpx;
		margin-left: -23rpx;
		top: 28rpx;
		background: #FFFFFF;
		transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg);
	}
</style>
