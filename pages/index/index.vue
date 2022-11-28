<template>
	<view>
		<!-- 头图 -->
		<view class="pr">
			<image class="block" :style="'width:100%;height: '+  headerH +'px'" :src="src"></image>
			<view class="headerBottom pa"></view>
		</view>

		<title title="品牌刀法"></title>
		<view class="m-0-24">
			<u-scroll-list :indicator="false">
				<view class="brandItem borderRadius "
					v-for="(item, index) in brandList" :key="index">
					<image class="brandImg mb20" :src="item.img"></image>
					<view class="co-666666 p-0-12 f26 text-ellipsis-2">
						{{item.title}}
					</view>
					<view class="flex p-0-12 mt20">
						<u-icon name="clock" color="#999999" size="14"></u-icon>
						<view class="f26 co-999999 ml5">{{item.date}}</view>
					</view>
				</view>
			</u-scroll-list>
		</view>

		<title title="商机心法"></title>
		<view class="d-r-c m-0-24">
			<view class="business borderRadius mb20 d-s-c"  @click="goto(`/pages/business/list?index=${index}`)" :style="'width: '+ itemW +'px;height: '+ brandItemH +'px'"
				v-for="(item, index) in businessList" :key="index">
				<view class="co-FFFFFF d-b-c h100 ml30">
					<view class="f26 d-b ">
						{{item.name}}
						<u-icon name="arrow-right" color="#FFFFFF" size="13"></u-icon>
					</view>
					<view class="f48">{{item.num}}</view>
				</view>
				<view class="">
					<image style="width: 100rpx;height:100rpx;" :src="item.img" mode=""></image>
				</view>
			</view>
		</view>

		<title title="开箱宝典" isShowMore=true></title>
		<view class="m-0-24 d-r-c">
			<view class="unpack">
				<image class="mb30 borderRadius" :style="'width: '+ itemW +'px;height: '+ unpackItemH1 +'px'"
					src="https://bianm.jinxiongsj.com/file/uploads/20220804/43eb16481a4dae8c40dbf9647ac961b5.jpg" alt=""
					srcset=""></image>
				<image class="mb30 borderRadius" :style="'width: '+ itemW +'px;height: '+ unpackItemH +'px'" :src='src'
					alt="" srcset=""></image>
			</view>
			<view class="unpack">
				<view class="">
					<image class="mb30 borderRadius" :style="'width: '+ itemW +'px;height: '+ unpackItemH +'px'"
						:src='src' alt="" srcset=""></image>
					<image class="mb30 borderRadius" :style="'width: '+ itemW +'px;height: '+ unpackItemH +'px'"
						:src='src' alt="" srcset=""></image>
				</view>
				<image class="mb30 borderRadius" :style="'width: '+ itemW +'px;height: '+ unpackItemH +'px'" :src='src'
					alt="" srcset=""></image>
			</view>
		</view>

		<title title="运营秘籍"></title>
		<operating></operating>

		<!-- 底部导航栏 -->
		<tabbar></tabbar>

		<!-- 加载视频 -->
		<showVideo></showVideo>
	</view>
</template>

<script>
	import utils from '@/static/utils/calcImageWH.js';
	import title from '@/components/title/title.vue';
	import operating from '@/components/operating/operating.vue';
	import tabbar from '@/components/tabbar/tabbar.vue';
	import showVideo from '@/components/showVideo/showVideo.vue';
	export default {
		components: {
			title,
			operating,
			tabbar,
			showVideo
		},

		data() {
			return {
				// 头图地址
				src: 'https://bianm.jinxiongsj.com/file/uploads/20221008/c3d14b39530e54ea73f7ebc5df348538.jpg',
				// 头图高度
				headerH: utils.calcH(750, 450),
				// 商机心法和开箱宝典Item的宽度
				itemW: 168 * uni.getSystemInfoSync().windowWidth / 375,
				// 商机心法Item高度
				brandItemH: 375 * 152 / uni.getSystemInfoSync().windowWidth / 2,
				// 开箱宝典Item高度
				unpackItemH: 375 * 224 / uni.getSystemInfoSync().windowWidth / 2,
				unpackItemH1: 375 * 478 / uni.getSystemInfoSync().windowWidth / 2,
				// 品牌刀法
				brandList: [{
					id: 'asf1231231asdf12313',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20221008/c3d14b39530e54ea73f7ebc5df348538.jpg',
					title: '热芙美热芙美热芙美品牌刀法',
					date: '2022-02-02'
				}, {
					id: 'asf1231231asdf12313',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20221008/c3d14b39530e54ea73f7ebc5df348538.jpg',
					title: '热芙美热芙美热芙美品牌刀法',
					date: '2022-02-02'
				}, {
					id: 'asf1231231asdf12313',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20221008/c3d14b39530e54ea73f7ebc5df348538.jpg',
					title: '热芙美热芙美热芙美品牌刀法',
					date: '2022-02-02'
				}],
				// 商机心法
				businessList: [{
						name: '已派单',
						num: 1111,
						img: 'https://bianm.jinxiongsj.com/file/uploads/20221010/6f3ff3ab7d91189f246266aac678936b.png'
					},
					{
						name: '已沟通',
						num: 2222,
						img: 'https://bianm.jinxiongsj.com/file/uploads/20221010/6f3ff3ab7d91189f246266aac678936b.png'
					},
					{
						name: '已到院',
						num: 3333,
						img: 'https://bianm.jinxiongsj.com/file/uploads/20221010/7f2ee60fe099fb395a8f0c1cadf0abd0.png'
					},
					{
						name: '已完成',
						num: 4444,
						img: 'https://bianm.jinxiongsj.com/file/uploads/20221010/95e18f485b6367a3c825616c88a75c72.png'
					}
				]
			}
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 遮挡头图 增加层次感
	.headerBottom {
		bottom: 0;
		height: 24rpx;
		width: 100%;
		border-radius: 24rpx 24rpx 0 0;
		z-index: 1;
		background: #F8F8F8;
	}

	// 品牌刀法
	.brandItem {
		width: 300rpx;
		height: 360rpx;
		margin-right: 20rpx;
		background: #FFFFFF;
	}

	.brandImg {
		width: 300rpx;
		height: 200rpx;
		border-radius: 12rpx 12rpx 0 0;
	}

	// 商机心法
	.business {
		background: linear-gradient(185deg, #5BBAE6, #4B90F8);
		box-shadow: 0rpx 7rpx 13rpx 0rpx rgba(79, 153, 244, 0.32);
	}

	// 开箱宝典
	.unpack {}
</style>
