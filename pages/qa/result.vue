<template>
	<view class="pb120">
		<u-navbar title="话术QA" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="m24" @click="goto('/pages/qa/search')">
			<u-search placeholder="请输入关键字搜索" :disabled='true' :showAction='false' shape="round" v-model="keyword">
			</u-search>
		</view>

		<view class="cardt p-20-30" v-for="(item,index) in list" :key="index">
			<view class="d-c mb20">
				<u-icon name="question-circle-fill" color="#9FAECE" size="26"></u-icon>
				<span class='ml15 f32 co-333333'>{{item.title}}</span>
			</view>
			<view class="d-c">
				<u-icon name="server-man" color="#5D9AFF" size="26"></u-icon>
				<span class='ml15 f26 co-333333'>{{item.content}}</span>
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
						title: '话术QA',
						content: '话术QA话术QA话术QA话术QA话术QA'
					}, {
						title: '话术QA',
						content: '话术QA话术QA话术QA话术QA话术QA'
					},
					{
						title: '话术QA',
						content: '话术QA话术QA话术QA话术QA话术QA'
					}
				]
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
</style>
