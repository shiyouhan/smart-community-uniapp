<template>
	<view>
		<view class="flex algin-center justify-center u-m-b-140">
			<image src="../../static/images/other/app_image_icon.png"  
				class="w-66 border-half u-m-t-84 u-m-b-84">
		</view>
		
		<view class="rounded bg-white u-w-679 u-h-244 m-16-20-12">
			<view class="pass flex align-center u-h-120 border-b-4">
				<view class="iconfont icon-shouji text-hover-light u-p-l-24 u-p-r-19"></view>
				<input type="text" placeholder="请输入手机号"/>
			</view>
			<view class="pass flex align-center u-h-120">
				<view class="iconfont icon-suo text-hover-light u-p-l-24 u-p-r-19"></view>
				<input type="text" placeholder="请输入密码"/>
			</view>
		</view>
		
		<button class="btn_submit u-m-t-54" @tap="login">
			<text class="btn_content">注册</text>
		</button>
		
		<view class="flex algin-center justify-center u-m-t-114">
			<view class="border-y u-m-t-19"></view>
			<text class="text-secondary px-2">第三方登录</text>
			<view class="border-y u-m-t-19"></view>
		</view>
		
		<view class="flex algin-center justify-center u-m-t-44">
			<image src="../../static/images/other/wechat.png" class="w-60 u-p-r-126"/>
			<image src="../../static/images/other/qq.png" class="w-60"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				// 顶部选项卡
				tabBars: [
					{
						name: "账号密码登录",
					},
					{
						name: "短信验证妈登录",
					}
				],
			}
		},
		methods: {
			changeTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				console.log(index)
				this.tabIndex = index
				console.log(this.tabIndex)
			},
			login() {
				uni.navigateTo({
					url: '../login/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.tabbar {
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.tabbar-item {
		padding: 20rpx 0rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin: 0rpx 60rpx;
	}
	.line {
		border-bottom: 4rpx solid $primary;
	}

</style>
