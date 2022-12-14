<template>
	<view class="pb120">
		<u-navbar title="认证医生" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="mt30"></view>
		<view class="card d-c" v-for="(item, index) in list" :key="index"
			@click="goto(`/pages_my/doctor/editDoctor?id=${item._id}`)">
			<u-avatar :src="item.picture[0].url" size='60'></u-avatar>
			<view class="ml30 d-f-a">
				<view class="d-c">
					<view class="mr30 co-333333 f30">
						{{item.doctor_name}}
					</view>
					<view class="tag">
						{{item.doctor_title}}
					</view>
				</view>
				<view class="f26">
					编号：{{item.doctor_id}}
				</view>
			</view>
			<view class="mainBtn ml-a">
				编辑
			</view>
		</view>
		<view class="d-c-c mt50 wz">
			<view class="flex-1 d-c-c">
				<view class="btn bcbtn co-FFFFFF f32" @click="goto('/pages_my/doctor/addDoctor')">新增医生</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getDoctorList
	} from '@/common/api.js'
	export default {
		data() {
			return {
				list: []
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url
				})
			},
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
				const res = await getDoctorList(obj)
				console.log(res.data);
				if (res.statusCode === 200) {
					this.list = res.data.data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tag {
		display: inline-block;
		padding: 8rpx 25rpx;
		color: #ffffff;
		text-align: center;
		background: linear-gradient(#70D1FE, #4B90F8);
		border-radius: 25rpx 0 25rpx 0;
	}

	.mainBtn {
		min-height: 25rpx;
	}

	.wz {
		height: 120rpx;
		width: 100%;
		background: #FFFFFF;
		position: fixed;
		bottom: env(safe-area-inset-bottom);
		box-shadow: 0rpx 3rpx 18rpx 0rpx rgba(128, 138, 187, 0.35);
	}

	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10rpx 25rpx;
		border: 1rpx solid #8B91C4;
		background: linear-gradient(94deg, #A9B8D5, #D2C7D8);
		border-radius: 12rpx;
		position: relative;
		max-width: 200rpx;
		height: 30rpx;
	}

	.bcbtn {
		min-width: 200rpx;
		height: 40rpx;
	}
</style>
