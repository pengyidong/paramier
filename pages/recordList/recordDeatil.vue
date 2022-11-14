<template>
	<view>
		<u-navbar title="治疗档案详情" :autoBack="true" :placeholder='true'></u-navbar>
		<charts :lineList='lineList'></charts>
		<basicInfo :detail='detailData' :model='model' :currentnumber='current_number' :lineList='lineList'></basicInfo>
		<progress :detail='detailData'></progress>
		<view class="bg-FFFFFF pb30 m-0-24 bb-999999-2">
			<u-tabs @change='tabsChange' :current='index' :scrollable='false' itemStyle="height: 30px;" :list="list"
				:lineWidth='60' :lineHeight='2' lineColor="#5AA1F9" :activeStyle="{
			    color: '#5AA1F9'
			}"></u-tabs>
		</view>

		<project v-if="index === 0" :detail='detailData'></project>
		<customer v-if="index === 1" :detail='detailData'></customer>
		<doctor v-if="index === 2" :detail='detailData'></doctor>
		<effect v-if="index === 3" :detail='detailData'></effect>

		<hash :detail='detailData'></hash>

	</view>
</template>

<script>
	import charts from "./detail/charts.vue"
	import basicInfo from "./detail/basicInfo.vue"
	import progress from "./detail/progress.vue"
	import project from "./item/projectInfo.vue"
	import customer from "./item/customerInfo.vue"
	import doctor from "./item/doctor.vue"
	import effect from "./item/effect.vue"
	import hash from "./item/hash.vue"
	import {
		recordDetail,
		recordRun
	} from '@/common/api.js'
	export default {
		components: {
			basicInfo,
			progress,
			charts,
			project,
			customer,
			doctor,
			effect,
			hash
		},
		data() {
			return {
				index: 0,
				agency_name: '',
				record_id: '',
				model: '',
				current_number: '',
				lineList: [],
				detailData: {

				},
				list: [{
					name: '项目信息',
				}, {
					name: '客户信息',
				}, {
					name: '医生信息'
				}, {
					name: '效果图片'
				}],
			}
		},
		onLoad(options) {
			this.agency_name = decodeURIComponent(options.agency_name);
			this.record_id = decodeURIComponent(options.record_id);
		},
		onShow() {
			this.getDeatilData()
			this.getListData()
		},
		methods: {
			tabsChange(e) {
				this.index = e.index
			},
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
					this.model = res?.data?.data[0]?.model || ''
					this.current_number = res?.data?.data[0]?.current_number
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
					this.detailData = res.data.data[0]
				}

			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
