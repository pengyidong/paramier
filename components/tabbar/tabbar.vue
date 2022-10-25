<template>
	<u-tabbar :value="value" @change="change" :border="false">
		<u-tabbar-item v-for="(item, index) in tabbarList" :key="index">
			<template v-if="index !== 2">
				<image class="slotItem" mode='aspectFit' slot="active-icon" :src="item.active"></image>
				<image class="slotItem" mode='aspectFit' slot="inactive-icon" :src="item.inactive">
				</image>
			</template>
			<template v-else>
				<image class="slotItemCenter" mode='aspectFit' slot="active-icon" :src="item.active"></image>
				<image class="slotItemCenter" mode='aspectFit' slot="inactive-icon" :src="item.inactive">
				</image>
			</template>
		</u-tabbar-item>
	</u-tabbar>
</template>

<script>
	export default {
		data() {
			return {
				value: 0,
				tabbarList: [{
						active: 'https://bianm.jinxiongsj.com/file/uploads/20221009/77ccbbcccd0c55810123a20db9016271.png',
						inactive: 'https://bianm.jinxiongsj.com/file/uploads/20221009/7d07af6d06b5220d1f623310e3f57026.png',
						linkUrl: 'pages/index/index'
					},
					{
						active: 'https://bianm.jinxiongsj.com/file/uploads/20221009/ebd0a1e3713e963ac2d89f7eddc5350f.png',
						inactive: 'https://bianm.jinxiongsj.com/file/uploads/20221009/4e4c33f6bdec4dc8025cbd689a07e416.png',
						linkUrl: 'pages/found/found'
					},
					{
						active: 'https://bianm.jinxiongsj.com/file/uploads/20221021/0b147ceb252683dadc7b3c42266e75d2.png',
						inactive: 'https://bianm.jinxiongsj.com/file/uploads/20221021/97c4a63f9ee902d0864f6ad0d2c76ae6.png',
						linkUrl: 'pages/recordList/recordList'
					}, {
						active: 'https://bianm.jinxiongsj.com/file/uploads/20221009/b91536fbd2531575959df72936d96c3a.png',
						inactive: 'https://bianm.jinxiongsj.com/file/uploads/20221009/98028d8bb06362d0b83cb5d5c9ff4795.png',
						linkUrl: 'pages/equipment/equipment'
					},
					{
						active: 'https://bianm.jinxiongsj.com/file/uploads/20221009/d6c025e436221b5fac23757de2a64832.png',
						inactive: 'https://bianm.jinxiongsj.com/file/uploads/20221009/61c3b4d35b3d8057e3b7d1f7e86e1b9d.png',
						linkUrl: 'pages/my/my'
					}
				]
			}
		},
		created() {
			let pages = getCurrentPages();
			let currentpage = pages[pages.length - 1];
			this.tabbarList.forEach((item, index) => {
				let linkUrl = item.linkUrl;
				if (currentpage.route == linkUrl) {
					this.value = index;
				}
			});
		},
		methods: {
			change(e) {
				uni.reLaunch({
					url: `/${this.tabbarList[e].linkUrl}`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.slotItem {
		width: 50rpx;
		height: 86rpx;
	}
	.slotItemCenter{
		width: 100rpx;
		height: 100rpx;
		margin-bottom: 60rpx;
		border: 24rpx solid #FFFFFF;
		border-radius: 50%;
		display: block;
	}
</style>
