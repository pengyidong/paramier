<template>
	<view class="pb88">
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
			<u-radio-group v-model="details.gender" placement="row">
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
				<u-avatar :src="detail.doctor_photo[0].url" size='80'></u-avatar>
			</view>
			<view class="d-f-s">
				<view>姓名：{{detail.doctor_name || ''}}</view>
				<view>职称：{{detail.doctor_title || ''}}</view>
				<view>编号：{{detail.doctor_number || ''}}</view>
			</view>
			<view class="btn btnlt co-FFFFFF f26 fb" @click="gotoDoctor">选择医生</view>
		</view>
		<title title="效果图片"></title>
		<view class="card d-s">
			<view class="flex-1 album">
				<view class="mb15">
					治疗前
				</view>
				<view style='min-height:280rpx'>
					<u-album borderRadius='12rpx' albumSize='90%' :singleSize='130' singleMode='scaleToFill'
						:urls="urls1" keyName="src1">
					</u-album>
				</view>
				<view class="btn co-FFFFFF f26 mt15" @click='upload(0)'>上传图片</view>

			</view>
			<view class="flex-1 album">
				<view class="mb15">
					治疗后
				</view>
				<view style='min-height:280rpx'>
					<u-album borderRadius='12rpx' albumSize='90%' :singleSize='130' singleMode='scaleToFill'
						:urls="urls2" keyName="src2">
					</u-album>
				</view>
				<view class="btn co-FFFFFF f26 mt15" @click='upload(1)'>上传图片</view>
			</view>
		</view>

		<view class="d-c-c">
			<view class="flex-1 d-c-c">
				<view class="btn bcbtn co-FFFFFF f36" @click="edit">保 存</view>
			</view>
		</view>
		<selectDoctor :show='show' @close='close' @select='select'></selectDoctor>
	</view>
</template>

<script>
	import title from '@/components/title/title.vue';
	import selectDoctor from './item/selectDoctor.vue';
	import {
		recordDetail,
		recordUpdate,
		getRecordUploadToken
	} from '@/common/api.js'
	export default {
		components: {
			title,
			selectDoctor
		},
		data() {
			return {
				detail: {},
				token_and_url_list: [],
				record_id: '',
				id: '',
				urls1: [],
				urls2: [],
				isup1: false,
				isup2: false,
				isup3: false,
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
					src2: '',
					progress: null
				},
				show: false
			}
		},
		onLoad(options) {
			this.id = decodeURIComponent(options.id);
			this.getListData()
			this.getToken()
		},
		methods: {
			select(e) {
				this.detail.doctor_name = e.doctor_name
				this.detail.doctor_title = e.doctor_title
				this.detail.doctor_number = e.doctor_id

				this.details.doctor_name = e.doctor_name
				this.details.doctor_number = e.doctor_id
				this.details.doctor_title = e.doctor_title
				this.getSelectImg(e.picture[0].url)
			},
			getSelectImg(url) {
				this.detail.doctor_photo = [{
					url
				}]
				uni.downloadFile({
					url,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.uploadFile({
								url: this.token_and_url_list[0].url, //接口地址
								header: {
									'Authorization': 'Bearer SMlLFl0qf3setN6OWJl7henCSwnwfLaX'
								}, //请求token
								filePath: res.tempFilePath,
								formData: {
									"token": this.token_and_url_list[0].token,
								},
								name: 'file',
								success: (uploadFileRes) => {
									let key = JSON.parse(uploadFileRes.data).key
									this.token_and_url_list.shift();
									this.details.doctor_photo = key
									this.isup3 = true
								}
							});
						}
					}
				})

			},
			close() {
				this.show = !this.show
			},
			gotoDoctor() {
				this.show = !this.show
			},
			async getToken() {
				const res = await getRecordUploadToken()
				if (res.statusCode === 200) {
					this.token_and_url_list = res.data.token_and_url_list
				}
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
									this.details.src1 = key
									this.urls1 = [{
										src1: chooseImageRes.tempFilePaths[0],
									}]
									this.isup1 = true
								}
								if (index === 1) {
									this.details.src2 = key
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
			},
			back() {
				uni.navigateBack()
			},
			edit() {
				this.update()
			},
			setProgress() {
				let i = 0
				let _detail = this.detail
				if (_detail.record_id) {
					i = i + 10
				}
				if (_detail.equipment_id) {
					i = i + 10
				}
				if (_detail.serial_number) {
					i = i + 10
				}
				if (_detail.model) {
					i = i + 10
				}
				if (_detail.agency_name) {
					i = i + 10
				}
				if (this.details.parts) {
					i = i + 10
				}
				if (this.details.contact) {
					i = i + 10
				}
				if (this.details.doctor_number) {
					i = i + 10
				}
				if (this.details.src1) {
					i = i + 10
				}
				if (this.details.src2) {
					i = i + 10
				}
				i = (i / 100)
				return i
			},
			async update() {
				let obj = {
					data_id: this.detail._id,
					transaction_id: "bmrj8888",
					app_id: '63413e3366ceda0008b4e512',
					entry_id: '634e763952cb33000a45e252',
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
						before_name: {
							value: '1'
						},
						after_name: {
							value: '2'
						},
						progress: {
							value: this.setProgress()
						},
					}
				}
				if (this.isup1) {
					obj.data.before = {
						value: [
							this.details.src1
						]
					}
				}
				if (this.isup2) {
					obj.data.after = {
						value: [
							this.details.src2
						]
					}
				}
				if (this.isup3) {
					obj.data.doctor_photo = {
						value: [
							this.details.doctor_photo
						]
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
					data_id: this.id
				}
				const res = await recordDetail(obj)
				if (res.statusCode == 200) {
					this.detail = res.data.data
					this.details.parts = res.data.data?.parts
					this.details.project = res.data.data.project
					this.details.customer_name = res.data.data.customer_name
					this.details.contact = res.data.data.contact
					this.details.wechat = res.data.data.wechat
					this.details.symptoms = res.data.data.symptoms
					this.details.gender = res.data.data.gender
					this.details.progress = res.data.data.progress
					this.details.doctor_photo = res.data.data?.doctor_photo[0]?.url
					this.details.doctor_title = res.data.data.doctor_title
					this.details.doctor_name = res.data.data.doctor_name
					this.details.doctor_number = res.data.data.doctor_number
					this.details.src1 = res.data.data?.before[0]?.url
					this.details.src2 = res.data.data?.after[0]?.url
					if (res.data.data.before && res.data.data.before[0] && res.data.data.before[0].url) {
						this.urls1 = [{
							src1: res.data.data?.before[0]?.url || '',
						}]
					}

					if (res.data.data.after && res.data.data.after[0] && res.data.data.after[0].url) {
						this.urls2 = [{
							src2: res.data.data?.after[0]?.url || '',
						}]
					}
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
		max-width: 200rpx;
		height: 30rpx;
	}

	.bcbtn {
		min-width: 200rpx;
		height: 40rpx;
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

	.album {
		min-width: 45%;
	}
</style>
