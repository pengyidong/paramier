<template>
	<view class="pb120">
		<u-navbar title="编辑档案" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="mt30"></view>
		<title title="基础信息"></title>
		<view class="card">
			<view class="co-333333 f26 fb mb15">姓名</view>
			<u--input placeholder="请输入内容" border="surround" :value='detail.doctor_name' @change="change($event,0)">
			</u--input>

			<view class="co-333333 f26 fb m-15-0">编号</view>
			<u--input placeholder="请输入内容" border="surround" :value='detail.doctor_id' @change="change($event,1)">
			</u--input>
			<view class="co-333333 f26 fb m-15-0">职称</view>
			<u--input placeholder="请输入内容" border="surround" :value='detail.doctor_title' @change="change($event,2)">
			</u--input>
		</view>

		<title title="形象照"></title>
		<view class="card d-c">
			<view style='min-height:280rpx' class="flex-1">
				<u-album borderRadius='12rpx' albumSize='90%' :singleSize='130' singleMode='scaleToFill' :urls="urls1"
					keyName="src1">
				</u-album>
			</view>
			<view class="btn co-FFFFFF f26 mt15" @click='upload(0)'>上传图片</view>
		</view>

		<title title="执业资格证"></title>
		<view class="card d-c">
			<view style='min-height:280rpx' class="flex-1">
				<u-album borderRadius='12rpx' albumSize='90%' :singleSize='130' singleMode='scaleToFill' :urls="urls2"
					keyName="src2">
				</u-album>
			</view>
			<view class="btn co-FFFFFF f26 mt15" @click='upload(1)'>上传图片</view>
		</view>

		<view class="d-c mt50 wz">
			<view class="flex-1 d-c-c">
				<view class="btn bcbtn co-FFFFFF f32" @click="goto('/pages_my/doctor/addDoctor')">删除</view>
			</view>
			<view class="flex-1 d-c-c">
				<view class="btn bcbtn co-FFFFFF f32" @click="goto('/pages_my/doctor/addDoctor')">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import title from '@/components/title/title.vue';
	import {
		getDoctor
	} from '@/common/api.js'
	export default {
		components: {
			title,
		},
		data() {
			return {
				detail: {},
				urls1: [],
				urls2: [],
			}
		},
		computed: {
			bglgH() {
				let windowWidth = uni.getSystemInfoSync().windowWidth
				return (windowWidth * 410) / 750
			}
		},
		onLoad(options) {
			let id = decodeURIComponent(options.id);
			this.getData(id)
		},
		methods: {
			change(value, index) {
				switch (index) {
					case 0:
						this.detail.parts = value;
						break;
					case 1:
						this.detail.project = value;
						break;
					case 2:
						this.detail.customer_name = value;
						break;
				}
			},
			async getData(id) {
				let obj = {
					data_id: id
				}
				const res = await getDoctor(obj)
				console.log(res.data.data);
				if (res.statusCode === 200) {
					this.detail = res.data.data
					if (res.data.data.picture && res.data.data.picture && res.data.data.picture.url) {
						this.urls1 = [{
							src1: res.data.data?.picture?.url || '',
						}]
					}

					if (res.data.data.qualification && res.data.data.qualification && res.data.data.qualification
						.url) {
						this.urls2 = [{
							src2: res.data.data?.qualification?.url || '',
						}]
					}
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
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
