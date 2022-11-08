<template>
	<view class="pr" :style="'height:'+pageHeight+'px;'">
		<image class="w100"
			src="https://bianm.jinxiongsj.com/file/uploads/20221108/722ded66dfec57846155f74d0069fbb6.jpg"
			mode="widthFix"></image>
		<view class="pr">
			<view class="m-0-24 bg-FFFFFF p-30-25 borderRadius boxShadow pa top">
				<view class="tc fb co-333333 f36 mb20">仪器小助手《用户协议》</view>
				<view class="co-333333 tc f24 mb20">
					感谢您使用paramier，为了让您有更好的使用体验并充分保障您的权益，
					请您详细阅读，充分理解条款内容。
				</view>
				<scroll-view v-html="agreement" scroll-y
					class="htmlContent pr borderRadius bgMain richH co-FFFFFF f26 p24 tj"></scroll-view>
			</view>
		</view>

		<view class="pa loginBox">
			<view class="loginBtn borderRadius bgMain co-FFFFFF f36 fb pr mb20" @click="login">手机号登录</view>

			<view class="d-c-c co-999999 f30">
				<u-checkbox-group>
					<u-checkbox iconSize="18" labelSize="18" size="18" v-model="checked" shape="circle" class="lh100"
						:label-disabled="false" active-color="#aeb9d6"></u-checkbox>
				</u-checkbox-group>
				我已阅读并同意用户协议
			</view>
		</view>


	</view>
</template>

<script>
	import html from '@/static/utils/agreement.js';
	export default {
		data() {
			return {
				agreement: html,
				pageHeight: uni.getSystemInfoSync().windowHeight
			}
		},
		methods: {
			login() {
				let url = '/pages/index/index'
				uni.reLaunch({
					url
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.top {
		top: -80rpx;
	}

	.htmlContent:before {
		content: '';
		position: absolute;
		width: calc(100% - 8rpx);
		height: 500rpx;
		background: transparent;
		border: 2rpx solid #FFFFFF;
		border-radius: 12rpx;
		top: 2rpx;
		left: 2rpx;
	}

	.richH {
		height: 460rpx;
		width: calc(100% - 48rpx);
	}

	.loginBox {
		margin-left: -270rpx;
		left: 50%;
		bottom: 60rpx;
	}

	.loginBtn {
		width: 540rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		letter-spacing: 7rpx;
	}

	.loginBtn:before {
		content: '';
		position: absolute;
		width: calc(100% - 8rpx);
		height: calc(100% - 8rpx);
		background: transparent;
		border: 2rpx solid #FFFFFF;
		border-radius: 12rpx;
		top: 2rpx;
		left: 2rpx;
	}
</style>
