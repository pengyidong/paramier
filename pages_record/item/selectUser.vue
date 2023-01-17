<template>
	<view>
		<u-popup :show="show" @close="close" @open="open" :duration='500' round='15'>
			<scroll-view scroll-y class="pt30 bg-F8F8F8" :style="'max-height: '+ maxHeight +'px;'">
				<view class="card d-c" v-for="(item, index) in list" :key="index" @click="select(item)">
					<u-avatar :src="item.wxurl[0].url" size='60'></u-avatar>
					<view class="ml30 d-c flex-1">
						<view class="mr30 co-333333 f30">
							{{item.wxname}}
						</view>
						<view class="mr30 co-333333 f30">
							{{item.sex}}
						</view>
						<view class="mr30 co-333333 f30">
							{{item.phone}}
						</view>
					</view>
					<u-icon name="arrow-right" color="#333333" size="16"></u-icon>
				</view>
			</scroll-view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getVerifyTruth
	} from '@/common/api.js'
	export default {
		props: {
			show: {
				value: Boolean,
				default: false,
			},
			creationtime: {
				value: String,
				default: '',
			}
		},
		data() {
			return {
				list: [],
				maxHeight: uni.getSystemInfoSync().windowHeight * 0.75
			}
		},
		watch: {
			show(val) {},
			creationtime(val) {
				this.getData()
			}
		},
		methods: {
			open() {
				// console.log('open');
			},
			close() {
				this.$emit('close', false)
			},
			select(item) {
				this.$emit('select', item)
				this.close()
			},
			async getData() {
				if(!this.creationtime) return
				let obj = {
					limit: 100,
					filter: {
						rel: "and",
						cond: [{
							field: "agency_name",
							method: "eq",
							value: '变美日记广州体验中心'
						}, {
							field: "date",
							method: "eq",
							value: this.creationtime.substring(0,10)
						}, ]
					}
				}
				const res = await getVerifyTruth(obj)
				if (res.statusCode === 200) {
					this.list = res.data.data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
