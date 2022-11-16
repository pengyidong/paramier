<template>
	<view class="mt30 w100">
		<title title="资料完善度"></title>
		<view class="m24 bg-FFFFFF  borderRadius p24 ">
			<view class="flex">
				<canvas canvas-id="progress" id="progress" type="2d" class="charts mr20" @touchend="tap" />
				<view class="f26 co-333333 flex-1 d-f-a">
					<view class="flex mb15">
						<view class="flex-1 d-s-c  mr15">
							<view>项目信息：{{projectNum}}/2</view>
							<u-icon v-if="projectNum === 2" name="checkbox-mark" color="#5D9AFF" size="24"></u-icon>
						</view>
						<view class="flex-1 d-s-c">
							<view>客户信息：{{cistpmerNum}}/5</view>
							<u-icon v-if="cistpmerNum === 5" name="checkbox-mark" color="#5D9AFF" size="24"></u-icon>
						</view>
					</view>
					<view class="flex mb15">
						<view class="flex-1 d-s-c mr15">
							<view>医生信息：{{doctorNum}}/1</view>
							<u-icon v-if="doctorNum === 1" name="checkbox-mark" color="#5D9AFF" size="24"></u-icon>
						</view>
						<view class="flex-1 d-s-c">
							<view>效果图片：{{effectNum}}/2</view>
							<u-icon v-if="effectNum === 2" name="checkbox-mark" color="#5D9AFF" size="24"></u-icon>
						</view>
					</view>
				</view>
			</view>

			<view class="flex">
				<view class="btn co-FFFFFF f26 fb " @click="goto">
					立即完善
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
				projectNum: 0,
				cistpmerNum: 0,
				doctorNum: 0,
				effectNum: 0,
				pixelRatio: 2,
			};
		},
		props: {
			detail: {
				value: Object,
				default: {}
			}
		},
		watch: {
			detail(val) {
				this.getServerData();
				this.getInfo();
			}
		},
		methods: {
			goto() {
				let url = `/pages/recordList/editRecord?record_id=${this.detail.record_id}`
				uni.navigateTo({
					url
				})
			},
			getInfo() {
				let _projectNum = this.projectNum
				let _cistpmerNum = this.cistpmerNum
				let _doctorNum = this.doctorNum
				let _effectNum = this.effectNum
				if (this.detail.project) {
					_projectNum++;
				}
				if (this.detail.parts) {
					_projectNum++;
				}
				if (this.detail.customer_name) {
					_cistpmerNum++;
				}
				if (this.detail.contact) {
					_cistpmerNum++;
				}
				if (this.detail.gender) {
					_cistpmerNum++;
				}
				if (this.detail.wechat) {
					_cistpmerNum++;
				}
				if (this.detail.symptoms) {
					_cistpmerNum++;
				}
				if (this.detail.doctor_name) {
					_doctorNum++;
				}

				if (this.detail?.before[0]?.url) {
					_effectNum++;
				}
				if (this.detail?.after[0]?.url) {
					_effectNum++;
				}

				this.projectNum = _projectNum
				this.cistpmerNum = _cistpmerNum
				this.doctorNum = _doctorNum
				this.effectNum = _effectNum
			},
			getServerData() {
				this.pixelRatio = uni.getSystemInfoSync().pixelRatio;
				let res = {
					series: [{
						color: "#5D9AFF",
						data: this.detail.progress || 0
					}]
				};
				this.drawCharts('progress', res);
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
						canvas.width = 90 * this.pixelRatio;
						canvas.height = 90 * this.pixelRatio;
						uChartsInstance[id] = new uCharts({
							type: "arcbar",
							context: ctx,
							width: 90 * this.pixelRatio,
							height: 90 * this.pixelRatio,
							series: data.series,
							pixelRatio: this.pixelRatio,
							animation: true,
							background: "#FFFFFF",
							color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272",
								"#FC8452", "#9A60B4", "#ea7ccc"
							],
							padding: undefined,
							title: {
								name: `${this.detail.progress * 100}%` || 0,
								fontSize: 18,
								color: "#5D9AFF"
							},

							extra: {
								arcbar: {
									type: "default",
									width: 10,
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
			},
			tap(e) {
				uChartsInstance[e.target.id].touchLegend(e);
				uChartsInstance[e.target.id].showToolTip(e);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.charts {
		width: 180rpx;
		height: 180rpx;
		z-index: 100;
	}

	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10rpx 35rpx;
		border: 1rpx solid #8B91C4;
		background: linear-gradient(94deg, #A9B8D5, #D2C7D8);
		border-radius: 12rpx;
		position: relative;
		max-width: 150rpx;
		margin-left: auto;
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
