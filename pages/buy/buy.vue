<template>
	<view :style="'margin-top:'+statusBarHeight+'px'" class="pb150">
		<u-navbar title="耗材采购" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="bg-FFFFFF">
			<u-steps :current="current">
				<u-steps-item :title="item.title" v-for="(item, index) in stepsList" :key="index">
					<view class="slot-icon" slot="icon">
						<image :src="item.activeUrl" mode="widthFix" v-if="current >= index"></image>
						<image :src="item.inactiveUrl" mode="widthFix" v-else></image>
					</view>
				</u-steps-item>
			</u-steps>
		</view>

		<view v-if="current === 0" class="mt30">
			<view class="card d-s-c p-30-25" v-for="(item, i) in list" :key="i">
				<view class="">
					<view class="f32 co-666666 mb15">
						{{item.name}}
					</view>
				</view>
				<u-number-box v-model="item.num" min='0' @change="change($event,i)"></u-number-box>
			</view>

			<view class="d-c-c mt50 wz">
				<view class="flex-1 d-c-c">
					<view class="btn bcbtn co-FFFFFF f36" @click="next">确 认</view>
				</view>
			</view>
		</view>

		<view v-if="current === 1" class="mt30">
			<view class="m24 bg-FFFFFF borderRadius co-999999 f26">
				<view class="list-item d-s-c"><span>机构名称：</span><span>变美日记广州体验中心</span></view>
				<view class="list-item d-s-c"><span>设备型号：</span><span>PAR-OPT-01</span></view>
				<view class="list-item d-s-c"><span>设备序列号：</span><span>M211009105</span></view>
				<view class="list-item d-s-c"><span>联系电话：</span><span>020-86366730</span></view>
				<view class="list-item d-s"><span>详细地址：</span><span style='width: 65%;text-align: right;'>广东省-广州市-白云区 白山东街36号附近天健创意园</span></view>
			</view>

			<view class="m-0-24 bg-FFFFFF borderRadius co-999999 f26">
				<view v-for="(item, i) in list" :key="i">
					<view class="list-item d-s-c bb-999999-2" v-if="item.num>0">
						<span>{{item.name}}</span><span>{{item.num }}</span>
					</view>
				</view>
			</view>

			<view class="d-c-c mt50 wz">
				<view class="flex-1 d-c-c">
					<view class="bg-F8F8F8 co-666666 f36 lastBtn" @click="last">继续选择</view>
				</view>
				<view class="flex-1 d-c-c">
					<view class="btn bcbtn co-FFFFFF f36" @click="next">提交申请</view>
				</view>
			</view>
		</view>


		<view v-if="current === 2">
			<view class="d-c-c mt150">
				<image style="width: 240rpx;height: 240rpx;"
					src="https://bianm.jinxiongsj.com/file/uploads/20221123/fe6f27997dc4c29c8acb4a363f0c2948.png"
					mode=""></image>
			</view>
			<view class="mt30 d-c-c co-539DF9 f32 fb">
				申请成功，请等待客服联系
			</view>

			<view class="d-c-c mt50 wz">
				<view class="flex-1 d-c-c">
					<view class="btn bcbtn co-FFFFFF f36" @click="back">返回上一页</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import title from '@/components/title/title.vue';
	export default {
		components: {
			title
		},
		data() {
			return {
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				current: 0,
				stepsList: [{
						title: '耗材清单',
						activeUrl: 'https://bianm.jinxiongsj.com/file/uploads/20221121/355b13525bc31c48d64eab97c4ded42e.png',
						inactiveUrl: 'https://bianm.jinxiongsj.com/file/uploads/20221121/4f1b19431907d4659469f0ee2dfed234.png'
					},
					{
						title: '确认订单',
						activeUrl: 'https://bianm.jinxiongsj.com/file/uploads/20221121/63abd8387fb3e8030927efc036925dfd.png',
						inactiveUrl: 'https://bianm.jinxiongsj.com/file/uploads/20221121/c4d88d87a46fe90fbd04b8bc920ed619.png'
					},
					{
						title: '申请成功',
						activeUrl: 'https://bianm.jinxiongsj.com/file/uploads/20221121/de38b04230abb03442fd64ec824a103e.png',
						inactiveUrl: 'https://bianm.jinxiongsj.com/file/uploads/20221121/dfafc12c46e4e466cd425e24245d3951.png'
					}
				],
				list: [{
					name: 'CI-PM-安全箱',
					num: 0
				}, {
					name: 'RFM-R1医疗工具车',
					num: 0
				}, {
					name: 'RFM-中性电极连接线',
					num: 0
				}, {
					name: '专用凝胶',
					num: 0
				}, {
					name: 'RFM-手柄连接线',
					num: 0
				}, {
					name: '中性电极',
					num: 0
				}, {
					name: 'RFM-电源线',
					num: 0
				}]
			}
		},
		computed: {},
		methods: {
			change(e, i) {},
			back() {
				uni.navigateBack();
			},
			last() {
				this.current--
			},
			next() {
				let i = 0
				this.list.forEach(item => {
					if (item.num > 0) {
						i += item.num
					}
				});
				if (i === 0) {
					uni.showToast({
						title: '请选择兑换的物品',
						duration: 2000,
						icon: 'none'
					});
					return
				}
				this.current++
			}
		}
	}
</script>

<style lang="scss" scoped>
	.slot-icon {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.slot-icon {
		image {
			width: 60rpx;
			height: 60rpx;
		}
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

	.wz {
		box-shadow: 0rpx 3rpx 18rpx 0rpx rgba(128, 138, 187, 0.35);
		height: 120rpx;
		width: 100%;
		background: #FFFFFF;
		position: fixed;
		bottom: env(safe-area-inset-bottom);
	}

	.lastBtn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 18rpx 33rpx;
		border: 1rpx solid #999999;
		border-radius: 12rpx;
		max-width: 200rpx;
		height: 30rpx;
	}
</style>
