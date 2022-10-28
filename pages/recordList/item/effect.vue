<template>
	<view class="card flex">
		<view class="flex-1">
			<view class="mb15">
				治疗前
			</view>
			<view>
				<image style="width: 100%;" class="borderRadius" :src="detail.before[0].url" mode="widthFix"></image>
			</view>
		</view>
		<view class="flex-1">
			<view class="mb15">
				治疗后
			</view>
			<view>
				<image style="width: 100%;" class="borderRadius" :src="detail.after[0].url" mode="widthFix"></image>
			</view>
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
</style>
