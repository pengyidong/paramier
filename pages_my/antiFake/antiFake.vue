<template>
	<view>
		<u-navbar title="防伪码" :autoBack="true" :placeholder='true'></u-navbar>
		<view v-if="lodingStatus == 1">
			<view class="m24 borderRadius boxShadow hidden">
				<qrcode></qrcode>
				<view class="d-s-c bg-FFFFFF p-20-30">
					<view class="f32 co-333333">
						广州变美日记体验中心
					</view>
					<view class="f26 co-666666">
						M211009105
					</view>
				</view>
				<u-collapse @change="change" @close="close" @open="open">
					<u-collapse-item title="合约地址" name="Docs guide">
						<text class="u-collapse-content"
							@touchend="maskTouchend($event,'iaa124tuz0t9dzxlg6nnezsglqmp5276w9d7ydpum9')">{{this.detail.contract_address}}</text>
					</u-collapse-item>
					<u-collapse-item title="动态码" name="Variety components">
						<text class="u-collapse-content"
							@touchend="maskTouchend($event,'16D47961315156D852EC98DAF4731A593DD1F6FA2B632F2AA1D91C940AA2CB57')">{{this.detail.hash}}</text>
					</u-collapse-item>
				</u-collapse>
			</view>
			<view class="m24 d-d-c bg-FFFFFF p24 borderRadius boxShadow" v-if="time">
				<view class="mb15 co-333333">
					防伪码有效期
				</view>
				<u-count-down :time="time " format="HH:mm:ss" autoStart millisecond @change="onChange">
					<view class="time">
						<view class="time__custom">
							<text
								class="time__custom__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.minutes }}</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.seconds }}</text>
						</view>
					</view>
				</u-count-down>
			</view>
		</view>
		<view v-else>
			<view class="d-c-c w100 mt400" v-if="lodingStatus===0">
				<u-loading-icon size='48' color='#c1c4cc'></u-loading-icon>
			</view>
			<view class="f48 co-999999 d-c-c w100 mt400" v-if="lodingStatus=== -1 ">
				<u-empty mode="list" text='暂无数据'></u-empty>
			</view>
		</view>

	</view>
</template>

<script>
	import qrcode from "./qrcode/qrcode.vue"
	import {
		getCode
	} from '@/common/api.js'
	export default {
		components: {
			qrcode
		},
		data() {
			return {
				timeData: {},
				detail: {},
				ctime: null,
				touchNum: 0,
				lodingStatus: 0,
				qrcode: 'https://bianm.jinxiongsj.com/file/uploads/20221206/aceb6b1132485497de950baaa5d68c6d.png'
			}
		},
		created() {
			this.getData()
		},
		computed: {
			time() {
				let newTime = Date.parse(new Date()) - Date.parse(new Date(this.detail.ctime));
				let h = 60 * 60 * 1000
				return h - newTime
			}
		},
		methods: {
			async getData() {
				this.lodingStatus = 0
				const res = await getCode()
				if (res.data.code == 200) {
					this.detail = res.data.data
					this.lodingStatus = 1
				} else {
					this.lodingStatus = -1
				}
			},
			onChange(e) {
				this.timeData = e
			},
			open(e) {
				// console.log('open', e)
			},
			close(e) {
				// console.log('close', e)
			},
			change(e) {
				// console.log('change', e)
			},
			maskTouchend(e, data) {
				this.touchNum++
				setTimeout(() => {
					if (this.touchNum >= 2) {
						uni.setClipboardData({
							data,
							success: () => {
								uni.showToast({
									title: '复制成功',
									duration: 2000,
									icon: 'none'
								});
							}
						});
					}
					this.touchNum = 0
				}, 250)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-page {
		padding: 0;

		&__item {

			&__title {
				padding: 15px;
				color: #333333;
				font-size: 32rpx;

				&__slot-title {
					color: #333333;
					font-size: 32rpx;
				}
			}
		}
	}


	.u-cell__title-text {
		color: #333333;
		font-size: 32rpx;
	}

	.u-collapse-content {
		color: #999999;
		font-size: 26rpx;
		word-break: break-all;
	}

	.time {
		@include flex;
		align-items: center;

		&__custom {
			margin-top: 4px;
			width: 22px;
			height: 22px;
			background-color: $u-primary;
			border-radius: 4px;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			justify-content: center;
			align-items: center;

			&__item {
				color: #fff;
				font-size: 12px;
				text-align: center;
			}
		}

		&__doc {
			color: $u-primary;
			padding: 0px 4px;
		}

		&__item {
			color: #606266;
			font-size: 15px;
			margin-right: 4px;
		}
	}
</style>
