<template>
	<view>
		<view class="flex bg-white">
			<view class="u-p-38">
				<view class="u-w-327 u-h-144 bg-lightred flex rounded u-m-b-38 align-center">
					<image src="../../static/images/other/open-1.png" class="u-w-110 u-h-110 px-1"></image>
					<view class="flex algin-center flex-column">
						<text class="flex u-font-38 text-white">摇一摇</text>
						<text class="flex u-font-14 text-white">手机摇一摇开门</text>
					</view>
				</view>
				<view class="u-w-327 u-h-144 bg-lightyellow flex rounded align-center">
					<image src="../../static/images/other/open-2.png" class="u-w-110 u-h-110 px-1"></image>
					<view class="flex algin-center flex-column">
						<text class="flex u-font-38 text-white">二维码</text>
						<text class="flex u-font-14 text-white">扫描二维码开门</text>
					</view>
				</view>
			</view>
			<view class="py-4">
				<view class="u-w-327 u-h-327 bg-lightorange flex justify-center align-center flex-column rounded">
					<image src="../../static/images/other/open-3.png" class="u-w-162 u-h-162 px-2"></image>
					<text class="u-font-38 u-p-t-12 text-white">一键开门</text>
					<text class="u-font-14 text-white">轻松一键开门</text>
				</view>
			</view>
		</view>
		
		<view class="flex algin-center justify-center u-m-t-26">
			<view class="border-y u-m-t-19"></view>
			<text class="text-secondary px-2">开门记录</text>
			<view class="border-y u-m-t-19"></view>
		</view>
		
		<view v-for="(item, index) in list" :key="index">
			<door-list-item :item="item" :index="index">
			</door-list-item>
		</view>
	</view>
</template>

<script>
	import doorListItem from "@/components/common/door-list-item.vue"
	export default {
		components: {
			doorListItem
		},
		data() {
			return {
				list: [
					{
						id: 1,
						name: '张先生',
						way: '邀请开门',
						createTime: '2018-10-25 15:30:20'
					},
					{
						id: 2,
						name: '房主',
						createTime: '2018-10-25 15:30:20'
					}
				],
				currentItem: null
			};
		},
		// 监听点击导航栏设置按钮
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../invitation/invitation'
			})
		},
	}
</script>

<style lang="scss">

</style>
