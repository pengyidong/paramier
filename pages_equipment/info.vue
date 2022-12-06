<template>
	<view>
		<u-navbar title="仪器基础信息" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="m-0-24 mb30 mt50">
			<image style="width: 100%;"
				src="https://bianm.jinxiongsj.com/file/uploads/20221108/54d8ba4e8ecb331fba5ba813206d3639.jpg"
				mode="widthFix">
			</image>
		</view>

		<title title="参数信息"></title>
		<view class="m-0-24 p-0-20 bg-FFFFFF mb50 borderRadius">
			<view class="p-20-0 d-s-c f30 fb bb-EBEBEB" v-for="(item, index) in list" :key="index">
				<view class="co-333333">
					{{item.key}}
				</view>
				<view class="co-999999">
					{{item.value}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import title from '@/components/title/title.vue';
	export default {
		components: {
			title,
		},
		data() {
			return {
				list: [{
					key: '波特率',
					value: '115200/14578/145258'
				}, {
					key: '校验位',
					value: 'NONE'
				}, {
					key: '数据位',
					value: '8'
				}, {
					key: '软件控制流',
					value: '预留控制、暂不读写'
				}, {
					key: '串口标准',
					value: '485'
				}, {
					key: '电源',
					value: '3.3V 500毫安'
				}, ]
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
