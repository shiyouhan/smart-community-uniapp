<template>
	<view>
		<view v-for="(item, index) in list" :key="index">
			<view class="bg-white  mb-2 flex rounded-22 mx-2 u-h-184">
				<image class="border-x w-101" :src="item.newsCover" />
				<view class="flex align-center justify-center">
					<view class="px-4">{{ item.newsTitle }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => []
		},
	}
};
</script>

<style lang="scss" scoped>
.news-cover {
	width: 220rpx;
	height: 180rpx;
	border-radius: 10rpx 0rpx 0rpx 10rpx;
}
</style>
