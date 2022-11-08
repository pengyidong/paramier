<template>
	<view class="card d-s-c">
		<view class="flex-1">
			<view class="mb15 f30">
				治疗前
			</view>
			<u-album class="borderRadius" borderRadius='12rpx' :urls="urls1" keyName="src1"></u-album>
		</view>
		<view class="flex-1">
			<view class="mb15 f30">
				治疗后
			</view>
			<u-album class="borderRadius" borderRadius='12rpx' :urls="urls2" keyName="src2"></u-album>
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
			return {
				urls1: [{
					src1: this.detail.before[0].url,
				}],
				urls2: [{
					src2: this.detail.after[0].url,
				}],
			}
		},
		methods: {}
	}
</script>


<style lang="scss" scoped>
</style>
