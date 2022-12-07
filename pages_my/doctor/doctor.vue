<template>
	<view class="pb50">
		<u-navbar title="认证医生" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="mt30"></view>
		<view class="card flex" v-for="(item, index) in list" :key="index">
			<u-avatar :src="item.picture[0].url" size='60'></u-avatar>
			<view class="ml30 d-f-a">
				<view class="d-c">
					<view class="mr30 co-333333 f30">
						{{item.doctor_name}}
					</view>
					<view class="mainBtn">
						{{item.doctor_title}}
					</view>
				</view>
				<view class="f26">
					编号：{{item.doctor_id}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		getDoctor
	} from '@/common/api.js'
	export default {
		data() {
			return {
				list:[]
			}
		},
		created() {
			this.getData()
		},
		methods: {
			async getData() {
				let obj = {
					limit: 100,
					filter: {
						rel: "and",
						cond: [{
							field: "agency_name",
							method: "eq",
							value: '变美日记广州体验中心'
						}, ]
					}
				}
				const res = await getDoctor(obj)
				console.log(res.data);
				if(res.statusCode === 200){
					this.list = res.data.data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
