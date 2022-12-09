<template>
	<view class="pb120">
		<u-navbar title="话术QA" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="m24" @click="goto('/pages/qa/search')">
			<u-search placeholder="请输入关键字搜索" :disabled='true' :showAction='false' shape="round" v-model="keyword">
			</u-search>
		</view>

		<view class="m24 d-r-c">
			<view class="pr mb24"  @click="goto('/pages/qa/result')" v-for="(item, index) in list" :key="index" :style="'width: '+ itemW +'px'">
				<image style="width: 100%;"
					:src=" `https://bianm.jinxiongsj.com/file/uploads/20221201/${item.image}.png`" mode="widthFix">
				</image>
				<view class="pa f48 fb co-FFFFFF title d-c-c">{{item.title}}</view>
			</view>

		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				keyword: '请输入关键字搜索',
				itemW: 168 * uni.getSystemInfoSync().windowWidth / 375,
				list: [{
					title: '运营话术',
					image: '1d0597920420d90cff9a13d9ea03fe28'
				}, {
					title: '仪器话术',
					image: 'd669987563702988679b07098bd90b51'
				}, {
					title: '地推话术',
					image: '1068d6d985012e8e513b32613cd8c119'
				}, {
					title: '推广话术',
					image: '4239f1b19f0fce25bcc97936e15761a9'
				}, ]
			}
		},
		onLoad() {},
		methods: {
			goto(url) {
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		top: 50%;
		left: 50%;
		margin-left: -100rpx;
		margin-top: -40rpx;
		width: 200rpx;
		height: 80rpx;
	}
</style>
