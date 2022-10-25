<template>
	<view :style="'padding-top:'+navBarH+'px'">
		<view :style="'height:'+navBarHeight+'px;padding-top:'+statusBarHeight+'px'" class="navBar co-333333 f36 fb500">
			发现
		</view>
		<view class="bg-FFFFFF pb30">
			<u-tabs @change='tabsChange' :current='index' :scrollable='false' :list="list" lineColor="#5AA1F9" :activeStyle="{
			    color: '#5AA1F9'
			}"></u-tabs>
		</view>

		<course v-if="index === 0" :list='courseList'></course>
		<activity v-if="index === 1" :list='activityList'></activity>
		<content v-if="index === 2" :list='contentList'></content>

		<tabbar></tabbar>
	</view>

</template>

<script>
	import course from './item/course.vue'
	import activity from './item/activity.vue'
	import content from './item/content.vue'
	import tabbar from '@/components/tabbar/tabbar.vue';
	export default {
		components: {
			tabbar,
			course,
			activity,
			content
		},
		data() {
			return {
				index: 0,
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				navBarHeight: uni.getStorageSync('navBarHeight'),
				list: [{
					name: '运营课程',
				}, {
					name: '品牌活动',
				}, {
					name: '品牌内容'
				}],
				courseList: [{
					title: '如果您的项目是由vue-cli创建的，请通过以下命令安装对sass(scss)的支持.',
					date: '2022-10-11',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20220416/f5d963f6e3f07650d793ee0350b0740e.jpg'
				}, {
					title: '如果您的项目是由vue-cli创建的，请通过以下命令安装对sass(scss)的支持.',
					date: '2022-10-11',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20220715/38bbf4779b838d997e98578c66ecebe2.jpg'
				}, {
					title: '如果您的项目是由vue-cli创建的，请通过以下命令安装对sass(scss)的支持.',
					date: '2022-10-11',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20220416/978ad27eb58c6b467e2fa3749f83b8e8.jpg'
				}, ],
				activityList: [{
					title: '在进行配置之前，请确保您已经根据安装中的步骤对uView进行了npm安装',
					date: '2022-10-11',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20220416/978ad27eb58c6b467e2fa3749f83b8e8.jpg'
				}, {
					title: 'uView依赖SCSS，您必须要安装此插件，否则无法正常运行',
					date: '2022-10-11',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20220416/f5d963f6e3f07650d793ee0350b0740e.jpg'
				}, {
					title: 'uView依赖SCSS，您必须要安装此插件，否则无法正常运行',
					date: '2022-10-11',
					img: 'https://bianm.jinxiongsj.com/file/uploads/20220715/38bbf4779b838d997e98578c66ecebe2.jpg'
				}, ],
				contentList: []
			}
		},
		computed: {
			navBarH() {
				let navBarH = this.statusBarHeight + this.navBarHeight
				return navBarH
			}
		},
		methods: {
			tabsChange(e) {
				this.index = e.index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navBar {
		width: 100%;
		background: #FFF;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		z-index: 9999999;
		top: 0;
	}
</style>
