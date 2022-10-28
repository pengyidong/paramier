<template>
	<view class="card flex">
		<view class="mr30">
			<image class="doctorPhoto" :src="detail.doctor_photo[0].url" mode="widthFix"></image>
		</view>
		<view class="d-f-s">
			<view>姓名：{{detail.doctor_name}}</view>
			<view>职称：{{detail.doctor_title}}</view>
			<view>编号：{{detail.doctor_number}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			detail: {
				value: Object,
				default: {}
			}
		},
		data() {
			return {}
		},
		methods: {}
	}
</script>


<style lang="scss" scoped>
	.doctorPhoto {
		width: 120rpx;
		height: 120rpx;
		min-width: 120rpx;
		min-height: 120rpx;
		border-radius: 120rpx;
	}
</style>
