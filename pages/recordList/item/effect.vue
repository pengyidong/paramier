<template>
	<view class="card d-s-c">
		<view class="flex-1">
			<view class="mb15 f30">
				治疗前
			</view>
			<u-album borderRadius='12rpx' albumSize='90%' :singleSize='130' singleMode='widthFix' :urls="urls1"
				keyName="src1">
			</u-album>
		</view>
		<view class="flex-1">
			<view class="mb15 f30">
				治疗后
			</view>
			<u-album borderRadius='12rpx' albumSize='90%' :singleSize='130' singleMode='widthFix' :urls="urls2"
				keyName="src2">
			</u-album>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			detail: {
				value: Object,
				default: {}
			}
		},
		watch: {
			detail: {
				handler(newName, oldName) {
					if (newName) {
						if (newName.before) {
							this.urls1 = [{
								src1: newName?.before[0]?.url,
							}]
							console.log("this.urls1: ", this.urls1);
						}
						if (newName.after) {
							this.urls2 = [{
								src2: newName?.after[0]?.url,
							}]
							console.log("this.urls2: ", this.urls2);
						}
					}


				},
				immediate: true,
				deep: true
			}
		},
		data() {
			return {
				urls1: [{
					src1: this.detail?.before[0]?.url || '',
				}],
				urls2: [{
					src2: this.detail?.after[0]?.url || '',
				}]
			}
		},
		methods: {}
	}
</script>


<style lang="scss" scoped>
</style>
