<template>
	<view class="search-wrap">
		<u-navbar title="搜索话术" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="m24">
			<u-search placeholder="请输入关键字搜索" :showAction='false' shape="round" @search='searchStr(keyword)'
				v-model="keyword">
			</u-search>
		</view>

		<view class="fb co-333333 f32 m24 d-s-c">
			<view>历史记录</view>
			<u-icon name="trash" color="#999999" size="24" @click='clearStorage'></u-icon>
		</view>
		<view class="m24 flex">
			<view class="before-search mr15 f26 p-15-30 borderRadius" v-for="(item,index) in arr" :key="index"
				@click="searchStr(item)">
				{{ item }}
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				type: '',
				assemble_activity_id: 0,
				form: {},
				arr: [],
			}
		},
		onLoad(e) {},
		mounted() {
			this.getData();
		},
		methods: {
			getData() {
				uni.getStorage({
					key: 'search_list',
					success: res => {
						if (res != null && res.data != null) {
							this.arr = ([...new Set(res.data)]);
						}
					}
				});

			},
			/*搜索*/
			storageSet(str) {
				let arrs = this.arr
				arrs.push(str)
				arrs = ([...new Set(arrs)])
				this.arr = arrs
				uni.setStorage({
					key: 'search_list',
					data: arrs
				});
			},
			searchStr(str) {
				if (str) {
					this.storageSet(str)
					// let url = `/pages/qa/searchDetail?str=${str}`;
					// uni.redirectTo({
					// 	url,
					// });
				} else {
					uni.showToast({
						title: '请输入搜索的关键字',
						icon: 'none',
						duration: 2000
					});
				}
			},
			/*清楚缓存*/
			clearStorage() {
				uni.removeStorage({
					key: 'search_list',
					success: res => {
						this.arr = [];
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.before-search {
		background: rgba(81, 159, 241, 0.1);
		color: #519FF1;
	}
</style>
