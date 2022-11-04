<template>
	<view class="mb88">
		<u-navbar title="编辑档案" :autoBack="true" :placeholder='true'></u-navbar>
		<title title="项目信息"></title>
		<view class="card">
			<view class="co-333333 f26 fb mb15">项目部位</view>
			<u--input placeholder="请输入内容" border="surround" :value='detail.parts'></u--input>
			<view class="co-333333 f26 fb m-15-0">项目名称</view>
			<u--input placeholder="请输入内容" border="surround" :value='detail.project'></u--input>
		</view>

		<title title="客户信息"></title>
		<view class="card">
			<view class="co-333333 f26 fb mb15">姓名</view>
			<u--input placeholder="请输入内容" border="surround" :value='detail.customer_name'></u--input>
			<view class="co-333333 f26 fb m-15-0">性别</view>
			<u-radio-group v-model="detail.gender" placement="row">
				<u-radio label="男" name='男' :customStyle="{marginRight: '16px'}"></u-radio>
				<u-radio label="女" name='女'></u-radio>
			</u-radio-group>
			<view class="co-333333 f26 fb m-15-0">联系方式</view>
			<u--input placeholder="请输入内容" border="surround" :value='detail.contact'></u--input>
			<view class="co-333333 f26 fb m-15-0">微信号</view>
			<u--input placeholder="请输入内容" border="surround" :value='detail.wechat'></u--input>
			<view class="co-333333 f26 fb m-15-0">症状问题</view>
			<u--textarea placeholder="请输入内容" autoHeight :value='detail.symptoms'></u--textarea>
		</view>
		<title title="医生信息"></title>
		<view class="card flex">
			<view class="mr30">
				<image class="doctorPhoto" :src="detail.doctor_photo[0].url" mode="widthFix"></image>
			</view>
			<view class="d-f-s">
				<view>姓名：{{detail.doctor_name}}</view>
				<view>职称：{{detail.doctor_title}}</view>
				<view>编号：{{detail.doctor_number}}</view>
			</view>
			<view class="btn btnlt co-FFFFFF f26 fb">选择医生</view>
		</view>
		<title title="效果图片"></title>
		<view class="card d-s-c">
			<view class="flex-1">
				<view class="mb15">
					治疗前
				</view>
				<view>
					<image style="width: 95%;" class="borderRadius" :src="detail.before[0].url" mode="widthFix"></image>
				</view>
			</view>
			<view class="flex-1">
				<view class="mb15">
					治疗后
				</view>
				<view>
					<image style="width: 95%;" class="borderRadius" :src="detail.after[0].url" mode="widthFix"></image>
				</view>
			</view>
		</view>

		<view class="d-s-c">
			<view class="flex-1 d-c-c">
				<view class="btn co-FFFFFF f26">取 消</view>
			</view>
			<view class="flex-1 d-c-c">
				<view class="btn co-FFFFFF f26">编 辑</view>
			</view>
		</view>
	</view>
</template>

<script>
	import title from '@/components/title/title.vue';
	import {
		recordDetail,
		recordEdit
	} from '@/common/api.js'
	export default {
		components: {
			title
		},
		data() {
			return {
				detail: {},
				record_id: ''
			}
		},
		onLoad(options) {
			this.record_id = decodeURIComponent(options.record_id);
			this.getListData()
		},
		methods: {
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
					this.detail = res.data.data[0]
				}
			},
			edit(){
				let obj = {}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.doctorPhoto {
		width: 120rpx;
		height: 120rpx;
		min-width: 120rpx;
		min-height: 120rpx;
		border-radius: 120rpx;
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
		max-width: 120rpx;
		height: 30rpx;
	}
	
	.btnlt{
		margin-left: auto;
		margin-top: auto;
	}

	.btn:before {
		content: '';
		position: absolute;
		width: calc(100% - 8rpx);
		height: calc(100% - 8rpx);
		background: transparent;
		border: 1rpx solid #FFFFFF;
		border-radius: 12rpx;
		top: 2rpx;
		left: 2rpx;
	}
</style>
