// 运营课程
<template>
	<view>
		<view class="m-30-24 bg-FFFFFF borderRadius hidden" v-for="(item, index) in list" :key="index">
			<image class="w100" :src="item.img" mode="widthFix"></image>
			<view class="p-30-25 co-333333">
				<view class="f30 fb mb15">{{item.title}}</view>
				<view class="f26">发布日期：{{item.date}}</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			list: {
				value: Array,
				default: []
			}
		},
	}
</script>

<style lang="scss" scoped>
	.p-30-25 {
		padding: 30rpx 25rpx;
	}

	.m-30-24 {
		margin: 30rpx 24rpx;
	}
</style>
