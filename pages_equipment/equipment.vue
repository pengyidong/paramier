<template>
	<view :style="'margin-top:'+statusBarHeight+'px'" class="mb88">
		<view class="m-0-24 mb50">
			<image style="width: 100%;"
				src="https://bianm.jinxiongsj.com/file/uploads/20221108/54d8ba4e8ecb331fba5ba813206d3639.jpg"
				mode="widthFix">
			</image>
		</view>
		<view class="m-0-24 d-s-c mb30">
			<view class="d-s-c">
				<view class="d-d-c mr30" v-for="(item, index) in statusList" :key="index">
					<view class="mb10">
						<image :src="detail.status === item.name ? item.active : item.inactive"
							style="width: 82rpx;height: 82rpx;"></image>
					</view>
					<view class="f28" :class="status === index ? 'activeText fb' : 'co-DDDDDD'">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="infoBtn pr f32 fb co-FFFFFF" @click="gotoInfo">
				基础信息
			</view>
		</view>
		<title v-if="detail.status === '运行中'" title="运行状态"></title>
		<view class="card borderRadius bg-FFFFFF m-0-24" v-if="detail.status === '运行中'">
			<view class="f26 co-999999 mb20">模式</view>
			<view class="d-s-c">
				<view class="d-d-c flex-1" v-for="(item, index) in modelList" :key="index">
					<view class="mb20">
						<image :src="detail.model === item.name ? item.active : item.inactive"
							style="width: 107rpx;height: 107rpx"></image>
					</view>
					<view class="f28" :class="detail.model === item.name ? 'activeText fb' : 'co-DDDDDD'">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="card borderRadius bg-FFFFFF m-0-24 d-c" v-if="detail.status === '运行中'">
			<view class="">
				<image style="width: 107rpx;height: 107rpx;"
					src="https://bianm.jinxiongsj.com/file/uploads/20221221/12dc33eab738e594f51bc6cc91eb5ee5.png"
					mode=""></image>
			</view>
			<view class="f28 co-666666 ml30 d-f-a" style="height: 107rpx;">
				<view>实时温度：{{detail.temperature}}℃</view>
				<view>警戒水温：{{detail.danger_temperature}}℃</view>
			</view>


		</view>

		<view class="m-0-24 d-r-c mb30" v-if="detail.status === '运行中'">
			<view class="borderRadius bg-FFFFFF mt30 d-b-c runStaImg"
				:style="'width:'+statusItemW+'px;height:'+180+'rpx;background-image: url('+item.bgImg+');'"
				v-for="(item, index) in RunStatusList" :key="index">
				<view class="f26 co-999999 mb15 ml20">
					{{item.name}}
				</view>
				<view class="f48 co-333333 ml20 fb500">
					{{item.value}}
				</view>
			</view>
		</view>

		<view class="bg-FFFFFF total d-s-c mb30">
			<view class="d-d-c">
				<view class="ring1 ring pr mb15">
					<view class="circle pa bg-FFFFFF d-c-c">
						<view class="co-333333">
							<text class="f48">{{time}}</text>
							<text class="f24">{{timeText}}</text>
						</view>

					</view>
				</view>
				<view class="co-666666 f24 fb500">
					总运行时长
				</view>
			</view>

			<view class="d-d-c">
				<view class="ring2 ring pr mb15">
					<view class="circle pa bg-FFFFFF d-c-c">
						<view class="co-333333">
							<text class="f48">{{statistical[1]}}</text>
							<text class="f24">次</text>
						</view>
					</view>
				</view>
				<view class="co-666666 f24 fb500">
					已使用发数
				</view>
			</view>
			<view class="d-d-c">
				<view class="ring3 ring pr mb15">
					<view class="circle pa bg-FFFFFF d-c-c">
						<view class="co-333333">
							<text class="f48">{{statistical[2]}}</text>
							<text class="f24">次</text>
						</view>
					</view>
				</view>
				<view class="co-666666 f24 fb500">
					治疗档案数
				</view>
			</view>
		</view>

		<view class="borderRadius bg-FFFFFF m-0-24 mb30">
			<view class="cardItem d-s-c" v-for="(item, index) in operationData" :key="index">
				<view class="f28 co-666666">
					{{item.name}}
				</view>
				<view class="f36 co-333333">
					{{item.num}}
				</view>
			</view>
		</view>

		<!-- 底部导航栏 -->
		<tabbar></tabbar>
	</view>
</template>

<script>
	import {
		equipment,
		getBusinessStatistical
	} from '@/common/api.js'
	import utils from '@/static/utils/calcImageWH.js';
	import tabbar from '@/components/tabbar/tabbar.vue';
	import title from '@/components/title/title.vue';
	export default {
		components: {
			tabbar,
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				detail: {},
				statistical: [],
				statusList: [{
					name: '在线',
					active: 'https://bianm.jinxiongsj.com/file/uploads/20221010/3e98f9a43815c9386b3b56731140cec4.png',
					inactive: 'https://bianm.jinxiongsj.com/file/uploads/20221010/e4a69e14f3f06a27e6141daeb78edd8a.png'
				}, {
					name: '运行中',
					active: 'https://bianm.jinxiongsj.com/file/uploads/20221010/1f56f4ea0f770da86bc87dbfac3e7aff.png',
					inactive: 'https://bianm.jinxiongsj.com/file/uploads/20221010/d70878a996098910982c0a4391d10d89.png'
				}, {
					name: '离线',
					active: 'https://bianm.jinxiongsj.com/file/uploads/20221010/615f052d5123bc1fa64bec0147bb6a2b.png',
					inactive: 'https://bianm.jinxiongsj.com/file/uploads/20221010/afc030a335e27a31d475091c41e348c3.png'
				}],
				modelList: [{
					name: '脱毛',
					active: 'https://bianm.jinxiongsj.com/file/uploads/20221010/b5e4211be37f8978aff4e1355ba014e4.png',
					inactive: 'https://bianm.jinxiongsj.com/file/uploads/20221010/693f6a2a6dd5d7bd11e5c4750fdd58ba.png'
				}, {
					name: '嫩肤',
					active: 'https://bianm.jinxiongsj.com/file/uploads/20221010/863ed068b4e9e313d85aef2e6f9d76d5.png',
					inactive: 'https://bianm.jinxiongsj.com/file/uploads/20221010/e14e8ee762519cbf0fce8645a6fdfdbb.png'
				}, {
					name: '祛斑',
					active: 'https://bianm.jinxiongsj.com/file/uploads/20221010/ef72d557e552161ab29d821ca83bba80.png',
					inactive: 'https://bianm.jinxiongsj.com/file/uploads/20221010/da5a6d8d4cfbcc82f1957ec779181fa2.png'
				}, {
					name: '毛细血管扩张',
					active: 'https://bianm.jinxiongsj.com/file/uploads/20221010/44bc9166ed4af0364319e4ad95cb9ae2.png',
					inactive: 'https://bianm.jinxiongsj.com/file/uploads/20221010/c3101bfee721b2e493314e8852cf491b.png'
				}],
				runStatus: [{
						name: '总发数',
						key: 'total_number',
						value: '',
						bgImg: 'https://bianm.jinxiongsj.com/file/uploads/20221011/97e313fb873d1b9af7e3c9a6c14a0f68.png'
					},
					{
						name: '当前发数',
						key: 'total',
						value: '',
						bgImg: 'https://bianm.jinxiongsj.com/file/uploads/20221011/bf4e38c0ee46443c87e80c527647a3ef.png'
					},
					{
						name: '脉冲个数',
						key: 'pulse',
						value: '',
						bgImg: 'https://bianm.jinxiongsj.com/file/uploads/20221011/5e57acd31f497c191789607b4bccd1ec.png'
					},
					{
						name: '脉冲间隔',
						key: 'temperature',
						value: '',
						bgImg: 'https://bianm.jinxiongsj.com/file/uploads/20221011/3b9f1c7e38ba9a3e2b8584e6967ad779.png'
					},
					{
						name: '脉宽',
						key: 'interval',
						value: '',
						bgImg: 'https://bianm.jinxiongsj.com/file/uploads/20221011/cfab3b930588e7a7db0480c5915c43c2.png'
					},
					{
						name: '能量大小',
						key: 'pulseWidth',
						value: '',
						bgImg: 'https://bianm.jinxiongsj.com/file/uploads/20221011/784b09218c1351c48354e873b956e35b.png'
					}
				],
				operationData: [{
						name: '当月耗材消耗',
						num: 9000
					},
					{
						name: '当月线索派单数',
						num: 9000
					},
					{
						name: '当月线索到医数',
						num: 9000
					},
					{
						name: '线索转化数',
						num: 9000
					},
					{
						name: '线索转化率',
						num: 9000
					},
				]
			}
		},
		computed: {
			time() {
				let _time = this.statistical[0]
				if (_time < 60) {
					return _time

				} else if (_time >= 60 && _time < 3600) {
					return (_time / 60).toFixed()
				} else {
					return (_time / 3600).toFixed()
				}
			},
			timeText() {
				let _time = this.statistical[0]
				if (_time < 60) {
					return '秒'

				} else if (_time >= 60 && _time < 3600) {
					return '分钟'
				} else {
					return '小时'
				}
			},
			statusItemW() {
				let windowWidth = uni.getSystemInfoSync().windowWidth
				return (windowWidth * 212) / 750
			},
			RunStatusList() {
				let _runStatus = this.runStatus
				let modelObj = {
					'脱毛': 'hair_removal',
					'嫩肤': 'tender_skin',
					'祛斑': 'the_spot',
					'毛细血管扩张': 'capillary_blood_vessels',
				}
				let afterList = ['total_number', 'current_number', 'pulses_number', 'pulses_interval', 'pulse_width',
					'energy'
				]
				let before = modelObj[this.detail.model]
				_runStatus.forEach((item, index) => {
					item.value = this.detail[`${before}_${afterList[index]}`] || '-'
				})
				return _runStatus
			}
		},
		created() {
			this.getData()
			this.getStatistical()
			setInterval(() => {
				this.getData()
			}, 5000)
		},
		methods: {
			gotoInfo() {
				let url = `/pages_equipment/info`
				uni.navigateTo({
					url
				})
			},
			async getStatistical() {
				let obj = {
					widgetId: "_widget_1671603967688",
					appId: "63413e3366ceda0008b4e512",
					entryId: "6390250d2a75a0000a5a4668",
					fx_access_token: "wxaQh7C80x+1iI8Q5WZDATs5EaeBBjpYRfyCV4auOEA=",
					fx_access_type: "dash_public"
				}
				const res = await getBusinessStatistical(obj)
				console.log("res.data.data: ", res.data.data.val);
				if (res.statusCode == 200) {
					this.statistical = [res.data.data.val[2].sum, res.data.data.val[1].sum, res.data.data.val[0].sum]
				}
			},
			async getData() {
				let obj = {
					data_id: '63903b0580c117000a994815'
				}
				const res = await equipment(obj)
				let statusObj = {
					'在线': 0,
					'运行中': 1,
					'离线': 2
				}
				if (res.statusCode == 200) {
					this.detail = res.data.data
					this.status = statusObj[res.data.data.status]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.activeText {
		background: linear-gradient(0deg, #DAB1C1, #9AAECF);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		text-shadow: 0px 2px 2px 0px rgba(78, 42, 3, 1);
	}

	.infoBtn {
		width: 209rpx;
		height: 64rpx;
		line-height: 64rpx;
		text-align: center;
		background: linear-gradient(94deg, #A9B8D5, #D2C7D8);
		border: 2rpx solid #8B91C4;
		border-radius: 12rpx;
	}

	.infoBtn:before {
		content: '';
		position: absolute;
		width: 201rpx;
		height: 56rpx;
		background: transparent;
		border: 2rpx solid #FFFFFF;
		border-radius: 12rpx;
		top: 2rpx;
		left: 2rpx;
	}

	.card {
		padding: 30rpx 15rpx;
	}

	.runStaImg {
		background-size: 100rpx 100rpx;
		background-position: right top;
		background-repeat: no-repeat;
	}

	.total {
		padding: 20rpx 50rpx;
	}

	.circle {
		width: 156rpx;
		height: 156rpx;
		top: 12rpx;
		left: 12rpx;
		border-radius: 156rpx;
	}

	.ring {
		border-radius: 180rpx;
		width: 180rpx;
		height: 180rpx;
	}

	.ring1 {
		background: linear-gradient(0deg, #5BBAE6, #01D4E4);
	}

	.ring2 {
		background: linear-gradient(94deg, #01D4E4, #46E8C5);
	}

	.ring3 {
		background: linear-gradient(94deg, #9FF596, #F9F871);
	}

	.cardItem {
		padding: 30rpx 15rpx;
		border-bottom: 2rpx rgba(213, 213, 213, .2) solid;
	}
</style>
