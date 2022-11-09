<template>
	<view class="mb88">
		<u-navbar title="编辑档案" :autoBack="true" :placeholder='true'></u-navbar>
		<title title="项目信息"></title>
		<view class="card">
			<view class="co-333333 f26 fb mb15">项目部位</view>
			<u--input placeholder="请输入内容" border="surround" :value='detail.parts' @change="change($event,0)"></u--input>
			<view class="co-333333 f26 fb m-15-0">项目名称</view>
			<u--input placeholder="请输入内容" border="surround" :value='detail.project' @change="change($event,1)">
			</u--input>
		</view>

		<title title="客户信息"></title>
		<view class="card">
			<view class="co-333333 f26 fb mb15">姓名</view>
			<u--input placeholder="请输入内容" border="surround" :value='detail.customer_name' @change="change($event,2)">
			</u--input>
			<view class="co-333333 f26 fb m-15-0">性别</view>
			<u-radio-group v-model="detail.gender" placement="row">
				<u-radio label="男" name='男' :customStyle="{marginRight: '16px'}"></u-radio>
				<u-radio label="女" name='女'></u-radio>
			</u-radio-group>
			<view class="co-333333 f26 fb m-15-0">联系方式</view>
			<u--input placeholder="请输入内容" border="surround" :value='detail.contact' @change="change($event,3)">
			</u--input>
			<view class="co-333333 f26 fb m-15-0">微信号</view>
			<u--input placeholder="请输入内容" border="surround" :value='detail.wechat' @change="change($event,4)">
			</u--input>
			<view class="co-333333 f26 fb m-15-0">症状问题</view>
			<u--textarea placeholder="请输入内容" autoHeight :value='detail.symptoms' @input="change($event,5)">
			</u--textarea>
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
				<u-album class="borderRadius" borderRadius='12rpx' :urls="urls1" keyName="src1"></u-album>
			</view>
			<view class="flex-1">
				<view class="mb15">
					治疗后
				</view>
				<u-album class="borderRadius" borderRadius='12rpx' :urls="urls2" keyName="src2"></u-album>
			</view>
		</view>

		<view class="d-s-c">
			<view class="flex-1 d-c-c">
				<view class="btn co-FFFFFF f26" @click="back">取 消</view>
			</view>
			<view class="flex-1 d-c-c">
				<view class="btn co-FFFFFF f26" @click="edit">编 辑</view>
			</view>
		</view>
	</view>
</template>

<script>
	import title from '@/components/title/title.vue';
	import {
		recordDetail,
		recordUpdate
	} from '@/common/api.js'
	export default {
		components: {
			title
		},
		data() {
			return {
				detail: {},
				record_id: '',
				urls1: [],
				urls2: [],
				details: {
					parts: '',
					project: '',
					customer_name: '',
					contact: '',
					wechat: '',
					symptoms: '',
					gender: '',
					doctor_photo: '',
					doctor_name: '',
					doctor_title: '',
					doctor_number: '',
					src1: '',
					src2: ''
				}
			}
		},
		onLoad(options) {
			this.record_id = decodeURIComponent(options.record_id);
			this.getListData()
		},
		methods: {
			change(value, index) {
				switch (index) {
					case 0:
						this.details.parts = value;
						break;
					case 1:
						this.details.project = value;
						break;
					case 2:
						this.details.customer_name = value;
						break;
					case 3:
						this.details.contact = value;
						break;
					case 4:
						this.details.wechat = value;
						break;
					case 5:
						this.details.symptoms = value;
						break;
				}
				console.log("this._detail: ", this.details);
			},
			back() {
				uni.navigateBack()
			},
			edit() {
				this.update()
			},
			async update() {
				let obj = {
					data_id: this.detail._id,
					data: {
						parts: {
							value: this.details.parts
						},
						project: {
							value: this.details.project
						},
						customer_name: {
							value: this.details.customer_name
						},
						contact: {
							value: this.details.contact
						},
						wechat: {
							value: this.details.wechat
						},
						gender: {
							value: this.details.gender
						},
						symptoms: {
							value: this.details.symptoms
						},
						doctor_number: {
							value: this.details.doctor_number
						},
						doctor_name: {
							value: this.details.doctor_name
						},
						doctor_title: {
							value: this.details.doctor_title
						},
						doctor_photo: {
							value: [
								this.details.doctor_photo
							]
						},
						before: {
							value: [
								this.details.src1
							]
						},
						after: {
							value: [
								this.details.src2
							]
						}
					}
				}
				const res = await recordUpdate(obj)
				if (res.statusCode === 200) {
					this.back()
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
					this.detail = res.data.data[0]
					this.details.parts = res.data.data[0].parts
					this.details.project = res.data.data[0].project
					this.details.customer_name = res.data.data[0].customer_name
					this.details.contact = res.data.data[0].contact
					this.details.wechat = res.data.data[0].wechat
					this.details.symptoms = res.data.data[0].symptoms
					this.details.gender = res.data.data[0].gender
					this.details.doctor_photo = res.data.data[0]?.doctor_photo[0]?.url
					this.details.doctor_title = res.data.data[0].doctor_title
					this.details.doctor_name = res.data.data[0].doctor_name
					this.details.doctor_number = res.data.data[0].doctor_number
					this.details.src1 = res.data.data[0]?.before[0]?.url
					this.details.src2 = res.data.data[0]?.after[0]?.url
					this.urls1 = [{
						src1: res.data.data[0]?.before[0]?.url,
					}]
					this.urls2 = [{
						src2: res.data.data[0]?.after[0]?.url,
					}]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.doctorPhoto {
		width: 160rpx;
		height: 160rpx;
		min-width: 160rpx;
		min-height: 160rpx;
		border-radius: 160rpx;
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

	.btnlt {
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
