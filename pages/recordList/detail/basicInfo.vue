<template>
	<view class="mt50">
		<view class="flex bg-FFFFFF m-0-24 borderRadius p24 mb30">
			<view>
				<image :src="modelList[model]" style="width: 120rpx;height: 120rpx">
				</image>
			</view>
			<view class="f26 co-333333 ml30 d-f-s">
				<view>模式：{{model}}</view>
				<view>治疗时长：1小时20分</view>
				<view>剩余发数：{{currentnumber}}</view>
			</view>
		</view>
		<title title="基础信息"></title>
		<view class="m-0-24 bg-FFFFFF borderRadius p24 co-333333 f26">
			<view class="flex mb15">
				<view class="flex-1">
					档案ID：{{detail.record_id || '' }}
				</view>
				<view class="flex-1">
					创建时间：{{detail.creation_time | transformTime}}
				</view>
			</view>
			<view class="flex">
				<view class="flex-1">
					开始时间：{{detail.start_time | transformTime}}
				</view>
				<view class="flex-1">
					结束时间：{{detail.end_time | transformTime}}
				</view>
			</view>
		</view>
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
			},
			model: {
				value: String,
				default: ''
			},
			currentnumber: {
				value: String,
				default: ''
			}
		},
		data() {
			return {
				modelList: {
					'脱毛': 'https://bianm.jinxiongsj.com/file/uploads/20221010/b5e4211be37f8978aff4e1355ba014e4.png',
					'嫩肤': 'https://bianm.jinxiongsj.com/file/uploads/20221010/863ed068b4e9e313d85aef2e6f9d76d5.png',
					'祛斑': 'https://bianm.jinxiongsj.com/file/uploads/20221010/ef72d557e552161ab29d821ca83bba80.png',
					'毛细血管扩张': 'https://bianm.jinxiongsj.com/file/uploads/20221010/44bc9166ed4af0364319e4ad95cb9ae2.png',
				}
			}
		},
		methods: {}
	}
</script>


<style lang="scss" scoped>
</style>
