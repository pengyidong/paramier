<template>
	<view class="pb150">
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
				<view class="f24 co-999999 mt15">*建议尺寸为1：1的照片</view>
			</view>
			<view class="btn co-FFFFFF f26 mt15" @click='upload(0)'>上传图片</view>
		</view>

		<title title="执业资格证"></title>
		<view class="card d-c">
			<view style='min-height:280rpx' class="flex-1">
				<u-album borderRadius='12rpx' albumSize='90%' :singleSize='130' singleMode='scaleToFill' :urls="urls2"
					keyName="src2">
				</u-album>
				<view class="f24 co-999999 mt15">*建议尺寸为1：1的照片</view>
			</view>
			<view class="btn co-FFFFFF f26 mt15" @click='upload(1)'>上传图片</view>
		</view>

		<view class="d-c mt50 wz">
			<view class="flex-1 d-c-c">
				<view class="btn bcbtn co-FFFFFF f32" @click="save()">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import title from '@/components/title/title.vue';
	import {
		createDoctor,
		getDoctorUploadToken
	} from '@/common/api.js'
	export default {
		components: {
			title,
		},
		data() {
			return {
				detail: {
					doctor_name: '',
					doctor_id: '',
					doctor_title: ''
				},
				urls1: [],
				urls2: [],
				src1: '',
				src2: '',
				isup1: false,
				isup2: false,
				token_and_url_list: []
			}
		},
		onLoad() {
			this.getToken()
		},
		methods: {
			async save() {
				let obj = {
					transaction_id: "bmrj8888",
					data: {
						doctor_name: {
							value: this.detail.doctor_name
						},
						doctor_id: {
							value: this.detail.doctor_id
						},
						doctor_title: {
							value: this.detail.doctor_title
						},
						agency_name: {
							value: '变美日记广州体验中心'
						},
						province: {
							value: '广东省'
						},
						city: {
							value: '广州市'
						},
						area: {
							value: '白云区'
						},
						brand: {
							value: 'RF'
						},
						area_code: {
							value: '50'
						},
						model: {
							value: 'S01'
						},
						doctor_number: {
							value: '510000'
						}
					}
				}
				if (this.isup1) {
					obj.data.picture = {
						value: [
							this.src1
						]
					}
				}
				if (this.isup2) {
					obj.data.qualification = {
						value: [
							this.src2
						]
					}
				}
				const res = await createDoctor(obj)
				if (res.statusCode === 200) {
					this.back()
				}
			},
			back() {
				uni.navigateBack()
			},
			upload(index) {
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					sourceType: ['album', 'camera'],
					success: (chooseImageRes) => {
						uni.showLoading({
							title: '图片上传中'
						});
						uni.uploadFile({
							url: this.token_and_url_list[0].url, //接口地址
							header: {
								'Authorization': 'Bearer SMlLFl0qf3setN6OWJl7henCSwnwfLaX'
							}, //请求token
							filePath: chooseImageRes.tempFilePaths[0],
							formData: {
								"token": this.token_and_url_list[0].token,
							},
							name: 'file',
							success: (uploadFileRes) => {
								let key = JSON.parse(uploadFileRes.data).key
								this.token_and_url_list.shift();

								if (index === 0) {
									this.src1 = key
									this.urls1 = [{
										src1: chooseImageRes.tempFilePaths[0],
									}]
									this.isup1 = true
								}
								if (index === 1) {
									this.src2 = key
									this.urls2 = [{
										src2: chooseImageRes.tempFilePaths[0],
									}]
									this.isup2 = true
								}
							},
							complete: () => {
								uni.hideLoading();
							}
						});
					}
				});
			},
			async getToken() {
				const res = await getDoctorUploadToken()
				console.log("res: ", res);
				if (res.statusCode === 200) {
					this.token_and_url_list = res.data.token_and_url_list
				}
			},
			async getData() {
				const res = await getDoctorUploadToken()
				console.log("res: ", res);
				if (res.statusCode === 200) {
					this.token_and_url_list = res.data.token_and_url_list
				}
			},
			change(value, index) {
				switch (index) {
					case 0:
						this.detail.doctor_name = value;
						break;
					case 1:
						this.detail.doctor_id = value;
						break;
					case 2:
						this.detail.doctor_title = value;
						break;
				}
			},
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
