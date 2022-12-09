<template>
	<view class="pb150">
		<u-navbar title="文章详情" :autoBack="true" :placeholder='true'></u-navbar>

		<view class="p-30-25 bg-FFFFFF">
			<view class="co-333333 f36 fb mb24">{{ article.detail.article_title }}</view>
			<view class="d-c mb20">
				<u-avatar :src="article.detail && article.detail.user ? article.detail.user.image.file_path : ''"
					size="40">
				</u-avatar>
				<text class="co-333333 f30 ml15">{{ article.detail.user.name }}</text>
			</view>
			<u-parse errorImg='https://bianm.jinxiongsj.com/file/images/loading.png' :tagStyle='tagStyle' previewImg
				:content="article.detail.article_content"></u-parse>
		</view>

	</view>
</template>

<script>
	import {
		getArticleDetail
	} from '@/common/api.js'
	export default {
		data() {
			return {
				article: {},
				tagStyle: {
					lineHeight: '150%',
					textAlign: 'justify',
					color: '#333333',
					fontSize: '26rpx'
				}
			}
		},
		onLoad(options) {
			let article_id = decodeURIComponent(options.article_id);
			this.getData(article_id)
		},
		created() {
			this.getData()
		},
		methods: {
			async getData(article_id) {
				let obj = {
					article_id,
				}
				const res = await getArticleDetail(obj)
				console.log(res.data);
				if (res.statusCode === 200) {
					this.article = res.data.data
				}
			}
		},
		//发送给朋友
		onShareAppMessage(res) {
			if (this.article) {
				return {
					title: `${this.article.detail.article_title}`,
					path: `/pages_found/articleDetail?article_id=${this.article.detail.article_id}`,
					imageUrl: `${this.article.detail.image.file_path}`
				}
			}
		},
		//分享到朋友圈
		onShareTimeline(res) {
			if (this.article) {
				return {
					title: `${this.article.detail.article_title}`,
					path: `/pages_found/articleDetail?article_id=${this.article.detail.article_id}`,
					imageUrl: `${this.article.detail.image.file_path}`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>
