<template>
	<view class="pb120" :style="'margin-top: '+ statusBarHeight +'px'">
		<!-- <u-navbar title="治疗档案列表" :autoBack="true" :placeholder='true'></u-navbar> -->
		<view class="m32 bg-FFFFFF boxShadow borderRadius co-333333 f28 pr" v-for="(item, index) in list"
			:key="index" @click="gotoDetail(item)">
			<image class="w100"
				src="https://bianm.jinxiongsj.com/file/uploads/20221108/54d8ba4e8ecb331fba5ba813206d3639.jpg"
				mode="widthFix"></image>
			<view class="bg-F8F8F8 pa item">
				<view class="list-item">ID：{{item.record_id}}</view>
				<view class="list-item">机构：{{item.agency_name}}</view>
				<view class="list-item">项目：{{item.parts}}</view>
				<view class="list-item">部位：{{item.project}}</view>
				<view class="list-item">资料完善度：{{item.progress * 100 }}%</view>
				<view class="list-item">创建时间：{{item.creation_time | transformTime}}</view>
			</view>
		</view>
		<tabbar></tabbar>
	</view>

</template>

<script>
	import tabbar from '@/components/tabbar/tabbar.vue';
	import {
		record
	} from '@/common/api.js'
	export default {
		components: {
			tabbar,
		},
		data() {
			return {
				list: [],
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
			}
		},
		created() {
			this.getData()
		},
		onPullDownRefresh() {
			this.getData()
		},
		methods: {
			gotoDetail(item) {
				let url = `/pages/recordList/recordDeatil?agency_name=${item.agency_name}&record_id=${item.record_id}`
				uni.navigateTo({
					url
				})
			},
			async getData() {
				let obj = {
					limit: 100,
					fields: [
						'record_id',
						'creation_time',
						'progress',
						'agency_name',
						'parts',
						'project'
					],
					filter: {
						rel: "and",
						cond: [{
							field: "agency_name",
							method: "eq",
							value: '变美日记广州体验中心'
						}]
					}
				}
				const res = await record(obj)
				if (res.statusCode == 200) {
					this.list = res.data.data.reverse()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		bottom: 0;
		border-top: solid 2rpx #CCCCCC;
		box-shadow: 0rpx -6rpx 24rpx 5rpx rgba(128, 138, 187, 0.35);
		border-radius: 35rpx 35rpx 12rpx 12rpx;
		width: 100%;
	}
</style>
