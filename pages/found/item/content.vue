// 品牌内容
<template>
	<view>
		<view class="m-0-24 mt30 borderRadius hidden">
			<image class="w100"
				src="https://bianm.jinxiongsj.com/file/uploads/20220715/38bbf4779b838d997e98578c66ecebe2.jpg"
				mode="widthFix"></image>
		</view>

		<title title="视频号精选"></title>
		<view class="m-0-24">
			<u-scroll-list :indicator="false">
				<view class="mr20" v-for="(item, index) in videoList" :key="index">
					<image class="brandImg mb20 borderRadius" :src="item.img"></image>
				</view>
			</u-scroll-list>
		</view>

		<title title="变美笔记"></title>
		<view class="m-0-24 d-s">
			<view>
				<view class="mb20 borderRadius bg-FFFFFF hidden" v-for="(item, index) in leftList" :key="index"
					:style="'width: '+ noteW +'px;'">
					<view>
						<image class="w100" mode="widthFix" :src="item.img"></image>
					</view>
					<view class="p15">
						<view class="f24 co-333333 fb">
							{{item.title}}
						</view>
						<view class="d-c mt15">
							<u-icon name="clock" color="#999999" size="14"></u-icon>
							<view class="f26 co-999999 ml5">{{item.date}}</view>
						</view>
					</view>
				</view>
			</view>

			<view>
				<view class="mb20 borderRadius bg-FFFFFF hidden" v-for="(item, index) in rightList" :key="index"
					:style="'width: '+ noteW +'px;'">
					<view>
						<image class="w100" mode="widthFix" :src="item.img"></image>
					</view>
					<view class="p15">
						<view class="f24 co-333333 fb">
							{{item.title}}
						</view>
						<view class="d-c mt15">
							<u-icon name="clock" color="#999999" size="14"></u-icon>
							<view class="f26 co-999999 ml5">{{item.date}}</view>
						</view>
					</view>
				</view>
			</view>


		</view>

	</view>
</template>

<script>
	import title from '@/components/title/title.vue';
	import utils from '@/static/utils/calcImageWH.js';
	export default {
		data() {
			return {
				videoList: [{
					id: 'asf1231231asdf12313',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20221008/c3d14b39530e54ea73f7ebc5df348538.jpg',
					title: '热芙美热芙美热芙美品牌刀法',
				}, {
					id: 'asf1231231asdf12313',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20221008/c3d14b39530e54ea73f7ebc5df348538.jpg',
					title: '热芙美热芙美热芙美品牌刀法',
				}, {
					id: 'asf1231231asdf12313',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20221008/c3d14b39530e54ea73f7ebc5df348538.jpg',
					title: '热芙美热芙美热芙美品牌刀法',
				}],
				noteList: [{
					title: '热芙美为什么这么好用',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20221008/c3d14b39530e54ea73f7ebc5df348538.jpg',
					date: '2022-10-01'
				}, {
					title: '热芙美为什么这么好用',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20220718/340a477f28b14a700b6d03e6a9c94299.png',
					date: '2022-10-01'
				}, {
					title: '热芙美为什么这么好用',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20220715/38bbf4779b838d997e98578c66ecebe2.jpg',
					date: '2022-10-01'
				}, {
					title: '热芙美为什么这么好用',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20220715/1030994df709634fe85d78fae0d05b08.jpg',
					date: '2022-10-01'
				}, {
					title: '热芙美为什么这么好用',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20220715/ceb9956882a7717ef3a9052339eaa101.jpg',
					date: '2022-10-01'
				}, ],
				noteW: 168 * uni.getSystemInfoSync().windowWidth / 375,
			}
		},
		props: {
			list: {
				value: Array,
				default: []
			}
		},
		computed: {
			leftList() {
				let noteList = this.noteList
				let list = []
				for (let i = 0; i < noteList.length; i++) {
					if (i % 2 == 0) {
						list.push(noteList[i])
					}
				}
				return list
			},
			rightList() {
				let noteList = this.noteList
				let list = []
				for (let i = 0; i < noteList.length; i++) {
					if (i % 2 == 1) {
						list.push(noteList[i])
					}
				}
				return list
			}
		}
	}
</script>

<style lang="scss" scoped>
	.p-30-25 {
		padding: 30rpx 25rpx;
	}

	.m-30-24 {
		margin: 30rpx 24rpx;
	}

	.brandImg {
		width: 280rpx;
		height: 240rpx;
	}
</style>
