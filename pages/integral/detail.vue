<template>
	<view :style="'margin-top:'+statusBarHeight+'px'" class="mb88">
		<u-navbar title="积分明细" :autoBack="true" :placeholder='true'></u-navbar>

		<view class="borderRadius bg-FFFFFF m-0-24 p30 d-c mb30">
			<image style="width: 28rpx;height: 28rpx;" class="mr15"
				src="https://bianm.jinxiongsj.com/file/uploads/20221121/c5d9ee54e67aee362afb796870d71f40.png"
				mode="widthFix"></image>
			<text class="co-333333 f30 mr15">当前积分:</text>
			<text class="co-539DF9 fb f48 mr30">100000</text>
		</view>

		<view class="bg-FFFFFF p-0-25 pt15 m-0-24  borderRadius">
			<view class="bb-999999-2 pb15">
				<u-tabs @change='tabsChange' :current='index' :scrollable='false' itemStyle="height: 30px;"
					:list="tabList" :lineWidth='60' :lineHeight='2' lineColor="#5AA1F9" :activeStyle="{
			    color: '#5AA1F9'
			}"></u-tabs>
			</view>
			<view class="mt15">
				<view class="bb-999999-2 p-15-30 d-s-c" v-for="(item, i) in list" :key="i">
					<view class="">
						<view class="co-333333 fb mb15 f28">
							{{item.title}}
						</view>
						<view class="co-999999 f24">
							{{item.date}}
						</view>
					</view>
					<view class="fb " :class="index === 0 ? 'co-539DF9':'co-F9AE3D'">
						{{item.change}}
					</view>
				</view>
			</view>
		</view>


	</view>

</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				tabList: [{
					name: '积分收支明细',
				}, {
					name: '积分兑换记录',
				}],
				index: 0,
				list: [],
				a:[{
					title: '医生认证',
					date: '2022-10-12 17:00',
					change: '+10积分'
				}, {
					title: '医生认证',
					date: '2022-10-12 17:00',
					change: '+10积分'
				}, {
					title: '仪器上线机构百度/抖音/小红书等推广',
					date: '2022-10-12 17:00',
					change: '+10积分'
				}, {
					title: '仪器上架机构线下广告露出',
					date: '2022-10-12 17:00',
					change: '+10积分'
				}, ],
				b: [{
					title: '兑换耗材',
					date: '2022-10-12 17:00',
					change: '-10积分'
				}, {
					title: '仪器上线机构抖音/小红书等推广',
					date: '2022-10-12 17:00',
					change: '-10积分'
				}, {
					title: '仪器上线机构百度等推广',
					date: '2022-10-12 17:00',
					change: '-10积分'
				}, {
					title: '仪器上架机构线下广告露出',
					date: '2022-10-12 17:00',
					change: '-10积分'
				}, ]
			}
		},
		onReady() {
			this.list = this.a
		},
		methods: {
			tabsChange(e) {
				this.index = e.index
				this.index === 0 ? this.list = this.a : this.list = this.b
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
