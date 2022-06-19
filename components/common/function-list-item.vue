<template>
	<view class="flex justify-center pt-3 pb-3" @click="open">
		<image :src="item.src" class="icon mr-2"/>
		<view class="flex flex-column algin-center justify-center">
			<text class="mb-1 sub-title ">{{ item.title }}</text>
			<text class="tin-title ">{{ item.text }}</text>
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
				uni.navigateTo({
					url: this.item.page
				})
			}
		}
	}
</script>

<style scoped>
	.icon{
		width: 110rpx;
		height: 110rpx;
	}
	.sub-title{
		font-size: 16px;
		font-weight: 500;
	}
	.tin-title{
		font-size: 14px;
		color: #757575;
	}
</style>