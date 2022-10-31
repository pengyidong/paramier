<template>
	<view class="mt30 w100">
		<title title="资料完善度"></title>
		<view class="m24 bg-FFFFFF  borderRadius p24 flex">
			<canvas canvas-id="XPmcBCVTPCHfvNBuATYzpSVpEphsLVxv" id="XPmcBCVTPCHfvNBuATYzpSVpEphsLVxv"
				class="charts mr20" @touchend="tap" />
			<view class="f26 co-333333 flex-1 ">
				<view class="flex mb15">
					<view class="flex-1 ">
						项目信息：2/2
					</view>
					<view class="flex-1 ">
						客户信息：2/2
					</view>
				</view>
				<view class="flex mb15">
					<view class="flex-1 ">
						医生信息：2/2
					</view>
					<view class="flex-1 ">
						效果图片：2/2
					</view>
				</view>
				<view class="flex">
					<view class="flex-1">
					</view>
					<view class="flex-1">
						<view class="btn co-FFFFFF f26 fb">
							立即完善
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import uCharts from '@/static/utils/u-charts.js';
	var uChartsInstance = {};
	import title from '@/components/title/title.vue';
	export default {
		components: {
			title
		},
		data() {
			return {
				cWidth: 180,
				cHeight: 180
			};
		},
		props: {
			detail: {
				value: Object,
				default: {}
			}
		},
		onReady() {
			//这里的 180 对应 css .charts 的 width
			this.cWidth = uni.upx2px(180);
			//这里的 180 对应 css .charts 的 height
			this.cHeight = uni.upx2px(180);
			this.getServerData();
		},
		methods: {
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
					this.drawCharts('XPmcBCVTPCHfvNBuATYzpSVpEphsLVxv', res);
				}, 180);
			},
			drawCharts(id, data) {
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "arcbar",
					context: ctx,
					width: this.cWidth,
					height: this.cHeight,
					series: data.series,
					animation: true,
					background: "#FFFFFF",
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: undefined,
					title: {
						name: `${this.detail.progress * 100}%`,
						fontSize: 18,
						color: "#2fc25b"
					},
					// subtitle: {
					// 	name: "正确率",
					// 	fontSize: 12,
					// 	color: "#666666"
					// },
					extra: {
						arcbar: {
							type: "default",
							width: 10,
							backgroundColor: "#E9E9E9",
							startAngle: 0.75,
							endAngle: 0.25,
							gap: 2,
							linearType: "custom"
						}
					}
				});
			},
			tap(e) {
				uChartsInstance[e.target.id].touchLegend(e);
				uChartsInstance[e.target.id].showToolTip(e);
			}
		}
	};
</script>

<style scoped>
	.charts {
		width: 180rpx;
		height: 180rpx;
	}

	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10rpx 25rpx;
		border: 1rpx solid #8B91C4;
		background: linear-gradient(94deg, #A9B8D5, #D2C7D8);
		border-radius: 12rpx;
		position: relative;
		max-width: 120rpx;
	}

	.btn:before {
		content: '';
		position: absolute;
		width: calc(100% - 8rpx);
		height: calc(100% - 8rpx);
		background: transparent;
		border: 1rpx solid #FFFFFF;
		border-radius: 12rpx;
		top: 2rpx;
		left: 2rpx;
	}
</style>
