<template>
	<view>
		<u-navbar title="获取手机号" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="mt400  f32 fb co-333333">
			<view class="tc">为了查询您的治疗档案</view>
			<view class="tc">需要您提供手机号</view>
		</view>
		<view class="d-c-c mt50 wz">
			<view class="flex-1 d-c-c">
				<button open-type="getPhoneNumber" class="btn-normal" @getphonenumber="getPhoneNumber">获取手机号</button>
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
		createVerifyTruth
	} from '@/common/api.js'
	export default {
		data() {
			return {
				phone: '',
				detail: {}
			}
		},
		created() {
			this.getData()
		},
		methods: {
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
							uni.navigateTo({
								url
							})
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
				if (res.statusCode === 200) {
				}
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
</style>
