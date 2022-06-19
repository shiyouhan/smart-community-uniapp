<template>
	<view class="bg-white  mb-2 flex rounded-22" @click="open()">
		<view class="news-cover"><image class="news-cover" :src="item.imageUrl" /></view>
		<view class="flex align-center justify-center">
			<view class="px-4">{{ item.title }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		item: Object,
		index: Number
	},
	methods: {
		open() {
			this.$emit('open');
		}
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
