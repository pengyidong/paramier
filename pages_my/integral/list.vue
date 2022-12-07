<template>
	<view :style="'margin-top:'+statusBarHeight+'px'" class="pb88">
		<u-navbar title="任务列表" :autoBack="true" :placeholder='true'></u-navbar>

		<view class="borderRadius bg-FFFFFF m-0-24 d-c mb30 pr d-c">
			<image style="width: 100%;"
				src="https://bianm.jinxiongsj.com/file/uploads/20221121/27301e3918ae07ce549f4565f76bc0d3.png"
				mode="widthFix"></image>
			<view class="pa co-FFFFFF ml88">
				<view class="f36">
					当前积分
				</view>
				<view class="f48 fb">
					1000000
				</view>
			</view>
		</view>
		<title title="做任务赚积分"></title>
		<view class="bg-FFFFFF m-0-24  borderRadius ">
			<view class="bb-999999-2 p-30-25 d-c" v-for="(item, i) in list" :key="i">
				<image style="width: 36rpx;height: 36rpx;" class="mr15"
					:src="item.icon"
					mode="widthFix"></image>
				<view class="co-333333 f28 flex-1">
					{{item.title}}
				</view>
				<view class="co-539DF9 f26 fb">
					+{{item.num}}积分
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
				list: [{
					title: '医生认证',
					num: 10,
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221121/6351db401d16d957ab6ab32efe106288.png'
				}, {
					title: '打版效果反馈当天',
					num: 10,
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221121/e112eacceb3a5fb1def2002fbd7d0a85.png'
				}, {
					title: '打版效果反馈（7/14/30）',
					num: 10,
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221121/e112eacceb3a5fb1def2002fbd7d0a85.png'
				}, {
					title: '商机线索反馈（回访记录）',
					num: 10,
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221121/e112eacceb3a5fb1def2002fbd7d0a85.png'
				}, {
					title: '有效治疗数据（到院/治疗）',
					num: 10,
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221121/25d2631b360215e1609513742ce8d202.png'
				}, {
					title: '仪器上线机构淘宝/天猫',
					num: 10,
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221121/8843f85f1fde9db5b8c554dc8438e097.png'
				}, {
					title: '仪器上线机构大众/美团/新氧',
					num: 10,
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221121/ec5cccfeeac48daa1a7457140d3de53b.png'
				}, {
					title: '仪器上线机构百度/抖音/小红书等推广',
					num: 10,
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221121/3d041c28f8964d517924f5d571a77bd6.png'
				}, {
					title: '仪器上架机构线下广告露出',
					num: 10,
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221121/ef7b51fc3c489aed9515812c6c417edf.png'
				}, {
					title: '仪器在机构媒体号露出',
					num: 10,
					icon: 'https://bianm.jinxiongsj.com/file/uploads/20221121/50bfd9deabcbf8889147b49c21186720.png'
				}, ]
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>

</style>
