<template>
	<view class="mb88">
		<!-- <u-navbar title="治疗档案列表" :autoBack="true" :placeholder='true'></u-navbar> -->
		<view class="mt30 m-0-24 bg-FFFFFF boxShadow borderRadius co-333333 f28" v-for="(item, index) in list"
			:key="index" @click="gotoDetail(item)">
			<image class="w100"
				src="https://bianm.jinxiongsj.com/file/uploads/20221010/ae77dc315efd4bf4d60197d434a469cb.png"
				mode="widthFix"></image>
			<view class="">
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
				list: []
			}
		},
		created() {
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
							value: '四川米兰柏羽医学美容医院有限公司'
						}]
					}
				}
				const res = await record(obj)
				if (res.statusCode == 200) {
					this.list = res.data.data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-item {
		padding: 30rpx;
		color: #666666;
		font-size: 26rpx;
	}

	.list-item:not(:last-child) {
		border-bottom: 1rpx rgba(153, 153, 153, 0.2) solid;
	}
</style>
