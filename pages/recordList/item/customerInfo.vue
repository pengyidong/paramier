<template>
	<view class="card">
		<view class="flex mb15">
			<view class="flex-1">姓名：{{detail.customer_name}}</view>
			<view class="flex-1">联系方式：{{detail.contact}}</view>
		</view>
		<view class="flex mb15">
			<view class="flex-1">性别：{{detail.gender}}</view>
			<view class="flex-1">微信号：{{detail.wechat}}</view>
		</view>
		<view>症状和问题</view>
		<view class="tj">{{detail.symptoms}}</view>
	</view>
</template>

<script>
	import title from '@/components/title/title.vue';
	export default {
		components: {
			title
		},
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
