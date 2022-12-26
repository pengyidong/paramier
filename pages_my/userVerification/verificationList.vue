<template>
	<view class="">
		<u-navbar title="验真卡片" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="mt24"></view>
		<view class="card boxShadow f32 co-333333 lh180 pr" @click="goto(item)" v-for="(item, index) in list"
			:key="index">
			<view class="">型号：{{item.name}}</view>
			<view class="">序列号：{{item.xlh}}</view>
			<view class="">机构名称：{{item.agency_name}}</view>
			<view class="">验真时间：{{item.yzdate}}</view>
			<view class="mainBtn" v-if="item.id">治疗记录</view>
			<view class="pa yq">
				<image style="width: 80rpx;"
					src="https://bianm.jinxiongsj.com/file/uploads/20221108/21a69a0de3ca4cfbaf8839a89fa8ffd3.png"
					mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: 'rfm-001',
					xlh: 'rfm1233243423',
					agency_name: '变美日记体验中心',
					yzdate: '2022-12-23 10:54',
					id: '1231312312'
				}, {
					name: 'rfm-002',
					xlh: 'rfm1233243323',
					agency_name: '变美日记体验中心',
					yzdate: '2022-12-23 10:54',
					id: ''
				}]
			}
		},
		methods: {
			goto(item) {
				if (item.id) {
					let url =
						`/pages_record/recordDeatil?agency_name=变美日记广州体验中心&id=63a51c815ed2b5000a3347a0&record_id=2022122303120020221223030925`
					uni.navigateTo({
						url
					})
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.mainBtn {
		margin-top: 15rpx;
		width: 120rpx;
		height: 30rpx;
	}

	.yq {
		top: 5rpx;
		right: 5rpx;
	}
</style>
