<template>
	<view class="pb120">
		<u-navbar title="商机列表" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="bg-FFFFFF pb30 bb-999999-2">
			<u-tabs @change='tabsChange' :current='index' :scrollable='false' itemStyle="height: 30px;" :list="tabList"
				:lineWidth='30' :lineHeight='2' lineColor="#5AA1F9" :activeStyle="{
			    color: '#5AA1F9'
			}"></u-tabs>
		</view>
		<view v-if="list.length > 0">
			<view class="m32 bg-FFFFFF boxShadow borderRadius co-333333 f28"
				@click="goto(`/pages/business/detail?id=${item._id}&state=${index}`)" v-for="(item, i) in list"
				:key="i">
				<view class="list-item d-c">
					<image style="width: 48rpx;height: 48rpx;" mode="widthFix"
						:src="`https://bianm.jinxiongsj.com/file/uploads/20221129/${iconList[index]}.png`">
					</image>
					<view class="ml15">
						<span class='co-333333 f32 mr15'>{{item.name}}</span>
						<span class='co-999999 f26'>{{item.phone}}</span>
					</view>
					<image v-if="item.valid === '有效'" class="ml-a" style="width: 105rpx;height: 105rpx;"
						src="https://bianm.jinxiongsj.com/file/uploads/20221128/9e375d41f3fbacee1bb14fe8315ae3f7.png"
						mode="widthFix"></image>
				</view>
				<view class="list-item">订单号：{{item.order_no || '-'}}</view>
				<view class="list-item">派单时间：{{item.date | transformTime }}</view>
				<view class="list-item">变美需求：{{item.demand || '-'}}</view>
				<view class="list-item">线索获取来源：{{item.source || '-'}}</view>
				<!-- <view class="list-item">状态：{{item.state | state}}</view> -->
			</view>
		</view>
		<view v-else>
			<view class="d-c-c w100 mt400" v-if="loadingres==='0'">
				<u-loading-icon size='48' color='#689bff'></u-loading-icon>
			</view>
			<view class="f48 co-999999 d-c-c w100 mt400" v-if="loadingres==='2' ">
				<u-empty mode="list" text='暂无数据'></u-empty>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		getBusinessList
	} from '@/common/api.js'
	export default {
		data() {
			return {
				index: 0,
				loadingres: '0',
				tabList: [{
					name: '已派单',
				}, {
					name: '已沟通',
				}, {
					name: '已到院',
				}, {
					name: '已成交',
				}, {
					name: '无效单',
				}, ],
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				list: [],
				iconList: [
					'19e0b038cf5465fac1b162687d9f441e',
					'348bd1dad925f4c991367b5187c990ae',
					'69684a1ec59227f1db4a326abfc01da1',
					'fe1efb769373192de99b2697b78daae5',
					'307ed0c8168a128f15f076ad6731f491',
				]
			}
		},
		onLoad(options) {
			if (Object.keys(options).length !== 0) {
				let _index = decodeURIComponent(options.index) || 0;
				this.index = parseFloat(_index)
				this.getData()
			}
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url
				})
			},
			initCond() {
				let valid, id_to_hospital, is_clinch_deal
				if (this.index === 0) {
					valid = '未沟通'
					id_to_hospital = '未到院'
					is_clinch_deal = '未成交'
				} else if (this.index === 1) {
					valid = '有效'
					id_to_hospital = '未到院'
					is_clinch_deal = '未成交'
				} else if (this.index === 2) {
					valid = '有效'
					id_to_hospital = '已到院'
					is_clinch_deal = '未成交'
				} else if (this.index === 3) {
					valid = '有效'
					id_to_hospital = '已到院'
					is_clinch_deal = '已成交'
				} else if (this.index === 4) {
					valid = '无效'
					id_to_hospital = '未到院'
					is_clinch_deal = '未成交'
				}
				let cond = [{
						field: "institutions",
						method: "eq",
						value: `变美日记广州体验中心`
					},
					{
						field: "valid",
						method: "eq",
						value: valid
					}, {
						field: "id_to_hospital",
						method: "eq",
						value: id_to_hospital
					},
					{
						field: "is_clinch_deal",
						method: "eq",
						value: is_clinch_deal
					}
				]
				return cond
			},
			async getData() {
				let cond = this.initCond()
				let obj = {
					limit: 100,
					filter: {
						rel: "and",
						cond
					}
				}
				const res = await getBusinessList(obj)
				if (res.statusCode == 200) {
					this.list = res.data.data
					if (this.list.length > 0) {
						this.loadingres = '1'
					} else {
						this.loadingres = '2'
					}

				} else {
					this.loadingres = '2'
				}
			},
			tabsChange(e) {
				this.index = e.index
				this.getData()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		bottom: 0;
		border-top: solid 2rpx #CCCCCC;
		box-shadow: 0rpx -6rpx 24rpx 5rpx rgba(128, 138, 187, 0.35);
		border-radius: 35rpx 35rpx 12rpx 12rpx;
		width: 100%;
	}
</style>
