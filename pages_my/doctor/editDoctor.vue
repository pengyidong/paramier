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
				<view class="btn bcbtn co-FFFFFF f32" @click="del()">删除</view>
			</view>
			<view class="flex-1 d-c-c">
				<view class="btn bcbtn co-FFFFFF f32" @click="save()">保存</view>
			</view>
		</view>
		<u-modal :show="show" :title='title' @confirm='confirm' @cancel='cancel' :showCancelButton='true'></u-modal>
	</view>
</template>

<script>
	import title from '@/components/title/title.vue';
	import {
		updateDoctor,
		deleteDoctor,
		getDoctor,
		getDoctorUploadToken
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
				src1: '',
				src2: '',
				isup1: false,
				isup2: false,
				token_and_url_list: [],
				show: false,
				title: ''
			}
		},
		computed: {
			bglgH() {
				let windowWidth = uni.getSystemInfoSync().windowWidth
				return (windowWidth * 410) / 750
			}
		},
		onLoad(options) {
			this.getToken()
			let id = decodeURIComponent(options.id);
			this.getData(id)
		},
		methods: {
			cancel() {
				this.show = false
			},
			async confirm() {
				let obj = {
					data_id: this.detail._id,
					is_start_trigger: true
				}
				const res = await deleteDoctor(obj)
				if (res.statusCode === 200) {
					this.show = false
					uni.showToast({
						title: '删除成功',
						duration: 2000,
						icon: 'none'
					});
					setTimeout(() => {
						this.back()
					}, 1800)
				}
			},
			cancel() {
				this.show = false
			},
			del() {
				this.title = `确认删除${this.detail.doctor_name}医生？`
				this.show = true
			},
			async save() {
				let obj = {
					data_id: this.detail._id,
					transaction_id: "bmrj8888",
					app_id: '63413e3366ceda0008b4e512',
					entry_id: '634e619d3f89ef000acfe68f',
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
				const res = await updateDoctor(obj)
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
			async getData(id) {
				let obj = {
					data_id: id
				}
				const res = await getDoctor(obj)
				console.log(res.data.data);
				if (res.statusCode === 200) {
					this.detail = res.data.data
					if (res.data.data.picture && res.data.data.picture && res.data.data.picture[0].url) {
						this.urls1 = [{
							src1: res.data.data?.picture[0]?.url || '',
						}]
					}

					if (res.data.data.qualification && res.data.data.qualification && res.data.data.qualification[0]
						.url) {
						this.urls2 = [{
							src2: res.data.data?.qualification[0]?.url || '',
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
