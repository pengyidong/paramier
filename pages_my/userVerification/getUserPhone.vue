<template>
	<view>
		<u-navbar title="获取用户信息" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="mt24"></view>
		<view class="card">
			<view class="co-333333 f26 fb mb15">头像</view>
			<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<u-avatar :src="src" size='60'></u-avatar>
			</button>

			<view class="co-333333 f26 fb m-15-0">昵称</view>
			<input type="nickname" class="weui-input" placeholder="请输入昵称" />
			<view class="co-333333 f26 fb m-15-0">手机号</view>
			<view class="d-c">
				<view class="co-333333 f26">{{phone || '-'}}</view>
				<button open-type="getPhoneNumber" class="maxW" @getphonenumber="getPhoneNumber">获取手机号</button>
			</view>


			<view class="co-333333 f26 fb m-15-0">性别</view>
			<u-radio-group v-model="gender" :borderBottom="true" placement="column" iconPlacement="right">
				<u-radio label="女" name="女" :labelDisabled='true' :customStyle="{marginBottom: '16px'}"></u-radio>
				<u-radio label="男" name="男" :labelDisabled='true' :customStyle="{marginBottom: '16px'}"></u-radio>
			</u-radio-group>
		</view>
		<view class="d-c-c mt50 wz">
			<view class="flex-1 d-c-c">
				<button class="btn-normal" @click="save">保存表单</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserPhone,
		getUserIsPhone,
		createUser,
		checkCode,
		getInstrument,
		createVerifyTruth,
		getUserInfoUploadToken
	} from '@/common/api.js'
	import title from '@/components/title/title.vue';
	export default {
		data() {
			return {
				info: {},
				phone: '',
				detail: {},
				src: '',
				gender: '女',
				openId: '',
				token_and_url_list: [],
			}
		},
		created() {
			this.getData()
			this.getToken()
			this.getOpenId()
		},
		methods: {
			getOpenId() {
				this.openId = uni.getStorageSync('loginRes')
			},
			async getToken() {
				const res = await getUserInfoUploadToken()
				if (res.statusCode === 200) {
					this.token_and_url_list = res.data.token_and_url_list
				}
			},
			save() {

			},
			onChooseAvatar(e) {
				const {
					avatarUrl
				} = e.detail
				this.src = avatarUrl
				uni.showLoading({
					title: '图片上传中'
				});
				uni.uploadFile({
					url: this.token_and_url_list[0].url, //接口地址
					header: {
						'Authorization': 'Bearer SMlLFl0qf3setN6OWJl7henCSwnwfLaX'
					}, //请求token
					filePath: avatarUrl,
					formData: {
						"token": this.token_and_url_list[0].token,
					},
					name: 'file',
					success: (uploadFileRes) => {
						let key = JSON.parse(uploadFileRes.data).key
						this.token_and_url_list.shift();
						console.log("key: ", key);
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			async getData() {
				let obj = {
					limit: 1,
					filter: {
						rel: "and",
						cond: [{
							field: "agency_name",
							method: "eq",
							value: '变美日记广州体验中心'
						}, ]
					}
				}
				const res = await getInstrument(obj)
				if (res.statusCode === 200) {
					this.detail = res.data.data[0]
				}
			},
			async isphone() {
				let obj = {
					limit: 1,
					filter: {
						rel: "and",
						cond: [{
							field: "phone",
							method: "eq",
							value: this.phone
						}, ]
					}
				}
				const res = await getUserIsPhone(obj)
				if (res.statusCode === 200) {
					if (res.data.data.length > 0) {

					} else {
						this.create()
					}
					let checkObj = {
						hash_code: 'E2BE29A9F567D75664106CA4069936688D609673829D2B0D1C85D8C8CBF9D580',
						device_code: 'grshh2TpCE8_dev_NOA02'
					}
					const checkRes = await checkCode(checkObj)
					if (checkRes.statusCode === 200 && checkRes.data.code === 200) {
						let createObj = {
							"data": {
								"phone": {
									"value": this.phone
								},
								"date": {
									"value": new Date().toLocaleString()
								},
								"equipment_id": {
									"value": this.detail.equipment_id
								},
								"serial_number": {
									"value": this.detail.serial_number
								},
								"agency_name": {
									"value": this.detail.agency_name
								},
								"equipment_model": {
									"value": 'RFWTM-01'
								},
							},
						}
						const checkRes = await createVerifyTruth(createObj)
						if (checkRes.statusCode === 200) {
							let url = `/pages_my/userVerification/verificationList?phone=${this.phone}`
						}
					}
				}
			},

			async create() {
				let obj = {
					data: {
						phone: {
							value: this.phone
						},
					},
				}
				const res = await createUser(obj)
				if (res.statusCode === 200) {}
			},
			getPhoneNumber(e) {
				if (e.detail.errMsg !== 'getPhoneNumber:ok') {
					return false;
				}
				wx.login({
					success: res => {
						let obj = {
							code: res.code,
							encrypted_data: encodeURIComponent(e.detail.encryptedData),
							iv: encodeURIComponent(e.detail.iv),
						}
						getUserPhone(obj).then(phoneRes => {
							this.phone = phoneRes.data.data.phone
							this.isphone()
						})
					}
				});
			}
		}
	}
</script>比价网

<style lang="scss" scoped>
	.wz {
		height: 120rpx;
		width: 100%;
		background: #FFFFFF;
		position: fixed;
		bottom: env(safe-area-inset-bottom);
		box-shadow: 0rpx 3rpx 18rpx 0rpx rgba(128, 138, 187, 0.35);
	}

	.btn-normal {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10rpx 25rpx;
		border: 1rpx solid #8B91C4;
		background: linear-gradient(94deg, #A9B8D5, #D2C7D8);
		border-radius: 12rpx;
		position: relative;
		min-width: 200rpx;
		height: 60rpx;
		color: #FFFFFF;
	}

	button::after {
		border: none;
	}

	.avatar-wrapper {
		background: white;
		padding: 0rpx;
		margin: 0rpx;
	}

	.maxW {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		padding: 10rpx 25rpx;
		border: 1rpx solid #8B91C4;
		background: linear-gradient(94deg, #A9B8D5, #D2C7D8);
		border-radius: 12rpx;
		height: 60rpx;
		color: #FFFFFF;
		max-width: 240rpx;
		margin: 0;
		margin-left: auto;
	}

	.weui-input {
		border: #dadbde 1rpx solid;
		border-radius: 8rpx;
		padding: 8rpx 12rpx;
	}
</style>
