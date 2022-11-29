<template>
	<view class="pb88">
		<u-navbar title="商机详情" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="mt30">
			<title title="订单信息"></title>
		</view>
		<view class="m32 bg-FFFFFF boxShadow borderRadius co-333333 f28">
			<view class="list-item d-s-c">
				<view>订单号：{{detail.orderId}}</view>
				<view class="co-539DF9 underline" @click="copyId(detail.orderId)">复制</view>
			</view>
			<view class="list-item">状态：{{detail.state | state}}</view>
			<view class="list-item">派单时间：{{detail.creationTime}}</view>
			<view class="list-item">线索获取来源：{{detail.source}}</view>
		</view>

		<title title="客户信息"></title>
		<view class="m32 bg-FFFFFF boxShadow borderRadius co-333333 f28">
			<view class="list-item">姓名：{{detail.name}}</view>
			<view class="list-item" @click="makePhoneCall(detail.phone)">手机号：{{detail.phone}}</view>
			<view class="list-item">变美需求：{{detail.demand}}</view>
		</view>

		<title title="成交信息"></title>
		<view class="m32 bg-FFFFFF boxShadow borderRadius co-333333 f28">
			<view class="list-item">成交项目：{{detail.transactionItems}}</view>
			<view class="list-item">成交金额：{{detail.amountTransaction}}元</view>
			<view class="list-item">升单项目： {{detail.billRaisingItem}}</view>
			<view class="list-item">升单金额：{{detail.amountBillUpgrade}}元</view>
		</view>

		<title title="备注信息"></title>
		<view class="m32 bg-FFFFFF boxShadow borderRadius co-333333 f28">
			<view class="list-item tj">{{detail.note}}</view>
		</view>

		<title title="订单过程"></title>
		<!-- <image :src="`https://bianm.jinxiongsj.com/file/uploads/20221129/${item.activeUrl}.png`" mode="widthFix">
		</image> -->
		<!-- -->
		<view class="m32 bg-FFFFFF boxShadow borderRadius co-333333 f28">
			<view class="p-20-30">
				<view class="flex" v-for="(item, index) in detail.stepsList" :key="index">
					<view class="d-d-c">
						<image style="width: 64rpx;height: 64rpx;"
							:src="`https://bianm.jinxiongsj.com/file/uploads/20221129/${item.activeUrl}.png`"
							mode="widthFix">
						</image>
						<view class="line" />
					</view>
					<view class="right ml30 co-999999 f26 pb15">
						<view class="co-333333 f36 d-c" style="height: 64rpx;">{{item.title}}</view>
						<view>{{item.date}}</view>
						<view>{{item.desc}}</view>
					</view>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	import title from '@/components/title/title.vue';
	export default {
		components: {
			title,
		},
		data() {
			return {
				current: 3,
				detail: {
					name: '张三',
					phone: '11249390520',
					orderId: '20221128001',
					creationTime: '2022-11-28 10:00:00',
					demand: '抗衰',
					source: '新媒体投放',
					state: '3',
					valid: true,
					transactionItems: '热芙美面部12000发',
					amountTransaction: '128888',
					billRaisingItem: '光子嫩肤',
					amountBillUpgrade: '5000',
					note: '项目：【已拍】12888元【热芙美抗衰（1200发面颈部）+黑金超光子1次套卡+瑾熊水光1次，8.30已到店操作',
					stepsList: [{
							title: '商机派发',
							date: '2022-11-10 10:00:00',
							desc: '线索派单，已派发。',
							activeUrl: '19e0b038cf5465fac1b162687d9f441e'
						},
						{
							title: '联系沟通',
							date: '2022-11-10 11:00:00',
							desc: '联系客户，客户预约12号8点到院。',
							activeUrl: '348bd1dad925f4c991367b5187c990ae',
						},
						{
							title: '客户到院',
							date: '2022-11-12 08:00:00',
							desc: '客户上午十点到，罚款200。',
							activeUrl: '69684a1ec59227f1db4a326abfc01da1',
						},
						{
							title: '完成订单',
							date: '2022-11-12 08:00:00',
							desc: '客户很满意，并升单了光子嫩肤。',
							activeUrl: 'fe1efb769373192de99b2697b78daae5',
						}
					],
				},
			}
		},
		methods: {
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
