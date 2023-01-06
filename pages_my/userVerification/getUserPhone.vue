<template>
	<view>
		<u-navbar title="获取用户信息" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="mt24"></view>
		<view class="card">
			<view class="co-333333 f26 fb mb15">头像</view>
			<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<u-avatar :src="src" size='60'></u-avatar>
			</button>

			<view class="co-333333 f26 fb m-15-0">姓名</view>
			<u--input placeholder="请输入内容" border="surround" :value='detail.parts' @change="change($event,0)"></u--input>
			<view class="co-333333 f26 fb m-15-0">手机号</view>
			<u--input placeholder="请输入内容" border="surround" :value='detail.project' @change="change($event,1)">
			</u--input>
			<view class="co-333333 f26 fb m-15-0">性别</view>
			<u-radio-group v-model="gender" :borderBottom="true" placement="column"
				iconPlacement="right">
				<u-radio label="女" name="女" :labelDisabled='true' :customStyle="{marginBottom: '16px'}"></u-radio>
				<u-radio label="男" name="男" :labelDisabled='true' :customStyle="{marginBottom: '16px'}"></u-radio>
			</u-radio-group>
		</view>
		<view class="d-c-c mt50 wz">
			<view class="flex-1 d-c-c">
				<button open-type="getPhoneNumber" class="btn-normal" @getphonenumber="getPhoneNumber">保存表单</button>
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
	import title from '@/components/title/title.vue';
	export default {
		data() {
			return {
				phone: '',
				detail: {},
				src: '',
				gender: '女'
			}
		},
		created() {
			this.getData()
		},
		methods: {
			onChooseAvatar(e) {
				const {
					avatarUrl
				} = e.detail
				console.log("avatarUrl: ", avatarUrl);
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

	button {
		border: none !important;
		border-radius: 0 !important;
	}

	.avatar-wrapper {
		border: none !important;
		border-radius: 0 !important;
	}
</style>
