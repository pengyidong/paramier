<template>
	<view class="pb88">
		<u-navbar title="商机详情" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="mt30">
			<title title="订单信息"></title>
		</view>
		<view class="m32 bg-FFFFFF boxShadow borderRadius co-333333 f28">
			<view class="list-item d-s-c">
				<view>订单号：{{detail.order_no}}</view>
				<view class="co-539DF9 underline" @click="copyId(detail.order_no)">复制</view>
			</view>
			<view class="list-item">状态：{{current | state}}</view>
			<view class="list-item">派单时间：{{detail.date | transformTime}}</view>
			<view class="list-item">线索获取来源：{{detail.source || '-'}}</view>
		</view>

		<title title="客户信息"></title>
		<view class="m32 bg-FFFFFF boxShadow borderRadius co-333333 f28">
			<view class="list-item">姓名：{{detail.name || '-'}}</view>
			<view class="list-item" @click="makePhoneCall(detail.phone)">手机号：{{detail.phone || '-'}}</view>
			<view class="list-item">变美需求：{{detail.demand || '-'}}</view>
		</view>

		<title title="成交信息"></title>
		<view class="m32 bg-FFFFFF boxShadow borderRadius co-333333 f28">
			<view class="list-item">成交项目：{{detail.clinch_deal_project || '-'}}</view>
			<view class="list-item">成交金额：{{detail.clinch_deal_amount || '-'}} 元</view>
			<view class="list-item">升单项目： {{detail.bill_raising_item || '-'}}</view>
			<view class="list-item">升单金额：{{detail.amount_bill_upgrade || '-'}} 元</view>
		</view>

		<title title="备注信息"></title>
		<view class="m32 bg-FFFFFF boxShadow borderRadius co-333333 f28">
			<view class="list-item tj">{{detail.note || '-'}}</view>
		</view>

		<title title="订单过程"></title>
		<!-- <image :src="`https://bianm.jinxiongsj.com/file/uploads/20221129/${item.activeUrl}.png`" mode="widthFix">
		</image> -->
		<!-- -->
		<view class="m32 bg-FFFFFF boxShadow borderRadius co-333333 f28">
			<view class="p-20-30">
				<view class="flex" v-for="(item, index) in stepsList" :key="index">
					<view class="d-d-c">
						<image style="width: 64rpx;height: 64rpx;"
							:src="`https://bianm.jinxiongsj.com/file/uploads/20221129/${item.activeUrl}.png`"
							mode="widthFix">
						</image>
						<view class="line" />
					</view>
					<view class="right ml30 co-999999 f26 pb15">
						<view class="co-333333 f36 d-c" style="height: 64rpx;">{{item.title}}</view>
						<view>{{item.date | transformTime}}</view>
						<!-- <view>{{item.desc || ''}}</view> -->
					</view>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	import title from '@/components/title/title.vue';
	import {
		getBusinessDetail
	} from '@/common/api.js'
	export default {
		components: {
			title,
		},
		onLoad(options) {
			if (Object.keys(options).length !== 0) {
				let id = decodeURIComponent(options.id);
				this.current = decodeURIComponent(options.state);
				console.log("this.current: ", this.current);
				this.getData(id)
			}

		},
		data() {
			return {
				current: 0,
				detail: {},
				stepsList: [],
			}
		},
		methods: {
			async getData(id) {
				let obj = {
					data_id: id
				}
				const res = await getBusinessDetail(obj)
				if (res.statusCode == 200) {
					this.detail = res.data.data

					let _stepsList = [{
						title: '商机派发',
						date: res.data.data.date,
						desc: '线索派单，已派发。',
						activeUrl: '19e0b038cf5465fac1b162687d9f441e'
					}]
					let communication = {
						title: '有效订单',
						date: res.data.data.communication_time,
						desc: '联系客户，客户预约12号8点到院。',
						activeUrl: '348bd1dad925f4c991367b5187c990ae',
					}
					let hospital = {
						title: '客户到院',
						date: res.data.data.to_hospital_time,
						desc: '客户上午十点到，罚款200。',
						activeUrl: '69684a1ec59227f1db4a326abfc01da1',
					}
					let clinch = {
						title: '完成订单',
						date: res.data.data.clinch_deal_time,
						desc: '客户很满意，并升单了光子嫩肤。',
						activeUrl: 'fe1efb769373192de99b2697b78daae5',
					}
					let error = {
						title: '无效订单',
						date: res.data.data.clinch_deal_time,
						desc: '客户不是很满意',
						activeUrl: '307ed0c8168a128f15f076ad6731f491',
					}
					if (this.current == 1) {
						_stepsList.push(communication)
					} else if (this.current == 2) {
						_stepsList.push(communication)
						_stepsList.push(hospital)
					} else if (this.current == 3) {
						_stepsList.push(communication)
						_stepsList.push(hospital)
						_stepsList.push(clinch)
					} else if (this.current == 4) {
						_stepsList.push(error)
					}
					this.$nextTick(() => {
						this.stepsList = _stepsList
					});
				}
			},
			copyId(data) {
				uni.setClipboardData({
					data,
					success: () => {
						uni.showToast({
							title: '复制成功',
							duration: 2000,
							icon: 'none'
						});
					}
				});
			},
			makePhoneCall(phoneNumber) {
				uni.makePhoneCall({
					phoneNumber
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.line {
		width: 3rpx;
		height: calc(100% - 64rpx);
		border-left: 3rpx solid #5b8ff7;
	}

	.flex:last-child .line {
		width: 0;
		height: calc(100% - 64rpx);
		border-left: 0rpx solid #5b8ff7;
	}
</style>
