<template>
	<view :style="'padding-top:'+navBarH+'px'" class="mb88">
		<view :style="'height:'+navBarHeight+'px;padding-top:'+statusBarHeight+'px'" class="navBar co-333333 f36 fb500">
			发现
		</view>
		<view class="bg-FFFFFF pb30">
			<u-tabs @change='tabsChange' :current='index' :scrollable='false' :list="tabsList" lineColor="#5AA1F9"
				:activeStyle="{
			    color: '#5AA1F9'
			}"></u-tabs>
		</view>

		<view class="m24" v-if="articleList.length != 0 ">
			<custom-waterfalls-flow :value="articleList" imageKey='image_path' @wapperClick="wapperClick">
				<view v-for="(item, index) of articleList" :key="index" class="p15" slot="slot{{index}}">
					<view class="f26 lh120 co-333333 mb10 text-ellipsis-2">{{ item.article_title }}</view>
					<view class="d-s-c">
						<view class="d-c">
							<u-avatar :src="item.user ? item.user.image.file_path : ''" size="25">
							</u-avatar>
							<text class="f24 co-333333 ml8">{{ item.user ? item.user.name : '佚名' }}</text>
						</view>
						<view class="d-c">
							<u-icon name="eye"></u-icon>
							<text class="f24 co-666666 ml5">{{ item.virtual_views }}</text>
						</view>
					</view>
				</view>
			</custom-waterfalls-flow>

		</view>
		<view class="mt400" v-else>
			<view class="d-c-c w100 mt400" v-if="loading">
				<u-loading-icon size='48' color='#689bff'></u-loading-icon>
			</view>
			<view class="f48 co-999999 d-c-c w100 mt400" v-else>
				<u-empty mode="list" text='暂无数据'></u-empty>
			</view>
		</view>

		<tabbar></tabbar>
	</view>

</template>

<script>
	import tabbar from '@/components/tabbar/tabbar.vue';
	import {
		getCategory,
		getCategoryList
	} from '@/common/api.js'
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				index: 0,
				statusBarHeight: uni.getStorageSync('statusBarHeight'),
				navBarHeight: uni.getStorageSync('navBarHeight'),
				tabsList: [],
				articleList: [],
				loading: false,
			}
		},
		computed: {
			navBarH() {
				let navBarH = this.statusBarHeight + this.navBarHeight
				return navBarH
			}
		},
		created() {
			this.getTabsList()
		},
		methods: {
			wapperClick(item) {
				console.log('单项点击事件', item)
				let url = `/pages_found/articleDetail?article_id=${item.article_id}`
				uni.navigateTo({
					url
				})
			},
			async getTabsList() {
				const res = await getCategory()
				if (res.statusCode === 200) {
					this.tabsList = res.data.data.category.slice(0, 3)
					this.getArticleList(this.tabsList[0].category_id)
				}
			},
			async getArticleList(category_id) {
				this.loading = true
				this.articleList = []
				let obj = {
					page: 1,
					list_rows: 999,
					category_id,
				}
				const res = await getCategoryList(obj)
				if (res.statusCode === 200) {
					this.loading = false
					let _articleList = res.data.data.list.data
					this.articleList = _articleList
				} else {
					this.loading = false
				}
			},
			tabsChange(e) {
				console.log("e: ", e);
				this.index = e.index
				this.getArticleList(e.category_id)
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
