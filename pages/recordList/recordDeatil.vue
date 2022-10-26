<template>
	<view>
		<u-navbar title="治疗档案详情" :autoBack="true" :placeholder='true'></u-navbar>
		<echarts></echarts>
	</view>
</template>

<script>
	import echarts from "./detail/echarts.vue"
	import {
		recordDetail,
		recordRun
	} from '@/common/api.js'
	export default {
		components: {
			echarts
		},
		data() {
			return {
				agency_name: '',
				record_id: '',
				model: '毛细血管扩张',
				lineList: []
			}
		},
		onLoad(options) {
			this.agency_name = decodeURIComponent(options.agency_name);
			this.record_id = decodeURIComponent(options.record_id);
			this.getDeatilData()
			this.getListData()
		},
		methods: {
			// 图表数据
			async getDeatilData() {
				let obj = {
					limit: 100,
					filter: {
						rel: "and",
						cond: [{
							field: "record_id",
							method: "eq",
							value: `${this.record_id}`
						}, {
							field: "equipment_status",
							method: "eq",
							value: `运行中`
						}, {
							field: "model",
							method: "eq",
							model: `${this.model}`
						}, ]
					}
				}
				const res = await recordRun(obj)
				if (res.statusCode == 200) {
					this.lineList = res.data.data
				}
			},
			// 项目详情
			async getListData() {
				let obj = {
					limit: 100,
					filter: {
						rel: "and",
						cond: [{
							field: "record_id",
							method: "eq",
							value: `${this.record_id}`
						}]
					}
				}
				const res = await recordDetail(obj)
				if (res.statusCode == 200) {
					// this.list = res.data.data
				}

			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
